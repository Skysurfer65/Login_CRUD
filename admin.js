/**
* *************************************
* Login program with JSON Database
* Richard Fehling, MVT21 EC Utbildning
* *************************************
*/
//Database administation
//Page variables
let adminLocalDB = [];

//DOM objects
let dispDB = document.getElementById("displayDB");
let logOut = document.getElementById("logout");
let updEntry = document.getElementById("updateEntry");
let delEntry = document.getElementById("deleteEntry");
let delEverything = document.getElementById("deleteEverything");
let helpAdminTxt = document.getElementById("helpAdmin");

//For test
let testOutput = document.getElementById("testOutput");

//Retrieving data:
retrievingData();

//Button actions
dispDB.onclick = displayDB;
logOut.onclick = logout;
updEntry.onclick = updateEntry;
delEntry.onclick = deleteEntry;
delEverything.onclick = deleteEverything;
helpAdminTxt.onclick = helpAdmin;

//Functions
function retrievingData(){
    let textDB = localStorage.getItem("myLoginDB");
    adminLocalDB = JSON.parse(textDB);
}

function displayDB(){
    //Variables
    let counter = 0;
    let myTable = document.getElementById("tableDB");

    //Make static header
    let tr = document.createElement('TR');
    myTable.appendChild(tr);
    let th1 = document.createElement('TH');
    tr.appendChild(th1);
    th1.appendChild(document.createTextNode("Data ID"));       
    let th2 = document.createElement('TH');
    tr.appendChild(th2);
    th2.appendChild(document.createTextNode("*** User ID ***"));             
    let th3 = document.createElement('TH');
    tr.appendChild(th3);
    th3.appendChild(document.createTextNode("** Password **"));
    let th4 = document.createElement('TH');
    tr.appendChild(th4);
    th4.appendChild(document.createTextNode("** Admin **"));

    //Make dynamic table of data     
    adminLocalDB.forEach(user => {
        let tr = document.createElement('TR');
        myTable.appendChild(tr);
        let td1 = document.createElement('TD');
        tr.appendChild(td1);
        td1.appendChild(document.createTextNode(counter));       
        let td2 = document.createElement('TD');
        tr.appendChild(td2);
        td2.appendChild(document.createTextNode(user.userID));             
        let td3 = document.createElement('TD');
        tr.appendChild(td3);
        td3.appendChild(document.createTextNode(user.password));
        let td4 = document.createElement('TD');
        tr.appendChild(td4);
        td4.appendChild(document.createTextNode(user.admin));        
        counter++ 
    });
}

function helpAdmin(){
    alert(promptText(6));
}

function logout(){
    window.location.replace("index.html");
}

//Input integer
function promptIntInput(text){
    let input = parseInt(prompt(promptText(text)));
    return input;
}

//Input text
function promptTxtInput(text){
    let input = prompt(promptText(text));
    //Regex to remove spaces
    input = input.replace(/ /g, "");
    return input;    
}

function updateEntry(){
    let n = promptIntInput(1);
    if (n >= 0 && n < adminLocalDB.length){
        let inputTxt = promptTxtInput(3);
        let valid = false;
        //Update user ID, truncate input enough to write "user"
        if (inputTxt.toLowerCase().substring(0, 4) === "user"){
            do {
                var newUserID = promptTxtInput(4); //"var" selected to reach outside block
                //TODO använda class User metoder istället
                valid = validateUserID(newUserID);
                if (!valid) alert("!!! NOT A VALID SELECTION !!!");       
            } while (!valid);
            //If admin changes his/her user ID
            if (adminLocalDB[n].userID.toLocaleLowerCase() === "admin" ||
            adminLocalDB[n].userID.toLocaleLowerCase() === localStorage.getItem("newAdminID").toLocaleLowerCase()){
                //Set newAdminID in localstorage
                localStorage.setItem("newAdminID", newUserID);
            }
            //Save to adminLocalDB
            adminLocalDB[n].userID = newUserID;
            saveToDB(adminLocalDB);
        }

        //Update password, truncate input enough to write "pass"
        else if (inputTxt.toLowerCase().substring(0, 4) === "pass"){
            do {
                var newPassword = promptTxtInput(5); //"var" selected to reach outside block
                //TODO använda class User metoder istället 
                valid = validatePassword(newPassword);
                if (!valid) alert("!!! NOT A VALID SELECTION !!!");              
            } while (!valid);
            adminLocalDB[n].password = newPassword;
            saveToDB(adminLocalDB);           
        }
        else { 
            alert("!!! NOT A VALID SELECTION !!!")
        }
        
    } else {
        alert("!!! NOT A VALID SELECTION !!!")
    }

}

