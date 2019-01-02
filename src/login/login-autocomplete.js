let autocompleteTemplate = `
<div class="emails" id="emails"></div>
<div class="save-form">
    <input type="checkbox" id="save-email" checked />
    <label for="save-email">Sauvegarder mon email</label>
</div>
`;

let autoEmails = [];
let backgroundConnection = null;

let completeContainer = null;
let emailsContainer = null;
let loginInput = null;
let submitButton = null;
let saveCheckbox = null;

function onMessage(message) {
  if (message.type == "email-list") {
    autoEmails = message.emails;
    addEmails();
  }
}

async function loadEmails() {
  if (!backgroundConnection) {
    backgroundConnection = browser.runtime.connect({ name: "login-emails" });
    backgroundConnection.onMessage.addListener(m => onMessage(m));
  }
  backgroundConnection.postMessage({ type: "get-emails" });
}

function addWidgetBackbone() {
  let connexionContainer = document.querySelector(".appconnexion");
  let autocompleteContainer = document.createElement("div");
  autocompleteContainer.classList.add("autocomplete");
  autocompleteContainer.innerHTML = autocompleteTemplate;
  completeContainer = connexionContainer.appendChild(autocompleteContainer);
  emailsContainer = completeContainer.querySelector("#emails");
  loginInput = document.getElementById("login");
  submitButton = document.getElementById("submit");
  window.addEventListener("beforeunload", () => saveEmail());
  saveCheckbox = completeContainer.querySelector("#save-email");
}

function addEmails() {
  emailsContainer.innerHTML = "";
  autoEmails.forEach(el => {
    let emailElement = document.createElement("div");
    emailElement.classList.add("email");
    emailElement.innerHTML = `
        <span class="value">${el}</span>
        <div class="toolbar">
            <button class="remove-button">
                <i class="fa fa-times"></i>
            </button>
        </div>`;
    emailElement.addEventListener("click", () => selectEmail(el));
    emailElement = emailsContainer.appendChild(emailElement);
    emailElement
      .querySelector(".remove-button")
      .addEventListener("click", e => {
        e.stopPropagation();
        removeEmail(el);
      });
  });
}

function selectEmail(email) {
  loginInput.value = email;
  submitButton.click();
}

function removeEmail(email) {
  autoEmails = autoEmails.filter(el => el !== email);
  backgroundConnection.postMessage({ type: "remove-email", email });
  addEmails();
}

async function saveEmail() {
  let email = loginInput.value;
  if (email && saveCheckbox.checked) {
    backgroundConnection.postMessage({ type: "add-email", email });
  }
}

loadEmails();
addWidgetBackbone();
addEmails();
