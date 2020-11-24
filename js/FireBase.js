var firebaseConfig = {
    apiKey: "AIzaSyCoUI46QHrmu50xeBHhznw8UG23Ji6Qpvw",
    authDomain: "timvieclam-9b36f.firebaseapp.com",
    databaseURL: "https://timvieclam-9b36f.firebaseio.com",
    projectId: "timvieclam-9b36f",
    storageBucket: "timvieclam-9b36f.appspot.com",
    messagingSenderId: "263868475317",
    appId: "1:263868475317:web:ac56342d37d1e6f9145bfc",
    measurementId: "G-E9YCYT1L12"
  };
  firebase.initializeApp(firebaseConfig);
// Variable Cloud FireStore
  var db = firebase.firestore();
// FIREBASE AUTH
function getUserLogged() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
        } else {
            console.log("NAN");
        }
      });
}
function loginUser() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    });
}
function logoutUser() {
    firebase.auth().signOut().then(function() {
        console.log("sucess");
    }).catch(function(error) {
        console.log("fail");
    });
}
function changePasswordUser(newPassword) {
    var user = firebase.auth().currentUser;

    user.updatePassword(newPassword).then(function() {
        console.log("sucess");
    }).catch(function(error) {
        console.log(error);
    });
}
function registerUser(email,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        console.log(user);
    })
    .catch((error) => {
        console.log(error);
    });
}
function setProfileUser(id,user) {
    db.collection("Profile").doc(id).set({
        name: user.name,
        phone: user.phone,
        email: user.email,
        birthday: user.birthday,
        gender: user.gender,
        status: user.status,
        address: user.address,
        nation: user.nation,
        city: user.city,
        district: user.district,
        role: "User"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}   

// get data collection

function getDocFromCollection(nameCollection,id) {
    var ref = db.collection(nameCollection).doc(id)
    ref.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}
function getAllDocFromCollection(nameCollection) {
    db.collection(nameCollection).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}
function deleteDocFromCollection(nameCollection,id) {
    db.collection(nameCollection).doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

// CRUD JOBS
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
function jobSearchByCareer(career) {
    db.collection("Jobs").where("career", "==", career)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}
function jobSearchByLocation(career) {
    db.collection("Jobs").where("location", "==", career)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}
function updateJob(id,newJob) {
    db.collection("Jobs").doc(id).set({
        nameJob: newJob.nameJob,
        nameCompany: newJob.nameCompany,
        salary: newJob.salary,
        career: newJob.career,
        location: newJob.location,
        datePost: newJob.datePost,
        imageCompany: newJob.imageCompany
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

// CV collection

function addDocToCVCollection(url,idUser,user) {
    db.collection("CV").add({
        cvImage: url,
        email: user.email,
        idUser: idUser,
        name: user.name,
        phone: user.phone,
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
function cvUser(id) {
    db.collection("CV").where("idUser", "==", id)
    .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}
function checkAdmin() {
    return new Promise((resove,reject)=>{
        var user = firebase.auth().currentUser;
        var ref = db.collection("Profile").doc(user.uid)
        ref.get().then(function(doc) {
        if (doc.exists) {
            resove(doc.data().role == "admin")
        } else {
            reject(false)
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    })
}