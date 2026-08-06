/**
 * @TODO get a reference to the Firebase Database object
 */
let database;

window.onload = function () {
  // Connect to the root of the Realtime Database
  database = firebase.database().ref();

  console.log("Connected to:", database);

  /**
   * @TODO add the addMessageToBoard function as an event
   * handler for the "child_added" event on the database
   * object
   */
  database.on("child_added", addMessageToBoard);
};

/**
 * @TODO get const references to the following elements:
 *      - div with id #all-messages
 *      - input with id #username
 *      - input with id #message
 *      - button with id #send-btn and the updateDB
 *        function as an onclick event handler
 */

const allMessages = document.getElementById("all-messages");

const usernameElem = document.getElementById("username");
const emailElem = document.getElementById("email");
const profileElem = document.getElementById("profile");
const messageElem = document.getElementById("message");

const sendBtn = document.getElementById("send-btn");

sendBtn.onclick = updateDB;

/**
 * @TODO create a function called updateDB which takes
 * one parameter, the event, that:
 *      - gets the values of the input elements and stores
 *        the data in a temporary object with the keys USERNAME
 *        and MESSAGE
 *      - console.logs the object above
 *      - writes this object to the database
 *      - resets the value of #message input element
 */

function updateDB(event) {
  // Prevent default refresh
  event.preventDefault();

  if (
    usernameElem.value.trim() === "" ||
    messageElem.value.trim() === ""
  ) {
    alert("Please enter a username and message.");
    return;
  }

  const current = new Date();

  const dateStr = current.toLocaleDateString();

  const timeStr = current.toLocaleTimeString();

  // Create data object
  const data = {
    USERNAME: usernameElem.value,
    EMAIL: emailElem.value,
    PROFILE: profileElem.value,
    MESSAGE: messageElem.value,
    DATE: dateStr,
    TIME: timeStr,
  };

  // console.log the object
  console.log(data);

  // GET *PUSH* PUT DELETE
  // Write to our database
  database.push(data);

  // Reset message
  messageElem.value = "";
}

/**
 * @TODO create a function called addMessageToBoard that
 * takes one parameter rowData which:
 *      - console.logs the data within rowData
 *      - creates a new HTML element for a single message
 *        containing the appropriate data
 *      - appends this HTML to the div with id
 *        #all-messages (we should have a reference already!)
 *
 */

function addMessageToBoard(rowData) {
  // Store the value of rowData inside object named 'data'
  const data = rowData.val();

  // console.log data
  console.log(data);

  // Create a variable named singleMessage
  // that stores function call for makeSingleMessageHTML()
  let singleMessage = makeSingleMessageHTML(
    data.USERNAME,
    data.EMAIL,
    data.PROFILE,
    data.MESSAGE,
    data.DATE,
    data.TIME
  );

  // Append the new message HTML element to allMessages
  allMessages.appendChild(singleMessage);

  // Scroll to newest message
  allMessages.scrollTop = allMessages.scrollHeight;
}

/**
 * @TODO create a function called makeSingleMessageHTML which takes
 * two parameters, usernameTxt and messageTxt, that:
 *      - creates a parent div with the class .single-message
 *
 *      - creates a p tag with the class .single-message-username
 *      - update the innerHTML of this p to be the username
 *        provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - creates a p tag
 *      - updates the innerHTML of this p to be the message
 *        text provided in the parameter object
 *      - appends this p tag to the parent div
 *
 *      - returns the parent div
 */

function makeSingleMessageHTML(
  usernameTxt,
  emailTxt,
  profileTxt,
  messageTxt,
  dateTxt,
  timeTxt
) {
  // Create Parent Div
  let parentDiv = document.createElement("div");
  parentDiv.classList.add("single-message");

  // Profile Image
  let profileImg = document.createElement("img");
  profileImg.classList.add("single-message-img");
  profileImg.src = profileTxt;

  // Username
  let userPTag = document.createElement("p");
  userPTag.classList.add("single-message-username");
  userPTag.innerHTML = usernameTxt;

  // Email
  let emailPTag = document.createElement("p");
  emailPTag.classList.add("single-message-email");
  emailPTag.innerHTML = emailTxt;

  // Message
  let messagePTag = document.createElement("p");
  messagePTag.innerHTML = messageTxt;

  // Date
  let datePTag = document.createElement("p");
  datePTag.classList.add("single-message-date");
  datePTag.innerHTML = dateTxt;

  // Time
  let timePTag = document.createElement("p");
  timePTag.classList.add("single-message-time");
  timePTag.innerHTML = timeTxt;

  // Build overall single message block
  parentDiv.appendChild(profileImg);
  parentDiv.appendChild(userPTag);
  parentDiv.appendChild(emailPTag);
  parentDiv.appendChild(messagePTag);
  parentDiv.appendChild(datePTag);
  parentDiv.appendChild(timePTag);

  // Return Parent Div
  return parentDiv;
}

/**
 * @BONUS add an onkeyup event handler to the form HTML
 * element so the user can also submit the form with the
 * Enter key
 *
 * @BONUS use an arrow function
 */