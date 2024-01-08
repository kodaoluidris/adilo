import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';
// import ProjectsView from './views/ProjectsView.vue';
import ToolsAndAppView from './views/ToolsAndAppView.vue';
import ChannelsView from './views/ChannelsView.vue';
import ContractView from './views/ContractView.vue';
import AnalyticsView from './views/AnalyticsView.vue';
import RecordingView from './views/RecordingView.vue';


const routes = [
  { path: '/', component: HomeView },
  { path: '/recording', component: RecordingView, props:true },
  { path: '/tools-app', component: ToolsAndAppView },
  { path: '/channels', component: ChannelsView },
  { path: '/contract', component: ContractView },
  { path: '/analytics', component: AnalyticsView },
//   { path: '/my-recording', component: MyRecordingView },
//   { path: '/requested', component: RequestedView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
