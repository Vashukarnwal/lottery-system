function checkResult() {
  const number = document.getElementById("number").value.trim();

  if (!number) {
    alert("❌ Enter your number");
    return;
  }

  fetch(`/api/check/${number}`)
    .then(res => res.json())
    .then(data => {
      if (data.winner) {
        window.location.href = "/won.html";
      } else {
        alert("❌ Not a Winner");
      }
    })
    .catch(() => {
      alert("❌ Server Error");
    });
}
