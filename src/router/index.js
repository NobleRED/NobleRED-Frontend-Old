import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import AdminCampaigns from "../views/admin/AdminCampaigns.vue";
import AdminBloodDonationPosts from "../views/admin/AdminBloodDonationPosts.vue";

import AdminAdmins from "../views/admin/AdminAdministrators.vue";
import AdminDonors from "../views/admin/AdminDonors.vue";
import AdminOrganizers from "../views/admin/AdminOrganizers.vue";
import AdminCharts from "../views/admin/AdminCharts.vue";
import AdminChartsDonor from "../views/admin/AdminChartsDonor.vue";
import AdminChartsCampaign from "../views/admin/AdminChartsCampaign.vue";
import AdminMap from "../components/Map-admin.vue";

import DonorSignupForm from "../views/donor/DonorSignupForm.vue";
import NewAdminForm from "../views/admin/NewAdminForm.vue";
import NewOrganizerForm from "../views/organizer/NewOrganizerForm.vue";
import NewCampaignForm from "../components/NewCampaignForm.vue";
import NewBloodDonationForm from "../components/NewBloodDonationForm.vue";

import BloodNeedPosts from "../views/BloodNeedPosts.vue";
import CampaignPosts from "../views/CampaignPosts.vue";
import Loginform from "../components/Loginform.vue";

import UserProfile from "../components/userProfile.vue";
import VisitorMap from "../views/visitor/VisitorMap.vue";

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
    component: Loginform,
    beforeEnter: (to, from, next) => {
      if (localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/campaigns",
    name: "adminCampaigns",
    component: AdminCampaigns,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/admins",
    name: "adminAdministrators",
    component: AdminAdmins,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('role') == 'Organizer') {
        next('/')
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/donors",
    name: "adminDonors",
    component: AdminDonors,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/organizers",
    name: "adminOrganizers",
    component: AdminOrganizers,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/charts",
    name: "adminCharts",
    components: {
      default: AdminCharts,
      donor: AdminChartsDonor
    },
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
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
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
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
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/charts",
    name: "adminCharts",
    component: AdminCharts,
    children: [
      {
        path: "organizers",
        component: AdminOrganizers
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/map",
    name: "adminMap",
    component: AdminMap,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/admin/organizers",
    name: "adminOrganizers",
    component: AdminOrganizers
  },
  {
    path: "/admin/BloodDonationPosts",
    name: "adminBloodDonationPost",
    component: AdminBloodDonationPosts,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
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
    path: "/newDonorForm",
    name: "donorSignup",
    component: DonorSignupForm
  },
  {
    path: "/newCampaignForm",
    name: "newCampaign",
    component: NewCampaignForm,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/newOrganizerForm",
    name: "newOrganizerForm",
    component: NewOrganizerForm,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/newAdminForm",
    name: "newAdminForm",
    component: NewAdminForm,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/newBloodDonationForm", //newly added component,router path settings pending
    Name: "bloodDonation",
    component: NewBloodDonationForm,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/bloodNeedPost", //newly added component for show blood need post to every one
    name: "bloodNeedPost",
    component: BloodNeedPosts
  },
  {
    path: "/campaignPosts",
    name: "campaignPosts",
    component: CampaignPosts
  },
  {
    path: "/userProfile", //newly added component for show blood need post to every one
    name: "userProfile",
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      if (!localStorage.loginstatus) {
        next("/");
      } else {
        next();
      }
    }
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
