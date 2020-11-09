// let user=[
//     {
//         active : true,
//         email : "nacu22984@gmail.com",
//         id : 1,
//         name: "Le Thi Hong Nhung",
//         pass :"ditmemay_thang_lz_thay",
//         phone: "01234314414",
//         role: "admin" 
//     },
//     {
//         active : true,
//         email : "someOne@gmail.com",
//         id : 2,
//         name: "Ton That  Hoang Vu",
//         pass :"ditmemay_thang_lz_thay",
//         phone: "0834314414",
//         role: "admin" 
//     },
//     {
//         active : true,
//         email : "someOne222@gmail.com",
//         id : 3,
//         name: "Ai Do Deo Biet",
//         pass :"ditmemay_thang_lz_thay",
//         phone: "0123441454",
//         role: "admin" 
//     }
// ]
// localStorage.setItem("user", JSON.stringify(user));

function loadData(){
    listUser()
}
function getDataUser() {
    let users = JSON.parse(localStorage.getItem("user"));
    return users;
}
function saveLocalStorage(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function listUser() {
    listUser = getDataUser()
    var showUser = formatArray(listUser);
    document.getElementById("user-item").innerHTML = showUser.join("");
}

function getUserById(id) {
    listUser = getDataUser()
    list = []
    for(var i = 0; i < listUser.length; i++){
        if(listUser[i].id == id){
             list.push(listUser[i])
        }
    }
    return list
}

function eventEdit(id){
    user = getUserById(id)
    var showUser = showUserToEdit(user);
    document.getElementById("exampleModal").innerHTML = showUser.join("");
}

function showUserToEdit(user){
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
                                    <input type="text" class="form-input" value="${element.id}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Name: </label>
                                    <input type="text" class="form-input" value="${element.name}">
                                </div>
                                <div class="form-group">
                                    <label for="name" class="form-label">Password: </label>
                                    <input type="text" class="form-input" value="${element.pass}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Email: </label>
                                    <input type="text" class="form-input"   value="${element.email}">
                                </div>
                                <div class="form-group">
                                    <label for="price" class="form-label">Phone: </label>
                                    <input type="text" class="form-input"  value="${element.phone}">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-dismiss="modal">Save</button>
                                </div>							
                            </form>
                        </div>	
                    </div>
            </div>`;
      });
      return renderUser;
}

function formatArray(listUser) {
    var renderUser = listUser.map((element, index) => {
      return `<tr>
      <td>${element.id}</td>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
      <td>
          <button type="button" class="btn btn-primary" data-toggle="modal"
              data-target="#exampleModal"
              onclick="eventEdit(${element.id})">Edit</button>
          <!-- Modal ADD DATA -->
          <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
        </div>
          <button type="button" class="btn btn-primary">
              Delete
          </button>
      </td>
  </tr>
      `;
    });
    return renderUser;
}

