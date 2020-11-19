var db = firebase.firestore();
function loadPage() {
    document.getElementById("error").style.display = 'none';
}

function addDocToJobCollection(job) {
    db.collection("Jobs").add({
        nameJob: job.nameJob,
        nameCompany: job.nameCompany,
        salary: job.salary,
        career: job.career,
        location: job.location,
        datePost: job.datePost,
        imageCompany: job.imageCompany
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function loginUser() {
    let email = form.email.value;
    let pass = form.pass.value;
    if(email == "" || pass == "") {
        document.getElementById("error").innerHTML = "Không được bỏ trống trường nào"
        document.getElementById("error").style.display = 'block';
    } else {
        loginUserFireBase(email,pass);
    }
}
function resetForm() {
    form.email.value = ""
    form.pass.value = ""
    document.getElementById("error").style.display = 'none';
}


function loginUserFireBase(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}