<template>
  <q-page class="q-mt-xl">
    <q-card
      class="q-ma-md"
      style="max-width: 500px; height: 650px; margin: auto"
    >
      <q-card-section class="text-h6 text-center q-mb-md text-weight-bolder">
        <h4>News Buzz</h4>
        <p>Register with the News Buzz</p>
      </q-card-section>
      <q-card-section>
        <!-- Form -->
        <q-form @submit="submitForm" class="q-gutter-lg form-section">
          <q-input
            v-model="username"
            placeholder="Username"
            :rules="userNameRules"
            clearable
          />
          <q-input
            v-model="password"
            :type="isPassword ? 'password' : 'text'"
            placeholder="Password"
            :rules="passwordRules"
          >
            <template v-slot:append>
              <q-icon
                :name="isPassword ? 'visibility_off' : 'visibility'"
                @click="isPassword = !isPassword"
              />
            </template>
          </q-input>
          <q-input
            v-model="confirmPassword"
            :type="isConfirmPassword ? 'password' : 'text'"
            placeholder="Confirm Password"
            :rules="ConfirmPasswordRules"
          >
            <template v-slot:append>
              <q-icon
                :name="isConfirmPassword ? 'visibility_off' : 'visibility'"
                @click="isConfirmPassword = !isConfirmPassword"
              />
            </template>
          </q-input>
          <div class="button-container">
            <q-btn
              type="submit"
              color="primary"
              label="Login"
              class="q-mt-md vertical-bottom"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useNewsStore } from "../stores/news";

const router = useRouter();
const newsStore = useNewsStore();

const username = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const isPassword = ref(true);
const isConfirmPassword = ref(true);

const userNameRules = computed(() => {
  return [(val) => !!val || "Name is required"];
});

const passwordRules = computed(() => {
  return [
    (val) => !!val || "Password is required",
    (val) =>
      (val && val.length >= 6) || "Password must be at least 6 characters",
  ];
});

const ConfirmPasswordRules = computed(() => {
  return [
    (val) => !!val || "Confirm Password is required",
    (val) => val === password.value || "Passwords do not match",
  ];
});

const submitForm = () => {
  newsStore.setUserName(username.value);
  newsStore.setRestrictDirectAccessFlag(false);
  router.push({
    name: "news-feed",
  });
};
</script>
  
  <style>
.form-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.button-container {
  margin-top: auto;
  display: flex;
  justify-content: center;
}
</style>
  