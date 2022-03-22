var dots = 0
var loading = setInterval(function () {
  if (dots == 0) {
    document.getElementById("loading").innerHTML = "Loading"
    dots = 1
  }
  else if (dots == 1) {
    document.getElementById("loading").innerHTML = "Loading."
    dots = 2
  }
  else if (dots == 2) {
    document.getElementById("loading").innerHTML = "Loading.."
    dots = 3
  }
  else {

    document.getElementById("loading").innerHTML = "Loading..."
    dots = 0
  }

}, 300);