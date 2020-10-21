function getData() {
  let cv = JSON.parse(localStorage.getItem("cv"));
  return cv;
}
function createCV() {
  let cv = {};
  if (localStorage.getItem("cv") != null) {
    cv = getData();
  } else {
    window.location.href = "http://127.0.0.1:5500/html/cv/formCV.html";
  }
  console.log(cv);
  setBackgroundAvatar(cv.avatar);
}
function selectCV(id) {
  var element = document.getElementById(`cv${id}`);
  element.classList.toggle("active");
  document.getElementById(`cv${id != 1 ? 1 : 2}`).className =
    "col-5 d-flex justify-content-center align-items-center selectForm";
}
function setBackgroundAvatar(url) {
  var preview = document.getElementById("avatar");
  preview.style.backgroundImage = url;
}
