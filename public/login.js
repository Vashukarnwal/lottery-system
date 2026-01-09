function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // ✅ login successful → admin panel
      window.location.href = "/admin";
    } else {
      document.getElementById("msg").innerText = "Invalid login";
    }
  })
  .catch(() => {
    document.getElementById("msg").innerText = "Server error";
  });
}
