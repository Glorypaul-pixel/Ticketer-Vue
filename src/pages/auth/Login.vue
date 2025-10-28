<template>
  <div class="auth-card">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" novalidate>
      <label>
        Email
        <input v-model="email" :aria-invalid="!!errors.email" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </label>

      <label>
        Password
        <input type="password" v-model="password" :aria-invalid="!!errors.password" />
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </label>

      <button class="btn" type="submit">Login</button>
      <p>
        Don't have an account?
        <RouterLink to="/auth/signup">Sign up</RouterLink>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { login } from "../../services/auth";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify"; // ← updated import
import "vue3-toastify/dist/index.css";  // ← include styles

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errors = ref({});
    const router = useRouter();

    function validate() {
      const e = {};
      if (!email.value) e.email = "Email is required";
      if (!password.value) e.password = "Password is required";
      errors.value = e;
      return Object.keys(e).length === 0;
    }

    function handleSubmit() {
      if (!validate()) return;
      try {
        login({ email: email.value, password: password.value });
        toast.success("Logged in"); // ← use toast directly
        router.push("/dashboard");
      } catch (err) {
        toast.error("Invalid credentials. Please check email and password.");
      }
    }

    return { email, password, errors, handleSubmit };
  },
};
</script>
