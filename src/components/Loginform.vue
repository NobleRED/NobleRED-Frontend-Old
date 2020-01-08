<template>
  <v-container>
    <v-card class="mx-auto" max-width="400">
      <v-img src="../assets/login card header.jpg"></v-img>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              name="username"
              label="Username"
              placeholder="abc@example.com"
              id="username"
              type="text"
              required
              outlined
              style="background-color: transparent;"
              small
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              name="password"
              label="Password"
              placeholder="***********"
              id="password"
              type="password"
              required
              outlined
              style="background-color: transparent;"
              small
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn type="submit" @click="onSubmit" color="primary">Submit</v-btn>
            <v-btn @click="reset" color="error" class="ml-2">Reset</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Loginform"
};
</script>