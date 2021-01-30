function init(){
  // basepath for Antoine
  var basepath = "";

  // the stage canvas includes the c64 borders
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  stage = new canvas(760,520,"main");
  stage.contex.imageSmoothingEnabled = false;
  stage.contex.mozImageSmoothingEnabled = false;
  stage.contex.oImageSmoothingEnabled = false;
  stage.contex.webkitImageSmoothingEnabled = false;
  stage.fill("#000000"); 

  canvasLogo1 = new canvas(320,200);
  canvasLogo2 = new canvas(320,200);
  big_scroller_canvas = new canvas(320,40);
  canvas = new canvas(320,200);

  // load the assets
  bg = new image(basepath + "gfx/bg.gif");
  logo1 = new image(basepath + "gfx/papillon_inside.gif");
  logo2 = new image(basepath + "gfx/papillon_outside.gif");
  copperbar1 = new image(basepath + "gfx/papillon_inner_gradient.gif");
  copperbar2 = new image(basepath + "gfx/papillon_outer_gradient.gif");
  myfont = new image(basepath + "gfx/c64font_papillon.gif");
  scrollfont = new image(basepath + "gfx/c64font_papillon_big.gif");
  big_font_grid = new image(basepath + "gfx/big_font_grid.gif");
  big_scroller_gradient = new image(basepath + "gfx/big_scroller_gradient.gif");

  myfont.initTile(8,9,33);
  scrollfont.initTile(8*8,9*8,33);

  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt='PAL-FIXED, TRAINED AND IMPORTED BY MIGHTY PAPILLONS !!!   10 HOURS HARD WORK JUST TO GET THIS FUCKING GAME TO WORK ON PAL-COMPUTERS AND TO GOD DAMN TRAIN IT !!!   "THANX" TO FAC FOR TRAINING OUR RIMRUNNER++ - HOW LAME OF THEM....   READ LOWER SCROLL...   ';
  myscrolltext.init(canvas,myfont,0.75);

  myscrolltext_big = new scrolltext_horizontal();
  myscrolltext_big.scrtxt="HEY HEY HEY   READ HERE TOO....      WHY ARE YOU GAYS IN TRIAD SO FUCKING PROUD OF YOUR DAMN PAL-VERSION OF VINTER-EDITION ???     YOU KNOW WE DID IT 2 WEEKS BEFORE AND THEN YOU SAY IT WAS IMPOSSIBLE TO FIX - HA HA    ORIGINAL BROKEN BY MIGHTY ESI !!!!      ";
  myscrolltext_big.init(big_scroller_canvas,scrollfont,7);

  // init variables
  copperY = -100;
  inner_gradient_y = 0;
  scrollColor = 0;
  scrollColorYpos = 170;
  big_scroller_gradient_ypos = -178; // -178
  show_big_scroller = false;


  // SID data
  SAMPLES_PER_BUFFER = 16384;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'Coco_Intro.sid',1);

  color_array_red = ["red","light_red","yellow","white","yellow","light_red","red"];
  color_array_brown = ["brown","orange","yellow","white","white","yellow","orange"];
  color_array_grey = ["dark_grey","grey","light_grey","white","white","light_grey","grey"];
  color_fade_palfixed = new ColorFade(color_array_red,0,2.2,"darken");
  color_fade_topscroller = new ColorFade(color_array_brown,3,2.2,"darken");

  color_fade_title = [];
  
  blendmode = "darken";
  speed = 2;
  color_fade_title[0] = new ColorFade(color_array_grey,0,speed,blendmode);
  color_fade_title[1] = new ColorFade(color_array_grey,1,speed,blendmode);
  color_fade_title[2] = new ColorFade(color_array_grey,2,speed,blendmode);
  color_fade_title[3] = new ColorFade(color_array_grey,3,speed,blendmode);
  color_fade_title[4] = new ColorFade(color_array_grey,4,speed,blendmode);
  color_fade_title[5] = new ColorFade(color_array_grey,5,speed,blendmode);
  color_fade_title[6] = new ColorFade(color_array_grey,6,speed,blendmode);
  color_fade_title[7] = new ColorFade(color_array_grey,0,speed,blendmode);
  color_fade_title[8] = new ColorFade(color_array_grey,1,speed,blendmode);
  color_fade_title[9] = new ColorFade(color_array_grey,2,speed,blendmode);

  color_fade_title[10] = new ColorFade(color_array_grey,6,speed,blendmode);
  color_fade_title[11] = new ColorFade(color_array_grey,5,speed,blendmode);
  color_fade_title[12] = new ColorFade(color_array_grey,4,speed,blendmode);
  color_fade_title[13] = new ColorFade(color_array_grey,3,speed,blendmode);
  color_fade_title[14] = new ColorFade(color_array_grey,2,speed,blendmode);
  color_fade_title[15] = new ColorFade(color_array_grey,1,speed,blendmode);
  color_fade_title[16] = new ColorFade(color_array_grey,0,speed,blendmode);
  color_fade_title[17] = new ColorFade(color_array_grey,6,speed,blendmode);
  color_fade_title[18] = new ColorFade(color_array_grey,5,speed,blendmode);
  color_fade_title[19] = new ColorFade(color_array_grey,4,speed,blendmode);
  color_fade_title[20] = new ColorFade(color_array_grey,3,speed,blendmode);
  color_fade_title[21] = new ColorFade(color_array_grey,2,speed,blendmode);
  color_fade_title[22] = new ColorFade(color_array_grey,1,speed,blendmode);

  render();
}

