
function loadPage() {

    document.getElementById("error").style.display = 'none';
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
        console.log("sucess");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
    });
}