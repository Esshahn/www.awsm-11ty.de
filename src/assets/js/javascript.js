/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (currentScrollPos < 400 || prevScrollpos - 40 > currentScrollPos) {
    document.getElementById("navigation").style.top = "0px";
  } else {
    document.getElementById("navigation").style.top = "-480px";
  }
  prevScrollpos = currentScrollPos;
};
