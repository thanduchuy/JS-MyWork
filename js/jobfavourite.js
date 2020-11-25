var db = firebase.firestore();
let list = [];
function loadBody() {
  getUserLogged().then((uid) => {
    jobSearchByUid(uid).then((list) => {
      if (list.length == 0) {
        document.getElementById("nodata").style.display = "block";
        document.getElementById("jobFavourite").style.display = "none";
      } else {
        showJobApplication(list);
        document.getElementById("nodata").style.display = "none";
      }
    });
  });
}
function getUserLogged() {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      resolve(user.uid);
    });
  });
}
function showJobApplication(arr) {
  list = arr;
  let show = arr.map((element) => {
    return `
        <tr class="rowData">
        <td >${element.position}</td>
        <td >${element.dateSave}</td>
        <td >${element.dateExpiration}</td>
        <td >${element.wage}</td>
        <td >
            <button class="btn btn-danger" onclick="deleteJobFavourite('${element.id}')">Xoá</button>
        </td>
        </tr>
        `;
  });
  document.getElementById("jobFavourite").innerHTML = show.join("");
}
function jobSearchByUid(uid) {
  return new Promise((resove, reject) => {
    let listJob = [];
    db.collection("JobFavourite")
      .where("uid", "==", uid)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let job = {
            id: doc.id,
            uid: doc.data().uid,
            email: doc.data().email,
            phone: doc.data().phone,
            position: doc.data().position,
            wage: doc.data().wage,
            dateSave: doc.data().dateSave,
            dateExpiration: doc.data().dateExpiration,
            status: doc.data().status,
            note: doc.data().note,
          };
          listJob.push(job);
        });
        resove(listJob);
      });
  });
}
function deleteJobFavourite(id) {
  deleteDocFromCollection("JobFavourite", id);
  list = list.filter((element) => {
    return element.id != id;
  });
  showJobApplication(list);
}
function deleteDocFromCollection(nameCollection, id) {
  db.collection(nameCollection)
    .doc(id)
    .delete()
    .then(function () {
      console.log("Document successfully deleted!");
    })
    .catch(function (error) {
      console.error("Error removing document: ", error);
    });
}
