let users = [];
let employers = [];
function loadPage() {
    document.getElementById("error").style.display = "none"
    users = getData();
    employers = getProfileEmployer();
}
function regisEmployer() {
    let email = form.email.value;
    let pass = form.pass.value;
    let name = form.pass.value;
    let phone = form.phone.value;
    let nameCT = form.nameCT.value;
    let scale = form.scale.value;
    let field = form.field.value;
    let address = form.address.value;
    let city = form.city.value;
    let rule = form.rule.checked;

    if (rule) {
        if (pass.length < 6) {
            document.getElementById("error").innerHTML = "Mật khẩu phải hơn 6 ký tự";
            document.getElementById("error").style.display = 'block'
           } else {
            let user = {
                name : name,
                phone : phone,
                email : email,
                pass : pass,
                role : "employer",
                active : false 
            }
            addUserToLocal(user);
            let employer = {
                nameCT : nameCT,
                scale : scale,
                field : field,
                address : address,
                city : city
            }
            if (employers == null) {
                employer["id"] = "u1"
                saveProfileEmployer([employer]);
            } else {
                employer["id"] = `u${employers.length+1}`;
                employers.push(employer);
                saveProfileEmployer(employers);
            }
            clearForm();
            window.location.href = "http://127.0.0.1:5501/html/loginEmployer.html";
        }
    } else {
        document.getElementById("error").innerHTML = "Vui lòng đồng ý điều khoản";
        document.getElementById("error").style.display = 'block';
    }
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
    } else {
        document.getElementById("error").innerHTML = "Email đã được sử dụng";
        document.getElementById("error").style.display = 'block'
    }

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
function getProfileEmployer() {
    let employer = JSON.parse(localStorage.getItem("employers"));
    return employer;
}
function saveProfileEmployer(employers) {
    localStorage.setItem("employers", JSON.stringify(employers));
}
function getData() {
    let users = JSON.parse(localStorage.getItem("user"));
    return users;
}
function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}
function clearForm() {
    form.email.value = "";
    form.pass.value = "";
    form.pass.value = "";
    form.phone.value = "";
    form.nameCT.value = "";
    form.scale.value = "";
    form.field.value = "";
    form.address.value = "";
    form.city.value = "";
    form.rule.checked = "";
    document.getElementById("error").style.display = 'none'
}

