var db = firebase.firestore();
getUserLogged()
  .then((uid) => {
    checkAdmin(uid).then((bool) => {
      if (!bool) {
        location.href = "http://127.0.0.1:5503/html/loginUser.html";
      }
    });
  })
  .catch(() => {
    location.href = "http://127.0.0.1:5503/html/loginUser.html";
  });

function getUserLogged() {
  return new Promise((resove, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resove(user.uid);
      } else {
        reject("NAN");
      }
    });
  });
}

function checkAdmin(uid) {
  return new Promise((resove, reject) => {
    var ref = db.collection("Profile").doc(uid);
    ref
      .get()
      .then(function (doc) {
        if (doc.exists) {
          resove(doc.data().role == "Admin");
        } else {
          reject(false);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  });
}
let intelval;
window.onload = loadData;
let listUserTemp = [];
let listJobItem = [];
function showData(id) {
  if (intelval) clearInterval(intelval);
  switch (id) {
    case 0:
      var data = showHome();
      sessionStorage.setItem("categoryId", JSON.stringify(0));
      document.getElementById("row").innerHTML = data;
      break;
    case 2:
      var data = showCenSoredPost();
      sessionStorage.setItem("categoryId", JSON.stringify(2));
      listJob(2);
      document.getElementById("row").innerHTML = data;
      break;
    case 3:
      var data = showCenSoredUser();
      sessionStorage.setItem("categoryId", JSON.stringify(3));
      listUser(3);
      document.getElementById("row").innerHTML = data;
      break;
    case 4:
      var data = showUnCenSoredUser();
      sessionStorage.setItem("categoryId", JSON.stringify(4));
      listUser(4);
      document.getElementById("row").innerHTML = data;
      break;
  }
  const listElement = document.querySelectorAll("a[data-active]");
  listElement.forEach((item) => {
    if (item.attributes["data-active"].nodeValue == id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  // const element = document.querySelector(`a[data-active="${id}"]`).classList.add('active')
}

function loadData() {
  showData(0);
}

function getDataUser() {
  return new Promise((resove, reject) => {
    let users = [];
    db.collection("Profile")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let user = {
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().phone,
            email: doc.data().email,
            birthday: doc.data().birthday,
            gender: doc.data().gender,
            status: doc.data().status,
            address: doc.data().address,
            city: doc.data().city,
            district: doc.data().district,
            role: doc.data().role,
            active: doc.data().active,
          };
          users.push(user);
        });
        listUserTemp = users;
        resove(users);
      });
  });
}

function getDataJob() {
  return new Promise((resove, reject) => {
    let jobs = [];
    db.collection("Jobs")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let job = {
            id: doc.id,
            career: doc.data().career,
            datePost: doc.data().datePost,
            imageCompany: doc.data().imageCompany,
            location: doc.data().location,
            nameCompany: doc.data().nameCompany,
            nameJob: doc.data().nameJob,
            salary: doc.data().salary,
            status: doc.data().status,
            active: doc.data().active,
          };
          jobs.push(job);
        });
        listJobItem = jobs;
        resove(jobs);
      });
  });
}

function listUser(id) {
  getDataUser().then((user) => {
    if (id === 3) {
      var showUser = getUserActive(user);
      intelval = setInterval(() => {
        const element = document.querySelector("#user-item");
        if (element) {
          element.innerHTML = showUser;
          clearInterval(intelval);
        }
      }, [500]);
    } else {
      var showUser = getUserUnActive(user);
      intelval = setInterval(() => {
        const element = document.querySelector("#user-item");
        if (element) {
          element.innerHTML = showUser;
          clearInterval(intelval);
        }
      }, [500]);
    }
  });
}

