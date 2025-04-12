class User {
  constructor(username, email, phoneNumber, gender, address) {
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.address = address;
  }
}
let userlist = [];
let currentView = "table";

const addUserTab = document.getElementById("add");
const previewUserTab = document.getElementById("view");
const userSection = document.getElementById("user-section");
const previewSection = document.getElementById("preview-section");
const tableView = document.getElementById("tableView");
const cardView = document.getElementById("cardView");
const form = document.getElementById("userForm");

addUserTab.onclick = function () {
  userSection.classList.remove("d-none");
  previewSection.classList.add("d-none");
};

previewUserTab.onclick = function () {
  userSection.classList.add("d-none");
  previewSection.classList.remove("d-none");
  viewUsers();
};

tableView.onclick = function () {
  currentView = "table";
  viewUsers();
};

cardView.onclick = function () {
  currentView = "card";
  viewUsers();
};
form.onsubmit = function (event) {
  event.preventDefault();

  let usernameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let phoneNumberError = document.getElementById("phoneNumberError");
  let genderError = document.getElementById("genderError");
  let addressError = document.getElementById("addressError");

  usernameError.textContent = "";
  emailError.textContent = "";
  phoneNumberError.textContent = "";
  genderError.textContent = "";
  addressError.textContent = "";

  let formIsValid = true;
  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let phoneNumber = document.getElementById("phonenumber").value;
  let gender = document.getElementById("gender").value;
  let address = document.getElementById("inputAddress").value;
  let message = document.getElementById("submitMessage");

  if (username === "") {
    usernameError.textContent = "Please enter your name.";
    formIsValid = false;
  } else {
    for (let i = 0; i < username.length; i++) {
      let char = username[i];
      if (
        !(
          (char >= "A" && char <= "Z") ||
          (char >= "a" && char <= "z") ||
          char === " "
        )
      ) {
        usernameError.textContent =
          "Name must contain only letters and spaces.";
        formIsValid = false;
        break;
      }
    }
  }
  if (email === "") {
    emailError.textContent = "Please enter your email";
    formIsValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    emailError.textContent = "Please enter a valid email address";
    formIsValid = false;
  }
  if (!phoneNumber || phoneNumber.length < 10 || isNaN(phoneNumber)) {
    phoneNumberError.textContent =
      " phone number is not valid ,please enter at least 10 digits.";
    formIsValid = false;
  }
  if (!gender || gender === "Choose Your Gender") {
    genderError.textContent = "Please select your gender";
    formIsValid = false;
  }
  if (!address) {
    addressError.textContent = "Please enter your address";
    formIsValid = false;
  }
  if (!formIsValid) {
    return;
  }

  const user = new User(username, email, phoneNumber, gender, address);
  userlist.push(user);

  message.innerHTML =
    "<div class='alert alert-success'>User added successfully!</div>";
  setTimeout(() => {
    message.innerHTML = "";
  }, 3000);
  form.reset();
};

function viewUsers() {
  const table = document
    .getElementById("table")
    .getElementsByTagName("tbody")[0];
  const usersDisplay = document.getElementById("usersDisplay");
  const tableViewContainer = document.getElementById("tableViewContainer");
  const cardViewContainer = document.getElementById("cardViewContainer");
  table.innerHTML = "";
  usersDisplay.innerHTML = "";
  if (currentView === "table") {
    userlist.forEach((elements) => {
      const row = document.createElement("tr");
      const nameTd = document.createElement("td");
      nameTd.textContent = elements.username;
      const emailTd = document.createElement("td");
      emailTd.textContent = elements.email;
      const phoneNumberTd = document.createElement("td");
      phoneNumberTd.textContent = elements.phoneNumber;
      const genderTd = document.createElement("td");
      genderTd.textContent = elements.gender;
      const addressTd = document.createElement("td");
      addressTd.textContent = elements.address;
      row.appendChild(nameTd);
      row.appendChild(emailTd);

      row.appendChild(phoneNumberTd);

      row.appendChild(genderTd);

      row.appendChild(addressTd);
      table.appendChild(row);
    });
    tableViewContainer.style.display = "block";
    cardViewContainer.style.display = "none";
  } else if (currentView === "card") {
    for (let i = 0; i < userlist.length; i++) {
      let user = userlist[i];

      let card = document.createElement("div");
      card.className = "card  border-info p-3 m-2 col-md-4";

      let content = "<h5>" + user.username + "</h5>";
      content += "<p><strong>Email:</strong> " + user.email + "</p>";
      content += "<p><strong>Phone:</strong> " + user.phoneNumber + "</p>";
      content += "<p><strong>Gender:</strong> " + user.gender + "</p>";
      content += "<p><strong>Address:</strong> " + user.address + "</p>";

      card.innerHTML = content;
      usersDisplay.appendChild(card);
    }
    tableViewContainer.style.display = "none";
    cardViewContainer.style.display = "block";
  }
}
