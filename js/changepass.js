var db = firebase.firestore();

function changePasswordUser(newPassword) {
  var user = firebase.auth().currentUser;
  console.log(user);
  user
    .updatePassword(newPassword)
    .then(function () {
      logoutUser();
      alert("Thay doi mat khau thanh cong!");
    })
    .catch(function (error) {
      console.log(error);
    });
}
function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("sucess");
    })
    .catch(function (error) {
      console.log("fail");
    });
}

function changepass() {
  let pass = form.pass.value;
  let repass = form.repass.value;
  if (pass == repass && pass != "" && repass != "") {
    changePasswordUser(pass);
  } else {
    document.getElementById("error").innerHTML =
      "Mật khẩu nhập lại sai hoặc bị bỏ trống. Vui lòng nhập lại";
    document.getElementById("error").style.display = "block";
  }
}
