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

/*
  thì sau này khi em tải bất cứ project nào trên mạng mà nó code node module
  như là : reactjs hay cái project này của ta
  thì e phải npm i đây là câu lệnh tắt của npm install
  nó sẽ cài các module ở trong file package.json của ta

  thì khi em cài một cái module mới cho dự án thì em nên sài
  npm save dev để nó lưu thư viện vô trong pakage json 
  còn ko thì nó sẽ ko lưu người khác tải về sẽ ko có đc thư viên e đã cài
  
  đó thư viên e đã cài sẽ nằm trong devDependencies
  thì khi em cài th này vô thì lúc em npm test
  nó sẽ ko hiện như cái lúc truocs nữa mà nó sẽ render cho ta file test_report.html 
  giờ ta thử xóa cái config xem nó thế nào nè 
  đó nó hiện về như lúc trước
  giờ thêm vô lại nhé 
  đó 
  lâu em sẽ sài thằng này để tạo nên các danh mục cho sản phẩm
  như áo dài, áo ấm, áo phao, chân váy,.... 
*/