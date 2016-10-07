/* jshint -W033 */

//testing
function scrollToButtons(){
  var top = parseInt($("#page-content").offset().top)
  $("body").scrollTo(0, top)
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
    }, 400)
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

function thankify(parent) {
  var content = parent.html()
  parent.data("content", content)
  parent.css("background", "#797979")
  parent.text("")
  //Thanks!
  var h2 = $("<h2>")
  h2.text("Thank you.")
  //link
  var p = $("<p>You can <a class='reverse-card'> define this card again</a>, define more indicators or <a href='https://github.com/DSI4EU/toolkit/issues'>see all the submissions on Github.</a>")
  p.addClass("long")
  p.addClass("small-block")
  // var a = $("<a>")
  // a.text("define again")
  // a.addClass("reverse-card")
  // p.append(a)
  parent.append(h2)
  parent.append(p)
}

//send quote to github
$('.quote').on('click', '.indicator-send', function(){

  var answered = false
  $(this).parent().find('.indicator').each(function(index) {
    var text = $(this).find('textarea').val()
    if (text !== "") {
      answered = true
    }
    issue += index + ": " + text + "<br>"
  })

  if(answered) {
    var issue = ""
    var name = $("#username").val()
    if (name === "") name = "anonymous"
    var title = $(this).parent().parent().find("h2").html()
    var tag = $(this).parent().parent().attr("id")
    var description = $(this).parent().parent().find(".long").html()
    issue += "**" + title  + "**" + "<br>"
    issue += description + "<br><br>"

    issue += "<br> *Author: " + name + "*"

    var link = $(this)
    link.hide()
    link.parent().find(".scale-spinner").show()

    var indicator = $(this)
    postIssue(title, issue, [tag], function(){
      link.show()
      link.parent().find(".scale-spinner").hide()
      thankify(indicator.parent().parent())
    })
  } else {
    alert("please fill at least one indicator before sending")
  }
})

$('.quote').on('click', '.reverse-card', function(){
  var p = $(this).parent().parent()
  p.css("background", "#282930")
  var content = p.data("content")
  p.html(content)
  $(this).parent().find(".scale-spinner").hide()
})

// index top margin
function triangleMargins() {
  var triangleHeight = $("#triangle-hero").outerHeight()
  var headerHeight = $("header").outerHeight()
  triangleHeight -= headerHeight
  $('#high-margin').css("margin-top", triangleHeight + "px")
  if (triangleHeight > (window.innerHeight * 0.9)) {
    // console.log("bb")
    // $("#triangle-hero").addClass("slim-screen-hero")
  }
}
if ($("#triangle-hero").outerHeight() > (window.innerHeight * 0.9)) {
  $("#triangle-hero").addClass("slim-screen-hero")
}
triangleMargins()

// //interactive gradient
// $(document).mousemove(function(e){
//     var m = {
//       x : e.pageX,
//       y : e.pageY
//     }
//     //radians
//     var adj = ($("#gradient-hero").outerWidth() * 0.5) - m.x
//     var opp = ($("#gradient-hero").outerHeight() * 0.5) - m.y
//     var tan = opp / adj
//     var atan = Math.atan(tan)
//     //degs
//     atan *= (180 / Math.PI)
//     atan = parseInt(Math.abs(atan*0.2))
//     $("#gradient-hero").css("background-image", "linear-gradient(" + atan + "deg, #7421D6 0%, #26C6A3 100%)")
// })

// https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']')
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top - 100
        }, 1000)
        return false
      }
    }
  })
})

