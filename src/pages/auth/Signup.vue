<script setup>
import { ref } from "vue";
import { login } from "../../services/auth"; // or signup
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const confirm = ref(""); // only for signup
const errors = ref({});
const router = useRouter();

function validate() {
  const e = {};
  if (!email.value) e.email = "Email is required";
  if (!password.value) e.password = "Password is required";
  if (password.value && password.value.length < 8) e.password = "Password must be at least 8 characters";
  if (confirm && password.value !== confirm.value) e.confirm = "Passwords do not match";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  try {
    // login() or signup() call
    router.push("/dashboard");
    alert("Action successful");
  } catch (err) {
    alert("Action failed: " + (err.message || "Please retry"));
  }
}
</script>
