<script setup>
import { ref, onMounted } from "vue";
import { createTicket, getTicket, updateTicket } from "../../services/tickets";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const editMode = !!id;

const title = ref("");
const description = ref("");
const status = ref("open");
const priority = ref("");
const errors = ref({});

onMounted(() => {
  if (editMode) {
    const t = getTicket(id);
    if (!t) {
      alert("Failed to load ticket. Please retry.");
      router.push("/tickets");
      return;
    }
    title.value = t.title;
    description.value = t.description;
    status.value = t.status;
    priority.value = t.priority || "";
  }
});

function validate() {
  const e = {};
  if (!title.value || title.value.trim() === "") e.title = "Title is required";
  if (!["open", "in_progress", "closed"].includes(status.value)) e.status = "Invalid status";
  if (description.value && description.value.length > 2000) e.description = "Description too long";
  if (
    priority.value &&
    !(
      ["low", "medium", "high"].includes(priority.value) ||
      (!isNaN(Number(priority.value)) && Number(priority.value) >= 1 && Number(priority.value) <= 5)
    )
  )
    e.priority = "Invalid priority";
  errors.value = e;
  return Object.keys(e).length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  try {
    if (editMode) {
      updateTicket(id, {
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value,
        priority: priority.value || null,
      });
      alert("Ticket updated");
    } else {
      createTicket({
        title: title.value.trim(),
        description: description.value.trim(),
        status: status.value,
        priority: priority.value || null,
      });
      alert("Ticket created");
    }
    router.push("/tickets");
  } catch (err) {
    alert(err.message || "Failed to save ticket");
  }
}

function cancel() {
  router.push("/tickets");
}
</script>
