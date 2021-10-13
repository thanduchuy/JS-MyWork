const LoginUserAction = require("../js/LoginUserAction");

it("Case Empty Field Of Form Login", () => {
  expect(LoginUserAction.checkEmptyField("", "")).toBe(true);
});

it("Case Validate Email", () => {
  expect(LoginUserAction.validateEmail("trangthu@gmail.com")).toBe(true);
});

it("Case Validate Password", () => {
  expect(LoginUserAction.validatePassword("12345678")).toBe(true);
});

it("Case check is Admin", () => {
  expect(LoginUserAction.isAdmin({ name: "Trang", role: "Admin" })).toBe(true);
});

it("Case check is Employer", () => {
  expect(
    LoginUserAction.isEmployer({
      name: "Trang",
      role: "Employer",
      active: false,
    })
  ).toBe(true);
});

it("Case create url for role", () => {
  expect(
    LoginUserAction.createHomeURLForRole({
      name: "Trang",
      role: "Employer",
      active: false,
    })
  ).toMatch(/home.html/);
});
