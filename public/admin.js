function addWinner() {
  const rank   = document.getElementById("winnerRank").value.trim();
  const name   = document.getElementById("winnerName").value.trim();
  const number = document.getElementById("winner").value.trim();
  const ticket = document.getElementById("ticketNumber").value.trim();
  const series = document.getElementById("seriesCode").value.trim();
  const amount = document.getElementById("prizeAmount").value.trim();
  const date   = document.getElementById("drawDate").value.trim();

  if (!name || !number) {
    alert("Name & Number required");
    return;
  }

  fetch("/api/add-winner", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rank, name, number, ticket, series, amount, date })
  })
    .then(res => res.json())
    .then(d => {
      if (d.success) {
        alert("✅ Winner Added");
        document.querySelectorAll("input").forEach(i => i.value = "");
      } else {
        alert("❌ Not Authorized");
      }
    })
    .catch(() => alert("❌ Server Error"));
}
