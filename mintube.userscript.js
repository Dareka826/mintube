// ==UserScript==
// @name        MinTube
// @include     /https?:\/\/(www\.)?youtube\.com\/watch/
// @grant       none
// @version     1.0
// @author      Rin Brk
// @homepageURL https://github.com/Dareka826/mintube
// ==/UserScript==

(function() {

  let remove_flexy;
  let perform_surgery;
  let cut_like_dislike;
  let remove_share_btn;
  let render_popup_items;
  let remove_extra_buttons;


  // Remove hidden metadata copy
  remove_flexy = function() {
    let to_rm = document.querySelectorAll('ytd-watch-metadata + div > div#info');

    if (to_rm.length > 0) {
      to_rm = to_rm[0].parentElement;
      to_rm.parentElement.removeChild(to_rm);

      perform_surgery();
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

    new_like_btn.setAttribute("class", "clickable");
    new_dislike_btn.setAttribute("class", "clickable");

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


  remove_share_btn = function() {
    let to_rm = document.querySelectorAll('yt-button-shape > button[aria-label="Share"]')[0].parentElement.parentElement;
    to_rm.parentElement.removeChild(to_rm);
  };


  render_popup_items = function() {
    let popup_btn = document.querySelectorAll('yt-button-shape > button[aria-label="More actions"]')[0];
    popup_btn.click();
    popup_btn.click();
  };


  remove_extra_buttons = function() {
    let buttons = document.querySelectorAll('div#flexible-item-buttons')[0].children;

    let wait_remove = function(label) {
      let btn = document.querySelectorAll(`div#flexible-item-buttons button[aria-label="${label}"]`);

      if (btn.length > 0) {
        btn = btn[0];
        btn.parentElement.removeChild(btn);

      } else setTimeout(function() { wait_remove(label); }, 100);
    };

    setTimeout(function() { wait_remove("Download"); }, 0);
    setTimeout(function() { wait_remove("Thanks");   }, 0);
    setTimeout(function() { wait_remove("Clip");     }, 0);
  };


  perform_surgery = function() {
    cut_like_dislike();
    remove_share_btn();
    render_popup_items();
    remove_extra_buttons();
  };

})();

// vim: ts=2 sts=2 sw=2 et
