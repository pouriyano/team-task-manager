# 🧩 Team Task Manager

## 📌 Project Overview

**Team Task Manager** is a task and team management backend system. It allows:

- User registration and login  
- Team creation and joining  
- Task management (only by team leaders)  
- Commenting on tasks  
- Viewing tasks by users or teams  

🔐 **Only the team leader** can create, update, or delete tasks for their team members.

---

## ✨ Features

- ✅ User registration and login with **JWT authentication**
- 👥 Team creation and joining by users
- 📝 Task creation, viewing, updating, and deleting (leaders only)
- 📄 View tasks of all team members
- 💬 Commenting on tasks (with sender and receiver usernames)

---

## ⚙️ Installation and Setup

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher  
- [MySQL](https://www.mysql.com/)

### 🛠️ Steps

1. **Clone the repository:**
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
Set up your database and tables.
SQL scripts are available in the database/ folder.

Run the project:

bash
Copy
Edit
npm start
📚 API Documentation
👤 Users
Endpoint	Method	Description	Body
/user/register	POST	Register a user	{ username, email, password }
/user/login	POST	Login a user	{ username, password }

🧑‍🤝‍🧑 Teams
Endpoint	Method	Description	Body
/team/make	POST	Create a team	{ name, password, task, username }
/team/join	POST	Join a team	{ name, username, password }
/team/left	DELETE	Leave a team	{ name, username }
/team/changeleader	PUT	Change team leader	{ name, username }
/team/changetask	PUT	Change team's task	{ name, username, task }
/team/show	GET	Show team info	{ name, username, password }

📌 Tasks
Endpoint	Method	Description	Body / Params
/task/create	POST	Create a task (leader)	{ title, description, username, teamName }
/task/all	GET	Get all tasks	-
/task/user/:username	GET	Get user tasks	username as URL param
/task/team/:teamName	GET	Get team tasks	teamName as URL param
/task/update/:taskId	PUT	Update task (leader)	{ title, description }
/task/delete/:taskId	DELETE	Delete task (leader)	-

💬 Comments
Endpoint	Method	Description	Body / Params
/comment/create	POST	Create a comment	{ content, senderUsername, receiverUsername, taskId }
/comment/task/:taskId	GET	Get comments for a task	taskId as URL param
/comment/update/:commentId	PUT	Update a comment	{ content }
/comment/delete/:commentId	DELETE	Delete a comment	-

🧾 Project Structure
bash
Copy
Edit
team-task-manager/
├── app.js                 # Main entry point
├── config/
│   └── database.js        # Database configuration
├── controller/            # API controllers
├── middlewares/           # JWT & other middleware
├── model/                 # Database models
├── routes/                # API routes
├── database/              # SQL scripts
├── .env                   # Environment variables (gitignored)
└── README.md              # Project documentation
🛠️ Technologies Used
Node.js

Express

MySQL

JWT (JSON Web Token)

Joi (Input Validation)

bcrypt (Password Hashing)

👨‍💻 Author
Pouriya Noghani