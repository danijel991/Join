/***    Array       ***/
let usersArray = [];      // Array that holds the user list from the backend;
let activeUser = [];      // Array that holds the actiov user info;
let activeUserContacts = [];  // Array that holds the contacts of the active user;

/***    Functions   ***/

/**
 * After openning the page, calls the functions that animate the logo;
 * 
 */
async function logoAnimation() {
  transitionLogo();
  setTimeout(changeBg, 350);
  setTimeout(showCardAndHeader, 400);
  await loadUsersFromBackend();
  logInByQuickAcces();
}


/**
 * After "Log In", the function is collectiong a serial if data throw the corresponding functions
 */
async function init() {
  await includeHTML();
  await loadUsersFromBackend();
  await getActiveUser();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
  await loadCategoriesTasksFromBackend();
  getHighlight();
}


/**
 * The function provides the HTML Template.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute".
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


// Local Storage & Active user.
/**
 * The functions does save the active user in local storage.
 * 
 * @param {object} activeUser - The object contains the informations of the active user.
 */
async function saveLocalActiveUser(activeUser) {
  let stringStorage = await JSON.stringify(activeUser);
  localStorage.setItem("activeUser", stringStorage);
}


/**
 * The functions is deleting the active user in local storage.
 * 
 * @param {array} activeUser - The object contains the informations of the active user.
 */
async function deleteLocalActiveUser(activeUser) {
  window.localStorage.clear();
  activeUser = [];
}


/**
 * The function is checking is the user was already register throw local storage.
 * If user was already registered, the data of active user are collected from the Local Storage, otherwise from the URL.
 */
async function getActiveUser() {
  if (localStorage.getItem("activeUser") !== null) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = await JSON.parse(stringStorage);
    activeUser.quickAcces = true;
  } else if (localStorage.getItem("activeUser") === null) {
    await setActiveUser(collectActiveUserFromURL())
    await saveLocalActiveUser(activeUser)
  }
}


/**
 * The functions is collecting the active user email from the UR.
 * 
 * @returns - the email of the active user.
 */
function collectActiveUserFromURL() {
  var params = new URLSearchParams(window.location.search);
  var first = params.get("first");
  var userEmail = JSON.parse(params.get("second"));
  return userEmail;
}


/**
 * The functions provides the info if the user is allowed to be saved in local storage
 * 
 * @returns - "True" or "False".
 */
async function checkIfQuickAcces() {
  goLogIn = activeUser["quickAcces"];
  return goLogIn;
}


//////////////// Backend functions /////////////
/**
 * The function is provideing the users data from the server.
 */
async function loadUsersFromBackend() {
  await downloadFromServer();
  usersArray = JSON.parse(backend.getItem("usersArray")) || [];
}


/**
 * The function is saveing the users data in server.
 */
async function saveInBackend() {
  await backend.setItem("usersArray", JSON.stringify(usersArray));
}


///////// Backend Contacts
/**
 * function saves all specific contacts of active user in Backend under the key 'activeUserEmail'
 */
async function saveInBackendUserContacts() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_contacts`, JSON.stringify(activeUserContacts));
}

/**
 * function loads all spedific contacts of active user from Backend
 */
async function loadUserContactsFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  activeUserContacts = JSON.parse(backend.getItem(`${activeUserEmail}_contacts`)) || [];
}

//// BACKEND Tasks
/**
 * function saves all tasks of active user in Backend under this key 'activeUserEmail_task'
 */
async function saveInBackendUserTasks() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_tasks`, JSON.stringify(tasks));
}

/**
 * function loads all active user tasks from Backend
 */
async function loadUserTasksFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem(`${activeUserEmail}_tasks`)) || [];
}




async function saveInBackendUserCategories() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_categories`, JSON.stringify(usercategories));
}

/**
 * function loads all active user tasks from Backend
 */
async function loadCategoriesTasksFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  usercategories = JSON.parse(backend.getItem(`${activeUserEmail}_categories`)) || [];
}

/***    Log In  &  Log Out  ***/
/**
 * The function does the procceses for the "Log In". 
 */
async function logInUser() {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;
  let acces = await checkIfExists(emailUser, passwordUser);
  await checkIfRmemberMe(emailUser);
  goToSummary(acces, emailUser); // goes to login-register.js line 154 to pass email with url
  emailUser.value = "";
  passwordUser = "";
}

/**
 * The function does log is the previous user, if "Remember me" was selected.
 */
async function logInByQuickAcces() {
  if (localStorage.getItem("activeUser")) {
    let stringStorage = localStorage.getItem("activeUser");
    activeUser = JSON.parse(stringStorage);
  }
  if (activeUser.quickAcces == true) {
    let acces = activeUser.quickAcces;
    let emailUser = activeUser.emailUser;
    goToSummary(acces, emailUser);
  }
}

/**
 * The function does the procceses for the "Log Out". 
 */
async function logOut() {
  activeUser.quickAcces = false;
  if (localStorage.getItem("activeUser") !== null) {
    await saveLocalActiveUser(activeUser);
  }
  toLogInPage();
}

/**
 * The funtion is checking if the user decided to be saved local.
 * 
 * @param {string} emailUser - Value coresponding to the email given by the user.
 */
async function checkIfRmemberMe(emailUser) {
  let checkbox = callCheckBox();
  if (checkbox == true) {
    await setActiveUser(emailUser);
    if (activeUser) {
      activeUser.quickAcces = true;
    }
    await saveLocalActiveUser(activeUser)
  } else if (checkbox = false) {
    await deleteLocalActiveUser(activeUser);
  }
} 