function listJob(id) {
  getDataJob().then((user) => {
    if (id === 2) {
      var showUser = getJobActive(user);
      intelval = setInterval(() => {
        const element = document.querySelector("#job-item");
        if (element) {
          element.innerHTML = showUser;
          clearInterval(intelval);
        }
      }, [500]);
    } else {
      var showUser = getJobUnActive(user);
      intelval = setInterval(() => {
        const element = document.querySelector("#job-item");
        if (element) {
          element.innerHTML = showUser;
          clearInterval(intelval);
        }
      }, [500]);
    }
  });
}

function reloadDataUser() {
  getDataUser().then((listUser) => {
    var showUser = getUserActive(listUser);
    document.getElementById("user-item").innerHTML = showUser;
  });
}

function reloadJob() {
  getDataJob().then((listJob) => {
    var showUser = getJobActive(listJob);
    document.getElementById("job-item").innerHTML = showUser;
  });
}

function getUserById(id) {
  return new Promise((resovle, reject) => {
    getDataUser().then((listUser) => {
      list = [];
      for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].id == id) {
          list.push(listUser[i]);
        }
      }
      resovle(list);
    });
  });
}

function eventShowDataEdit(id) {
  getUserById(id).then((user) => {
    var showUser = showUserToEdit(user);
    document.getElementById("exampleModal").innerHTML = showUser;
  });
}

function eventDelete(id) {
  if (confirm("Do you want to delete this user? ")) {
    let element = {};
    for (let i = 0; i < listUserTemp.length; i++) {
      if (listUserTemp[i].id == id) {
        element = listUserTemp[i];
      }
    }
    element.active = false;
    console.log(element);
    db.collection("Profile")
      .doc(id)
      .set({
        name: element.name,
        phone: element.phone,
        email: element.email,
        birthday: element.birthday,
        gender: element.gender,
        status: element.status,
        address: element.address,
        city: element.city,
        district: element.district,
        role: element.role,
        active: element.active,
      })
      .then(function () {
        console.log("Update success !");
      })
      .catch(function (error) {
        console.error("Update Fail: ", error);
      });
    alert(" Delete success! ");
    reloadDataUser();
  }
}

function eventActiveUser(id) {
  if (confirm("Do you want to Acitve this user? ")) {
    let element = {};
    for (let i = 0; i < listUserTemp.length; i++) {
      if (listUserTemp[i].id == id) {
        element = listUserTemp[i];
      }
    }
    element.active = true;
    db.collection("Profile")
      .doc(id)
      .set({
        name: element.name,
        phone: element.phone,
        email: element.email,
        birthday: element.birthday,
        gender: element.gender,
        status: element.status,
        address: element.address,
        city: element.city,
        district: element.district,
        role: element.role,
        active: element.active,
      })
      .then(function () {
        console.log("Update success !");
      })
      .catch(function (error) {
        console.error("Update Fail: ", error);
      });
    alert(" Active User success! ");
    reloadDataUser();
  }
}

function showUserToEdit(user) {
  var renderUser = user.map((element, index) => {
    return `
        <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                            <button type="button" class="close" data-dismiss="modal"
                                aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form action="" class="form" name="form">
                                <div class="form-group">
                                    <label for="price" class="form-label">Id: </label>
                                    <input type="text" class="form-input" id="id" name="id"  value="${element.id}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Name: </label>
                                    <input type="text" class="form-input" id="name" name="name" value="${element.name}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Email: </label>
                                    <input type="text" class="form-input" id="email" name="email" value="${element.email}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Phone: </label>
                                    <input type="text" class="form-input" id="phone" name="phone"  value="${element.phone}">
                                </div>
                                 <div class="form-group">
                                    <label for="name" class="form-label">Active: </label>
                                    <input type="text" class="form-input" id="active" name="active" value="${element.active}">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        onclick="saveUpdate()" data-dismiss="modal" target="_blank" >Save</button>
                                </div>							
                            </form>
                        </div>	
                    </div>
            </div>`;
  });
  return renderUser;
}

