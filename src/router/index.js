import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AdminCampaigns from "../views/admin/AdminCampaigns.vue";
import AdminDonors from "../views/admin/AdminDonors.vue";
import AdminCharts from "../views/admin/AdminCharts.vue";
import AdminMap from "../components/Map.vue";

import DonorSignupForm from "../views/donor/DonorSignupForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/admin/campaigns",
    name: "adminCampaigns",
    component: AdminCampaigns
  },
  {
    path: "/admin/donors",
    name: "adminDonors",
    component: AdminDonors
  },
  {
    path: "/admin/charts",
    name: "adminCharts",
    component: AdminCharts
  },
  {
    path: "/admin/map",
    name: "adminMap",
    component: AdminMap
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/donor/signup",
    name: "donorSignup",
    component: DonorSignupForm
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
