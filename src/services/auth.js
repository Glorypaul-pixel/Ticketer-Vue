import { setSession } from "./session";
const USERS_KEY = "ticketapp_users";
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch (e) {
    return [];
  }
}
function saveUsers(u) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

export function signup({ email, password }) {
  const users = loadUsers();
  if (users.find((x) => x.email === email)) {
    const err = new Error("User already exists");
    err.code = "USER_EXISTS";
    throw err;
  }
  const user = { id: Date.now().toString(), email, password };
  users.push(user);
  saveUsers(users);
  const token = `token_${Date.now()}`;
  setSession(token, { id: user.id, email: user.email });
  return { token, user };
}

export function login({ email, password }) {
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    const err = new Error("Invalid credentials");
    err.code = "INVALID_CREDENTIALS";
    throw err;
  }
  const token = `token_${Date.now()}`;
  setSession(token, { id: user.id, email: user.email });
  return { token, user };
}

// seed
(function seed() {
  const u = loadUsers();
  if (u.length === 0) {
    u.push({ id: "1", email: "test@example.com", password: "Password123!" });
    saveUsers(u);
  }
})();
