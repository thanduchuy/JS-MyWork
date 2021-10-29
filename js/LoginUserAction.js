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

function changeStateUI(enable) {
  return enable ? "block" : "none";
}

function checkEmptyProfile(info) {
  return (
    info.name != undefined ||
    info.email != undefined ||
    info.pass != undefined ||
    info.role != undefined ||
    info.active != undefined
  );
}

function logErrorLogin(caseError) {
  switch (caseError) {
    case 1:
      return "Không được bỏ trống trường nào";
    case 2:
      return "Email và Pasword nhập không đúng format";
    case 3:
      return "Tài khoản không phù hợp hoặc chưa kích hoạt";
    case 4:
      return "Lấy thông tin tài khoản thất bại";
    default:
      return "Email hoặc mật khẩu không đúng";
  }
}

const LoginUserAction = {
  checkEmptyField,
  validateEmail,
  validatePassword,
  createHomeURLForRole,
  isAdmin,
  isEmployer,
  logErrorLogin,
  changeStateUI,
  checkEmptyProfile,
};

module.exports = LoginUserAction;
