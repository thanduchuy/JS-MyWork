
let cv = {};
let nameCV = "formCV1";
function getData() {
  let cv = JSON.parse(localStorage.getItem("cv"));
  console.log(cv);
  return cv;
}
function createCV() {
  if (localStorage.getItem("cv") != null) {
    cv = getData();
  } else {
    window.location.href = "http://127.0.0.1:5502//html/cv/formCV.html";
  }
  document.getElementById(`formCV2`).style.display = "none";
  valueForm1();
}
function valueForm1() {
  setBackgroundAvatar(cv.avatar);
  setValueElement("name", cv.name);
  setValueElement("job", cv.job);
  setValueElement("address", cv.address);
  setValueElement("email", cv.email);
  setValueElement("phone", cv.phone);
  setValueEducation(cv.schools);
  setValueObject(cv.objectives);
  setValueExperience(cv.exp);
}
function valueForm2() {
  var preview = document.getElementById("avatar2");
  setValueElement("name2", cv.name);
  setValueElement("job2", cv.job);
  setValueElement("address2", cv.address);
  setValueElement("date2", cv.date);
  setValueElement("email2", cv.email);
  setValueElement("phone2", cv.phone);
  preview.style.backgroundImage = cv.avatar;
  setValueObject2(cv.objectives);
  setValueEducation2(cv.schools);
  setValueExperience2(cv.exp);
}
function setValueElement(id, value) {
  document.getElementById(id).innerHTML = value;
}
function setValueEducation(arr) {
  let innerHTML = arr.map((element) => {
    return `<li class="item">
    <h5>${element.description} ${element.value}</h5>
    <div class="date d-flex align-items-center">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-calendar3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
        />
        <path
          fill-rule="evenodd"
          d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        />
      </svg>
      <span>${element.name}</span>
    </div>
    <div class="content">
      Học ${element.name} tại ${element.value}
    </div>
  </li>`;
  });
  document.getElementById("educations").innerHTML = innerHTML.join("");
}
function setValueEducation2(arr) {
  let innerHTML = arr.map((element) => {
    return `  <li><span id="highlight">${element.name}</span></li>
    <li class="d-flex">
      <span id="highlight">Trường/ nơi đào tạo: </span>
      <p>${element.description} ${element.value}</p>
    </li>
    `;
  });
  document.getElementById("school2").innerHTML = innerHTML.join("");
}
function selectCV(id) {
  var element = document.getElementById(`cv${id}`);
  element.classList.toggle("active");
  document.getElementById(`cv${id != 1 ? 1 : 2}`).className =
    "col-5 d-flex justify-content-center align-items-center selectForm";
  document.getElementById(`formCV${id != 1 ? 1 : 2}`).style.display = "none";
  document.getElementById(`formCV${id == 1 ? 1 : 2}`).style.display = "block";
  id == 1 ? valueForm1() : valueForm2();
  nameCV = id == 1 ? "formCV1" : "formCV2"
}
function setBackgroundAvatar(url) {
  var preview = document.getElementById("avatar");
  preview.style.backgroundImage = url;
}
function setValueObject(arr) {
  let result = arr.map((element, index) => {
    return `<li class="item">
    <h5>Mục tiêu trong công việc</h5>
    <div class="date d-flex align-items-center">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-calendar3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
        />
        <path
          fill-rule="evenodd"
          d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        />
      </svg>
      <span>Mục tiêu số ${index + 1}- </span>
      <span id="highlight">Quan trọng</span>
    </div>
    <div class="content">
      ${element}
    </div>
  </li>`;
  });
  document.getElementById("listWork").innerHTML = result.join("");
}
function setValueObject2(arr) {
  let result = arr.map((element, index) => {
    return `<li class="d-flex">
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      class="bi bi-check"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
      />
    </svg>
    <p>${element}</p>
  </li>`;
  });
  document.getElementById("object2").innerHTML = result.join("");
}
function setValueExperience(arr) {
  let result = arr.map((element, index) => {
    return `<li class="item">
    <h5>Đã làm công việc</h5>
    <div class="date d-flex align-items-center">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-calendar3"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"
        />
        <path
          fill-rule="evenodd"
          d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        />
      </svg>
      <span>${element.year}</span>
    </div>
    <div class="content">
      ${element.value}
    </div>
  </li>`;
  });
  document.getElementById("exp").innerHTML = result.join("");
}
function setValueExperience2(arr) {
  let result = arr.map((element, index) => {
    return ` 
    <li class="d-flex">
      <span id="highlight">Thời gian: </span>
      <p>${element.year}</p>
    </li>
    <li class="d-flex">
      <span id="highlight">Vị trí: </span>
      <p>${element.value}</p>
    </li>`;
  });
  document.getElementById("exp2").innerHTML = result.join("");
}
function exportCV() {
  window.scrollTo(0,0);
  html2canvas(document.getElementById(nameCV),{ 
    allowTaint: true,
    taintTest: false
  }).then(canvas => {
    let imageData = canvas.toDataURL('image/jpeg');
    getUserLogged().then(user=>{
      addDocToCVCollection(imageData,user.uid);
    })
  })
}
function getUserLogged() {
  return new Promise ((resove,reject)=>{
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resove(user)
      } else {
        reject("ERROR")
      }
    });
  })
}

function addDocToCVCollection(url,idUser) {
  db.collection("CV").add({
      cvImage: url,
      idUser: idUser
  }).then(function(docRef) {
      alert("Thêm CV thành công");
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}