//GITHUB ISSUES ENGINE
var uploadURL ="https://api.github.com/repos/dsi4eu/toolkit/issues"
function postIssue(title, body, labels, callback) {
  $.ajax({
    url: uploadURL,
    type: "POST",
    beforeSend: function(xhr) {
      var _0xe54d=["\x41\x75\x74\x68\x6F\x72\x69\x7A\x61\x74\x69\x6F\x6E","\x74\x6F\x6B\x65\x6E\x20\x38\x38\x33\x62\x38\x38\x62\x35\x39\x65\x34\x33\x36\x32\x34\x39\x65\x33\x64\x36\x34\x31\x33\x35\x36\x38\x66\x36\x38\x31\x64\x36\x64\x64\x32\x30\x62\x64\x63\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72"];xhr[_0xe54d[2]](_0xe54d[0],_0xe54d[1])
    },
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      "title": title,
      "body": body,
      "labels": labels
    })
  })
  .done(function() {
    if(callback) {
      callback()
    }
  })
}

//share knowledge
$("#knowledge-send").click(function(){
  var knowledge = ""
  $(".question").each(function(index) {
    var title = $(this).find("h2").text()
    var body = $(this).find("textarea").val()
    if (body !== "") {
      knowledge += "**" + title + "**"
      knowledge += "<br>"
      if(title.indexOf("picture") > -1) {
        knowledge += "![" + body + "](" + body + ")"
      } else {
        knowledge += body
      }
      knowledge += "<br><br>"
    }
  })
  if(knowledge !== "") {
    $(this).hide()
    $("#knowledge-spinner").show()
    postIssue("Knowledge", knowledge, ["knowledge"], function() {window.location.href = "/thanks/"})
  } else {
    alert("fill at least one field before sending!")
  }
})

/////////// DELAUNAY

  var BLUE, GRAY;
  var tris;

  function setup(){
      var w = ~~($("#triangle-hero").width());
      var h = ~~($("#triangle-hero").height());
      var myCanvas = createCanvas( w, h );
      myCanvas.parent('triangle-hero');

      BLUE = color( '#282930' );
      GRAY = color( '#2C2D34' );

      initializeTriangulation();
  }

  function initializeTriangulation(){
      tris = [];
      var pts = [];

      // push canvas rect points
      pts.push( createVector( 0, 0 ) );
      pts.push( createVector( width, 0 ) );
      pts.push( createVector( width, height ) );
      pts.push( createVector( 0, height ) );

      // ~~ truncates a floating point number and keeps the integer part, like floor()
      var n = 7 + ~~(Math.random() * 5);
      for( var i = 0; i < n; i ++ ){
          pts.push( createVector( ~~ random( width ), ~~ random( height ) ) );
      }

      // Now, let's use Delaunay.js
      // Delaunay.triangulate expect a list of vertices (which should be a bunch of two-element arrays, representing 2D Euclidean points)
      // and it will return you a giant array, arranged in triplets, representing triangles by indices into the passed array
      // Array.map function let us create an Array of 2 elements arrays [ [x,y],[x,y],..] from our array of PVector [ PVector(x,y), PVector(x,y), ... ]
      var triangulation = Delaunay.triangulate( pts.map( function( pt ){
          return [ pt.x, pt.y ];
      } ) );

      // create Triangles object using indices returned by Delaunay.triangulate
      for( var i = 0; i < triangulation.length; i += 3 ){
          tris.push( new Triangle(
              pts[ triangulation[ i ] ],
              pts[ triangulation[ i + 1 ] ],
              pts[ triangulation[ i + 2 ] ]
          ) );
      }
  }

  // class for keeping triangles from 3 PVectors
  function Triangle( _a, _b, _c ){
      // PVectors
      this.a = _a;
      this.b = _b;
      this.c = _c;

      // used for fill using lerpColor
      this.r = random(0.8);

      this.draw = function(){
          noStroke();
          fill( lerpColor( GRAY, BLUE, this.r ) );

          triangle( this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y );

          stroke( BLUE );
          strokeJoin( BEVEL );
          strokeWeight( 6 );
          noFill();
          triangle( this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y );
      };

  }

  function draw(){
      background( BLUE );
      tris.forEach(function (t) {
        return t.draw();
      });
  }

  function mousePressed(){
      initializeTriangulation();
  }
