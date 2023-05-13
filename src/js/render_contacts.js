/*// HTML RENDERING & ANIMATION ////////////////////////////////*/
/**
 * function opens contact Detail Modal and calls the necessary functions to render details and HTML
 * @param {integer} index
 */
function openContactDetail(index) {
  setTimeout(() => document.getElementById("contact-detail").classList.remove("slide-in"), 20);
  const content = document.getElementById("contact-detail");
  const { email, initials, initialsColor, name, phone } = getContactDetails(index);
  content.innerHTML = `
    ${generateContactDetail(index, name, initials, initialsColor, email, phone)}
  `;
  setTimeout(() => document.getElementById("contact-detail").classList.add("slide-in"), 200);
}

/**
 * function adds style to initiate slide-in CSS animation
 */
function slideOut() {
  document.getElementById("contact-detail").classList.remove("slide-in");
}


/**
 *
 * @param {integer} i
 * @param {string} firstLetters
 * @returns function renders initials
 */
function renderRegistery(i, firstLetters) {
  if (firstLetters[i] == priorLetter) {
    return;
  } else {
    document.getElementById("contact-list").innerHTML += `
    <div class="contact-registery">${firstLetters[i]}
    `;
    priorLetter = firstLetters[i];
  }
}

/**
 * function opens AddContactDialog Modal
 */