function getUserActive(listUser) {
  list = [];
  listUserTemp = listUser;
  for (var i = 0; i < listUser.length; i++) {
    if (listUser[i].active == true) {
      list.push(listUser[i]);
    }
  }
  var renderUser = (list || []).map((element, index) => {
    return `<tr>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal"
              onclick="eventShowDataEdit('${element.id}')">Edit</button>
          <!-- Modal ADD DATA -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        </div>
          <button type="button" class="btn btn-primary" onclick="eventDelete('${element.id}')">
              Delete
          </button>
      </td>
  </tr>
      `;
  });
  return renderUser.join("");
}

function getUserSearchActive(listUser) {
  var renderUser = (listUser || []).map((element, index) => {
    return `<tr>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal"
              onclick="eventShowDataEdit('${element.id}')">Edit</button>
          <!-- Modal ADD DATA -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="false">
        </div>
          <button type="button" class="btn btn-primary" onclick="eventDelete('${element.id}')">
              Delete
          </button>
      </td>
  </tr>
      `;
  });
  return renderUser.join("");
}

function getUserSearchUnActive(listUser) {
  var renderUser = (listUser || []).map((element, index) => {
    return `<tr>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" onclick="eventActiveUser('${element.id}')">
              Active
          </button>
      </td>
  </tr>
      `;
  });
  return renderUser.join("");
}

function getUserUnActive(listUser) {
  list = [];
  for (var i = 0; i < listUser.length; i++) {
    if (listUser[i].active == false) {
      list.push(listUser[i]);
    }
  }
  var renderUser = (list || []).map((element, index) => {
    return `<tr>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" onclick="eventActiveUser('${element.id}')">
              Active
          </button>
      </td>
  </tr>
      `;
  });
  return renderUser.join("");
}

function getJobUnActive(listJob) {
  list = [];
  for (var i = 0; i < listJob.length; i++) {
    if (listJob[i].active == false) {
      list.push(listJob[i]);
    }
  }
  var renderJob = (list || []).map((element, index) => {
    return `<tr>
      <td>${element.nameJob}</td>
      <td>${element.salary}</td>
      <td>${element.status}</td>
      <td>
          <button type="button" class="btn btn-primary" onclick="eventActiveUser('${element.id}')">
              Active
          </button>
      </td>
  </tr>
      `;
  });
  return renderJob.join("");
}

function getJobActive(listJob) {
  console.log(listJob);
  list = [];
  for (var i = 0; i < listJob.length; i++) {
    if (listJob[i].active == true) {
      list.push(listJob[i]);
    }
  }
  console.log(list);
  var renderJob = (list || []).map((element, index) => {
    return `<tr>
      <td>${element.career}</td>
      <td><img src="${element.imageCompany}" style="width: 100px; height: 100px;" alt="User image" class="dropdown-toggle" data-toggle="user-menu"></td>
      <td>${element.location}</td>
      <td>${element.nameCompany}</td>
      <td>
          <button type="button" class="btn btn-primary" onclick="eventUnActivePost('${element.id}')">
              UnActive
          </button>
      </td>
  </tr>
      `;
  });
  return renderJob.join("");
}

function eventUnActivePost(id) {
  if (confirm("Do you want to UnAcitve this Job? ")) {
    let element = {};
    for (let i = 0; i < listJobItem.length; i++) {
      if (listJobItem[i].id == id) {
        element = listJobItem[i];
      }
    }
    element.active = false;
    db.collection("Jobs")
      .doc(id)
      .set({
        career: element.career,
        datePost: element.datePost,
        imageCompany: element.imageCompany,
        location: element.location,
        nameCompany: element.nameCompany,
        nameJob: element.nameJob,
        salary: element.salary,
        status: element.status,
        active: element.active,
      })
      .then(function () {
        console.log("Update success !");
      })
      .catch(function (error) {
        console.error("Update Fail: ", error);
      });
    alert(" UnActive Job success! ");
    reloadJob();
  }
}

