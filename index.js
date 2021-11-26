/**
************************************** 
* Login program with JSON Database
* Richard Fehling, MVT21 EC Utbildning
************************************** 
*/
//Array for users
let users = [];
//Admin user ID to be updated
let adminID = "";
//Boolean for create account
let accountCreation = false;

//Buttons
//Variable for help button
let helpTxt = document.getElementById("help");

//Variable for button createOrLogin
let createOrLogin = document.getElementById("createOrLogin");

//Reset text if mouseclick in field
let clearTextID = document.getElementById("userID");
let clearTextPass = document.getElementById("password");

//Variable for reset button
let reset = document.getElementById("reset");

//Variable for actionbutton
let actionButton = document.getElementById("actionButton");

//Variable for header text
let header = document.getElementById("header");

//Variable for form
let form = document.getElementById("login");

//Outputs text
let output1 = document.getElementById("output1");
let output2 = document.getElementById("output2");

//Button functions
helpTxt.onclick = help;
createOrLogin.onclick = createAccount;
reset.onclick = resetSuccess;
clearTextID.onclick = resetSuccess;
clearTextPass.onclick = resetSuccess;
actionButton.onclick = login;

//Put prerequsites info on page
resetSuccess();
//Check if database is available
setUpDB();
//Setup admin user ID
setUpAdmin();    

//Functions
function setUpDB(){
    if (localStorage.getItem("myLoginDB") !== null) {
        let textDB = localStorage.getItem("myLoginDB");
        users = JSON.parse(textDB);
        }
}

function setUpAdmin(){
    if (localStorage.getItem("newAdminID") === null) {
        adminID = "admin";
        } else {
            adminID = localStorage.getItem("newAdminID");
        }
}

function login() {
    //Make object of User        
    let user = new User(form.userID.value.trim(), form.password.value.trim());

    if (accountCreation){
        if (!user.checkUserInDB() && user.validateUserID() && user.validatePassword()){
            //Add to user ArrayList
            user.addUserToUsers();
            output1.innerHTML = "Login credentials<br>succesfully created!";
        } else alert(errors(1));

    } else {
        if (user.checkUserInDB()){
            //Check password
            if (user.checkPassword()){
                //If you're admin
                if (user.userID === adminID){
                    pageRedirect();
                }
                output1.innerHTML = "CORRECT<br>You're logged in";
                output2.innerHTML = "Reset to remove this message";
            } 
        } else alert(errors(2));                
    }
}

function createAccount(){
    accountCreation = true;
    //Change GUI
    header.innerHTML = "Create Account";
    actionButton.value = "CREATE";
    createOrLogin.value = "Go To Login";
    createOrLogin.onclick = goToLogin;
}

function goToLogin(){
    accountCreation = false;
    //Change GUI
    resetSuccess();
    header.innerHTML = "Login";
    actionButton.value = "Login";
    createOrLogin.value = "Create Account";
    createOrLogin.onclick = createAccount;
}

function help() {
   alert(errors(6)); 
}

function resetSuccess(){
    output1.innerHTML = "";
    output2.innerHTML = errors(5);
}

function pageRedirect() {
    window.location.replace("admin.html");
}
//for test
function returnTestStr(){
    return "TESTING";
}  

function errors(x){
    let text = "";
    switch (x){
        case 1:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= "                                  ERROR                             \n";
            text+= " Prerequisites:                                                     \n";
            text+= " User ID has to be unique and consist of minimum 4 characters, max 30.\n";
            text+= " Only letters  and numbers and at least one of each, user ID is not \n";
            text+= " case sensitive, no empty spaces are allowed.                       \n";
            text+= "                                                                    \n";
            text+= " Password has to have a minimum of 4 characters and consist of at   \n";
            text+= " least one letter, one number and one special character. Passwords  \n";
            text+= " are case sensitive and need to consist of both upper and lower     \n";
            text+= " case letters. Maximum 16 characters.                               \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";   
            break;
        case 2:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= "                                 ERROR                              \n";
            text+= " User ID not in database, check your typing or                      \n";
            text+= " create new account.                                                \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"; 
            break;
        case 3:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= "                                 ERROR                              \n";
            text+= " Password not in database, check your typing, you have              \n";
            text+= " three attempts.                                                    \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            break;
        case 4:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= "                                WARNING                             \n";
            text+= " You have tried to reach this userID three times with invalid       \n";
            text+= " password, this user vill be deleted. You may create new user.      \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"; 
            break;
        case 5:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br>";     
            text+= " <h3>Prerequisites:</h3><br>";
            text+= " User ID has to be unique and consist of minimum 4 characters, max 30.<br>";
            text+= " Only letters  and numbers and at least one of each, user ID is not <br>";
            text+= " case sensitive, no empty spaces are allowed.                       <br>";
            text+= "                                                                    <br>";
            text+= " Password has to have a minimum of 4 characters and consist of at   <br>";
            text+= " least one letter, one number and one special character. Passwords  <br>";
            text+= " are case sensitive and need to consist of both upper and lower     <br>";
            text+= " case letters. Maximum 16 characters.                               <br>";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br>"; 
            break;
        case 6:
            text = "                                           HOW-TO\n";
            text+= " !!! You cannot login without first creating an account !!!\n";
            text+= " To create an account:\n";
            text+= " Click on \"Create Account\" \n";
            text+= " write User ID and Password according to prerequisites and click \"CREATE\"\n";
            text+= " Click on \"Go To Login\" and test your login, create a bunch of logins!\n";
            text+= "                                                                    \n";
            text+= " Create an Admin account to be able to perform CRUD operations:     \n";
            text+= " Create account with \"admin\" as User ID. Admin as User ID can be\n";
            text+= " changed with CRUD operations after login as admin on \"Admin page\"\n";
            text+= " Database is visual as JSON in browser dev tool as \"myLoginDB\" in \n";
            text+= " Local storage.";  
            break;
    }
    return text;
}
//Functions to be used with Selenium
function getUsers(){
    getUsersStr = JSON.stringify(users, null, 1);
    return getUsersStr;
}