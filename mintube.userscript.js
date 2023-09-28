// ==UserScript==
// @name        MinTube
// @match       /https?:\/\/(www\.)?youtube.com\/watch/
// @grant       none
// @version     1.0
// @author      Rin Brk
// @homepageURL https://github.com/Dareka826/mintube
// ==/UserScript==

(function() {

  // Remove hidden metadata copy
  let remove_flexy = function() {
    let to_rm = document.querySelectorAll('ytd-watch-metadata + div > div#info');

    if (to_rm.length > 0) {
      to_rm = to_rm[0].parentElement;
      to_rm.parentElement.removeChild(to_rm);

    } else setTimeout(remove_flexy, 100);
  };
  setTimeout(remove_flexy, 100);

})();

// vim: ts=2 sts=2 sw=2 et
