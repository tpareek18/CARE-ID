# CARE-ID

## Set-up instructions

1. Clone the repository: `git clone https://github.com/tpareek18/CARE-ID.git` 
2. Install the requirements via the terminal: `pip install -r requirements.txt`
3. Run the following commands:\
     `python3 manage.py migrate`\
     `python3 manage.py runserver`

## Usage instructions

1. After running the above commands, you will see a link to a local host. Click on the link, and click on users, and Create.
2. Create your new patient and enter all fields.
3. Click on API Root link on the website and go to 'users'
4. Copy your new created user's hash.
5. Navigate to the link: (http://127.0.0.1:8000/user/get-by-hash/?format=api)
6. Enter the following in the textbox: {"hash":"enter-user-hash-here"}
7. Click POST on the bottom left. You should now be able to see all the patient fields for a given hash.

## Next steps

1. Improve the UI for encrypted retrieval process above.
