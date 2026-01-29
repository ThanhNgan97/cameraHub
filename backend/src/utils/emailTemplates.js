const getResetPasswordEmail = (resetCode) => {
    // Format code: 1234 5678
    const formattedCode = resetCode.toString().replace(/(\d{4})(\d{4})/, '$1 $2');
    const logoUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/logo.png`;

    return `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xác nhận danh tính</title>
</head>
<body style="
    margin: 0;
    padding: 0;
    background-color: #f3f4f6;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
">

    <div style="
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    ">
        
        <!-- HEADER -->
        <div style="
            text-align: center;
            padding: 40px 0 20px 0;
            background: linear-gradient(to bottom, #ffffff, #f9fafb);
        ">
            <div style="
                display: inline-flex; 
                align-items: center; 
                gap: 8px; 
                justify-content: center;
            ">
                 <!-- Logo must be a public URL -->
                 <img src="${logoUrl}" alt="CameraHub" height="40" style="display: block; height: 40px; width: auto;" />
            </div>
            
            <h1 style="
                margin-top: 24px;
                font-size: 24px;
                font-weight: 600;
                color: #111827;
            ">
                Xác nhận danh tính của bạn
            </h1>
        </div>

        <!-- MAIN CONTENT -->
        <div style="padding: 0 48px 48px 48px;">
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
                Chào bạn,
            </p>
            
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 32px;">
                Dưới đây là mã xác thực CameraHub của bạn:
            </p>

            <!-- CODE -->
            <div style="
                text-align: center;
                margin-bottom: 32px;
            ">
                <span style="
                    font-size: 30px;
                    font-weight: 700;
                    color: #F59E0B;
                    letter-spacing: 4px;
                    font-family: monospace;
                ">
                    ${formattedCode}
                </span>
            </div>

            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 12px;">
                Mã này có hiệu lực trong <span style="color: #F59E0B; font-weight: 600;">5 phút</span>.
            </p>

            <p style="font-size: 15px; line-height: 1.5; margin-bottom: 24px; font-weight: 600;">
                Vui lòng không chia sẻ mã này với bất kỳ ai.
            </p>

            <p style="font-size: 14px; line-height: 1.5; color: #6b7280; margin-bottom: 32px;">
                Chúng tôi sẽ không bao giờ yêu cầu bạn cung cấp mã này qua điện thoại hoặc email. Nếu bạn không yêu cầu đặt lại mật khẩu, hãy bỏ qua email này.
            </p>

            <div style="font-size: 15px; line-height: 1.5; color: #1f2937;">
                Trân trọng,<br>
                <strong>Đội ngũ CameraHub</strong>
            </div>
        </div>

        <!-- FOOTER -->
        <div style="
            background-color: #f9fafb;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        ">
            <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
                Bạn nhận được email này vì đã có yêu cầu xác thực tài khoản trên CameraHub.
            </p>
            
            <div style="margin-bottom: 24px;">
                <a href="#" style="font-size: 13px; color: #6b7280; text-decoration: underline; margin: 0 8px;">Trung tâm hỗ trợ</a>
                <a href="#" style="font-size: 13px; color: #6b7280; text-decoration: underline; margin: 0 8px;">Chính sách bảo mật</a>
            </div>
            
            <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                © 2026 CameraHub Security. All rights reserved.
            </p>
        </div>

    </div>
</body>
</html>
    `;
};

module.exports = {
    getResetPasswordEmail
};
