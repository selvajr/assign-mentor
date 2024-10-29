# GUVI - DAY 39

## WEB DEVELOPER TASK.

### How to run the project on your machine:

1. clone the repository to your local machine.

```
git clone
```

2. To install all the dependencies:

```
npm i express
npm i nodemon --save-dev
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
npm i express
```

2. nodemon

```
npm i nodemon --save-dev
```

### Setup.

1. Run the following command to create a new project.

```
    npm init -y
    npm i express
    npm i nodemon --save-dev
```

2. We create a javascript file named `index.js` which is the root of the project.

3. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

# API endpoints

## 1) create Mentor

POST Method
endpoint:/mentors

## 2) create Student

POST Method
endpoint:/students

## 3) Assign a student to Mentor

### a) Select one mentor and Add multiple Student

PUT Method
endpoint:/mentors/add/:id

### b) A student who has a mentor should not be shown in List

GET Method
endpoint:/students/unAssigned

## 4) Select One Student and Assign one Mentor

PUT Method
endpoint:/students/change/:id

## 5) Show all students for a particular mentor

GET Method
endpoint:/mentors/students/:id

## 6) Show the previously assigned mentor for a particular student.

GET Method
endpoint:/students/previousMentors/:id

# Deployed URL

https://assign-mentor-cpme.onrender.com/

# POSTMAN DOCUMENT URL

https://documenter.getpostman.com/view/34880027/2sA3duFsnF
