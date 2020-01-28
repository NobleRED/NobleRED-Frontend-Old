import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AdminCampaigns from "../views/admin/AdminCampaigns.vue";
import AdminBloodDonationPosts from "../views/admin/AdminBloodDonationPosts.vue";
import AdminDonors from "../views/admin/AdminDonors.vue";
import AdminOrganizers from "../views/admin/AdminOrganizers.vue";
import AdminCharts from "../views/admin/AdminCharts.vue";
import AdminMap from "../components/Map-admin.vue";

import DonorSignupForm from "../views/donor/DonorSignupForm.vue";
import NewCampaignForm from "../components/NewCampaignForm.vue";
import NewBloodDonationForm from "../components/NewBloodDonationForm.vue";
import BloodNeedPosts from "../views/BloodNeedPosts.vue";
import Loginform from "../components/Loginform.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Loginform
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
    path: "/admin/organizers",
    name: "adminOrganizers",
    component: AdminOrganizers
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
    path: "/admin/BloodDonationPosts",
    name: "adminBloodDonationPost",
    component: AdminBloodDonationPosts
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
  },
  {
    path: "/donor/newcampaign",
    name: "newCampaign",
    component: NewCampaignForm
  },

  {
    path: "/bloodDonation", //newly added component,router path settings pending
    Name: "bloodDonation",
    component: NewBloodDonationForm
  },
  {
    path: "/bloodNeedPost", //newly added component for show blood need post to every one
    name: "bloodNeedPost",
    component: BloodNeedPosts
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
