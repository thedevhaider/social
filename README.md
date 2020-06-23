# A Social Network

# Routes
1. GET  /api/posts/healthcheck - For Checking the Posts endpoints health
2. POST /api/posts - To Create Post
3. GET  /api/posts - To List Created Posts
4. GET  /api/posts/:post_id - To List Post by ID
5. DELETE /api/posts/:post_id - To Delete Post By ID
6. POST /api/posts/comment/:post_id - To Comment on a Post of provided ID
7. DELETE /api/posts/comment/:post_id/:comment_id - To Delete Comment

# Setup Guide

To setup the project please follow these guidelines

1. Make sure that you have nodejs and npm installed in your system.
2. Run command 'npm install' in the project root directory to install all the dependencies from the package.json file.
3. Create a file .env in the project root directory and add these environments MONGO_URI, and PORT.
4. Place the MongoDB connection string in the MONGO_URI. You can refer to https://mlab.com/ which i have used.
5. PORT is the port on which you want to run the server. If this is not provided then application will run on default port 5000.
6. After setting up the .env file run 'npm run server' or 'npm start' in the root to run the nodemon server or normal server respectively.
7. Refer to this Postman collection for testing the endpoints https://www.getpostman.com/collections/58ec5bcf6df262bce2c7

Don't forget to Star and Fork the repository.

Have fun!


