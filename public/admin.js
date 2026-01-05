function addWinner() {
  const number = document.getElementById("number").value;

  fetch("/add-winner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ number })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Winner Added Successfully");
    } else {
      alert("Failed");
    }
  })
  .catch(() => alert("Server error"));
}
