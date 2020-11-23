let users = [];
let employers = [];
var db = firebase.firestore();
function loadPage() {
    document.getElementById("error").style.display = "none"
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
                active : false,
                nameCT : nameCT,
                scale : scale,
                field : field,
                address : address,
                city : city
            }
            registerUser(user)
            clearForm();
        }
    } else {
        document.getElementById("error").innerHTML = "Vui lòng đồng ý điều khoản";
        document.getElementById("error").style.display = 'block';
    }
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


function registerUser(userAR) {
    firebase.auth().createUserWithEmailAndPassword(userAR.email, userAR.pass)
    .then((user) => {
        let id = user["user"]["uid"];
        addProfileUser(id,userAR);
    })
    .catch((error) => {
        console.log(error);
    });
}
function addProfileUser(id,user) {
    db.collection("Profile").doc(id).set({
        name: user.name,
        phone: user.phone,
        email: user.email,
        birthday: "",
        gender: "",
        status: "",
        address: user.address,
        nation: "",
        city: user.city,
        district: "",
        role: "Employer",
        active : true,
        nameCompany : user.nameCT,
        scale : user.scale,
        field : user.field
    })
    .then(function() {
        document.location.href = "http://127.0.0.1:5502/html/home.html";
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}   