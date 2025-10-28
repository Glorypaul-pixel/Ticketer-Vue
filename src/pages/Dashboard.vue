<template>
  <div>
    <h2>Dashboard</h2>
    <div class="grid stats">
      <div class="card stat">
        <h3>Total tickets</h3>
        <p class="big">{{ total }}</p>
      </div>
      <div class="card stat">
        <h3>Open</h3>
        <p class="big">{{ open }}</p>
      </div>
      <div class="card stat">
        <h3>In progress</h3>
        <p class="big">{{ progress }}</p>
      </div>
      <div class="card stat">
        <h3>Resolved</h3>
        <p class="big">{{ closed }}</p>
      </div>
    </div>

    <div style="margin-top: 20px">
      <RouterLink to="/tickets" class="btn">Manage tickets</RouterLink>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { listTickets } from "../services/tickets";

export default {
  setup() {
    const tickets = listTickets();
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "open").length;
    const progress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;
    return { total, open, progress, closed };
  },
};
</script>
