COMP3123- Assignment 1 ( Backend API)
Author: Karen Amadi
Course: COMP3123

project overview:
This is a small, modular RESTful API built using Node.js, Express, and MongoDB for the COMP3123 course(backend Development). It manages 2 main resources : user Accounrs (for authentication) and Employee Records(CRUD operations). It follows modular Structure.
key features
. Database: MongoDB Atlas(via Mongoose)
. Database Name: comp3123_assignment1
. Validation: Uses express-validator for request data integrity.
. Security: Passwords are hashed using bcrypt before storage.
Technologies used:
Node.js- for runtime
Express.js-Web framework for routing & middleware
MongoDB + Mongoose – Database and ORM
bcryptjs – For password hashing
jsonwebtoken (JWT) – For authentication (optional)
express-validator – For validation
dotenv – To manage environment variables
 
 Validation& Error Handling:
 .Validation is handled using express-validator in the route definitions.
 .errors are processed through middleware/validateRequest.js

 Authentication:
 When a user logs in successfully, a JWT token is generated.
 this token is returned to the client.
 on further requests to protected routes, the toke, must be sent in the headers as : Authorization: Bearer <jwt_token>
The auth.js middleware verifies the token. if valid, the request proceeds; otherwise it return a 4011 unauthorized error.

Password hashing with bcrypt.
When a user signs up, their password is hashed using bcrypt.
const hashedPassword = await bcrypt.hash(password, 10);

The hashed version is stored in MongoDB
When logging in, the bcrypt compares the provided password with the hashed one using: 
const isMatch = await bcrypt.compare(password, user.password);
This ensures that even if the database is compromised, real passwords remain safe.

 Testing:
 Used postman to test all endpoints

