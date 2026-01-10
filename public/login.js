function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  fetch("/login", {
    method: "POST",
    credentials: "include",   // ⭐⭐⭐ MOST IMPORTANT
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        window.location.href = "/admin"; // 🔥 admin open
      } else {
        document.getElementById("msg").innerText = "Invalid login";
      }
    })
    .catch(err => {
      document.getElementById("msg").innerText = "Server error";
    });
}
