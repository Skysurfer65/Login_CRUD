
//User class
class User{
    //Constructor   
    constructor( userID, password, admin){
        this.userID = userID;
        this.password = password;
        this.admin = admin;
        //Variable to check login attempts
        this.nrOfAttempts = 0;          
        }

    //Class Methods
    validateUserID() {
        let letter = false, number = false;
        let specialCharacters = " !#$%&'()*+,-./:;<=>?@[]^_`{|}";
        let numbers = "1234567890";
        
        //Check if userID empty
        if (this.userID == null) return false;
        if (this.userID.isEmpty) return false;
        //Check length of userID
        if (this.userID.length < 4 || this.userID.length > 30) return false;
        //No checks for admin will be checked when update in admin.js
        if (this.userID.toLocaleLowerCase() === adminID.toLocaleLowerCase()){ 
            this.admin = "YES";
            return true;
        } else this.admin = "NO";
        //Check for no empty space or special char, at least one letter and one number
        for (let i = 0; i < this.userID.length; i++) {
            if (specialCharacters.indexOf(this.userID[i]) > -1) return false;
            else if (numbers.indexOf(this.userID[i]) > -1) number = true;
            else letter = true;         
        }
        //returns true if only letters and numbers
        return (letter && number);
    }

    validatePassword(){
        let specialChar = false, number = false, letter = false, upperCase = false;
        let specialCharacters = "!#$%&'()*+,-./:;<=>?@[]^_`{|}";
        let emptySpace = " ";
        let numbers = "1234567890";
        let capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
            
        //Check if password is empty
        if (this.password == null) return false;
        if (this.password.isEmpty) return false;
        //Check size, at least 4 characters and a maximum om 16 characters
        if (this.password.length < 4 || this.password.length > 16) return false;
        
        //Check for no empty space but at least one letter, one number and one special character
        for (let i = 0; i < this.password.length; i++) {
            if (emptySpace.indexOf(this.password[i]) > -1) return false;
            else if (specialCharacters.indexOf(this.password[i]) > -1) specialChar = true;
            else if (numbers.indexOf(this.password[i]) > -1) number = true;
            else if (capitalLetters.indexOf(this.password[i]) > -1) upperCase = true;
            else letter = true;
        }  
        //returns true if all the criteria is there
        return (specialChar && number && upperCase && letter);
    }

    checkUserInDB(){
        for (let i = 0; i < users.length; i++){
            //UserID not case sensitive
            if (users[i].userID.toLocaleLowerCase() === this.userID.toLocaleLowerCase()) return true;
        }
        return false;
    }

    checkPassword(){
        for (let i = 0; i < users.length; i++){
            //Check password to correct userID, not case sensitive
            if (users[i].userID.toLocaleUpperCase() === this.userID.toLocaleUpperCase()){
                //Password is case sensitive
                if (users[i].password === this.password) return true;
                //If not correct pass set nrOfAttempts and check
                else {
                    users[i].nrOfAttempts += 1;
                    if (users[i].nrOfAttempts == 3){
                        //Delete user from user array
                        users.splice(i, 1);
                        //Update database
                        let myLoginDB = JSON.stringify(users);
                        localStorage.setItem("myLoginDB", myLoginDB); 
                        //Warning message
                        alert(errors(4));
                    } else alert(errors(3)); //Error wrong password
                }
            }
        }
        return false;
    }

    addUserToUsers(){
        users.push(new User(this.userID, this.password, this.admin));
        //Save users to local storage
        let myLoginDB = JSON.stringify(users);
        localStorage.setItem("myLoginDB", myLoginDB); //Stored in browser local storage "kolla i utvecklarverktyg"
    }      
}        