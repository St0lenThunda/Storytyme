#!/usr/bin/env python3
import cgi
import json

def process_form():
    form = cgi.FieldStorage()

    # Check if the form_id matches to ensure this is the correct form submission
    if form.getvalue('form_id') == 'child_info_form':
        # Get form values
        child_name = form.getvalue('childName')
        images = form.getlist('imageUpload[]')
        interest = form.getvalue('interest')

        # Construct JSON response
        response = {
            'child_name': child_name,
            'images': images,
            'interest': interest
        }

        # Return JSON response
        print("Content-Type: application/json")
        print()
        print(json.dumps(response))
    else:
        # If form_id doesn't match, return an error response
        print("Content-Type: text/plain")
        print()
        print("Error: Invalid form submission")

# Call the function to process the form
process_form()