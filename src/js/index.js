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

//DOM variables
let helpTxt = document.getElementById("help");
let createOrLogin = document.getElementById("createOrLogin");
let reset = document.getElementById("reset");
let actionButton = document.getElementById("actionButton");
let header = document.getElementById("header");
let form = document.getElementById("login");

//Clear text
let clearTextID = document.getElementById("userID");
let clearTextPass = document.getElementById("password");

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
                if (user.userID.toLocaleLowerCase() === adminID.toLocaleLowerCase()){
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
// function returnTestStr(){
//     return "TESTING";
// }  

//Functions to be used with Selenium
function getUsers(){
    getUsersStr = JSON.stringify(users, null, 1);
    return getUsersStr;
}