function addWinner() {
  // 🔹 existing + new admin fields
  const rank   = document.getElementById("winnerRank")?.value.trim();
  const name   = document.getElementById("winnerName")?.value.trim();
  const number = document.getElementById("winner")?.value.trim(); // existing
  const ticket = document.getElementById("ticketNumber")?.value.trim();
  const series = document.getElementById("seriesCode")?.value.trim();
  const amount = document.getElementById("prizeAmount")?.value.trim();
  const date   = document.getElementById("drawDate")?.value.trim();

  // 🔒 validation
  if (!name || !number) {
    alert("Enter winner name & number");
    return;
  }

  fetch("/api/add-winner", {
    method: "POST",
    credentials: "include", // ⭐ IMPORTANT (session)
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rank,      // eg: 5th Winner
      name,      // Winner Name
      number,    // Winning Number
      ticket,    // Ticket No
      series,    // Series Code
      amount,    // 12 Lakhs
      date       // Draw Date
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Winner Added");

        // clear fields
        if (document.getElementById("winnerRank"))   document.getElementById("winnerRank").value = "";
        if (document.getElementById("winnerName"))   document.getElementById("winnerName").value = "";
        if (document.getElementById("winner"))       document.getElementById("winner").value = "";
        if (document.getElementById("ticketNumber")) document.getElementById("ticketNumber").value = "";
        if (document.getElementById("seriesCode"))   document.getElementById("seriesCode").value = "";
        if (document.getElementById("prizeAmount"))  document.getElementById("prizeAmount").value = "";
        if (document.getElementById("drawDate"))     document.getElementById("drawDate").value = "";
      } else {
        alert("❌ Error adding winner");
      }
    })
    .catch(() => alert("❌ Server error"));
}
