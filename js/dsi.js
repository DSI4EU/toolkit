/* jshint -W033 */

//testing
function scrollToButtons(){
  var top = parseInt($("#page-content").offset().top)
  $("body").scrollTo(0, top);
}

//hamburger menu
$('#toggle').click(function() {
   $(this).toggleClass('active')
   $('#overlay').toggleClass('open')
   $('#light-logo').toggleClass('fade')
   $('#dark-logo').toggleClass('fade')
  })

//Replace all SVG images with inline SVG
jQuery('img.svg').each(function(){
  var $img = jQuery(this)
  var imgID = $img.attr('id')
  var imgClass = $img.attr('class')
  var imgURL = $img.attr('src')

  jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg')

      // Add replaced image's ID to the new SVG
      if(typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID)
      }
      // Add replaced image's classes to the new SVG
      if(typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', 'replaced-svg')
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a')

      // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
      if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg)

  }, 'xml')
})

//autogrow input
function auto_grow(element) {
    element.style.height = "5px"
    element.style.height = (element.scrollHeight)+"px"
}

/* QUESTIONS FOCUS */

//keyboard focus
$("textarea").focus(function() {
  $("body").find(".active").removeClass("active")
  $(this).parent().addClass("active")
})

//smooth scroll
$(".question textarea").focus(function() {
  $('html, body').animate({
        scrollTop: $(this).parent().offset().top - 100
    }, 400);
})

//keyboard focusout
$("textarea").focusout(function() {
  $(this).parent().removeClass("active")
})

//mouseclick
$(".question").click(function(){
  $(".active").removeClass("active")
  $(this).addClass("active")
  $(this).find("textarea").focus()
})

$(".indicator-input").hide()
$(".define-link").click(function() {
  $(this).parent().parent().find(".indicator-input").fadeIn()
  $(this).hide()
})

$(".indicator-send").click(function(){
  $(this).parent().parent().fadeOut()
})

// index top margin
function gradientMargins() {
  var gradientHeight = $("#gradient-hero").outerHeight()
  var headerHeight = $("header").outerHeight();
  gradientHeight -= headerHeight
  $('#high-margin').css("margin-top", gradientHeight + "px")
  if (gradientHeight > (window.innerHeight * 0.9)) {
    // console.log("bb")
    // $("#gradient-hero").addClass("slim-screen-hero")
  }
}
if ($("#gradient-hero").outerHeight() > (window.innerHeight * 0.9)) {
  $("#gradient-hero").addClass("slim-screen-hero")
}
gradientMargins()

//interactive gradient
$(document).mousemove(function(e){
    var m = {
      x : e.pageX,
      y : e.pageY
    }
    //radians
    var adj = ($("#gradient-hero").outerWidth() * 0.5) - m.x
    var opp = ($("#gradient-hero").outerHeight() * 0.5) - m.y
    var tan = opp / adj
    var atan = Math.atan(tan)
    //degs
    atan *= (180 / Math.PI)
    atan = parseInt(Math.abs(atan*0.2))
    $("#gradient-hero").css("background-image", "linear-gradient(" + atan + "deg, #7421D6 0%, #26C6A3 100%)")
});

// https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000);
        return false;
      }
    }
  });
});
