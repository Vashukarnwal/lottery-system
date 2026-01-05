function addWinner() {
  const number = document.getElementById("winner").value.trim();

  if (!number) {
    alert("❌ Number required");
    return;
  }

  fetch("/api/add-winner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ number })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Winner Added Successfully");
        document.getElementById("winner").value = "";
      } else {
        alert("❌ Failed to add winner");
      }
    })
    .catch(() => {
      alert("❌ Server Error");
    });
}
