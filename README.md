Post App
This is a simple Post application built using React and Redux Toolkit. It allows users to view, create, edit, and delete posts. The posts are stored both in a local Redux store and remotely using a mock API (jsonplaceholder.typicode.com).
Features
•	View Posts: Fetch and display posts from a mock API.
•	Create Post: Submit a form to create a new post, which is saved both locally and on the server.
•	Edit Post: Edit existing posts and save the updates to both the local store and the remote server.
•	Delete Post: Delete posts locally and from the server.
•	Form Validation: Input fields for creating posts are validated using Formik and Yup.
Technologies Used
•	React: Frontend library to build the user interface.
•	Redux Toolkit: For state management (fetching, creating, editing, and deleting posts).
•	Formik: For handling form inputs and validation.
•	Yup: For form validation schemas.
•	JSONPlaceholder API: Mock API used for fetching, creating, editing, and deleting posts.
Installation
Prerequisites
•	Node.js (recommended version: 14.x or later)
Steps to install and run the app locally
1.	Clone the repository:
2.	git clone https://github.com/your-username/post-management-app.git
3.	cd post-management-app
4.	Install dependencies: Run the following command to install all required dependencies:
5.	npm install
6.	Start the app: Once the dependencies are installed, run the following command to start the development server:
7.	npm start
The app will open in your default web browser at http://localhost:3000.
Features in Detail
Fetching Posts
•	The posts are fetched from the mock API (https://jsonplaceholder.typicode.com/posts) when the app loads.
•	The posts are displayed in a list format with their titles, bodies, and user IDs.
Creating Posts
•	Users can create new posts by filling out a form that includes: 
o	userId: The ID of the user who created the post.
o	title: The title of the post (at least 5 characters).
o	body: The body of the post (at least 20 characters).
•	Upon successful creation, the post is added both to the Redux store and to the server.
Editing Posts
•	Users can click the "Edit" button next to a post to enter edit mode.
•	The title and body can be modified, and the changes are saved both in the Redux store and on the server.
Deleting Posts
•	Users can click the "Delete" button next to a post to delete it.
•	The post will be removed both from the Redux store and from the server.
Form Validation
•	Formik is used to handle the form input and validation.
•	Yup is used for schema-based validation to ensure that all form fields meet the required conditions (e.g., positive integer for userId, minimum characters for title and body).
File Structure
src/
├── components/
│   ├── forms/
│   │   └── FormikForm.js      # Form for creating posts
│   └── PostList.js            # Component to display posts
├── redux/
│   └── slices/
│       └── formSlice.js       # Redux slice for managing post state
├── App.js                     # Main component
├── App.css                    # CSS styles
├── index.js                   # Entry point of the app
└── ...                        # Other configuration files
Folder Structure Overview
•	components/forms/: Contains the FormikForm component for creating posts.
•	components/: Contains the PostList component for viewing, editing, and deleting posts.
•	redux/slices/: Contains the Redux slice for managing posts.
•	App.js: The main entry point of the app.
•	App.css: Basic styling for the app.
API Endpoints
•	GET /posts: Fetch all posts.
•	POST /posts: Create a new post.
•	PUT /posts/:id: Update an existing post.
•	DELETE /posts/:id: Delete a post.
The above endpoints are handled by the mock API provided by JSONPlaceholder.
Development
Running the App in Development Mode
npm start
•	Runs the app in development mode and opens it in the browser at http://localhost:3000.
•	Any changes you make to the source code will automatically reload the app.
Building the App for Production
npm run build
•	Builds the app for production into the build folder.
•	The build is optimized for the best performance.
Contributing
If you want to contribute to this project, feel free to fork it, create a branch, and submit a pull request.
1.	Fork the repository
2.	Create a feature branch (git checkout -b feature-branch)
3.	Commit your changes (git commit -m 'Add feature')
4.	Push to the branch (git push origin feature-branch)
5.	Open a pull request
License
This project is open-source and available under the MIT License.
