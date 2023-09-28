// ==UserScript==
// @name        MinTube
// @match       /https?:\/\/(www\.)?youtube.com\/watch/
// @grant       none
// @version     1.0
// @author      Rin Brk
// @homepageURL https://github.com/Dareka826/mintube
// ==/UserScript==

(function() {

  let remove_flexy;
  let cut_like_dislike;


  // Remove hidden metadata copy
  remove_flexy = function() {
    let to_rm = document.querySelectorAll('ytd-watch-metadata + div > div#info');

    if (to_rm.length > 0) {
      to_rm = to_rm[0].parentElement;
      to_rm.parentElement.removeChild(to_rm);

      cut_like_dislike();
    } else setTimeout(remove_flexy, 100);
  };
  setTimeout(remove_flexy, 100);


  cut_like_dislike = function() {
    let likebtn_sel    = document.querySelectorAll("div#segmented-buttons-wrapper > div#segmented-like-button yt-button-shape > button");
    let dislikebtn_sel = document.querySelectorAll("div#segmented-buttons-wrapper > div#segmented-dislike-button yt-button-shape > button");
    let like_dislike_container_sel = document.querySelectorAll("ytd-segmented-like-dislike-button-renderer");

    let new_like_dislike_container = document.createElement("div");
    let new_like_btn    = document.createElement("button");
    let new_dislike_btn = document.createElement("button");

    new_like_dislike_container.style.setProperty("height", "100%");

    let update_text = function() {
      if (likebtn_sel[0].getAttribute("aria-pressed") == "true") {
        new_like_btn.innerText = "Liked";
        new_like_btn.setAttribute("aria-pressed", "true");

      } else {
        new_like_btn.innerText = "Like";
        new_like_btn.setAttribute("aria-pressed", "false");
      }

      if (dislikebtn_sel[0].getAttribute("aria-pressed") == "true") {
        new_dislike_btn.innerText = "Disliked";
        new_dislike_btn.setAttribute("aria-pressed", "true");
      } else {
        new_dislike_btn.innerText = "Dislike";
        new_dislike_btn.setAttribute("aria-pressed", "false");
      }
    }
    update_text();

    let wait_update_text = function() {
      let initial_state = likebtn_sel[0].getAttribute("aria-pressed") + "," + dislikebtn_sel[0].getAttribute("aria-pressed");

      function loop() {
        let new_state = likebtn_sel[0].getAttribute("aria-pressed") + "," + dislikebtn_sel[0].getAttribute("aria-pressed");

        if (new_state !== initial_state)
             update_text();
        else setTimeout(loop, 100);
      }
      setTimeout(loop, 100);
    }

    new_like_btn.onclick    = function() {
      likebtn_sel[0].click();
      wait_update_text();
    };
    new_dislike_btn.onclick = function() {
      dislikebtn_sel[0].click();
      wait_update_text();
    };

    new_like_dislike_container.appendChild(new_like_btn);
    new_like_dislike_container.appendChild(new_dislike_btn);

    let share_btn = document.querySelectorAll('yt-button-shape > button[aria-label="Share"]')[0].parentElement.parentElement;
    like_dislike_container_sel[0].parentElement.insertBefore(new_like_dislike_container, share_btn);

    like_dislike_container_sel[0].style.setProperty("display", "none");
    likebtn_sel[0].innerHTML    = '';
    dislikebtn_sel[0].innerHTML = '';
  };

})();

// vim: ts=2 sts=2 sw=2 et
