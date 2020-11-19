var db = firebase.firestore();
var List = []
function loadPage() {
    getUserLogged().then(user=>{
        cvUser(user.uid).then(list=>{
            List = list
            loadDataListCV(list)
        })
    })
}
function getUserLogged() {
    return new Promise ((resove,reject)=>{
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resove(user)
        } else {
          reject("ERROR")
        }
      });
    })
}
function cvUser(id) {
    return new Promise((resove,reject)=>{
        let listCV = []
        db.collection("CV").where("idUser", "==", id)
        .get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let cv = {
                    id:doc.id,
                    cvImage:doc.data().cvImage,
                    idUser:doc.data().idUser
                }
                listCV.push(cv);
            });
            resove(listCV);
        });
    })
}
function loadDataListCV(arr) {
    let list = arr.map(element => {
        return `
        <div class="col-4 d-flex flex-column align-items-center">
            <a href="${element.cvImage}" data-lightbox="mygallery">
                <img class="col-12 item" src="${element.cvImage}">
            </a>
            <button id="removeCV" type="button" onclick="removeCV('${element.id}')">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                </svg>
          </button>
        </div>
        `;
    })
    document.getElementById("list").innerHTML = list.join("");
}
function removeCV(id) {
    deleteDocFromCollection("CV",id);
}
function removeElement(id) {
    return List.filter(element=>{
        element.id != id
    })
}
function deleteDocFromCollection(nameCollection,id) {
    db.collection(nameCollection).doc(id).delete().then(function() {
       loadDataListCV(removeElement(id))
       alert("Bạn đã xoá thành công")
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}