var db = firebase.firestore();
function loadBody() {
    getUserLogged().then(uid=>{
        jobSearchByUid(uid).then(list=>{
            if (list.length == 0) {
                document.getElementById("nodata").style.display = "block"
                document.getElementById("jobTable").style.display = "none"
            } else {
                showJobApplication(list)
                document.getElementById("nodata").style.display = "none"
            }
        })
    })
}
function getUserLogged() {
    return new Promise((resolve,reject)=>{
        firebase.auth().onAuthStateChanged(function(user) {
            resolve(user.uid)
        });
    })
}
function showJobApplication(arr) {
    let show = arr.map(element=> {
        return `
        <tr class="rowData">
        <td >${element.position}</td>
        <td >${element.wage}</td>
        <td >${element.date}</td>
        <td class="${element.status ? 'active' : 'nonactive'}">${element.status?"Đã được xét duyệt":"Chưa được xét duyệt"}</td>
        <td >${element.note}</td>
        </tr>
        `
    })
    document.getElementById("jobTable").innerHTML = show.join("");
}
function jobSearchByUid(uid) {
    return new Promise((resove, reject) => {
        let listJob = []
        db.collection("JobApplication").where("uid", "==", uid)
            .get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    let job = {
                        id: doc.id,
                        uid: doc.data().uid,
                        cv: doc.data().cv,
                        email: doc.data().email ,
                        phone: doc.data().phone,
                        position : doc.data().position,
                        wage : doc.data().wage,
                        date : doc.data().date,
                        status : doc.data().status,
                        note : doc.data().note
                    }
                    listJob.push(job);
                });
                resove(listJob);
            });
    })
}