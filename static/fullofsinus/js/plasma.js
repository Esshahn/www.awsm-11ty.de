
function plasma_init(){

  stage.fill(c64.colors["black"]);

    plasma_rasterlines = new image("gfx/plasma_rasterlines.gif");
    plasma_ballz_a = new image("gfx/plasma_ballz_a.gif");
    plasma_ballz_w = new image("gfx/plasma_ballz_w.gif");
    plasma_ballz_s = new image("gfx/plasma_ballz_s.gif");
    plasma_ballz_m = new image("gfx/plasma_ballz_m.gif");
    plasma_ballz_9 = new image("gfx/plasma_ballz_9.gif");
    plasma_ballz_0 = new image("gfx/plasma_ballz_0.gif");
    plasma_ballz_1 = new image("gfx/plasma_ballz_1.gif");
    awsm_logo = new image("gfx/awsm_plasma160.gif");
    plasma_frame_gradient_top_left = new image("gfx/plasma_frame_gradient_top_left.gif");
    plasma_frame_gradient_bottom_right = new image("gfx/plasma_frame_gradient_bottom_right.gif");

    plasma_canvas = new canvas (160,200);

    RAD = Math.PI/180.0;
    Sin = Math.sin;
    Cos = Math.cos;
    Sqrt = Math.sqrt;

    // fullscreen the canvas element

    WIDTH = 120;
    HEIGHT = 160;

    // create the Plasma object
    g_plasma = new Plasma(plasma_canvas);

    // init the animation loop
    g_framestart = Date.now();

    if (demoIsLive) playSong('sid/Locomotive_Chef.sid',0);

    plasma_part = 1;

    plasma_shutter1 = new Shutter(mycanvas160,8,0.40,"#000000");

    // Create the bouncing balls in the border
    plasma_balls_startPosition = 74;
    plasma_balls_spacing = 30;
    plasma_balls_sinStep = 0.2;
    plasma_ball_a = new Plasma_Ball(plasma_ballz_a,plasma_balls_startPosition,-10);
    plasma_ball_w = new Plasma_Ball(plasma_ballz_w,plasma_balls_startPosition+plasma_balls_spacing*1,-plasma_balls_sinStep*1-10);
    plasma_ball_s = new Plasma_Ball(plasma_ballz_s,plasma_balls_startPosition+plasma_balls_spacing*2,-plasma_balls_sinStep*2-10);
    plasma_ball_m = new Plasma_Ball(plasma_ballz_m,plasma_balls_startPosition+plasma_balls_spacing*3,
      -plasma_balls_sinStep*3-10);
    plasma_ball_9 = new Plasma_Ball(plasma_ballz_9,plasma_balls_startPosition+plasma_balls_spacing*4,
      -plasma_balls_sinStep*4-10);
    plasma_ball_0 = new Plasma_Ball(plasma_ballz_0,plasma_balls_startPosition+plasma_balls_spacing*5,
      -plasma_balls_sinStep*5-10);
    plasma_ball_00 = new Plasma_Ball(plasma_ballz_0,plasma_balls_startPosition+plasma_balls_spacing*6,
      -plasma_balls_sinStep*6-10);
    plasma_ball_1 = new Plasma_Ball(plasma_ballz_1,plasma_balls_startPosition+plasma_balls_spacing*7,
      -plasma_balls_sinStep*7-10);


}