function deleteEntry(){
    let n = parseInt(prompt(promptText(2)));
    if (n >= 0 && n < adminLocalDB.length){
        //If admin wants to delete his/her entry
        if (adminLocalDB[n].userID === "admin" || adminLocalDB[n].userID === localStorage.getItem("newAdminID")){
            //Delete newAdminID in localstorage
            localStorage.removeItem("newAdminID");
        }
        adminLocalDB.splice(n, 1);
        saveToDB(adminLocalDB);
        //TODO kolla ta bort newAdminID
    } else {
        alert("!!! NOT A VALID SELECTION !!!")
    }
}

function deleteEverything(){
    //Confirmation
    if (confirm("!!! Are you shure to delete the whole list !!!")) {
        //Delete database
        localStorage.removeItem("myLoginDB");
        //Delete stored new admin User ID
        localStorage.removeItem("newAdminID");
      } //Else return to Admin page
}

function saveToDB(adminLocalDB){
    let myLoginDB = JSON.stringify(adminLocalDB);
    localStorage.setItem("myLoginDB", myLoginDB);
}

function validateUserID(newUserID){
    let letter = false, number = false;
    let specialCharacters = " !#$%&'()*+,-./:;<=>?@[]^_`{|}";
    let numbers = "1234567890";
    
    //Check if userID empty
    if (newUserID == null) return false;
    if (newUserID.isEmpty) return false;
    //Check length of userID
    if (newUserID.length < 4 || newUserID.length > 30) return false;
    //Check if userID already exists
    for (let i = 0; i < adminLocalDB.length; i++){
        //UserID not case sensitive
        if (adminLocalDB[i].userID.toLocaleLowerCase() === newUserID.toLocaleLowerCase()) return false;
    }
    
    //Check for no empty space or special char, at least one letter and one number
    for (let i = 0; i < newUserID.length; i++) {
        if (specialCharacters.indexOf(newUserID[i]) > -1) return false;
        else if (numbers.indexOf(newUserID[i]) > -1) number = true;
        else letter = true;         
    }
    //returns true if only letters and numbers
    return (letter && number);
}

function validatePassword(newPassword){
    let specialChar = false, number = false, letter = false, upperCase = false;
    let specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}";
    let emptySpace = " ";
    let numbers = "1234567890";
    let capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
        
    //Check if password is empty
    if (newPassword == null) return false;
    if (newPassword.isEmpty) return false;
    //Check size, at least 4 characters and a maximum om 16 characters
    if (newPassword.length < 4 || newPassword.length > 16) return false;
    
    //Check for no empty space but at least one letter, one number and one special character
    for (let i = 0; i < newPassword.length; i++) {
        if (emptySpace.indexOf(newPassword[i]) > -1) return false;
        else if (specialCharacters.indexOf(newPassword[i]) > -1) specialChar = true;
        else if (numbers.indexOf(newPassword[i]) > -1) number = true;
        else if (capitalLetters.indexOf(newPassword[i]) > -1) upperCase = true;
        else letter = true;
    }  
    //returns true if all the criteria is there
    return (specialChar && number && upperCase && letter);
}

function promptText(x){
    let text = "";
    switch (x){
        case 1:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= 'Which "Data ID" do you want to UPDATE?\n';
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
            break;
        case 2:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= 'Which "Data ID" do you want to DELETE?\n';
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";            
            break;
        case 3:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= 'Which key field do you want to update, "User ID" \nor "Password"?\n';
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";            
            break;
        case 4:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";     
            text+= " Prerequisites:                                                     \n";
            text+= " User ID has to be unique and consist of minimum 4 characters, max 30.\n";
            text+= " Only letters  and numbers and at least one of each, user ID is not \n";
            text+= " case sensitive, no empty spaces are allowed.                       \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
            break;
        case 5:
            text = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n";
            text+= " Prerequisites:                                                     \n";     
            text+= " Password has to have a minimum of 4 characters and consist of at   \n";
            text+= " least one letter, one number and one special character. Passwords  \n";
            text+= " are case sensitive and need to consist of both upper and lower     \n";
            text+= " case letters. Maximum 16 characters.                               \n";
            text+= "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";           
            break;
        case 6:
            text = "                                           HOW-TO\n";
            text+= " Admin as User ID can be changed with CRUD operations and is good\n";
            text+= " practice. The new admin User ID will follow standard User ID criteria.\n";
            text+= " Minimum 4 characters and max 30, atleast one letter and one number. \n";
            text+= " After a CRUD operation is done click on \"Display Current Database\"\n";
            text+= " to see changes. Database fields could be removed with browser update.\n";
            text+= " Database is visual as JSON in browser dev tool as \"myLoginDB\" in \n";
            text+= " Local storage. An updated admin User ID will be there as \"newAdminID\"\n";
            text+= " Tests could be viewed in browser console.";  
            break;
    }
    return text;
}