function openAddContactDialog() {
  clearContent();

  setTimeout(() => {
    document.getElementById("add-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes prior opend dialog
 */
function closeAddContactDialog() {
  clearContent();
  document.getElementById("add-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay").classList.add("d-none");
  }, 200);
}

/**
 * function clears form values and css classes
 */
function clearContent() {
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("info-text").classList.remove("info-text-alert");
  document.getElementById("info-text").classList.add("info-text");
  document.getElementById("info-text").innerHTML = "Tasks are better with a team!";
  document.getElementById("new-contact-name").value = "";
  document.getElementById("new-contact-email").value = "";
  document.getElementById("new-contact-phone").value = "";
  document.getElementById("new-contact-email").style.color = "black";
}

/**
 * function clears form values and css classes
 */
function clearEditContent() {
  document.getElementById("edit-contact-name").value = "";
  document.getElementById("edit-contact-email").value = "";
  document.getElementById("edit-contact-phone").value = "";
}

/**
 * function opens Edit Contact Dialog
 * @param {integer} index
 */
function openEditContactDialog(index) {
  document.getElementById("overlay2").classList.remove("d-none");
  let contact = getContactDetails(index);
  let { email, initials, initialsColor, name, phone } = contact;
  let content = document.getElementById("edit-contact-modal");
  content.innerHTML = generateContactEditDialog(index);
  document.getElementById("user-avatar").textContent = `${initials}`;
  document.getElementById("user-avatar").style = `background-color:${initialsColor}`;
  document.getElementById("edit-contact-name").value = `${name}`;
  document.getElementById("edit-contact-email").value = `${email}`;
  document.getElementById("edit-contact-phone").value = `${phone}`;
  animateEditDialog();
}

/**
 * function runs animation
 */
function animateEditDialog() {
  setTimeout(() => {
    document.getElementById("edit-contact-modal").classList.add("slide-in");
  }, 10);
}

/**
 * function closes Edit Contact Dialog
 */
function closeEditContactDialog() {
  document.getElementById("edit-contact-modal").classList.remove("slide-in");

  setTimeout(() => {
    document.getElementById("overlay2").classList.add("d-none");
  }, 200);
}

/**
 * function renders the contact edit dialog modal
 * @param {integer} index
 * @returns HTML code
 */
function generateContactEditDialog(index) {
  return `
  <div class="contact-dialog-top">
                    <img class="close-icon" src="../img/close_icon.png" onclick="closeEditContactDialog()">
                    <img src="../img/join-logo.png">
                    <h2 class="contact-title" id="exampleModalLabel">Edit contact</h2>
  
                    <h4 id="info-text" class="info-text">Tasks are better with a team!</h4>
  
                </div>
                <div class="contact-dialog-bottom">

                    <div class="user-avatar" id="user-avatar"></div>
                    
                    <div class="form">
                        <form class="add-contact_form" onsubmit="updateUserContact(${index}); return false;">
                            <div class="add-contact-input-field">
                                <input id="edit-contact-name" class="contact-form-control contacts_input" type="text"
                                    placeholder="Name" required>
                                <img src="../img/input_name.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-email" class="contact-form-control contacts_input " type="email"
                                    placeholder="Email" required>
                                <img src="../img/input_mail.png" alt="">
                            </div>
                            <div class="add-contact-input-field">
                                <input id="edit-contact-phone" class="contact-form-control contacts_input " type="number"
                                    pattern="" placeholder="Phone" required>
                                <img src="../img/phone_icon.png" alt="">
                            </div>
                            <div class="edit-contact-buttons">
                            <button type="submit" class="edit-contact-button" required>
                                <span>Save</span><img src="../img/addcontact.png">
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                `;
}

/**
 * function renders the contact details
 * @param {integer} index
 * @param {string} name
 * @param {string} initials
 * @param {string} initialsColor
 * @param {string} email
 * @param {string} phone
 * @returns HTML code
 */
function generateContactDetail(index, name, initials, initialsColor, email, phone) {
  return `
    <div onclick="slideOut()" class="contact-detail-mobile" id="contact-detail-mobile"><img src="../img/arrow_forward.png" alt=""></div>
    <span class="span-display-none">Kanban Project Management Tool</span>
    <div class="contact-detail-header">
    <div class="letters-large" style="background-color: ${initialsColor}">${initials}
    </div>
    <div>
        <div class="contact-detail-header-right">
            <div class="contact-name">${name}</div>
            <div onclick ="toAddTask()"class="add-task-link"><img src="../img/plus_icon_small.png">Add Task</div>
        </div>
  
    </div>
    </div> 
  
  <div class="contact-body">
  
    <div class="contact-body-header">
        <div class="contact-information">Contact Information</div>
        <div class="edit-contact" onclick="openEditContactDialog(${index})"><img  onclick="openEditContactDialog()"src="../img/pencil_small.png">Edit Contact</div>
    </div>
    <div>
    <button class="delete-contact-button" onclick="deleteContact(${index})">
    <span>Delete</span><img src="../img/close_icon.png">
</button>
</div>
    <div class="contact-detail-bold">Email</div>
    <a class="contact-detail-medium" href="mailto:${email}">${email}</a>
    <div class="contact-detail-bold">Phone</div>
    <a class="contact-detail-medium" href="tel:${phone}">${phone}</a>
    <div class="edit-contact-responsive" onclick="openEditContactDialog(${index})"><img  src="../img/edit_contact_responsive_icon.png"></div>
    </div>
  </div>
        `;
}

/**
 * function gets arry activeUserContacts and renders drop-down in Add-Task Dialog
 */
function renderContactsInDropDown() {
  let content = document.getElementById("collapseContacts");
  content.innerHTML = "";

  if (content.innerHTML.length === 0) {
    content.innerHTML += `

    <div class="dropdown-contact" onclick="inviteContact('contact-dropdown-edit', 'contact-input-area-edit', 'contact-input-edit')" role="button" data-bs-toggle="collapse"
    data-bs-target="#collapseContactsEdit" aria-expanded="false" aria-controls="collapseContactsEdit" id="contact-dropdown-edit">
        <label for="">Invite new contact</label>
        <img src="../img/new-contact-icon.png" alt="">
    </div>
`;
  }
  fillActiveUserContacts(content);
}


/**
 * Fills the given HTML element with checkbox inputs for the active user's contacts.
 * @param {HTMLElement} content - The HTML element to fill with contacts.
 */
function fillActiveUserContacts(content) {
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
  }
}


/**
 * Adds a new contact input field to the task creation form.
 */
function inviteContact() {
  let content = document.getElementById("collapseContacts");
  let emailInputId = `new-contact-${counter}`;
  content.innerHTML += `
    <div class="dropdown-contact" id="inviteContact${counter}">
      <div class="inviteContact">
        <input type="email" name="email" id="${emailInputId}" class="form-control logIn__input" placeholder="Enter email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
        <div class="inviteContactClickables">
          <img onclick="deleteAddContactBtn(${counter})" class="cursor-pointer" src="../img/cancel-subtask.png" alt="">
          <img onclick="renderNewContact(${counter})" class="cursor-pointer" src="../img/check-subtask.png" alt="">
        </div>
      </div>
    </div>`;
  counter++;

  addEmailValidation(emailInputId);
}

/**
 * Adds validation to the email input field.
 * @param {string} inputId - The ID of the input element to be validated.
 */
function addEmailValidation(inputId) {
  // Add event listener to the form
  const form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    const emailInput = document.getElementById(inputId);
    if (!emailInput.checkValidity()) {
      // Add red border to the input element
      emailInput.classList.add('invalid-email');
      // Prevent the form from submitting
      event.preventDefault();
    }
  });
}

