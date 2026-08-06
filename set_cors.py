import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage

cred = credentials.Certificate("backend/secrets/pocketcover-38624-firebase-adminsdk-fbsvc-077fc5d37f.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'pocketcover-38624.firebasestorage.app'
})

bucket = storage.bucket()
bucket.cors = [
    {
        "origin": ["*"],
        "method": ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        "responseHeader": ["Content-Type", "Authorization", "Content-Length", "User-Agent", "x-goog-resumable"],
        "maxAgeSeconds": 3600
    }
]
bucket.patch()
print("CORS configured successfully.")
