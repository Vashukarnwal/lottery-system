function addWinner() {
  const rank   = document.getElementById("winnerRank")?.value.trim();
  const name   = document.getElementById("winnerName")?.value.trim();
  const number = document.getElementById("winnerNumber")?.value.trim(); // ✅ FIXED
  const ticket = document.getElementById("ticketNumber")?.value.trim();
  const series = document.getElementById("seriesCode")?.value.trim();
  const amount = document.getElementById("prizeAmount")?.value.trim();
  const date   = document.getElementById("drawDate")?.value.trim();

  if (!name || !number) {
    alert("Enter winner name & number");
    return;
  }

  fetch("/api/add-winner", {
    method: "POST",
    credentials: "include", // 🔥 REQUIRED FOR RENDER
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rank,
      name,
      number,
      ticket,
      series,
      amount,
      date
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Winner Added Successfully");

        document.querySelectorAll("input").forEach(i => i.value = "");
      } else {
        alert("❌ Error adding winner (login expired?)");
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Server error");
    });
}
