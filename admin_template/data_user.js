// let user=[
//     {
//         active : true,
//         email : "nacu22984@gmail.com",
//         id : 1,
//         name: "Le Thi Hong Nhung",
//         pass :"thayGiaoDepTrai",
//         phone: "01234314414",
//         role: "admin" 
//     },
//     {
//         active : true,
//         email : "someOne@gmail.com",
//         id : 2,
//         name: "Ton That  Hoang Vu",
//         pass :"thayGiaoXauTrai",
//         phone: "0834314414",
//         role: "admin" 
//     },
//     {
//         active : true,
//         email : "someOne222@gmail.com",
//         id : 3,
//         name: "Ai Do Deo Biet",
//         pass :"thayGiaoXauTrai",
//         phone: "0123441454",
//         role: "admin" 
//     },
//     {
//         active : true,
//         email : "hhhhh@gmail.com",
//         id : 4,
//         name: "Ai Do Khong Biet",
//         pass :"thayGiaoXauTrai",
//         phone: "0123441454",
//         role: "admin" 
//     },
//     {
//         active : false,
//         email : "aaaaaaaa@gmail.com",
//         id : 5,
//         name: "aaaaaaa",
//         pass :"thayGiaoXauTrai",
//         phone: "0123441454",
//         role: "user" 
//     },
//     {
//         active : false,
//         email : "bbbbbbbbbb@gmail.com",
//         id : 6,
//         name: "bbbbbbb",
//         pass :"thayGiaoXauTrai",
//         phone: "0123441454",
//         role: "user" 
//     }
// ]
// localStorage.setItem("user", JSON.stringify(user));
let intelval
window.onload = loadData
function showData(id) {
    if (intelval) clearInterval(intelval)
    switch (id) {
        case 0:
            var data = showHome()
            document.getElementById("row").innerHTML = data;
            break;
        case 1:
            var data = showCenSoredPost()
            sessionStorage.setItem("categoryId", JSON.stringify(1));
            document.getElementById("row").innerHTML = data;
            break;
        case 2:
            var data = showUnCenSoredPost()
            sessionStorage.setItem("categoryId", JSON.stringify(1));
            document.getElementById("row").innerHTML = data;
            break;
        case 3:
            var data = showCenSoredUser()
            sessionStorage.setItem("categoryId", JSON.stringify(2));
            listUser(3)
            document.getElementById("row").innerHTML = data;
            break;
        case 4:
            var data = showUnCenSoredUser()
            sessionStorage.setItem("categoryId", JSON.stringify(2));
            listUser(4)
            document.getElementById("row").innerHTML = data;
            break;
    }
    const listElement = document.querySelectorAll('a[data-active]')
    listElement.forEach(item => {
        if (item.attributes['data-active'].nodeValue == id) {
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
    })
    // const element = document.querySelector(`a[data-active="${id}"]`).classList.add('active')
}

function loadData() {
    showData(0)
}
function getDataUser() {
    let users = JSON.parse(localStorage.getItem("user"));
    return users;
}
function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function listUser(id) {
    user = getDataUser()
    if (id === 3) {
        var showUser = getUserActive(user);
        intelval = setInterval(() => {
            const element = document.querySelector('#user-item')
            if (element) {
                element.innerHTML = showUser
                clearInterval(intelval)
            }
        }, [500])
    } else {
        var showUser = getUserUnActive(user);
        intelval = setInterval(() => {
            const element = document.querySelector('#user-item')
            if (element) {
                element.innerHTML = showUser
                clearInterval(intelval)
            }
        }, [500])
    }

}

function reloadDataUser() {
    listUser = getDataUser()
    var showUser = getUserActive(listUser);
    document.getElementById("user-item").innerHTML = showUser;
}
function getUserById(id) {
    listUser = getDataUser()
    list = []
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].id == id) {
            list.push(listUser[i])
        }
    }
    return list
}

function eventShowDataEdit(id) {
    user = getUserById(id)
    var showUser = showUserToEdit(user);
    document.getElementById("exampleModal").innerHTML = showUser;
}