/**
 * Deletes a contact input field from the task creation form.
 * @param {number} counter - The counter value used to identify the row to be deleted.
 */
function deleteAddContactBtn(counter) {
  let rowToDelete = document.getElementById(`inviteContact${counter}`);
  rowToDelete.remove();
}

/**
 * Renders a new contact to the assigned contacts list.
 * @param {number} id - The id of the new contact element.
 */
function renderNewContact(id) {
  const input = document.getElementById(`new-contact-${id}`);
  const email = input.value;
  if (email && input.checkValidity()) {
    let content = document.getElementById("collapseContacts");
    content.innerHTML += `
      <div class="dropdown-contact">
        <label for="${email}">${email}</label>
        <input type="checkbox" id="${email}" name="assign-contacts" value="${email}">
      </div>
    `;
    input.classList.remove("invalid-email");
  } else {
    input.classList.add("invalid-email");
  }
}

/**
 * function calls helper functions to render all contacts in a list
 */
function renderContactListFromContacts() {
  sortActiveUserContacts();
  let firstLetters = activeUserContacts.map((item) => item.initials[0]);

  let content = document.getElementById("contact-list");
  content.innerHTML = " ";

  for (let i = 0; i < activeUserContacts.length; i++) {
    renderRegistery(i, firstLetters);
    content.innerHTML += `
        <div class="contact-box" onclick="openContactDetail(${i})">
        <div class="letters" style="background-color: ${activeUserContacts[i]["initialsColor"]}">${activeUserContacts[i]["initials"]}</div>
        <div class="word-break">
        <div>${activeUserContacts[i]["name"]}</div>
        <div>${activeUserContacts[i]["email"]}</div>
        <div>${activeUserContacts[i]["phone"]}</div>
        </div>
        </div>
        `;
  }
}

/**
 * Renders the list of contacts for the active user.
 * @param {Array} activeUserContacts - An array of objects representing the contacts of the active user.
 */
function renderContactList(activeUserContacts) {
  let content = document.getElementById("contact-list");
  content.innerHTML = "";

  if (activeUserContacts && activeUserContacts.length > 0) {
    for (let i = 0; i < activeUserContacts.length; i++) {
      let name = activeUserContacts[i]["name"];
      content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
      </div>`;
    }
  } else {
    content.innerHTML = "<p>No contacts found.</p>";
  }
}


/**
 * Adds a new contact to the contact list.
 * @param {string} email - The email of the new contact.
 */
function addNewContactToList(email) {
  let content = document.getElementById("contact-list");
  content.innerHTML += `
      <div class="dropdown-contact">
        <label for="${email}">${email}</label>
        <input type="checkbox" id="${email}" name="assign-contacts" value="${email}">
      </div>
    `;
}

/**
 * Renders a new contact input field to the task creation form.
 * @param {number} id - The id of the new contact.
 */
function renderNewContact(id) {
  const input = document.getElementById(`new-contact-${id}`);
  const email = input.value;
  if (email && input.checkValidity()) {
    addNewContactToList(email);
    input.classList.remove("invalid-email");
  } else {
    input.classList.add("invalid-email");
  }
}


/**
 * function renders all active user contacs into Contacts Edit DropDown
 * @param {integer} taskID
 */
function renderContactsInEditDropDown(taskID) {
  content = document.getElementById("collapseContactsEdit");
  content.innerHTML = " ";
  for (let i = 0; i < activeUserContacts.length; i++) {
    let name = activeUserContacts[i]["name"];
    if (assignedToContactTrue(taskID, name)) {
      content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" checked="checked" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
    } else {
      content.innerHTML += `
        <div class="dropdown-contact">
        <label for="${name}">${name}</label>
        <input type="checkbox" id="${name}" name="assign-contacts" value="${name}">
    </div>`;
    }
  }
}

/**
 * function searches task to derive contact names that are assign to task
 * @param {integer} taskID
 * @param {string} name
 * @returns
 */
function assignedToContactTrue(taskID, name) {
  let checkedNames = [];
  for (let i = 0; i < tasks[taskID]["assignedTo"].length; i++) {
    checkedNames.push(tasks[taskID]["assignedTo"][i]);
  }
  if (checkedNames.includes(name)) {
    return true;
  } else {
    return false;
  }
}