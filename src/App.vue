<template>
  <div>
    <TopNavBar />
    <div class="row">
      <div class="col-md-2 bg-light">
        <SideBar />
      </div>
      <div class="col-md-10 px-5">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import TopNavBar from './includes/TopNav.vue';
import SideBar from './includes/SideBar.vue';

export default {
  components: {
    TopNavBar,
    SideBar,
  },
};
</script>

<style>
/* Add your global styles here */
</style>
