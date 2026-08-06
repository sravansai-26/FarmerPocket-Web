import resend
from app.core.config import settings

if settings.RESEND_API_KEY:
    resend.api_key = settings.RESEND_API_KEY

async def send_transactional_email(to_email: str, subject: str, html_body: str):
    """
    Send an email via Resend API.
    If the API key is not present, mock the sending.
    """
    if not settings.RESEND_API_KEY:
        print(f"Mock Email sent to {to_email}")
        print(f"Subject: {subject}")
        print(f"Body: {html_body[:50]}...")
        return {"status": "mock"}
    
    try:
        # Note: If sending from a custom domain fails because DNS isn't verified in Resend,
        # it might throw an error. Usually 'onboarding@resend.dev' works for testing if verified.
        # Assuming farmerpocket.app is verified or we use the default.
        sender = "Support <support@farmerpocket.app>"
        
        response = resend.Emails.send({
            "from": sender,
            "to": to_email,
            "subject": subject,
            "html": html_body
        })
        return response
    except Exception as e:
        print(f"Error sending email via Resend: {e}")
        return None

async def send_protection_activated_email(to_email: str, farmer_name: str, plot_name: str, activity_name: str, amount: float):
    subject = f"Protection Activated: {activity_name} at {plot_name}"
    html = f"""
    <div>
        <h2>Hello {farmer_name},</h2>
        <p>Your protection cover for <strong>{activity_name}</strong> at <strong>{plot_name}</strong> is now ACTIVE.</p>
        <p>Coverage Amount: ₹{amount}</p>
        <p>Our Weather Oracle will monitor this plot automatically. There is no claim process.</p>
        <br/>
        <p>Regards,<br/>FarmerPocket Team</p>
    </div>
    """
    return await send_transactional_email(to_email, subject, html)

async def send_payout_initiated_email(to_email: str, farmer_name: str, plot_name: str, amount: float, reason: str):
    subject = f"Payout Initiated: ₹{amount} for {plot_name}"
    html = f"""
    <div>
        <h2>Hello {farmer_name},</h2>
        <p>Our Weather Oracle detected <strong>{reason}</strong> at <strong>{plot_name}</strong>.</p>
        <p>Your automatic payout of <strong>₹{amount}</strong> has been initiated and will settle to your bank account shortly.</p>
        <br/>
        <p>Regards,<br/>FarmerPocket Team</p>
    </div>
    """
    return await send_transactional_email(to_email, subject, html)