function eventDelete(id) {
    listUser = getDataUser()
    list = []
    if (confirm("Do you want to delete this user? ")) {
        for (var i = 0; i < listUser.length; i++) {
            if (listUser[i].id == id) {
                listUser.splice(i, 1);
                localStorage.setItem("user", JSON.stringify(listUser));
            }
        }
        alert(" Delete success! ");
        reloadDataUser()
    }
}

function eventActiveUser(id) {
    listUser = getDataUser()
    list = []
    if (confirm("Do you want to Active this user? ")) {
        for (var i = 0; i < listUser.length; i++) {
            if (listUser[i].id == id) {
                listUser[i].active = true;
                localStorage.setItem("user", JSON.stringify(listUser));
            }
        }
        alert(" Active success! ");
        reloadDataUser()
    }
}

function showUserToEdit(user) {
    var renderUser = user.map((element, index) => {
        return `<div class="modal-dialog" role="document">
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
                                    <label for="name" class="form-label">Password: </label>
                                    <input type="text" class="form-input" id="pass" name="pass" value="${element.pass}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Email: </label>
                                    <input type="text" class="form-input" id="email" name="email" value="${element.email}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Phone: </label>
                                    <input type="text" class="form-input" id="phone" name="phone"  value="${element.phone}">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal" onclick="saveUpdate()" >Save</button>
                                </div>							
                            </form>
                        </div>	
                    </div>
            </div>`;
    });
    return renderUser;
}

function getUserActive(listUser) {
    list = []
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].active == true) {
            list.push(listUser[i])
        }
    }
    var renderUser = (list || []).map((element, index) => {
        return `<tr>
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal"
              onclick="eventShowDataEdit(${element.id})">Edit</button>
          <!-- Modal ADD DATA -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
        </div>
          <button type="button" class="btn btn-primary" onclick="eventDelete(${element.id})">
              Delete
          </button>
      </td>
  </tr>
      `;
    });
    return renderUser.join('');
}

function getUserSearch(listUser) {
    var renderUser = (listUser || []).map((element, index) => {
        return `<tr>
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal"
              onclick="eventShowDataEdit(${element.id})">Edit</button>
          <!-- Modal ADD DATA -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
        </div>
          <button type="button" class="btn btn-primary" onclick="eventDelete(${element.id})">
              Delete
          </button>
      </td>
  </tr>
      `;
    });
    return renderUser.join('');
}

function getUserUnActive(listUser) {
    list = []
    for (var i = 0; i < listUser.length; i++) {
        if (listUser[i].active == false) {
            list.push(listUser[i])
        }
    }
    var renderUser = (list || []).map((element, index) => {
        return `<tr>
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" onclick="eventActiveUser(${element.id})">
              Active
          </button>
      </td>
  </tr>
      `;
    });
    return renderUser.join('');
}

function saveUpdate() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var pass = document.getElementById("pass").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    
    userData = getDataUser()
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
            userData[i].name = name
            userData[i].pass = pass
            userData[i].email = email
            userData[i].phone = phone
        }
    }
    saveLocalStorage(userData)
    reloadDataUser()
}

function search() {
    var name = form.search.value.toLowerCase();
    console.log(name);
    let categoryId = sessionStorage.getItem("categoryId");
    let list = []
    if (categoryId == 2) {
        userData = getDataUser()
        for (var i = 0; i < userData.length; i++) {
            if(userData[i].name.toLowerCase().includes(name)){
                list.push(userData[i])
            }
        }
        var showUser = getUserSearch(list);
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
    const userData = localStorage.getItem('user')
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
						<th>Id</th>
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
						<th>Id</th>
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
						<th>Id</th>
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

function showUnCenSoredPost() {
    return `<div class="col-8 col-m-12 col-sm-12" style="width: 100%;">
	<div class="card">
		<div class="card-header">
			<h3>
				Data UNCENSORED POST Response
			</h3>
			<i class="fas fa-ellipsis-h"></i>
		</div>
		<div class="card-content">
			<table>
				<thead>
					<tr>
						<th>Id</th>
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
