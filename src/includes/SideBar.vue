<template>
    <div class="bg-light p-4" style="height: 100vh;">
      <router-link to="/" class="d-block mb-3 sidebar-link" :class="{ 'active': $route.path === '/my-recording' }">
        <div class="row">
            <div class="col-1"> <i class="fas fa-film mr-2"></i> </div>
            <div class="col-10">  My Recording</div>
        </div>
    </router-link>
      <router-link to="/requested" class="d-block sidebar-link" :class="{ 'active': $route.path === '/requested' }">
        <div class="row">
            <div class="col-1"> <i class="fas fa-diagram-project"></i> </div>
            <div class="col-10"> Requested</div>
        </div>

       
      
    </router-link>
    </div>
  </template>
  <style>
  .border-right{
    border-right: 1px solid #dee2e6;
  }

  .sidebar-link {
  display: block;
  padding: 10px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.3s;
}

.sidebar-link:hover {
  background-color: #ddd;
  border-radius: 5px;
  border: 1px solid #0DABD838;
}

.sidebar-link.active {
  background-color: #E2E5ED;
  border-radius: 5px;
  border: 1px solid #0DABD838;
}
  </style>