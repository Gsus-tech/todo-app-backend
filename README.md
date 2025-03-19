# Backend for ToDo-App (web & mobile)

## Description:
This project demonstrates technical skills in developing a JavaScript backend that provides a RESTful API to handle CRUD operations for managing tasks.

## Key Features:
- **CRUD API:**  
    - Create, read, update, and delete tasks.  
    - Organize tasks into `To Do`, `In Progress`, and `Completed` statuses.  
- **Environment Variables:**  
    - Secure usage of `.env` file for MongoDB credentials.

## Getting Started
Follow the instructions below to set up the project on your local machine and get it running.

### Prerequisites
- Node.js: version v14.x.x or higher
- npm or yarn for package management
- **MongoDB Compass** (for local database visualization)

### **INSTALLATION PROCESS GUIDE**

1. **Clone the repository:**<br>
`git clone https://github.com/Gsus-tech/todo-app-backend`

2. **Navigate into the project directory:**<br>
`cd todo-app-backend`

3. **Install the dependencies (I used npm, you can use whatever you prefer):**<br>
`npm install` 
<br>or<br>
`yarn install` 

4. **Create a .env file in the root directory (if it doesn’t exist already) and add your MongoDB connection string:**<br>
`MONGO_URI=mongodb://localhost:27017/todoapp`

5. **Set up MongoDB Connection**<br>
- Install MongoDB Compass (if not installed already):
`https://www.mongodb.com/products/tools/compass`
- Create a Connection - Leave the defualt URI: `mongodb://localhost:27017`
- Ensure your Connection Port matches your .env variable

5. **And thats it! Now you can start your backend by running:**<br>
`node server.js` 