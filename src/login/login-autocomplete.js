let autocompleteTemplate = `
<div class="emails" id="emails"></div>
<div class="save-form">
    <input type="checkbox" id="save-email" checked />
    <label for="save-email">Sauvegarder votre email</label>
</div>
`;

let autoEmails = [];

let completeContainer = null;
let emailsContainer = null;
let loginInput = null;
let submitButton = null;
let saveCheckbox = null;

async function loadEmails() {
  var selectedStorage = getStorage();
  let savedEmails = await selectedStorage.get("saved-emails");
  autoEmails = savedEmails["saved-emails"];
  addEmails();
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
  submitButton.addEventListener("click", () => saveEmail());
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
  var selectedStorage = getStorage();
  selectedStorage.set({ "saved-emails": autoEmails });
  addEmails();
}

async function saveEmail() {
  let email = loginInput.value;
  if (email && saveCheckbox.checked && autoEmails.indexOf(email) == -1) {
    autoEmails.unshift(email);
    var selectedStorage = getStorage();
    let saved = await selectedStorage.set({ "saved-emails": autoEmails });
  }
}

loadEmails();
addWidgetBackbone();
addEmails();
