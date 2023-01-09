// gruppe-391.developerakademie.net/smallest_backend_ever/nocors.php
// setURL('https://developerakademie.net/smallest_backend_ever');

/***    Variable    ***/

/***    Array       ***/
let usersArray = [];
let activeUser = [];
let activeUserContacts = [];

/***    Functions   ***/
async function startPage() {
  await loadUsersFromBackend();
  await ifSomethingLocal();
}

async function init() {
  getLocalActiveUser();
  await includeHTML();
  await showSelectedLink();
  await loadUsersFromBackend();
  await loadUserContactsFromBackend();
  await loadUserTasksFromBackend();
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes all code that is wrapped in the <div> with the specified attribute"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

// Local Storage & Active user
async function saveLocalActiveUser(activeUser) {
  let stringStorage = JSON.stringify(activeUser);
  localStorage.setItem("activeUser", stringStorage);
  // await saveActiveUserInBackend(activeUser);
}

function getLocalActiveUser() {
  let stringStorage = localStorage.getItem("activeUser");
  activeUser = JSON.parse(stringStorage);
}

async function ifSomethingLocal() {
  if (localStorage.getItem("activeUser") !== null) {
    getLocalActiveUser();
    let logIn = await checkIfQuickAcces();
    if (logIn === true) {
      logInActiveUser();
    }
  }
}

async function checkIfQuickAcces() {
  goLogIn = activeUser["quickAcces"];
  return goLogIn;
}

//////////////// Backend functions /////////////
async function loadUsersFromBackend() {
  await downloadFromServer();
  usersArray = JSON.parse(backend.getItem("usersArray")) || [];
}

async function saveInBackend() {
  await backend.setItem("usersArray", JSON.stringify(usersArray));
}




//// BACKEND SaveActiveUser
async function saveActiveUserInBackend() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_active`, JSON.stringify(activeUser));
}

async function loadActiveUserInBackend() {
  activeUserTasks = `${activeUser["userEmail"]}_task`;
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem(activeUserTasks)) || [];
}

async function deleteActiveUserInBackend() {
  await backend.deleteItem(`${activeUserEmail}_active`);
  activeUser = [];
  console.log("Deleted active user in Backend: ", activeUserEmail);
}



///////// Backend Contacts
async function saveInBackendUserContacts() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}`, JSON.stringify(activeUserContacts));
}

async function loadUserContactsFromBackend() {
  activeUserEmail = activeUser["userEmail"];
  await downloadFromServer();
  activeUserContacts = JSON.parse(backend.getItem(`${activeUserEmail}`)) || [];
}

function deleteUserContacts() {
  document.getElementById("delete-contact-button").classList.add("d-none");
  document.getElementById("delete-contact-button-alert").classList.remove("d-none");
}

function abortDeleteContacts() {
  document.getElementById("delete-contact-button").classList.remove("d-none");
  document.getElementById("delete-contact-button-alert").classList.add("d-none");
}

async function executeDeleteContacts() {
  document.getElementById("delete-contact-button-alert").classList.add("d-none");

  await backend.deleteItem(`${activeUserEmail}`);
  activeUserContacts = [];
  document.getElementById("contact-list").innerHTML = "";
  document.getElementById("contact-detail").innerHTML = "";
  console.log("Deleted all contacts of: ", activeUserEmail);
}

//// BACKEND Tasks
async function saveInBackendUserTasks() {
  activeUserEmail = activeUser["userEmail"];
  await backend.setItem(`${activeUserEmail}_task`, JSON.stringify(tasks));
}

async function loadUserTasksFromBackend() {
  activeUserTasks = `${activeUser["userEmail"]}_task`;
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem(activeUserTasks)) || [];
}

// diese Variante nur nehmen, wenn jeder Task einzeiln im Backend gespeichert werden soll
// async function saveInBackendUserTasks(index) {
//   activeUserEmail = activeUser["userEmail"];
//   await backend.setItem(`${activeUserEmail}_task${index}`, JSON.stringify(tasks));
// }

/***    Log In  &  Log Out  ***/

async function logInUser() {
  let emailUser = document.getElementById("email").value;
  let passwordUser = document.getElementById("password").value;
  validatedInput(emailUser, passwordUser);
  let acces = await checkIfExists(emailUser, passwordUser);
  goToSummary(acces);
  emailUser.value = "";
  passwordUser = "";
}

async function logOut() {
  activeUser["quickAcces"] = false;
  await saveLocalActiveUser(activeUser);
  await deleteActiveUserInBackend();
  toLogInPage();
}
