user = {}
function loadPage() {
    getUserLogin()
    let listCV = getListCVOfUser();
    loadDataListCV(listCV);
}
function loadDataListCV(arr) {
    let list = arr.map(element => {
        return `
        <div class="col-4">
            <a href="${element.cvImage}" data-lightbox="mygallery">
                <img class="col-12 item" src="${element.cvImage}">
            </a>
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
    return list.filter(element=> element.idUser==user.id);
}