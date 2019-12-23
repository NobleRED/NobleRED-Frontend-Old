<template>
  <v-container>
    <v-card width="100%" height="100%" class>
      <v-toolbar flat color="grey darken-3" dark>
        <v-toolbar-title>Create A Donor Account</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                name="firstName"
                label="First Name"
                placeholder="John"
                id="fname"
                v-model="formData.fname"
                type="text"
                :rules="nameRules"
                required
                outlined
                style="background-color: transparent;"
                small
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                id="lname"
                v-model="formData.lname"
                type="text"
                :rules="nameRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="NIC"
                label="NIC No"
                placeholder="97XXXXXXXV"
                id="nic"
                v-model="formData.nic"
                type="text"
                :rules="nicRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="dob"
                label="Date of Birth"
                id="dob"
                v-model="formData.dob"
                type="date"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="address"
                label="Address"
                placeholder="Address"
                id="address"
                v-model="formData.inputAddress"
                type="text"
                :rules="adrsRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="contactno"
                label="Contact No"
                placeholder="Contact No"
                v-model="formData.contactNo"
                type="text"
                :rules="phnRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <!-- <p>{{ radios || 'null' }}</p>	 -->
              <v-radio-group label="Gender" v-model="formData.radios" :mandatory="true" row>
                <v-radio label="Male" value="male"></v-radio>
                <v-radio label="Female" value="female"></v-radio>
              </v-radio-group>
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input
                id="img"
                placeholder="Add Image"
                show-size="true"
                chips="true"
                prepend-icon="mdi-camera"
                label="Profile Image"
                outlined
              ></v-file-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="email"
                label="Email"
                placeholder="Email"
                id="email"
                v-model="formData.email"
                type="email"
                :rules="mailRules"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                name="password"
                label="Password"
                placeholder="Password"
                id="password"
                v-model="formData.password"
                type="password"
                :rules="pswdRules"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                id="confirmPassword"
                v-model="formData.password1"
                type="password"
                :rules="[comparePasswords, pswdRules]"
                required
                outlined
              ></v-text-field>
            </v-col>
          </v-row>

          <v-col cols="12" md="6">
            <v-btn type="submit" @click="addDonor" color="primary">Sign up</v-btn>
            <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
          </v-col>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
// import firebase from "../../plugins/firebaseConfig";

// var moment = require("moment");
// moment().format();

export default {
  name: "DonorSignupForm",
  data() {
    return {
      formData: {
        uidtemp: "",
        fname: "",
        lname: "",
        nic: "",
        dob: "",
        inputAddress: "",
        contactNo: "",
        radios: "",
        img: "",
        email: "",
        password: "",
        password1: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 20 || "Name must be less than 20 characters"
      ],
      nicRules: [
        v => !!v || "NIC is required",
        v =>
          /^(\d).(\w(v?))/.test(v) || "NIC must include digits, may include v"
      ],
      adrsRules: [v => !!v || "Address is required"],
      phnRules: [
        v => !!v || "Contact no is required",
        v => /\d{10}/.test(v) || "Contact No must have 10 digits"
      ],
      mailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      pswdRules: [v => !!v || "Password is required"]
    };
  },
  computed: {
    comparePasswords() {
      return this.formData.password !== this.formData.password1
        ? "Passwords do not match"
        : "";
    }
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    }
    // addDonor() {
    //   event.preventDefault();
    //   var now = moment().format();
    //   axios
    //     .post("http://localhost:4200/api/signup/donor", {
    //       firstName: this.$data.fname,
    //       lastName: this.$data.lname,
    //       nic: this.$data.nic,
    //       dob: this.$data.dob,
    //       address: this.$data.inputAddress,
    //       contactNo: this.$data.contactNo,
    //       radios: this.$data.radios,
    //       img: this.$data.img,
    //       email: this.$data.email,
    //       password: this.$data.password
    //     })
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
    //////////////////////
    //   var uidTemp = "";
    //   var sendToLogin = false;
    //   firebase.auth
    //     .createUserWithEmailAndPassword(
    //       this.formData.email,
    //       this.formData.password
    //     )
    //     .then(function(data) {
    //       console.log("uid", data.user.uid);
    //       uidTemp = data.user.uid;
    //       sendToLogin = true;
    //       var r = confirm("Error in sign up!");
    //       if (r == true) {
    //         this.$router.push("/login");
    //       } else {
    //         this.$router.push("/signup/donor");
    //       }
    //     })
    //     .catch(function(error) {
    //       // Handle Errors here.
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       // ...
    //       console.log("Error occured : ", errorMessage);
    //     });
    //   console.log(sendToLogin);
    //   if (sendToLogin == true) {
    //     firebase.db
    //       .collection("users")
    //       .doc("donors")
    //       .collection("donors")
    //       .add({
    //         uid: uidTemp,
    //         fname: this.formData.fname,
    //         lname: this.formData.lname,
    //         email: this.formData.email,
    //         nic: this.formData.nic,
    //         dob: this.formData.dob,
    //         address: this.formData.inputAddress,
    //         contactNo: this.formData.contactNo,
    //         gender: this.formData.radios,
    //         role: "donor",
    //         status: "1",
    //         createdAt: now
    //       })
    //       .then(function(docRef) {
    //         console.log("Document written with ID: ", docRef.id);
    //         this.$router.push("/login");
    //       })
    //       .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //       });
    //   } else {
    //     this.$router.push("/signup/donor");
    //   }
    // }
  }
};
</script>

