function load() {
  sessionStorage.setItem(
    "userLogin",
    JSON.stringify({
      active: false,
      email: "thanduchuyz299@gmail.com",
      id: "u1",
      name: "Đức Huy",
      pass: "huy123",
      phone: "0387771904",
      role: "user",
    })
  );

  let user = JSON.parse(sessionStorage.getItem("userLogin"));
  document.querySelector("#userAccount").innerHTML = `
    <button
    href="#"
    class="dropdown-toggle nav-link"
    data-toggle="dropdown"
  >
    <img
      src="assets/img/user/user.png"
      class="user-image"
      alt="User Image"
    />
    <span class="d-none d-lg-inline-block">${user.name}</span>
  </button>
  <ul class="dropdown-menu dropdown-menu-right">
    <!-- User image -->
    <li class="dropdown-header">
      <img
        src="assets/img/user/user.png"
        class="img-circle"
        alt="User Image"
      />
      <div class="d-inline-block">
      ${user.name}
        <small class="pt-1">${user.email}</small>
      </div>
    </li>

    <li>
      <a href="user-profile.html">
        <i class="mdi mdi-account"></i> My Profile
      </a>
    </li>
    <li>
      <a href="#"> <i class="mdi mdi-email"></i> Message </a>
    </li>
    <li>
      <a href="#">
        <i class="mdi mdi-diamond-stone"></i> Projects
      </a>
    </li>
    <li class="right-sidebar-in">
      <a href="javascript:0">
        <i class="mdi mdi-settings"></i> Setting
      </a>
    </li>

    <li class="dropdown-footer">
      <a href="index.html">
        <i class="mdi mdi-logout"></i> Log Out
      </a>
    </li>
  </ul>
    `;
}
load();
