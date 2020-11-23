var db = firebase.firestore();
function loadPage() {
    document.getElementById("error").style.display = 'none';
}
function loginEmployer() {
    let email = form.email.value;
    let pass = form.password.value;
    if(email == "" || pass == "") {
        
        document.getElementById("error").innerHTML = "Không được bỏ trống trường nào"
        document.getElementById("error").style.display = 'block';
    } else {
        loginUserFireBase(email,pass);
    }
}
function resetForm() {
    form.email.value = ""
    form.password.value = ""
    document.getElementById("error").style.display = 'none';
}


function loginUserFireBase(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        getDocFromCollection("Profile",user.user.uid).then(info=>{
            if (info.active == false || info.role != "User") {
                logoutUser()
                resetForm()
                document.getElementById("error").innerHTML = "Tài khoản không phù hợp hoặc chưa kích hoạt"
                document.getElementById("error").style.display = 'block';
            } else {
                document.location.href = "http://127.0.0.1:5502/html/home.html"   
            }
        })
    })
    .catch((error) => {
        resetForm()
        document.getElementById("error").innerHTML = "Email hoặc mật khẩu không đúng"
        document.getElementById("error").style.display = 'block';
    });
}
function logoutUser() {
    firebase.auth().signOut().then(function() {
        console.log("sucess");
    }).catch(function(error) {
        console.log("fail");
    });
}
function getDocFromCollection(nameCollection,id) {
    return new Promise((resovle,reject)=>{
        var ref = db.collection(nameCollection).doc(id)
        ref.get().then(function(doc) {
        if (doc.exists) {
            resovle(doc.data());
        } else {
            reject("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    })
}