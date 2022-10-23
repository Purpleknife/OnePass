# OnePass 🔐

OnePass is an app that helps you generate and manage passwords securely.

This project's goals were:
- Learn how to `salt` passwords.
- Learn how to store passwords securely.
- Learn how to implement secure Login and Register.
- Experiment with JWT and use the token generated to persist data.
- Develop my skills in React (React Router, React Cookie, etc).
- Learn how to persist data with React even after refreshing the page.

## How it works

- A non-logged-in user can generate passwords.
- To store their passwords and login info (email), the user needs to register or login.
- After logging in, they can save their login info for a specific website: the password they generated + email used, and give them a title.

## Features
- `Generate random passwords`: The user can choose how they want their password to be → length (needs to be at least 1 or it will throw an error), lowercase, uppercase, numbers or symbols.
- `Default`: If they don't specify any options, the default is a random password with all 4 options.
- `Manage and store passwords`: A user can login or register to save their generated passwords.
- `Secure Login and Register`: The passwords are hashed before getting stored in the database.
- `Save login info (password and email)`: When a user saves a password, they can give it a title, Facebook for example, and they can also save the email they used to login on Facebook.
- `Delete saved login info`: A user can delete a saved password and email.

## Setup
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the `.env` file with your correct local information (username, password, database, port), plus your secret token for JWT.
3. Install dependencies: `npm i` in both `front-end` and `back-end` folders.
4. Reset database: `npm run db:reset`
5. `cd back-end` then `npm start` to run the Server in port 8080, and `cd front-end` to run the App in port 3000.

## Final Product

![op-landing-page](https://user-images.githubusercontent.com/107894342/197368630-2bf00a22-ca4a-48d3-98f6-8820387ca664.png)
![op-dashboard](https://user-images.githubusercontent.com/107894342/197368633-b34ca842-d493-4bf1-bb44-7cc8999f467b.png)

### App Overview:
https://user-images.githubusercontent.com/107894342/197369341-048c8f4c-11da-48e8-b1fc-858e7650e2c7.mp4

### Error handling for Login, Register and password's length:
https://user-images.githubusercontent.com/107894342/197369516-0aef639b-2cc4-4ced-bcf7-35a3a3c5549e.mp4


## Dependencies
- Back-end:
  - express
  - Node JS
  - bcryptjs
  - dotenv
  - jsonwebtoken
  - method-override
  - morgan
  - pg
  - nodemon

- Front-end
  - React
  - React-Router
  - React-Cookie
  - React-Bootstrap
  - SASS
  - bcryptjs
  - axios
