const prisma = require("../config/prisma");
const paypal = require("@paypal/checkout-server-sdk");
const { client } = require("../config/paypal");

exports.createPaypalOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await prisma.orders.findUnique({
      where: { id: BigInt(orderId) },
      include: { order_items: true }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const totalAmount = order.total_price.toString();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount
          }
        }
      ]
    });

    const paypalClient = client();
    const response = await paypalClient.execute(request);

    // Lưu payment pending
    const payment = await prisma.payments.create({
      data: {
        order_id: BigInt(orderId),
        payment_provider: "paypal",
        paypal_order_id: response.result.id,
        amount: order.total_price,
        status: "pending"
      }
    });

    res.json({
      paypalOrderId: response.result.id,
      paymentId: payment.id.toString()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Create PayPal order failed" });
  }
};
exports.capturePaypalOrder = async (req, res) => {
  try {
    const { paypalOrderId, paymentId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.requestBody({});

    const paypalClient = client();
    const response = await paypalClient.execute(request);

    if (response.result.status !== "COMPLETED") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const payment = await prisma.payments.findUnique({
      where: { id: BigInt(paymentId) }
    });

    const order = await prisma.orders.findUnique({
      where: { id: payment.order_id },
      include: { order_items: true }
    });

    const commissionRate = 0.1;

    await prisma.$transaction(async (tx) => {

      // Update payment
      await tx.payments.update({
        where: { id: BigInt(paymentId) },
        data: {
          status: "completed",
          transaction_id:
            response.result.purchase_units[0].payments.captures[0].id
        }
      });

      // Update order
      await tx.orders.update({
        where: { id: order.id },
        data: { payment_status: "completed" }
      });

      // Gom tiền theo shop
      const shopTotals = {};

      for (const item of order.order_items) {
        const shopId = item.shop_id.toString();
        const total = Number(item.price) * item.quantity;

        if (!shopTotals[shopId]) {
          shopTotals[shopId] = 0;
        }

        shopTotals[shopId] += total;
      }

      // Insert payment_splits
      for (const shopId in shopTotals) {
        const gross = shopTotals[shopId];
        const commission = gross * commissionRate;
        const net = gross - commission;

        await tx.payment_splits.create({
          data: {
            payment_id: BigInt(paymentId),
            shop_id: BigInt(shopId),
            gross_amount: gross,
            commission_amount: commission,
            net_amount: net,
            status: "pending"
          }
        });
      }
    });

    res.json({ message: "Payment captured & split successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Capture failed" });
  }
};