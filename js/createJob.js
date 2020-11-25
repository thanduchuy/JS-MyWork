var db = firebase.firestore();
function createJob() {
  let jobName = document.querySelector("#jobName").value;
  let jobDesc = document.querySelector("#jobDesc").value;
  let jobSalary = document.querySelector("#jobSalary").value;
  let jobReq = document.querySelector("#jobReq").value;
  let jobQl = document.querySelector("#jobQl").value;
  let jobYc = document.querySelector("#jobYc").value;
  let jobHs = document.querySelector("#jobHs").value;
  let gender = document.querySelector("#gender").value;
  let jobAge = document.querySelector("#jobAge").value;
  let jobAddress = document.querySelector("#jobAddress").value;
  let nameCompany = document.querySelector("#nameCompany").value;
  let imageCompany = URL.createObjectURL(
    document.querySelector("#imageCompany").files[0]
  );
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  if (
    jobSalary &&
    jobDesc &&
    jobReq &&
    jobAddress &&
    jobName &&
    jobAge &&
    nameCompany &&
    imageCompany &&
    gender &&
    jobQl &&
    jobYc &&
    jobHs
  ) {
    addJobCollection({
      nameJob: jobName,
      jobDesc: jobDesc,
      jobReq: jobReq,
      nameCompany,
      salary: jobSalary,
      status: "",
      location: jobAddress,
      datePost: today,
      nameCompany,
      gender,
      jobQl,
      jobYc,
      jobHs,
      imageCompany: "https://source.unsplash.com/featured/?logo",
    });
    document.querySelector("#jobName").value = "";
    document.querySelector("#jobDesc").value = "";
    document.querySelector("#jobSalary").value = null;
    document.querySelector("#jobReq").value = null;
    document.querySelector("#jobAge").value = null;
    document.querySelector("#jobAddress").value = null;
    document.querySelector("#nameCompany").value = null;
    document.querySelector("#imageCompany").value = null;
  } else {
    document.querySelector("#joberorr").style.display = "block";
  }
}
function addJobCollection(jobs) {
  db.collection("Jobs")
    .add({ ...jobs })
    .then(function (docRef) {
      db.collection("detailjobs").add({
        jobId: docRef.id,
        jobDesc: jobs.jobDesc,
        jobReq: jobs.jobReq,
        gender: jobs.gender,
        jobQl: jobs.jobQl,
        jobYc: jobs.jobYc,
        jobHs: jobs.jobHs,
      });
      alert("Thêm công việc thành công");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}
