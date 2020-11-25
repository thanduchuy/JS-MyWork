var objectives = [];
let schools = [];
let cv = {};
let url = "";
function addObjectives() {
  let item = `
    <div class="item d-flex justify-content-between" name="objValue" >
    <span class="d-flex justify-content-center align-items-center">
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-card-list" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path fill-rule="evenodd" d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"/>
  <circle cx="3.5" cy="5.5" r=".5"/>
  <circle cx="3.5" cy="8" r=".5"/>
  <circle cx="3.5" cy="10.5" r=".5"/>
</svg></span>
    <input type="text" name="objectives">
    <div class="action">
      <button type="button" class="minus" onclick="removeElement(event)">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-node-minus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M16 8a5 5 0 0 1-9.975.5H4A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5h2.025A5 5 0 0 1 16 8zm-2 0a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5A.5.5 0 0 0 14 8z"/>
        </svg>
      </button>
      <button type="button" class="plus" onclick="addObjectives()">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-node-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11 13a5 5 0 1 0-4.975-5.5H4A1.5 1.5 0 0 0 2.5 6h-1A1.5 1.5 0 0 0 0 7.5v1A1.5 1.5 0 0 0 1.5 10h1A1.5 1.5 0 0 0 4 8.5h2.025A5 5 0 0 0 11 13zm.5-7.5a.5.5 0 0 0-1 0v2h-2a.5.5 0 0 0 0 1h2v2a.5.5 0 0 0 1 0v-2h2a.5.5 0 0 0 0-1h-2v-2z"/>
        </svg>
      </button>
    </div>
  </div>
    `;
  document.getElementById("objValue").innerHTML += item;
}
function removeElement(event) {
  let target = event.target;
  let parent = target.parentElement.parentElement;
  parent.remove();
}
function addExperience() {
  let item = `
  <div class="itemCus2  d-flex justify-content-around align-items-center">
  <div class="time col-4 d-flex">
  <select id="start" name="expYear">
  <option value= "">Thời gian đi làm </option>
  <option value= "dưới 1 năm">dưới 1 năm</option>
  <option value= "1 năm">1 năm </option>
  <option value= "2 năm">2 năm</option>
  <option value= "trên 2 năm">trên 2 năm</option>
  </select>
  </div>
   <input type="text" class="col-4" placeholder="Nơi làm việc"  name="expValue">
   <div class="action" class="col-2">
     <button type="button" class="minus" onclick="removeElement(event)">
       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-dash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm2 6a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"/>
       </svg>
     </button>
     <button type="button" class="plus" onclick="addExperience()">
       <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-plus-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.5 4.5a.5.5 0 0 0-1 0V6H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V7H10a.5.5 0 0 0 0-1H8.5V4.5z"/>
       </svg>
     </button>
   </div>
</div>
    `;
  document.getElementById("expBody").innerHTML += item;
}
function showPreview(event) {
  if (event.target.files.length > 0) {
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("imagePreview");
    preview.style.backgroundImage = `url(${src})`;
  }
}
function submitCV() {
  let name = formCV.name.value;
  var preview = document.getElementById("imagePreview");
  let avatar = preview.style.backgroundImage;
  let gender = formCV.gender.value;
  let date = formCV.date.value;
  let email = formCV.email.value;
  let phone = formCV.phone.value;
  let address = formCV.address.value;
  let job = formCV.job.value;
  let objectives = getValueByName("objectives");
  let expYear = getValueByName("expYear");
  let expValues = getValueByName("expValue");
  let exp = [];
  for (let i = 0; i < expValues.length; i++) {
    exp.push({
      year: expYear[i],
      value: expValues[i],
    });
  }
  let c1 = formCV.c1 != undefined ? formCV.c1.value : "";
  let c2 = formCV.c2 != undefined ? formCV.c2.value : "";
  let c3 = formCV.c3 != undefined ? formCV.c3.value : "";
  let dh = formCV.dh != undefined ? formCV.dh.value : "";
  importSchools("Cấp 1", c1, "Tiểu học");
  importSchools("Cấp 2", c2, "Trung học");
  importSchools("Cấp 3", c3, "Trung học phổ thông");
  importSchools("Đại học", dh, "Đại học");
  cv = {
    name: name,
    avatar: avatar,
    gender: gender,
    date: date,
    phone: phone,
    email: email,
    address: address,
    job: job,
    objectives: objectives,
    exp: exp,
    schools: schools,
  };
  saveLocalStorage();
  window.location.href = "http://127.0.0.1:5503/html/cv/cvCreate.html";
}
function saveLocalStorage() {
  localStorage.setItem("cv", JSON.stringify(cv));
}
function importSchools(key, value, des) {
  let temp = {
    name: key,
    description: des,
    value: value,
  };
  if (temp.value != "") {
    schools.push(temp);
  }
}

function getValueByName(name) {
  let result = [];
  for (element of document.getElementsByName(name)) {
    result.push(element.value);
  }
  return result;
}
