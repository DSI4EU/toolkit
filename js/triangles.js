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
