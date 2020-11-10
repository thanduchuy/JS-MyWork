user = {}
let listCV = []
function loadPage() {
    getUserLogin()
    listCV = getListCVOfUser().filter(element=> element.idUser==user.id);
    loadDataListCV(listCV);
}
function loadDataListCV(arr) {
    let list = arr.map(element => {
        return `
        <div class="col-4 d-flex flex-column align-items-center">
            <a href="${element.cvImage}" data-lightbox="mygallery">
                <img class="col-12 item" src="${element.cvImage}">
            </a>
            <button id="removeCV" type="button" onclick="removeCV(${element.id})">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
          </button>
        </div>
        `;
    })
    document.getElementById("list").innerHTML = list.join("");
}
function getUserLogin() {
    user=JSON.parse(sessionStorage.getItem("userLogin"))
}
function getListCVOfUser() {
    let list = JSON.parse(localStorage.getItem("listCV"))
    return list;
}
function removeCV(id) {
   let temp = getListCVOfUser().filter(element=>element.id!=id);
   localStorage.setItem("listCV",JSON.stringify(temp));
   loadDataListCV(temp);
}