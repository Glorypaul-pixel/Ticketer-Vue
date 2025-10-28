<template>
  <div class="app-root">
    <header class="site-header">
      <div class="container">
        <div class="brand"><RouterLink to="/">TicketApp</RouterLink></div>
        <nav class="nav">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink v-if="session?.token" to="/dashboard"
            >Dashboard</RouterLink
          >
          <RouterLink v-if="session?.token" to="/tickets">Tickets</RouterLink>
        </nav>
        <div class="auth">
          <RouterLink
            v-if="!session?.token"
            to="/auth/login"
            class="btn btn-ghost"
            >Login</RouterLink
          >
          <div v-else>
            <span class="user">{{ session.user?.email }}</span>
            <button class="btn btn-danger" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <main class="container main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>
          © {{ new Date().getFullYear() }} TicketApp — accessible ticket
          management
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { getSession, clearSession } from "../services/session";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const session = getSession();
    function handleLogout() {
      clearSession();
      router.push("/");
    }
    return { session, handleLogout };
  },
};
</script>
