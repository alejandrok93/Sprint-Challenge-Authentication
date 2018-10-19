<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
   The HTTP protocol is stateless, which means that every request is terminated and the server does not keep a connection alive with regards to the client. Sessions are used to persist data across requests. These are helpful for maintaining a user logged in to access data and provide a good user experience.

2. What does bcrypt do to help us store passwords in a secure manner.
   Bcrypt is an NPM module that provides password hashing. The module allow us to hash a password before storing it in a database.

3. What does bcrypt do to slow down attackers?
   Bcrypt uses a function to hash a password that also takes in as parameter the number of rounds the hash will be ran to make it more difficult to brute force the password. Bcrypt provides an easy way to hash passwords and keep users more secure.

4. What are the three parts of the JSON Web Token?
   The three parts of the JSON web token (JWT) are: headers, payload, signature. The JWT seperates each part using a dot (.)
