addSelectJobs();
addSelectLocation();

/* Placeholder Typewriter */
var placeholderText = [
  "Nhập tiêu đề công việc mà bạn muốn...",
  "Vị trí công việc...",
  "Địa điểm làm việc...",
  "Mức lương mong muốn..."
];
$('#search').placeholderTypewriter({
  text: placeholderText,
});

function addSelectJobs() {
  let jobs = [
    "Y tế",
    "Nông nghiệp",
    "Công nghiệp",
    "Xây dựng",
    "Khai thác",
    "Dịch vụ",
    "Văn phòng",
  ];
  let row = jobs.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("jobs").innerHTML += row.join(" ");
}
function addSelectLocation() {
  let locations = [
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên-Huế",
    "Cần Thơ",
    "Đà Nẵng",
    "Quảng Nam",
    "Quảng Ngãi",
    "Bình Định",
    "Phú Yên",
    "Khánh Hòa",
    "Ninh Thuận",
    "Bình Thuận",
    "Kon Tum",
    "Gia Lai",
    "Đắk Lắk",
    "Đắc Nông",
    "Lâm Đồng",
    "Bình Phước",
    "Bình Dương",
    "Đồng Nai",
    "Tây Ninh",
    "Bà Rịa-Vũng Tàu",
    "Hồ Chí Minh",
    "Long An",
    "Đồng Tháp",
    "Tiền Giang",
    "An Giang",
    "Bến Tre",
    "Vĩnh Long",
    "Trà Vinh",
    "Hậu Giang",
    "Kiên Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
  ];
  let row = locations.map((e) => {
    return `<option value="${e}">${e}</option>`;
  });
  document.getElementById("locations").innerHTML += row.join(" ");
}
function searchWork() {
  let name = form.search.value;
  let jobs = form.jobs.value;
  let locations = form.locations.value;

  window.location.href = `http://127.0.0.1:5502/html/result.html?name=${name}&jobs=${jobs}&locations=${locations}`;
}
function getUserLogin() {
  let user = JSON.parse(sessionStorage.getItem("userLogin"));
  if (user != null) {
    document.getElementById("nameUser").innerHTML = user["name"]
    document.getElementById("user").style.display = "inline"
    document.getElementById("login").style.display = "none"
    document.getElementById("regis").style.display = "none"
  } else {
    document.getElementById("user").style.display = "none"
    document.getElementById("login").style.display = "inline"
    document.getElementById("regis").style.display = "inline"
  }
}
function onLogOut() {
  sessionStorage.removeItem("userLogin");
  location.reload();
}