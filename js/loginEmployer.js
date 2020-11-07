let users = [];
function loadPage() {
    document.getElementById("error").style.display = 'none';
    users = getData();
}
function getData() {
    let users = JSON.parse(localStorage.getItem("user"));
    return users;
}
function loginEmployer() {
    let email = form.email.value;
    let pass = form.password.value;
    if (checkUser(email,pass)) {
        resetForm();
        window.location.href = "http://127.0.0.1:5501/html/home.html";
    } else {
        document.getElementById("error").innerHTML = "Tên tài khoản hoặc mật khẩu không đúng"
        document.getElementById("error").style.display = 'block';
    }
}
function checkUser(email,pass) {
    for(item of users) {
        if (item.email == email && item.pass == pass) {
            saveSession(item)
            return true
        }
    }
    return false
}
function resetForm() {
    form.email.value = ""
    form.password.value = ""
    document.getElementById("error").style.display = 'none';
}
function saveSession(user) {
    let save = JSON.stringify(user);
    sessionStorage.setItem("userLogin", save);
}