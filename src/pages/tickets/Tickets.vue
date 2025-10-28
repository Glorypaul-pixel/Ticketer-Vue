<script setup>
import { ref } from "vue";
import { listTickets, deleteTicket } from "../../services/tickets";
import { useRouter } from "vue-router";

const tickets = ref(listTickets());
const router = useRouter();

function edit(id) {
  router.push(`/tickets/${id}/edit`);
}

function remove(id) {
  if (!confirm("Delete this ticket? This action cannot be undone.")) return;
  try {
    deleteTicket(id);
    tickets.value = listTickets();
    alert("Ticket deleted");
  } catch (_) {
    alert("Failed to delete ticket. Please retry.");
  }
}

function statusLabel(s) {
  return s === "open" ? "Open" : s === "in_progress" ? "In Progress" : "Closed";
}

function statusClass(s) {
  return s === "open" ? "status-open" : s === "in_progress" ? "status-progress" : "status-closed";
}
</script>
