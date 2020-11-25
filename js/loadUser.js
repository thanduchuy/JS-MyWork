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
getJob().then((list) => {
  list.map((item) => {
    displayHtml += `<div class="col-lg-6 col-xl-4">
        <div class="card card-default p-4">
          <a
            href="javascript:0"
            class="media text-secondary"
            data-toggle="modal"
            data-target="#modal-contact"
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
});
