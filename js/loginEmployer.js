
function loadPage() {
    document.getElementById("error").style.display = 'none';
}
function loginUserFireBase(email,password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
        resetForm();
        window.location.href = "http://127.0.0.1:5502/html/home.html";
    })
    .catch((error) => {
        document.getElementById("error").innerHTML = "Tên tài khoản hoặc mật khẩu không đúng"
        document.getElementById("error").style.display = 'block';
    });
}
function loginEmployer() {
    let email = form.email.value;
    let pass = form.password.value;
    loginUserFireBase(email,pass);
}
function resetForm() {
    form.email.value = ""
    form.password.value = ""
    document.getElementById("error").style.display = 'none';
}
