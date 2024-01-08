<template>
    <div class="my-navbar border p-3">
      <div class="row">
        <div class="col-2"> <img src="@/assets/logo.png" alt="Logo" class="navbar-brand logo mx-4" /></div>
        <div class="col-7">
          <nav class="nav">
            <router-link to="/projects" class="nav-link">Projects</router-link>
            <!-- Add a dropdown menu -->
            <div class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tools & App
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/tools/snapbyte-recorder" class="dropdown-item py-3 border-bottom">Snapbyte Recorder</router-link>
                <router-link to="/tools/audiobounce" class="dropdown-item py-3 border-bottom">AudioBounce</router-link>
                <router-link to="/tools/sugar-voice" class="dropdown-item py-3 ">Sugar Voice</router-link>
              </div>
            </div>
            <router-link to="/channels" class="nav-link">Channels</router-link>
            <router-link to="/contract" class="nav-link">Contacts</router-link>
            <router-link to="/analytics" class="nav-link">Analytics</router-link>
            <router-link to="/settings" class="nav-link">Settings</router-link>
          </nav>
        </div>
        <div class="col-3">
            <nav class="nav">
            <router-link to="/projects" class="nav-link"><b>Help</b></router-link>

            <img src="@/assets/user.png" alt="" class="user-img border-left">
            <span class="user-info">
                Cody Fisher<br>
                codyfisher@gmail.com
            </span>
            </nav>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .logo {
    width: 100px;
    height: auto;
  }
  
  /* Additional style to ensure the navbar links are centered */
  .nav {
    display: flex;
    align-items: center;
  }
  .nav-link {
    color: #888 !important; /* Use the desired grey color */
  }
  .dropdown-item {
    color:#21455E;
  }
  .dropdown-item:hover {
  
    }
    .dropdown-item:hover,
.dropdown-item:focus {
    color: #0DABD8 !important;
    background-color:transparent !important; 
}
.nav-link:hover,
.dropdown:hover .nav-link {
  border-top: 3px solid #0DABD8 !important; 
  border-radius:4px;
  color: #313538 !important;
}
.user-img {
    height: 50px;
    border-left : 1px solid #888;
    padding: 0px 15px;
}
.user-info {
    color: #888 !important;
    font-size:12px;
}
  </style>
  