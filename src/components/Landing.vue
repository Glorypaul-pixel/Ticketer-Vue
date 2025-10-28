<template>
  <section class="hero">
    <div class="hero-inner container">
      <div class="hero-content">
        <h1>TicketApp</h1>
        <p class="tagline">
          Manage support tickets with speed — create, track, and resolve.
        </p>
        <div class="cta">
          <RouterLink to="/auth/login" class="btn">Login</RouterLink>
          <RouterLink to="/auth/signup" class="btn btn-outline"
            >Get Started</RouterLink
          >
        </div>
      </div>
      <div class="hero-visual" aria-hidden>
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <img :src="heroWave" alt="wave" class="hero-wave" />
      </div>
    </div>

    <div class="features container">
      <div class="card">
        <h3>Fast Ticketing</h3>
        <p>
          Quickly create and assign tickets with validation and status tracking.
        </p>
      </div>
      <div class="card">
        <h3>Secure Sessions</h3>
        <p>Auth simulated with secure session tokens in localStorage.</p>
      </div>
      <div class="card">
        <h3>Accessible</h3>
        <p>
          Built with semantic HTML, visible focus, and color contrast in mind.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroWave from "../assets/hero-wave.svg";
</script>
