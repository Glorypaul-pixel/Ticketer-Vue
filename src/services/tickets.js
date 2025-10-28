const KEY = "ticketapp_tickets";
const VALID = ["open", "in_progress", "closed"];
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch (e) {
    return [];
  }
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function listTickets() {
  return load();
}
export function getTicket(id) {
  return load().find((t) => t.id === id);
}
export function createTicket(payload) {
  if (!payload.title) throw new Error("Title is required");
  if (!VALID.includes(payload.status)) throw new Error("Invalid status");
  const all = load();
  const ticket = {
    id: Date.now().toString(),
    title: payload.title,
    description: payload.description || "",
    status: payload.status,
    priority: payload.priority || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  all.unshift(ticket);
  save(all);
  return ticket;
}
export function updateTicket(id, patch) {
  const all = load();
  const i = all.findIndex((t) => t.id === id);
  if (i === -1) throw new Error("Ticket not found");
  if (patch.title === undefined || patch.title === "")
    throw new Error("Title is required");
  if (patch.status && !VALID.includes(patch.status))
    throw new Error("Invalid status");
  all[i] = { ...all[i], ...patch, updated_at: new Date().toISOString() };
  save(all);
  return all[i];
}
export function deleteTicket(id) {
  const all = load().filter((t) => t.id !== id);
  save(all);
  return true;
}
