# Full Stack Developer Challenge

## Folder structure

```
project
│   README.md
└───docs
│   │───er_diagram.mwb
│   │ 
│   └───screenshots
│   
└───src
    │───web-app
    │
    └───server-app
    
```

## server-app

server-app folder contain the source code of server application which was developed using node js, and mysql for database.

------

## web-app

Web app is the client application which was developed using reactJS.

With react Js below library also used in client app
* ```redux```
* ```redux-saga```
* And ```material-ui``` component library

------

## How to run

1. First thing first run ```npm install``` in both ```src/server-app/``` and ```src/web-app/``` folders.
2. Then initialize the DB.
* To initialize the DB you may need to create .env file inside ```src/server-app/``` folder and populate below values with user mysql server details.

```env
DB_NAME=emp_review
DB_HOST=localhost
DB_USER=user
DB_PASS=pass
DB_PORT=3306
```
* And then run ```npm run initApp``` command in same directory.
3. After that run ```npm start``` in same directory. Done ! now we have almost initialize and start our server app.
4. To run client app go to ```src/web-app/``` directory and run ```npm start```. Like wise you will be able to run the client app as well.
5. Use ```sam@email.com``` and ```123456``` as your user name and password to login very first time. :smiley:

------
## Areas which needs to enhance further
* Must need to enhance security of both client and server apps.
* It's better to integrate or implement proper log mechanism for server app.
* And more smoothness and attractivity of UI will add more value for the app.
* Validation of data manipulation could be enhanced more continent way for users.
* And it's mandatory to integrate and write unit testing.
* It will be good if it could be make the both application containerize to enhance deployment process. 

<br/><br/><br/>
# Original Readme
# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
