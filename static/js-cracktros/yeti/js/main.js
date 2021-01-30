function init(){
  // basepath for Antoine
  var basepath = "";

  // the stage canvas includes the c64 borders
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  stage = new canvas(760,520,"main");
  stage.contex.imageSmoothingEnabled = false;
  stage.contex.mozImageSmoothingEnabled = false;
  stage.contex.oImageSmoothingEnabled = false;
  stage.contex.imageSmoothingEnabled = false;
  stage.fill("#000000"); 

  big_scroller_canvas = new canvas(320,40);
  big_scroller_canvas_lines = new canvas(320,40);
  rasterbars_behind_logo = new canvas(320,95)
  mycanvas = new canvas(320,200);
  canvas_starfield = new canvas(320,66);

  // load the assets
  bg                    = new image(basepath + "gfx/bg.gif");
  logo                  = new image(basepath + "gfx/logo-yeti.gif");
  rasterbar_gold        = new image(basepath + "gfx/rasterbar-gold.gif");
  rasterbar_blue        = new image(basepath + "gfx/rasterbar-blue.gif");
  gradient_text         = new image(basepath + "gfx/gradient-text.gif");
  myfont                = new image(basepath + "gfx/c64font_yeti.gif");
  scrollfont            = new image(basepath + "gfx/c64font_yeti_big.gif");
  scrollfont_lines      = new image(basepath + "gfx/c64font_yeti_big-lines.gif");
  big_scroller_gradient = new image(basepath + "gfx/gradient-big-scroller.gif");

  myfont.initTile(8,9,33);
  scrollfont.initTile(8*4,9*4,33);
  scrollfont_lines.initTile(8*4,9*4,33);

  myscrolltext_big = new scrolltext_horizontal();
  myscrolltext_big.scrtxt="CRACKED ON 02/04/87   GREETINGS TO MICRO-MIX,FUTURE PROJECTS,THE COMMODORE BOYS,TRIAD,HOTLINE,UCF,1001-CREW,MZP,HEADBANGER,SYNTAX 2001,MAYDAY!,RADWAR,DCS,HQC,BRIAN,DANISH GOLD AND KRABAT    SPECIAL GREETINGS AND THANKS FOR THE CARDRUNCHER GOES TO     1001    ^P2                                                                        ";
  myscrolltext_big.init(big_scroller_canvas,scrollfont,5.2);

  myscrolltext_big_lines = new scrolltext_horizontal();
  myscrolltext_big_lines.scrtxt=myscrolltext_big.scrtxt;
  myscrolltext_big_lines.init(big_scroller_canvas_lines,scrollfont_lines,5.2); //5.3


  // init variables
  big_scroller_gradient_ypos = -32;
  big_scroller_lines_gradient_ypos = 0;
  raster_blue_y              = 0;
  gradient_text_x            = -400;
  fps_counter                = 0;


  // SID data
  SAMPLES_PER_BUFFER = 16384;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'Beyond_the_Forbidden_Forest.sid',10);

  // generate the starfield
  starfield = new Starfield(canvas_starfield,20,2,1,1,0,1,5,["#ffffff"]);

  render();
}


function Starfield(canvas,amount,w,h,xdir, ydir, minSpeed,maxSpeed,colors){
  /*

  canvas = the canvas to display
  amount = number of stars to display
  w = width of a star in pixels
  h = height of a star in pixels
  xdir = horizontal direction (0, 1 or -1)
  ydir = vertical direction (0, 1 or -1)
  minSpeed = the minimum speed a star can have
  maxSpeed = the maximum speed a star can have
  colors = array with colors, e.g. ["#ff0000", "#FF00FF"]

  */
  this.canvas = canvas;
  this.amount = amount;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.w = w;
  this.h = h;
  this.xdir = xdir;
  this.ydir = ydir;
  this.colors = colors;

  this.allStars = [];

  for(var i = 0; i<this.amount; i++){
    this.star = {
      speed: this.minSpeed + Math.random()*(this.maxSpeed-this.minSpeed),
      x: Math.floor(Math.random()*this.canvas.width),
      y: Math.floor(Math.random()*this.canvas.height),
      c: this.colors[Math.floor(Math.random()*this.colors.length)]

    };

    this.allStars.push(this.star);

  }


  this.draw = function(canvas){
    this.canvas = canvas;
    for(var i = 0; i<this.amount; i++){
      this.canvas.quad(Math.floor(this.allStars[i].x),Math.floor(this.allStars[i].y),this.w,this.h,this.allStars[i].c);

      this.allStars[i].x += this.xdir * this.allStars[i].speed;
      this.allStars[i].y += this.ydir * this.allStars[i].speed;

      if(this.allStars[i].x < -this.w){
        this.allStars[i].x = this.canvas.width+this.w;
        this.allStars[i].y =Math.random()*this.canvas.height;
      }

      if(this.allStars[i].x > this.canvas.width +this.w){
        this.allStars[i].x = 0-this.w;
        this.allStars[i].y = Math.random()*this.canvas.height;
      }

      if(this.allStars[i].y < -this.h){
        this.allStars[i].y = this.canvas.height+this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }

      if(this.allStars[i].y > this.canvas.height +this.h){
        this.allStars[i].y = 0-this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }


    }
  };

  this.update = function(xdir, ydir){
    this.xdir = xdir;
    this.ydir = ydir;
  }

}