function Plasma(canvas){

    this.canvas = canvas;

    var c64rgb = {
      black:"rgb(0,0,0)",
      white:"rgb(255,255,255)",
      red:"rgb(104,55,43)",
      cyan:"rgb(112,164,178)",
      purple:"rgb(111,61,134)",
      green:"rgb(88,141,67)",
      blue:"rgb(53,40,121)",
      yellow:"rgb(184,199,111)",
      orange:"rgb(111,79,37)",
      brown:"rgb(67,57,0)",
      light_red:"rgb(154,103,89)",
      dark_grey:"rgb(68,68,68)",
      grey:"rgb(108,108,108)",
      light_green:"rgb(154,210,132)",
      light_blue:"rgb(108,94,181)",
      light_grey:"rgb(149,149,149)"
      };

      // generate some palettes


      function multi(color)
      {
        for(j=0;j<10;j++){
            palette.push(color);
        }

      }

      this.palettes = [];

      var palette = [];
        for (var i=0; i<16; i++){
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);

          multi(c64rgb["blue"]);
          multi(c64rgb["light_blue"]);
          multi(c64rgb["cyan"]);
          multi(c64rgb["light_blue"]);
          multi(c64rgb["blue"]);

          multi(c64rgb["black"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["red"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["red"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["black"]);
        }

      this.palettes.push(palette);


      var palette = [];
        for (var i=0; i<68; i++){

          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["white"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["brown"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);

        }

      this.palettes.push(palette);

      var palette = [];
        for (var i=0; i<36; i++){
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["light_red"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_red"]);
        }

      this.palettes.push(palette);


      var palette = [];
        for (var i=0; i<15; i++){
          multi(c64rgb["black"]);
          multi(c64rgb["white"]);
        }

      this.palettes.push(palette);


      var palette = [];
        for (var i=0; i<22; i++){
          multi(c64rgb["cyan"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["light_green"]);
          multi(c64rgb["green"]);
          multi(c64rgb["green"]);
          multi(c64rgb["light_green"]);
          multi(c64rgb["yellow"]);
          multi(c64rgb["cyan"]);
        }

      this.palettes.push(palette);


      var palette = [];
        for (var i=0; i<128; i++){

          multi(c64rgb["black"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["white"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["light_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["dark_grey"]);
          multi(c64rgb["black"]);
          multi(c64rgb["dark_grey"]);
        }

      this.palettes.push(palette);


      this.CycleSpeed = 1;
      this.PlasmaDensity = 20;
      this.TimeFunction = 128;
      this.PlasmaFunction = 1;
      this.Jitter = 0;
      this.Alpha = 1;


      return this;
   }

   Plasma.prototype =
   {


      // internal properties
      paletteoffset: 0,
      palettes: null,

      // animation frame rendering function
      frame: function frame()
      {
         // init context and img data buffer
         var w = WIDTH, h = HEIGHT,                      // canvas width and height
             pw = this.PlasmaDensity, ph = (pw * (h/w)),    // plasma source width and height
             ctx = this.canvas.contex,
             palette = this.palettes[this.PaletteIndex],
             paletteoffset = this.paletteoffset+=this.CycleSpeed,
             plasmafun = this.PlasmaFunction;
         // scale the plasma source to the canvas width/height
         var vpx = (w/pw), vpy = (h/ph);

         var dist = function dist(a, b, c, d)
         {
            return Sqrt((a - c) * (a - c) + (b - d) * (b - d));
         }

         var time = Date.now() / this.TimeFunction;

         var colour = function colour(x, y)
         {
            switch (plasmafun)
            {
               case 0:
                  return ((Sin(dist(x + time, y, 128.0, 128.0) / 8.0)
                          + Sin(dist(x - time, y, 64.0, 64.0) / 8.0)
                          + Sin(dist(x, y + time / 7, 192.0, 64) / 7.0)
                          + Sin(dist(x, y, 192.0, 100.0) / 8.0)) + 4) * 32;
                  break;
               case 1:
                  return (128 + (128 * Sin(x * 0.0625)) +
                          128 + (128 * Sin(y * 0.03125)) +
                          128 + (128 * Sin(dist(x + time, y - time, w, h) * 0.125)) +
                          128 + (128 * Sin(Sqrt(x * x + y * y) * 0.125)) ) * 0.25;
                  break;
            }
         }

         ctx.save();
         ctx.globalAlpha = this.Alpha;
         var jitter = this.Jitter ? (-this.Jitter + (Math.random()*this.Jitter*2)) : 0;
         for (var y=0,x; y<ph; y++)
         {
            for (x=0; x<pw; x++)
            {
               // map plasma pixels to canvas pixels using the virtual pixel size
               ctx.fillStyle = palette[(~~colour(x, y) + paletteoffset) % 256];
               ctx.fillRect(x * vpx + jitter, y * vpy + jitter, vpx, vpy);
            }
         }
         ctx.restore();
      }
   }

function plasma_waitReturn(waitVar){
  plasma_wait = undefined;
  plasma_part ++;

}

function plasma_rasterbars(boxcolor,linecolor){

  border.quad(30,0,320,30,c64.colors[boxcolor]);
  border.quad(30,230,320,100,c64.colors[boxcolor]);

  border.contex.globalCompositeOperation='source-atop';
  plasma_ball_a.draw(border);
  plasma_ball_w.draw(border);
  plasma_ball_s.draw(border);
  plasma_ball_m.draw(border);
  plasma_ball_9.draw(border);
  plasma_ball_0.draw(border);
  plasma_ball_00.draw(border);
  plasma_ball_1.draw(border);
  border.contex.globalCompositeOperation='source-over';

  border.quad(0,29,380,1,c64.colors[linecolor]);
  border.quad(0,230,380,1,c64.colors[linecolor]);

}


function Plasma_Ball(sprite,xPos,sinY){

  this.sprite = sprite;
  this.xPos = xPos;
  this.sinY = sinY;

  this.draw = function(canvas){

    this.canvas = canvas;
    this.sinY+=0.02;
    this.sprite.draw(this.canvas,this.xPos,54+Math.ceil(Math.sin(this.sinY)*50));

  }

}



function plasma_render()
{

   switch(plasma_part){

    case 1:
          g_plasma.PaletteIndex = 5;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("dark_grey","white");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,4000);
          plasma_shutter1.in();
          break;

    case 2:

          g_plasma.PaletteIndex = 1;
          g_plasma.PlasmaFunction = 0;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("brown","yellow");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,4000);
          break;

    case 3:

          g_plasma.PaletteIndex = 3;
          g_plasma.PlasmaFunction = 1;
          g_plasma.PlasmaDensity = 40;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("dark_grey","white");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,4000);
          break;

    case 4:

          g_plasma.PaletteIndex = 4;
          g_plasma.PlasmaFunction = 1;
          g_plasma.PlasmaDensity = 40;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("light_blue","light_green");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,4000);
          break;

    case 5:

          g_plasma.PaletteIndex = 2;
          g_plasma.PlasmaFunction = 1;
          g_plasma.PlasmaDensity = 40;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("red","white");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,4000);
          break;

    case 6:

          g_plasma.PaletteIndex = 0;
          g_plasma.PlasmaFunction = 0;
          g_plasma.PlasmaDensity = 40;
          g_plasma.frame.call(g_plasma);
          plasma_canvas.draw(mycanvas160,20,20);
          plasma_rasterbars("blue","red");
          if (typeof(plasma_wait)=="undefined") plasma_wait = window.setTimeout(plasma_waitReturn,8000);
          break;

    case 7:

          plasma_part = 1;
          break;
         }



   plasma_rasterlines.draw(mycanvas160,0,0);
   plasma_frame_gradient_top_left.draw(mycanvas160,14,10);

   awsm_logo.draw(mycanvas160,127,160);
   plasma_frame_gradient_bottom_right.draw(mycanvas160,145,132);
}
