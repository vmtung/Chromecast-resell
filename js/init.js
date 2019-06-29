document.addEventListener('DOMContentLoaded', function() {
  var paralaxElems = document.querySelectorAll('.parallax');
  M.Parallax.init(paralaxElems);

  var sideNavElems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNavElems);
});