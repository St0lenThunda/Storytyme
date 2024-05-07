import firebase_admin
from firebase_admin import credentials, firestore, storage
from flask import Flask, request
from uuid import uuid4

# Initialize Flask app
app = Flask(__name__, static_folder='../public/')

# Initialize Firebase Admin SDK
cred = credentials.Certificate("../firebase/serviceAccount.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'storytyme-6a76a.appspot.com',
})

# Initialize Firestore database and Storage client
db = firestore.client()
bucket = storage.bucket()


# test endpoint to check if the Flask app is running
@app.route('/test')
def test():
    return 'Flask app is running!'

# Endpoint to handle form submission
@app.route('/submit-form', methods=['POST'])
def submit_form():
    # Get form data from POST request
    form_data = request.form
    files = request.files.getlist('file')

    # List to store file URLs
    file_urls = []

    # Save files to Firebase Storage and get their URLs
    for file in files:
        file_name = str(uuid4())  # Generate unique file name
        blob = bucket.blob(file_name)

        # Upload file to Firebase Storage
        blob.upload_from_file(file)
        
        # Get file URL
        url = blob.generate_signed_url(
            version='v4',
            expiration=datetime.timedelta(days=7),  # Set URL expiry to 7 days
            method='GET'
        )

        file_urls.append(url)

    # Save form data and file URLs to Firestore
    doc_ref = db.collection('form_data').add({
        'name': form_data['name'],
        'email': form_data['email'],
        'message': form_data['message'],
        'file_urls': file_urls,
    })

    return 'Form submitted successfully!'

if __name__ == '__main__':
    app.run(debug=True)
