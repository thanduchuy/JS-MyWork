let users = [];

function loadPage() {
    document.getElementById("error").style.display = 'none';
    users = getData();
    console.log(users);
}
function getData() {
    let users = JSON.parse(localStorage.getItem("user"));
    return users;
}
function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}
function checkUserExisted(user) {
    if (users == null) {
        return true
    } else {
        for (item of users) {
            if (item.email == user.email) {
                return false
            }
        }
    }  
    return true
}
function addUserToLocal(user) {
    if (checkUserExisted(user) ) {
        if (users == null) {
            user["id"] = "u1"
            saveLocalStorage([user]);
        } else {
            user["id"] = `u${users.length+1}`;
            users.push(user);
            saveLocalStorage(users);
        }
        window.location.href = "http://127.0.0.1:5501/html/loginUser.html";
        resetForm()
    } else {
        document.getElementById("error").innerHTML = "Email đã được sử dụng";
        document.getElementById("error").style.display = 'block'
    }

}
function resetForm() {
    form.name.value = ""
    form.phone.value = ""
    form.email.value = ""
    form.pass.value = ""
    form.repass.value = ""
    document.getElementById("error").style.display = 'none';
}
function regisUser() {
    let name = form.name.value
    let phone = form.phone.value
    let email = form.email.value
    let pass = form.pass.value
    let repass = form.repass.value
    if (name === "" || phone === "" || email === "" || pass === "" || repass === "" ) {
        document.getElementById("error").innerHTML = "Không được bỏ trống trường nào";
        document.getElementById("error").style.display = 'block'
    } else {
        if (pass != repass) {
            document.getElementById("error").innerHTML = "Mật khẩu nhập lại không đúng";
            document.getElementById("error").style.display = 'block'
        } else {
           if (pass.length < 6) {
            document.getElementById("error").innerHTML = "Mật khẩu phải hơn 6 ký tự";
            document.getElementById("error").style.display = 'block'
           } else {
            let user = {
                name : name,
                phone : phone,
                email : email,
                pass : pass,
                role : "user",
                active : false 
            }
            addUserToLocal(user)
           }
        }
    }
}
