import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AdminCampaigns from "../views/admin/AdminCampaigns.vue";
import AdminBloodDonationPosts from "../views/admin/AdminBloodDonationPosts.vue";
import AdminDonors from "../views/admin/AdminDonors.vue";
import AdminOrganizers from '../views/admin/AdminOrganizers.vue'
import AdminCharts from "../views/admin/AdminCharts.vue";
import AdminChartsDonor from "../views/admin/AdminChartsDonor.vue";
import AdminChartsCampaign from "../views/admin/AdminChartsCampaign.vue";
import AdminMap from "../components/Map-admin.vue";

import AdminOrganizers from "../views/admin/AdminOrganizers.vue";


import DonorSignupForm from "../views/donor/DonorSignupForm.vue";
import NewAdminForm from '../views/admin/NewAdminForm.vue'
import NewOrganizerForm from '../views/organizer/NewOrganizerForm.vue'
import NewCampaignForm from "../components/NewCampaignForm.vue";
import NewBloodDonationForm from "../components/NewBloodDonationForm.vue";
import NewOrganizerForm from "../components/NewOrganizerForm.vue";
import BloodNeedPosts from "../views/BloodNeedPosts.vue";
import CampaignPosts from "../views/CampaignPosts.vue";
import Loginform from "../components/Loginform.vue";

import UserProfile from '../components/UserProfile.vue'
import VisitorMap from '../views/visitor/VisitorMap.vue'


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
    components: {
      default: AdminCharts,
      donor: AdminChartsDonor
    }
  },
  {
    path: "/admin/charts",
    name: "adminCharts",
    component: AdminCharts,
    children: [
      {
        path: "donor",
        component: AdminChartsDonor
      }
    ]
  },
  {
    path: "/admin/charts",
    name: "adminCharts",
    component: AdminCharts,
    children: [
      {
        path: "campaign",
        component: AdminChartsCampaign
      }
    ]
  },
  {
    path: "/admin/map",
    name: "adminMap",
    component: AdminMap
  },
  {
    path: "/admin/organizers",
    name: "adminOrganizers",
    component: AdminOrganizers
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
    path: "/newCampaignForm",
    name: "newCampaign",
    component: NewCampaignForm

  },
  {
    path: "/newOrganizerForm",
    name: "newOrganizerForm",
    component: NewOrganizerForm

  },
  {
    path: "/newAdminForm",
    name: "newAdminForm",
    component: NewAdminForm


  },
  {
    path: "/newBloodDonationForm", //newly added component,router path settings pending
    Name: "bloodDonation",
    component: NewBloodDonationForm
  },
  {
    path: "/bloodNeedPost", //newly added component for show blood need post to every one
    name: "bloodNeedPost",
    component: BloodNeedPosts
  },
  {
    path: "/campaignPosts", //newly added component for show blood need post to every one
    name: "campaignPosts",
    component: CampaignPosts
  },
  {
    path: "/userProfile", //newly added component for show blood need post to every one
    name: "userProfile",
    component: UserProfile
  },
  {
    path: "/visitor/map", //show map to visitors
    name: "visitorMap",
    component: VisitorMap
  }
  // {
  //   path: "/admin/charts/donor", //newly added component for show blood need post to every one
  //   name: "adminDonorCharts",
  //   component: akila
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
