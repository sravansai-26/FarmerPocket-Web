import os
import re

replacements = {
    "app.models.user": "app.models.farmer",
    "app.schemas.user": "app.schemas.farmer",
    "app.repositories.user_repo": "app.repositories.farmer_repo",
    "UserCreate": "FarmerCreate",
    "UserUpdate": "FarmerUpdate",
    "UserInDB": "FarmerInDB",
    "User": "Farmer",
    "user_repo": "farmer_repo",
    "user_id": "farmer_id",
    "user_in": "farmer_in"
}

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original = content
        for k, v in replacements.items():
            content = re.sub(rf'\b{k}\b', v, content)
            
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error reading {filepath}: {e}")

backend_dir = r"c:\Users\Sravan\Projects\PocketCover\backend\app"
for root, dirs, files in os.walk(backend_dir):
    for file in files:
        if file.endswith('.py') and file not in ['farmer.py']:
            replace_in_file(os.path.join(root, file))

# Rename files
try:
    os.remove(r"c:\Users\Sravan\Projects\PocketCover\backend\app\models\user.py")
except:
    pass

try:
    os.rename(r"c:\Users\Sravan\Projects\PocketCover\backend\app\schemas\user.py", r"c:\Users\Sravan\Projects\PocketCover\backend\app\schemas\farmer.py")
except Exception as e:
    print("Schema error:", e)
    
try:
    os.rename(r"c:\Users\Sravan\Projects\PocketCover\backend\app\repositories\user_repo.py", r"c:\Users\Sravan\Projects\PocketCover\backend\app\repositories\farmer_repo.py")
except Exception as e:
    print("Repo error:", e)

print("Done")
