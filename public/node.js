function openResult() {
  window.location.href = "result.html";
}



function openResult() {
  // loading show karo
  document.getElementById("loadingOverlay").style.display = "flex";

  // 2.5 second baad result page open
  setTimeout(function () {
    window.location.href = "result.html";
  }, 2500);
}
