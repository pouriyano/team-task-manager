<<<<<<< HEAD
# Team Task Manager

## Project Overview
A team and task management system that allows user registration, team creation, joining teams, managing tasks, and commenting. Only the team leader can create, update, or delete tasks for their team members.

---

## Features
- User registration and login with JWT authentication
- Team creation and joining by users
- Create, view, update, and delete tasks by team leaders
- View tasks of all team members
- Comment on tasks with sender and receiver usernames displayed

---

## Installation and Setup

### Prerequisites
- Node.js v16 or higher
- MySQL

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/username/team-task-manager.git
   cd team-task-manager
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory with the following content:

ini
Copy
Edit
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=teamtasks
JWT_SECRET=your_jwt_secret
TEAM_JWT_SECRET=your_team_jwt_secret
Setup your database and create necessary tables (SQL scripts available in the database folder).

Run the project:

bash
Copy
Edit
npm start
API Documentation
Users
Endpoint	Method	Description	Body
/user/register	POST	Register a new user	{ username, email, password }
/user/login	POST	User login	{ username, password }

Teams
Endpoint	Method	Description	Body
/team/make	POST	Create a team	{ name, password, task, username }
/team/join	POST	Join a team	{ name, username, password }
/team/left	DELETE	Leave a team	{ name, username }
/team/changeleader	PUT	Change team leader	{ name, username }
/team/changetask	PUT	Change team's task	{ name, username, task }
/team/show	GET	Show team info	{ name, username, password }

Tasks
Endpoint	Method	Description	Body / Params
/task/create	POST	Create a task (team leader only)	{ title, description, username, teamName }
/task/all	GET	Get all tasks	-
/task/user/:username	GET	Get tasks for a user	URL param: username
/task/team/:teamName	GET	Get tasks for a team	URL param: teamName
/task/update/:taskId	PUT	Update a task (leader only)	{ title, description }
/task/delete/:taskId	DELETE	Delete a task (leader only)	-

Comments
Endpoint	Method	Description	Body / Params
/comment/create	POST	Create a comment on a task	{ content, senderUsername, receiverUsername, taskId }
/comment/task/:taskId	GET	Get comments for a task	URL param: taskId
/comment/update/:commentId	PUT	Update a comment	{ content }
/comment/delete/:commentId	DELETE	Delete a comment	-

Project Structure
bash
Copy
Edit
├── app.js                 # Main entry point
├── config
│   └── database.js        # Database configuration
├── controller             # API controllers
├── middlewares            # Middleware (authentication, etc.)
├── model                  # Database models
├── routes                 # API routes
├── database               # SQL scripts
├── .env                   # Environment variables (gitignored)
└── README.md              # This documentation file
Technologies Used
Node.js

Express

MySQL

JWT (JSON Web Token) for authentication

Joi for input validation

bcrypt for password hashing


Author
Pouriya Noghani
=======
# team-task-manager
>>>>>>> 768fdfa31f05780aba5b63a436c0832fcfb4e91c
