# CardConnect

## MVP Features
1. Digital business card creation and sharing
2. Digital Business Card Organization and Management

## User Stories
### Feature 1: Digital business card creation and sharing
1. **Create a new business card so that I can represent myself or my company professionally**
    - Navigate to the "Create new Business Card" page
    - Fill in personal and professional details (e.g., name, title, company, phone, email)
    - Upload a logo or profile picture for branding
    - Preview the business card before saving
    - Save the business card to my account
    - Potential future action: Choose a card template to match my style or industry
2. **Share my business card virtually so that I can connect with others easily**
    -  Select a business card from my saved cards
    -  Choose a sharing method (e.g., link, email, messaging app)
    -  Send the business card to a recipient
3. **Share my business card virtually so that I can connect with others easily**
    -  Select a business card from my saved business cards
    -  Click on the "Download" button
    -  Choose the format (e.g., PDF or image) for the download

### Feature 2: Digital Business Card Organization and Management
1. **Upload photos of physical business cards so that I can keep all my contacts in one place**
    - Navigate to the "Card Management" page
    - Click on the "Upload Card" button
    - Select a photo file or take a picture of a physical card
    - Save the uploaded card to my account
2. **Extract information from uploaded cards so that I don’t have to manually input details**
    - Upload a business card photo
    - Use OCR technology to extract text from the image
    - Review and edit extracted details for accuracy
    - Save the extracted information as a digital card
3. **Organize my business cards into categories so that I can easily find specific contacts**
    - Create a new category on the "Card Management" page
    - Assign a card to one or more categories
    - Filter my card library by category
4. **Search for a specific business card so that I can quickly find the contact I need**
    - Use the search bar on the "Card Management" page
    - Enter keywords like name, company, or category
    - View matching results instantly
5. **Add notes to my saved business cards so that I can remember key details about each contact**
    - Select a card from the library
    - Click on "Add Note."
    - Enter a note with additional details (e.g., "Met at XYZ Conference")
    - Save the note for future reference

## DB SCHEMA
![Screenshot 2024-11-20 at 8 04 17 PM](https://github.com/user-attachments/assets/56f288f0-cea5-4126-a0dc-9e11ed6965ea)

## Wireframes
### Homepage
![Screenshot 2024-11-21 at 1 58 34 PM](https://github.com/user-attachments/assets/bc2bc816-23bb-4947-9ea4-745508fb675a)

### Create Business Card
![Screenshot 2024-11-21 at 1 59 00 PM](https://github.com/user-attachments/assets/e4ad4c07-6922-4d00-89f0-865b5cdc4e77)

## Manage Business Card Categories
![Screenshot 2024-11-21 at 1 59 29 PM](https://github.com/user-attachments/assets/a2670302-6d29-4e2a-bdec-b4774188539d)

# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
