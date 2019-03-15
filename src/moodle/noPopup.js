function createInnerPopup(el){

    const TEMPLATE = `
    <div class="pme-popup-content hidden">
        <iframe height="1000" frameborder="0" class="loading"></iframe>
    </div>
    `

    if(el.querySelector(".pme-popup-content")) return;

    el.innerHTML += TEMPLATE;

    let frame = el.querySelector(".pme-popup-content iframe");

    frame.addEventListener("load",e => {

        resizeFrame(frame);
        frame.classList.remove("loading");

        let links = Array.from(frame.contentWindow.document.querySelectorAll("a[target=\"_blank\""));
        links.forEach(el => {
            el.addEventListener("click",(e) => {
                e.preventDefault();
                window.location.href = e.currentTarget.href
            })
        })

    })

}

function resizeFrame(frame){
    let root = frame.contentWindow.document.getElementById("racine")
    if(root && root.scrollHeight > 0){
        frame.height = root.scrollHeight
    }
}

function removePopups(){
    let activities = Array.from(document.querySelectorAll(".activity.resource"));

    activities.forEach(activityEl => {
        let link = activityEl.querySelector("a[onclick]");
        if(!link) return;

        let linkMatch = link.onclick.toString().match(/window\.open\('(.+?)',/);
        if(!linkMatch) return;

        link.href = linkMatch[1];
        link.target = "blank";
        link.removeAttribute("onclick");

        activityEl.addEventListener("click",e => {
            e.preventDefault();
            loadPopup(activityEl,linkMatch[1]);
        });

        createInnerPopup(activityEl)
    })
}

function loadPopup(activityEl,href){
    let container = activityEl.querySelector(".pme-popup-content");
    if(!container) return;
    let frame = container.querySelector("iframe");

    Array.from(document.querySelectorAll(".pme-popup-content:not(.hidden)")).forEach(el => el.classList.add("hidden"))

    container.classList.remove("hidden");

    if(frame.src !== href) {
        frame.src = href;
    }

}

removePopups();