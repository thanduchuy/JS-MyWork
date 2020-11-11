function createJob() {
  let jobName = document.querySelector("#jobName").value;
  let jobDesc = document.querySelector("#jobDesc").value;
  let jobSalary = document.querySelector("#jobSalary").value;
  let jobReq = document.querySelector("#jobReq").value;
  let jobAge = document.querySelector("#jobAge").value;
  let jobAddress = document.querySelector("#jobAddress").value;
  let nameCompany = document.querySelector("#nameCompany").value;
  let imageCompany = document.querySelector("#imageCompany").value;
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
    imageCompany
  ) {
    let allJobs = [...JSON.parse(localStorage.getItem("allJobs"))];
    allJobs.push({
      nameJob: jobName,
      nameCompany,
      salary: jobSalary,
      career: "Bỏ đi",
      location: jobAddress,
      datePost: today,
      nameCompany,
      imageCompany,
    });
    console.log(allJobs);
    localStorage.setItem("allJobs", JSON.stringify(allJobs));
  } else {
    document.querySelector("#joberorr").style.display = "block";
  }
}
