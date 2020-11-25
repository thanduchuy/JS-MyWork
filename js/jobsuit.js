var db = firebase.firestore();
let listCV = []
let cvChoose = 0
let userTemp = {};
function loadData() {
    getAllDocFromCollection("Jobs").then(list=>{
        showJobViewMuch(list)     
        document.getElementById("nodata").style.display = "none"
    })
    getUserLogged().then(uid=>{
        getDocFromCollection("Profile",uid).then(data=>{
            info.phone.value = data.phone
            info.email.value = data.email
        })
        cvUser(uid).then(data=>{
            listCV = data
            getListCVOfUser(data);
        })
    })

}
function getAllDocFromCollection(Jobs) {
    return new Promise((resolve,reject)=>{
        db.collection("Jobs").get().then(function(querySnapshot) {
            let list = []
            querySnapshot.forEach(function(doc) {
                let job = {
                    id: doc.id,
                    career: doc.data().career,
                    datePost: doc.data().datePost,
                    imageCompany: doc.data().imageCompany,
                    location: doc.data().location,
                    nameCompany: doc.data().nameCompany,
                    nameJob: doc.data().nameJob,
                    salary: doc.data().salary
                }
                list.push(job)
            });
            resolve(list);
        });
    })
}
function showJobViewMuch(jobs) {
    let temp = shuffle(jobs);
    let inner = "";
    for (let index = 0; index < 8; index++) {
        inner += `
        <tr class="rowData" >
        <td >${temp[index]["nameJob"]} </br>  ${temp[index]["nameCompany"]}</td>
        <td style="text-align:center">${temp[index]["location"]}</td>
        <td style="text-align:center">${temp[index]["salary"]}</td>
        <td style="text-align:center">${temp[index]["datePost"]}</td>
        `;
    }
    document.getElementById("jobsuit").innerHTML = inner;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
