let user = {};
let users = [];
let indexUser = null;
function getSessionUser() {
    user = JSON.parse(sessionStorage.getItem("userLogin"));
    document.getElementById("error").style.display = "none";
    document.getElementById("error2").style.display = "none";
    getData();
}
function getData() {
    users = JSON.parse(localStorage.getItem("user"));
    if (users == null) {
        users = []
    }
    
}
function checkUser(id) {
    for(item in users) {
        if (users[item].id == id) {
            indexUser = item;
            return true
        }
    }
    return false
}

function updateProfileUser() {
    checkUser(user["id"]);    
    var userNew = user
    let oldPass = form.oldpass.value;
    let newPass = form.newpass.value;
    let remindPass = form.remindpass.value;
    if (oldPass == userNew["pass"]) {
        if(newPass == remindPass) {
            userNew["pass"] = newPass;
            users[indexUser] = userNew
            localStorage.setItem("user", JSON.stringify(users));
        } else {
            // alert("Mat khau nhap lai khong dung")
            document.getElementById("error2").innerHTML = "Mật khẩu nhập lại không đúng.";
            document.getElementById("error2").style.display = "block";
        }
    } else {
        // alert("Mat khau cu khong dung")
        document.getElementById("error").innerHTML = "Mật khẩu cũ không đúng.";
        document.getElementById("error").style.display = "block";
    }
}
