const nodemailer = require('nodemailer')

const sendMail = async (emailId, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: process.env.MY_GMAIL_ID,
                pass: process.env.MY_GMAIL_ID_APP_PASS
            }
        })

        const mailOptions = {
            from: process.env.MY_GMAIL_ID,
            to: emailId,
            subject: "Password Reset Request",
            html: `<div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px; background-color: #f9f9f9; border: 1px solid #ddd;">
                    <div style="text-align: center;">
                        <img src="https://imgs.search.brave.com/dzNZKdnqTpxWxFXiRRQOz8qy22qHE6HPjDg_3qWwrYE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bW9zLmNtcy5mdXR1/cmVjZG4ubmV0L1lz/UmVvazNmOE05eUVT/UkRiZUdKVkgtODQw/LTgwLmpwZw" alt="DevConnect Logo" style="width: 200px; margin-bottom: 20px;">
                    </div>
                    <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                    <p style="color: #666; text-align: center;">We received a request to reset your password. Click the button below to proceed.</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: white; padding: 12px 20px; font-size: 16px; text-decoration: none; border-radius: 5px;">Reset Password</a>
                    </div>
                    <p style="color: #666; font-size: 14px; text-align: center;">If you didn't request this, you can safely ignore this email.</p>
                    <hr style="border: none; border-top: 1px solid #ddd;">
                    <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} DevConnect. All Rights Reserved.</p>
                </div>`
        }
        await transporter.sendMail(mailOptions)
    }
    catch (err) {
        return res.status(400).json({ success: false, message: "Password Reset Failed:Try Again" })
    }
}

module.exports = sendMail
