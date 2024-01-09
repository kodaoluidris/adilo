<template>
  <div>
    <TopNavBar />
    <div class="row">
      <div class="col-12 d-md-none px-5">
        <button
          class="btn btn-light  mb-2"
          @click="toggleSidebar"
        >
          <span class="fa fa-bars"></span>
        </button>
      </div>
      <div class="col-md-2 d-none d-sm-block bg-light">
        <SideBar v-if="showSidebar" />
      </div>
      <div class="col-md-10 col-sm-12 px-5">
        <router-view />
      </div>
    </div>
  </div>
</template>


<script>
import TopNavBar from './includes/TopNav.vue';
import SideBar from './includes/SideBar.vue';
import { ref } from 'vue';

export default {
  components: {
    TopNavBar,
    SideBar,
  },
  setup() {
    const showSidebar = ref(true);
    const toggleSidebar = () => {
      showSidebar.value = !showSidebar.value;
    }

    return {showSidebar, toggleSidebar }
  }
};
</script>

<style>
/* Add your global styles here */
</style>
