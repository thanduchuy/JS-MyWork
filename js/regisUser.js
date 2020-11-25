var db = firebase.firestore();
function loadPage() {
  document.getElementById("error").style.display = "none";
  console.log(getUserLogged());
}
function resetForm() {
  form.name.value = "";
  form.phone.value = "";
  form.email.value = "";
  form.pass.value = "";
  form.repass.value = "";
  document.getElementById("error").style.display = "none";
}
function regisUser() {
  let name = form.name.value;
  let phone = form.phone.value;
  let email = form.email.value;
  let pass = form.pass.value;
  let repass = form.repass.value;
  if (
    name === "" ||
    phone === "" ||
    email === "" ||
    pass === "" ||
    repass === ""
  ) {
    document.getElementById("error").innerHTML =
      "Không được bỏ trống trường nào";
    document.getElementById("error").style.display = "block";
  } else {
    if (pass != repass) {
      document.getElementById("error").innerHTML =
        "Mật khẩu nhập lại không đúng";
      document.getElementById("error").style.display = "block";
    } else {
      if (pass.length < 6) {
        document.getElementById("error").innerHTML =
          "Mật khẩu phải hơn 6 ký tự";
        document.getElementById("error").style.display = "block";
      } else {
        let user = {
          name: name,
          phone: phone,
          email: email,
          pass: pass,
          role: "user",
          active: true,
        };
        registerUser(user);
      }
    }
  }
}

function registerUser(userAR) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(userAR.email, userAR.pass)
    .then((user) => {
      let id = user["user"]["uid"];
      addProfileUser(id, userAR);
    })
    .catch((error) => {
      console.log(error);
    });
}
function addProfileUser(id, user) {
  db.collection("Profile")
    .doc(id)
    .set({
      name: user.name,
      phone: user.phone,
      email: user.email,
      birthday: "",
      gender: "",
      status: "",
      address: "",
      nation: "",
      city: "",
      district: "",
      role: "User",
      active: true,
    })
    .then(function () {
      document.location.href = "http://127.0.0.1:5503/html/loginUser.html";
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
}

function getUserLogged() {
  var user = firebase.auth().currentUser;
  return user;
}
