function checkResult() {
  const number = document.getElementById("number").value.trim();

  fetch("/api/check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number })
  })
    .then(res => res.json())
    .then(data => {
      if (data.winner) {
        window.location.href = "won.html";
      } else {
        alert("❌ Not a winner");
      }
    });
}
