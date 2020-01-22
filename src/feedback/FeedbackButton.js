const modalTemplate = `
<div class="feedback-modal hidden" id="pme-feedback-modal">
    <div class="feedback-modal-surface">
        <h2>Donner son avis sur Pimp My Ent</h2>
        <div class="content">
            <p>Merci d'utiliser Pimp My Ent. Vous avez des demandes de fonctionnalités ? vous avez trouvé un bug ? Ecrivez nous dans la boite ci-dessous et nous verrons ce que nous pouvons faire.<p>
            <p>Vos retours sont anonymes, nous ne pouvons pas faire de support personnalisé.</p>
            <form>
                <textarea placeholder="Dites nous tout..."></textarea>
                <button class="primary">Envoyer</button>
            </form>
        </div>
        <div class="success hidden">
            <h3>C'est fait !</h3>
            <p>Nos meilleurs pigeons voyageurs ont transmis votre retour. Merci beaucoup de la part de l'<a href="https://github.com/EpicKiwi/pimp-my-ent/graphs/contributors" target="_blank">equipe Pimp My Ent</a>.</p>
            <p>Vous pouvez suivre votre demande à l'addresse <a target="_blank" class="follow-feedback"></a></p>
        </div>
        <div class="toolbar"><button class="feedback-modal-close"><i class="fa fa-close"></i></button></div>
    </div>
</div>`;

const toolbarTemplate = `
<div class="bottom-toolbar">
    <button id="pme-feedback-open" class="bottom-toolbar-item" title="Donner son avis sur Pimp My Ent">
        <i class="fa fa-comment"></i>
    </button>
</div>`;

function spawnMenuFeedbackButton() {
  let sidebarElement = document.querySelector("footer#pied_deco");
  if (!sidebarElement) return;

  let menuBottomBarTemplate = document.createElement("template");
  menuBottomBarTemplate.innerHTML = toolbarTemplate;
  sidebarElement.appendChild(menuBottomBarTemplate.content.cloneNode(true));

  let modalTemplateElement = document.createElement("template");
  modalTemplateElement.innerHTML = modalTemplate;
  document
    .querySelector("body")
    .appendChild(modalTemplateElement.content.cloneNode(true));

  let openButton = document.getElementById("pme-feedback-open");
  openButton.addEventListener("click", () => openModal());

  let modal = document.getElementById("pme-feedback-modal");
  modal.addEventListener("click", () => closeModal());
  modal
    .querySelector(".feedback-modal-surface")
    .addEventListener("click", e => e.stopPropagation());
  modal
    .querySelector(".feedback-modal-close")
    .addEventListener("click", () => closeModal());
  modal.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    submitFeedback();
  });
}
spawnMenuFeedbackButton();

function closeModal() {
  let modal = document.getElementById("pme-feedback-modal");
  modal.classList.add("hidden");
  modal.querySelector(".content").classList.remove("hidden");
  modal.querySelector(".success").classList.add("hidden");
  modal.querySelector("form button").disabled = false;
  modal.querySelector("form textarea").value = "";
}

function openModal() {
  let modal = document.getElementById("pme-feedback-modal");
  modal.classList.remove("hidden");
  modal.querySelector("form textarea").focus();
}

function submitFeedback() {
  let modal = document.getElementById("pme-feedback-modal");
  let feedback = modal.querySelector("form textarea").value;
  if (feedback == "") return;
  modal.querySelector("form button").disabled = true;

  fetch("https://feedback.ms.epickiwi.fr/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Origin: window.location.href
    },
    body: JSON.stringify({ project: "pimp-my-ent", content: feedback })
  })
    .then(res => res.json())
    .then(result => {
      console.log(result);
      let link = modal.querySelector(".follow-feedback");
      link.innerHTML = result.issueUrl;
      link.href = result.issueUrl;
      modal.querySelector(".content").classList.add("hidden");
      modal.querySelector(".success").classList.remove("hidden");
    })
    .catch(err => {
      modal.querySelector("form button").disabled = true;
    });
}
