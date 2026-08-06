import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_db
from app.core.exceptions import CustomHTTPException

# Initialize Firebase Admin
if firebase_admin._apps:
    for app in list(firebase_admin._apps.values()):
        firebase_admin.delete_app(app)

if settings.FIREBASE_PRIVATE_KEY and settings.FIREBASE_CLIENT_EMAIL:
    # Load from parsed env variables (e.g. replacing actual newlines if escaped)
    private_key = settings.FIREBASE_PRIVATE_KEY.replace("\\n", "\n")
    cred = credentials.Certificate({
        "type": "service_account",
        "project_id": settings.FIREBASE_PROJECT_ID,
        "private_key_id": "dummy",
        "private_key": private_key,
        "client_email": settings.FIREBASE_CLIENT_EMAIL,
        "client_id": "dummy",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": f"https://www.googleapis.com/robot/v1/metadata/x509/{settings.FIREBASE_CLIENT_EMAIL}"
    })
    firebase_admin.initialize_app(cred)
else:
    # Fallback to default application credentials if configured differently
    firebase_admin.initialize_app(options={"projectId": settings.FIREBASE_PROJECT_ID})

security = HTTPBearer()

async def get_current_user_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Verify the Firebase JWT token and return the decoded token.
    """
    token = credentials.credentials
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        print(f"FIREBASE AUTH ERROR: {e}")
        raise CustomHTTPException(
            status_code=401,
            detail=f"Invalid authentication credentials: {str(e)}",
            type="urn:problem-type:unauthorized"
        )
