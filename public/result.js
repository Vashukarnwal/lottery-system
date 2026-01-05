function checkResult() {
  const number = document.getElementById("number").value.trim();

  if (!number) {
    alert("Enter number");
    return;
  }

  fetch("/api/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ number })
  })
    .then(res => {
      if (!res.ok) throw new Error("Server error");
      return res.json();
    })
    .then(data => {
      if (data.winner) {
        window.location.href = "won.html";
      } else {
        alert("❌ Not a winner");
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Server error");
    });
}