function render(){

    // clear canvases
    mycanvas.fill("#000000");  
    big_scroller_canvas.clear(); 
    big_scroller_canvas_lines.clear(); 
    rasterbars_behind_logo.fill("#000000");
    canvas_starfield.clear();

    //bg.draw(canvas,0,0);

    // draw the golden rasterbars behind the logo
    rasterbar_gold.draw(rasterbars_behind_logo,0,1);
    rasterbar_gold.draw(rasterbars_behind_logo,0,33);
    rasterbar_gold.draw(rasterbars_behind_logo,0,65);
    rasterbars_behind_logo.quad(0,92,320,3,"#000000");

    // draw blue rasterbars behind logo
    raster_blue_y += 0.825;
    if (raster_blue_y >95+32) {
      raster_blue_y = 0;
    } 
    rasterbar_blue.draw(rasterbars_behind_logo,0,-32+raster_blue_y);
    rasterbar_blue.draw(rasterbars_behind_logo,0,95-raster_blue_y);
    rasterbars_behind_logo.draw(mycanvas,0,0);

    // text display
    myfont.print(mycanvas,"THE WORLD-RULING",95,111);
    myfont.print(mycanvas,"YETI-FACTORIES PROUDLY PRESENT",39,127);
    myfont.print(mycanvas,"HADES NEBULA",111,143);

    mycanvas.contex.globalCompositeOperation='darken';
    gradient_text.draw(mycanvas,gradient_text_x,100);
    mycanvas.contex.globalCompositeOperation='source-over';
    
    if (gradient_text_x>=-18) {
      gradient_text_x = -400;
    } else {
      gradient_text_x+=6.8;    
    }

    rasterbar_gold.draw(mycanvas,0,170);

    // the normal font of the big scroller 

    big_scroller_gradient_ypos += 0.8;
    if (big_scroller_gradient_ypos >= 0) big_scroller_gradient_ypos = -32;
    myscrolltext_big.draw(0);
    big_scroller_canvas.contex.globalCompositeOperation='source-in';
    big_scroller_gradient.draw(big_scroller_canvas,0,big_scroller_gradient_ypos);
    big_scroller_canvas.contex.globalCompositeOperation='source-over';
    big_scroller_canvas.draw(mycanvas,0,168);

    // the diagonal lines font of the big scroller

    big_scroller_lines_gradient_ypos -= 0.8;
    if (big_scroller_lines_gradient_ypos <= -32) big_scroller_lines_gradient_ypos = 0;
    myscrolltext_big_lines.draw(0);
    big_scroller_canvas_lines.contex.globalCompositeOperation='source-in';
    big_scroller_gradient.draw(big_scroller_canvas_lines,0,big_scroller_lines_gradient_ypos);
    big_scroller_canvas_lines.contex.globalCompositeOperation='source-over';
    big_scroller_canvas_lines.draw(mycanvas,0,168);


    // add some black borders left and right of the big scroller
    mycanvas.quad(0,168,8,32,"#000000");
    mycanvas.quad(312,168,8,32,"#000000");

    // draw logo
    logo.draw(mycanvas,0,0);

    starfield.draw(canvas_starfield);
    canvas_starfield.draw(mycanvas,0,100);

    // draw the 320*200 canvas on the scaled stage including the borders
    
    fps_counter++;
    if (fps_counter==1){
      fps_counter = 0;
      mycanvas.draw(stage,60,60,1,0,2,2);
    } 
    requestAnimFrame(render);   
}
