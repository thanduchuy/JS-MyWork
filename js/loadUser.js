function getJob() {
  return new Promise((resolve, reject) => {
    let listJob = [];
    db.collection("JobApplication")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          let job = {
            id: doc.id,
            cv: doc.data().cv,
            date: doc.data().date,
            email: doc.data().email,
            phone: doc.data().phone,
            wage: doc.data().wage,
            position: doc.data().position,
            status: doc.data().status,
            name: doc.data().name,
          };
          listJob.push(job);
        });
        resolve(listJob);
      });
  });
}

let displayHtml = "";
const list = getJob().then((list) => {
  list.map((item, index) => {
    displayHtml += `<div class="col-lg-6 col-xl-4">
        <div class="card card-default p-4">
          <a
            href="javascript:0"
            class="media text-secondary"
            onclick="openModal(${index})"
          >
            <img
              src=${item.cv}
              class="mr-3 img-fluid rounded"
              alt="Avatar Image"
              width="100px"
            />
            <div class="media-body">
              <h5 class="mt-0 mb-2 text-dark">${item.name}</h5>
              <ul class="list-unstyled">
                <li class="d-flex mb-1">
                  <i class="mdi mdi-map mr-1"></i>
                  <span>${item.date}</span>
                </li>
                <li class="d-flex mb-1">
                  <i class="mdi mdi-email mr-1"></i>
                  <span>${item.email}</span>
                </li>
                <li class="d-flex mb-1">
                  <i class="mdi mdi-phone mr-1"></i>
                  <span>${item.phone}</span>
                </li>
              </ul>
            </div>
          </a>
        </div>
        </div>`;
  });

  document.querySelector("#listUser").innerHTML = displayHtml;
  return list;
});
console.log(list);
const openModal = (index) => {
  document.querySelector("#modal").value = ``;
};

<div class="modal-dialog modal-dialog-centered modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header justify-content-end border-bottom-0">
      <button
        type="button"
        class="btn-edit-icon"
        data-dismiss="modal"
        aria-label="Close"
      >
        <i class="mdi mdi-pencil"></i>
      </button>
      <div class="dropdown">
        <button
          class="btn-dots-icon"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="mdi mdi-dots-vertical"></i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right"
          aria-labelledby="dropdownMenuButton"
        >
          <a class="dropdown-item" href="#">
            Action
          </a>
          <a class="dropdown-item" href="#">
            Another action
          </a>
          <a class="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>
      <button
        type="button"
        class="btn-close-icon"
        data-dismiss="modal"
        aria-label="Close"
      >
        <i class="mdi mdi-close"></i>
      </button>
    </div>
    <div class="modal-body pt-0">
      <div class="row no-gutters">
        <div class="col-md-6">
          <div class="profile-content-left px-4">
            <div class="card text-center widget-profile px-0 border-0">
              <div class="card-img mx-auto rounded-circle">
                <img src="assets/img/user/u6.jpg" alt="user image" />
              </div>
              <div class="card-body">
                <h4 class="py-2 text-dark">Albrecht Straub</h4>
                <p>Albrecht.straub@gmail.com</p>
                <a class="btn btn-primary btn-pill btn-lg my-4" href="#">
                  Follow
                </a>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="text-center pb-4">
                <h6 class="text-dark pb-2">1503</h6>
                <p>Friends</p>
              </div>
              <div class="text-center pb-4">
                <h6 class="text-dark pb-2">2905</h6>
                <p>Followers</p>
              </div>
              <div class="text-center pb-4">
                <h6 class="text-dark pb-2">1200</h6>
                <p>Following</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="contact-info px-4">
            <h4 class="text-dark mb-1">Contact Details</h4>
            <p class="text-dark font-weight-medium pt-4 mb-2">Email address</p>
            <p>Albrecht.straub@gmail.com</p>
            <p class="text-dark font-weight-medium pt-4 mb-2">Phone Number</p>
            <p>+99 9539 2641 31</p>
            <p class="text-dark font-weight-medium pt-4 mb-2">Birthday</p>
            <p>Nov 15, 1990</p>
            <p class="text-dark font-weight-medium pt-4 mb-2">Event</p>
            <p>Lorem, ipsum dolor</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
