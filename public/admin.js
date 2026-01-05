function addWinner() {
  const number = document.getElementById("winner").value.trim();

  if (!number) {
    alert("Enter number");
    return;
  }

  fetch("/api/add-winner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number })
  })
    .then(res => res.json())
    .then(() => {
      alert("✅ Winner Added");
      document.getElementById("winner").value = "";
    })
    .catch(() => alert("❌ Server error"));
}
