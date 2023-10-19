// WHAT DO WE NEED ?

// sign up page html  ( if authenication  then to login page)
// login page  (if login then to main page )
// express server js file 
// main page file 


// const userSignUp = document.getElementById('signup-btn')
// const userLogin = document.getElementById('login-btn')

const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('htmls'))
const port =1234;

app.use(express.static('htmls'));  // Middleware to pass html files
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data



let userSignUp = false; 
let userLogin = false;

function ifUserAuthenticated(req,res,next){
    if(userSignUp){
        next();
    }else{
        res.status(403).send("You are not authenticated")
    }
}

function isUserLoggedIn(req,res,next){
    if(userLogin){
        next();
    }else{
        res.status(403).send("You are not logged in")
    }
}


app.post('/submit',(req,res)=>{
    userSignUp = true;
    userLogin = true;
    res.send("Form submitted successfully")
})


app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'/signup.html'))
})


app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname + '/loginpage.html'))
})


app.get('/main', ifUserAuthenticated,isUserLoggedIn, (req,res)=>{
    res.sendFile(path.join(__dirname, '/mainpage.html'))
})


app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})






// MY CODE LOGIC 
// MY APPROACH - so i created signup form and login form , whoever has matched the first name and last name in signup form it will go to login form that is using the middleware 
// and again same as above in the login form that who so ever has matched the name and last name it will go to the main page 
// so for that i retrive the data from the forms and started matching. 


// MY CODE 

// function ifUserAuthenticated(req,res,next){
//     if(userSignUp == true){
//         prompt("you can go to the login page ")
//         res.status(200).sendFile(path.join(__dirname + 'loginpage.html'))
//         next()
//     }else{
//         prompt("you cant go ahead because you are not authenticated ")
//         res.status(404).send("user does not have access")
//     }
// }

// function isUserLoggedIn(req,res,next){
//     if(userLogin == true){
//         prompt("you can go ahead to the main page")
//         res.status(200).sendFile(path.join(__dirname + 'mainpage.html'))
//         next()
//     }else{
//         prompt("you are not authorised to access the main page")
//         res.status(400).send("you cant login")
//     }
// }

// function mainPage(req, res) {
//     res.send('Welcome to the main page');
//   }
  

// app.post('/submit',(req,res)=>{
//     const firstName =req.body.firstName;
//     const lastName = req.body.lastName;

//     // Now you can use firstName and lastName as needed
//     console.log('Received data:', firstName, lastName);

//     res.send('Form submitted successfully.');
// })


// app.get('/',ifUserAuthenticated,isUserLoggedIn,mainPage,(req,res)=>{
//     res.sendFile(path.join(__dirname + 'mainpage.html'));
// })