function saveUpdate() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var active = document.getElementById("active").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  let element = {};
  for (let i = 0; i < listUserTemp.length; i++) {
    if (listUserTemp[i].id == id) {
      element = listUserTemp[i];
    }
  }
  element.name = name;
  element.active = active == "true";
  element.email = email;
  element.phone = phone;
  db.collection("Profile")
    .doc(id)
    .set({
      name: element.name,
      phone: element.phone,
      email: element.email,
      birthday: element.birthday,
      gender: element.gender,
      status: element.status,
      address: element.address,
      city: element.city,
      district: element.district,
      role: element.role,
      active: element.active,
    })
    .then(function () {
      console.log("Update success !");
    })
    .catch(function (error) {
      console.error("Update Fail: ", error);
    });

  reloadDataUser();
}

function search() {
  var name = form.search.value.toLowerCase();
  console.log(name);
  let categoryId = sessionStorage.getItem("categoryId");
  console.log(categoryId);
  let list = [];
  if (categoryId == 3) {
    for (var i = 0; i < listUserTemp.length; i++) {
      if (
        listUserTemp[i].name.toLowerCase().includes(name) &&
        listUserTemp[i].active == true
      ) {
        list.push(listUserTemp[i]);
      }
    }
    console.log(list);
    var showUser = getUserSearchActive(list);
    document.getElementById("user-item").innerHTML = showUser;
  }
  if (categoryId == 4) {
    for (var i = 0; i < listUserTemp.length; i++) {
      if (
        listUserTemp[i].name.toLowerCase().includes(name) &&
        listUserTemp[i].active == false
      ) {
        list.push(listUserTemp[i]);
      }
    }
    console.log(list);
    var showUser = getUserSearchUnActive(list);
    document.getElementById("user-item").innerHTML = showUser;
  }
}

function showHome() {
  return `<div class="col-8 col-m-12 col-sm-12" style="width: 100%;">
	<div class="card">
		<div class="card-header">
			<h3>
				HOME
			</h3>
			<i class="fas fa-ellipsis-h"></i>
		</div>
		<div>
		<img src="assets/background.png" alt="User image" style="margin-left: 300px;">
		</div>
	</div>
</div>`;
}

function showCenSoredUser() {
  return `<div class="col-8 col-m-12 col-sm-12" style="width: 100%;">
	<div class="card">
		<div class="card-header">
			<h3>
				Data CENSORED User Response
			</h3>
			<i class="fas fa-ellipsis-h"></i>
		</div>
		<div class="card-content">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th style="padding-left: 40px;">Event</th>
					</tr>
				</thead>
                <tbody id="user-item">
				</tbody>
			</table>
		</div>
	</div>
</div>`;
}

function showUnCenSoredUser() {
  return `<div class="col-8 col-m-12 col-sm-12" style="width: 100%;">
	<div class="card">
		<div class="card-header">
			<h3>
				Data UNCENSORED User Response
			</h3>
			<i class="fas fa-ellipsis-h"></i>
		</div>
		<div class="card-content">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th style="padding-left: 40px;">Event</th>
					</tr>
				</thead>
				<tbody id="user-item">
				</tbody>
			</table>
		</div>
	</div>
</div>`;
}

function showCenSoredPost() {
  return `<div class="col-8 col-m-12 col-sm-12" style="width: 100%;">
	<div class="card">
		<div class="card-header">
			<h3>
				Data CENSORED POST Response
			</h3>
			<i class="fas fa-ellipsis-h"></i>
		</div>
		<div class="card-content">
			<table>
				<thead>
					<tr>
						<th>CAREER</th>
						<th>IMAGE</th>
						<th>LOCATION</th>
						<th>NAME COMPANY</th>
						<th style="padding-left: 40px;">Event</th>
					</tr>
				</thead>
				<tbody id="job-item">
				</tbody>
			</table>
		</div>
	</div>
</div>`;
}

function logoutUser() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("sucess");
      location.href = "http://127.0.0.1:5503/html/loginUser.html";
    })
    .catch(function (error) {
      console.log("fail");
    });
}
