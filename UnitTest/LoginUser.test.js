const LoginUserAction = require("../js/LoginUserAction");

let userTest = {
  name: "Trang",
  email: "trang@.com",
  pass: "trang123456",
  role: "admin",
  active: false,
};

let LoginErrosEnum = Object.freeze({
  empty: 1,
  format: 2,
  notRole: 3,
  infoGetFail: 4,
  wrong: 5,
});

it("Case Empty Field Of Form Login", () => {
  expect(LoginUserAction.checkEmptyField("", "")).toBe(true);
});

it("Case Validate Email", () => {
  expect(LoginUserAction.validateEmail(userTest.email)).toBe(true);
});

it("Case Validate Password", () => {
  expect(LoginUserAction.validatePassword(userTest.pass)).toBe(true);
});

it("Case check is Admin", () => {
  expect(
    LoginUserAction.isAdmin({ name: userTest.name, role: userTest.role })
  ).toBe(true);
});

it("Case check is Employer", () => {
  expect(
    LoginUserAction.isEmployer({
      name: userTest.name,
      role: userTest.role,
      active: userTest.active,
    })
  ).toBe(true);
});

it("Case create url for role", () => {
  expect(
    LoginUserAction.createHomeURLForRole({
      name: userTest.name,
      role: userTest.role,
      active: userTest.active,
    })
  ).toMatch(/home.html/);
});

it("Check data profile not undefined", () => {
  expect(LoginUserAction.checkEmptyProfile(userTest)).toBe(true);
});

it("Check change state ui", () => {
  expect(LoginUserAction.changeStateUI(true)).toMatch("none");
});

it("Check log error login", () => {
  expect(LoginUserAction.logErrorLogin(LoginErrosEnum.empty)).toMatch(
    "Không được bỏ trống trường nào"
  );
});