function ColorFade(color_array,color_array_start,speed_max,blendmode){
  this.color_array = color_array.slice(0); // create a real copy of the array, not a reference
  this.speed_max = speed_max;
  this.color_array_start = color_array_start;
  this.speed = 0;
  this.blendmode = blendmode;
  this.color_array_length = this.color_array.length - 1;

  this.colors = {
    black:"#000000",  white:"#ffffff",  red:"#68372b",  cyan:"#70A4B2",
    purple:"#6F3D86", green:"#588D43",  blue:"#352879", yellow:"#B8C76F",
    orange:"#6F4F25", brown:"#433900",  light_red:"#9A6759",  dark_grey:"#444444",
    grey:"#6C6C6C",   light_green:"#9AD284",light_blue:"#6C5EB5",light_grey:"#959595"
  };

  this.draw = function(canvas,xpos,ypos,height,width){

    this.canvas = canvas;
    this.xpos = xpos;
    this.ypos = ypos;
    this.hpos = height;
    this.wpos = width;
    
    this.canvas.contex.globalCompositeOperation=this.blendmode;
    this.canvas.quad(this.xpos,this.ypos,this.hpos,this.wpos,this.colors[this.color_array[this.color_array_start]]);
    this.canvas.contex.globalCompositeOperation='source-over';

    this.speed+=this.speed_max;
    if (this.speed >= 10){
      this.color_array.push(this.color_array.shift());
      this.speed = 0;
    }
    
  }
}


function render(){

    // the movement of the charset gradient scrollers
    copperY += 0.86;
    if (copperY > 0) {
      copperY = -100;
    } 

    if (inner_gradient_y > -64) {
      inner_gradient_y -= 0.26;
    }else{
      show_big_scroller = true;
    } 
    
    // clear canvases
    canvas.fill("#000000");  
    canvasLogo1.fill("#000000"); 
    canvasLogo2.fill("#000000");
    big_scroller_canvas.fill("#000000"); 

    //bg.draw(canvas,0,0);

    // inner logo

    logo1.draw(canvasLogo1,8,1);
    canvasLogo1.contex.globalCompositeOperation='darken';
    copperbar1.draw(canvasLogo1,0,inner_gradient_y);
    canvasLogo1.contex.globalCompositeOperation='source-over';
    canvas.contex.globalCompositeOperation='lighter';
    canvasLogo1.draw(canvas,0,0);
    canvas.contex.globalCompositeOperation='source-over';
    
    // outer logo

    logo2.draw(canvasLogo2,6,0);
    canvasLogo2.contex.globalCompositeOperation='darken';
    copperbar2.draw(canvasLogo2,0,copperY);
    canvasLogo2.contex.globalCompositeOperation='source-over';
    canvas.contex.globalCompositeOperation='lighter';
    canvasLogo2.draw(canvas,0,0);
    canvas.contex.globalCompositeOperation='source-over';

    // PROUDLY PRESENTS
    myfont.print(canvas,"PRIDE OF DENMARK",95,63);
    myfont.print(canvas,"PRESENTS",127,95);
    myfont.print(canvas,"IMPOSSIBLE MISSION II ++",63,111);
    myfont.print(canvas,"PAL FIX + TRAINER : 08.04.88",47,127);
    myfont.print(canvas,"PRESS 'T' FOR TRAINER",79,191);
    
    // the small scroller
    myscrolltext.draw(79);

    // color fade

    color_fade_palfixed.draw(canvas,0,123,320,10);
    color_fade_topscroller.draw(canvas,0,79,320,10);

    for(i=0;i<=9;i++){
      color_fade_title[i].draw(canvas,63+i*8,110,8,7);
    }

    for(i=10;i<=22;i++){
      color_fade_title[i].draw(canvas,71+i*8,110,8,7);
    }

    // the big scroller

    big_scroller_gradient_ypos += 0.85;
    if (big_scroller_gradient_ypos >= -106) big_scroller_gradient_ypos = -178

    if (show_big_scroller) myscrolltext_big.draw(-8);
    big_scroller_canvas.contex.globalCompositeOperation='darken';
    big_scroller_gradient.draw(big_scroller_canvas,0,big_scroller_gradient_ypos);
    big_scroller_canvas.contex.globalCompositeOperation='source-over';
    big_font_grid.draw(big_scroller_canvas,0,0);
    big_scroller_canvas.draw(canvas,0,144);

    // add some black borders left and right

    canvas.quad(0,79,8,8,"#000000");
    canvas.quad(312,79,8,8,"#000000");

    // draw the 320*200 canvas on the scaled stage including the borders
    canvas.draw(stage,60,60,1,0,2,2);
    requestAnimFrame(render);
}
