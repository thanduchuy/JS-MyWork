localStorage.setItem(
  "cvSent",
  JSON.stringify([
    {
      cvImage:
        "https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg",
      email: "thanduchuyz299@gmail.com",
      id: "CV1",
      idEmployer: "U000",
      idUser: "u1",
      name: "Đức Huy",
      phone: "0387771904",
    },
  ])
);
let users = JSON.parse(localStorage.getItem("cvSent")) || [];
let displayHtml = "";
users.map((item) => {
  displayHtml += `<div class="col-lg-6 col-xl-4">
    <div class="card card-default p-4">
      <a
        href="javascript:0"
        class="media text-secondary"
        data-toggle="modal"
        data-target="#modal-contact"
      >
        <img
          src=${item.cvImage}
          class="mr-3 img-fluid rounded"
          alt="Avatar Image"
          width="100px"
        />
        <div class="media-body">
          <h5 class="mt-0 mb-2 text-dark">${item.name}</h5>
          <ul class="list-unstyled">
            <li class="d-flex mb-1">
              <i class="mdi mdi-map mr-1"></i>
              <span>Nulla vel metus 15/178</span>
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
