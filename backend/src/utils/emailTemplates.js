const getResetPasswordEmail = (resetCode) => {
    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <title>Reset Password</title>
</head>
<body style="
    margin: 0;
    padding: 0;
    background-color: #f9fafb;
    font-family: Arial, Helvetica, sans-serif;
">

    <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    ">

        <!-- HEADER -->
        <div style="
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-bottom: 30px;
            color: #F59E0B;
        ">
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#F59E0B"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="m14.31 8 5.74 9.94" />
                <path d="m9.69 8h11.48" />
                <path d="m7.38 12 5.74-9.94" />
                <path d="m9.69 16L3.95 6.06" />
                <path d="m14.31 16H2.83" />
                <path d="m16.62 12-5.74 9.94" />
            </svg>

            <span style="
                font-size: 22px;
                font-weight: bold;
                letter-spacing: 0.5px;
            ">
                CameraHub
            </span>
        </div>

        <!-- CONTENT -->
        <h2 style="text-align: center; color: #111827;">
            Đặt lại mật khẩu
        </h2>

        <p style="color: #374151; text-align: center;">
            Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.
        </p>

        <p style="color: #374151; text-align: center;">
            Mã xác nhận 6 số của bạn là:
        </p>

        <!-- CODE -->
        <div style="
            margin: 30px auto;
            text-align: center;
            background-color: #FFF7ED;
            border: 2px dashed #F59E0B;
            border-radius: 12px;
            padding: 20px;
            width: fit-content;
        ">
            <span style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 6px;
                color: #F59E0B;
                font-family: 'Courier New', monospace;
            ">
                ${resetCode}
            </span>
        </div>

        <p style="
            text-align: center;
            color: #6B7280;
            font-size: 14px;
        ">
            ⚠️ Mã có hiệu lực trong <b>2 phút</b>.
        </p>

        <p style="
            text-align: center;
            color: #6B7280;
            font-size: 14px;
        ">
            Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.
        </p>

        <!-- FOOTER -->
        <div style="
            margin-top: 40px;
            border-top: 1px solid #E5E7EB;
            padding-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #9CA3AF;
        ">
            © 2026 CameraHub Team. All rights reserved.
        </div>
    </div>

</body>
</html>
    `;
};

module.exports = {
    getResetPasswordEmail
};
