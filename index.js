$(document).ready(function () {
  $(window).resize(() => {
    if ($(this).width() <= 320) {
      images = 1;
    } else if ($(this).width() <= 576) {
      images = 2;
    } else if ($(this).width() <= 768) {
      images = 3;
    } else if ($(this).width() <= 992) {
      images = 4;
    } else if ($(this).width() > 992) {
      images = 4;
    }
    localStorage.setItem("itemsPerClick", images);
  });
  
  let totalImages = $(".poster-item").length;
  console.log("totalImages :", totalImages);
  let posterContainer = $(".Poster-container")[0];
  let availScrollWidth = posterContainer.scrollWidth;
  let count = 1;

  $(".left").click(() => {
    let itemsPerClick = localStorage.getItem("itemsPerClick");
    itemsPerClick = itemsPerClick ? itemsPerClick : 4;
    console.log("itemsPerClick :", itemsPerClick);
    let scrollcount = Math.ceil(totalImages / itemsPerClick);
    console.log("scrollcount : ", scrollcount);
    if (count === 1) {
      posterContainer.scrollLeft += availScrollWidth;
      count = scrollcount;
    } else {
      posterContainer.scrollLeft -= posterContainer.clientWidth;
      count--;
    }
  });

  $(".right").click(() => {
    let itemsPerClick = localStorage.getItem("itemsPerClick");
    itemsPerClick = itemsPerClick ? itemsPerClick : 4;
    console.log("itemsPerClick :", itemsPerClick);
    let scrollcount = Math.ceil(totalImages / itemsPerClick);
    console.log("scrollcount : ", scrollcount);
    if (count >= scrollcount) {
      posterContainer.scrollLeft = 0;
      count = 1;
    } else {
      posterContainer.scrollLeft += posterContainer.clientWidth;
      count++;
    }
  });
});
