function checkEmptyField(email, pass) {
  return email == "" || pass == "";
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(pass) {
  return pass.length > 6;
}

function isAdmin(info) {
  return info.role == "Admin";
}

function isEmployer(info) {
  return info.active == false || info.role != "User";
}

function createHomeURLForRole(info) {
  return isAdmin(info.role)
    ? "http://127.0.0.1:5503/admin_template/index.html"
    : "http://127.0.0.1:5503/html/home.html";
}

const LoginUserAction = {
  checkEmptyField,
  validateEmail,
  validatePassword,
  createHomeURLForRole,
  isAdmin,
  isEmployer,
};

module.exports = LoginUserAction;
