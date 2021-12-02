/**
**********************************************
* Unit test of class UIser
* @author Richard Fehling, MVT21 EC Utbildning
**********************************************
*/
//Setup class User dependency
const User = require("../src/js/classUser.js");

//Unittests of classUser.js
//*************************

describe('Checking validateUserID() in class User', () => {
  //Setup test arrays
  const goodUsers = ["bax1", "Bax2", "admin", "Admin", "Åäö20", "longUserID01234567890123456789"];
  const badUsers = ["", null, "axl", "richard", "adam1@", " baxen1#", "pat rik", "tooLongID0123456789012345678901"];
  //Variables
  let adminID;   
  
  test('Validate "admin" User ID', () => {
      let user = new User("admin", null, null);
      adminID = "admin";
      expect(user.validateUserID(adminID)).toBeTruthy();
    });

  test('Validate newAdminID User ID', () => {
        let user = new User("my1admin", null, null);
        adminID = "my1Admin";
        expect(user.validateUserID(adminID)).toBeTruthy();
      });

  test.each(goodUsers)('tested User ID (%s)', (userID) => {
    let user = new User(userID, null, null);
    adminID = "admin";
    expect(user.validateUserID(adminID)).toBeTruthy(); 
  });

  test.each(badUsers)('tested User ID (%s)', (userID) => {
    let user = new User(userID, null, null);
    adminID = "admin";
    expect(user.validateUserID(adminID)).toBeFalsy(); 
  });
});

describe('Checking validatePassword() in class User', () => {
  //Setup test arrays  
  const goodPasswords = ["Bax1#", "2aX#", "Bax3%", "40bAx?", "20Åäö&", "LongPass##012345"];
  const badPasswords = ["", null, "P1#", "password1#", "Pass#", " Password1#", "Pass word1#", "TooLongPass#34567"];

  test.each(goodPasswords)('tested password (%s)', (password) => {
    let user = new User(null, password, null);
    expect(user.validatePassword()).toBeTruthy(); 
  });
  
  test.each(badPasswords)('tested password (%s)', (password) => {
    let user = new User(null, password, null);
    expect(user.validatePassword()).toBeFalsy(); 
  });
});

describe('Checking checkUserInDB() in class User', () => {
  //Setup test arrays
  const goodUsers = ["bax1", "Bax2", "admin", "Admin", "Åäö20", "longUserID01234567890123456789"]; 
  const users = [];

  //Make a mock database
  goodUsers.forEach(userID => {
    let $user = new User(userID, null, null);
    users.push($user);  
  });

  test.each(users)('Check user ID (%s) in mockDB', (userID) => {
    expect(userID.checkUserInDB(users)).toBeTruthy(); 
  });
});

describe('Checking checkPassword() in class User', () => {
  //Setup test arrays
  const goodUsers = ["bax1", "Bax2", "admin", "Admin1", "Åäö20", "longUserID01234567890123456789"]; 
  const goodPasswords = ["Bax1#", "2aX#", "Bax3%", "40bAx?", "20Åäö&", "LongPass##012345"];
  const users = [];

  //Make a mock database
  goodUsers.forEach(userID => {
    let $user = new User(userID, null, null);
    users.push($user);  
  });
  for (let i = 0; i < users.length; i++){
    users[i].password = goodPasswords[i]
  };

  test.each(users)('Check password (%s) in mockDB', (password) => {
    expect(password.checkPassword(users)).toBeTruthy(); 
  });
});

