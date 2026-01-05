function addWinner() {
  const number = document.getElementById("num").value;

  fetch("http://localhost:3000/add-winner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ number })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      document.getElementById("msg").innerText = "✅ Winner Added";
    } else {
      document.getElementById("msg").innerText = "❌ Error";
    }
  })
  .catch(() => {
    document.getElementById("msg").innerText = "❌ Server error";
  });
}
