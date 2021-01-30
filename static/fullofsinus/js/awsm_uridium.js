function uridium_init(){

  awsm_logo_blueScreen_canvas = new canvas(166,66);


  // load the assets
  awsm_logo_outline = new image("gfx/awsm_logo_outline.gif");
  awsm_logo_gradient = new image("gfx/grad_logo_outline.gif");
  bg_grey_tiles = new image("gfx/bg_grey_tiles.gif");
  rasterbar_grey = new image("gfx/rasterbar_grey.gif");
  colorcycle = new image("gfx/colorcycle.gif");
  myfont_small = new image("gfx/font_hotline.gif");
  myfont_small.initTile(8,9,33);
  myfont = new image("gfx/font_hotline_2x3.gif");
  myfont.initTile(16,24,33);

  // init variables


  myscrolltext = new scrolltext_horizontal();
  myscrollparam=[{myvalue: 0, amp: 36.0, inc:0.2, offset: -0.08}];
  myscrolltext.scrtxt="         WHOAAH!!!      ^P1NOTICE: THIS IS A   MULTIPART DEMO    ^P2   SO STAY WITH ME!   PRESS 'P' TO PAUSE  ^P2 OR... PRESS SPACE TO GO ON ^P2     IT'S 1989 AND THIS IS AWSM TYPING... AFTER SEVERAL CRACKTRO REMAKES IT WAS TIME FOR SOMETHING ORIGINAL... THE AWSM MEGADEMO!  ^P2   GETTING BORED?   ^P1   THEN LET'S MOVE ON!    PRESS SPACE!     ^P5";
  myscrolltext.init(mycanvas,myfont,2.4,myscrollparam);


  if (demoIsLive) playSong('sid/Cool_Croc_Twins.sid',5);

  uridium_starfield = new Starfield(mycanvas,100,2,1,1,0,1,5,[c64.colors.white,c64.colors.dark_grey,c64.colors.grey,c64.colors.light_grey]);


}





function logoMoveAndGradient(){
  if(typeof(myRaster) == "undefined") myRaster = 0;
  if(typeof(mySinus) == "undefined"){
      mySinus = 0;
      mySinus2 = 0.4;
      mySinus3 = 0.8;

  }
  if (typeof(swing) == "undefined") swing = 84;
  if (myRaster <= -96) myRaster = 0;

  if(typeof(sinMax) == "undefined"){
    sinMax = 0;
    sinMin = 0;
  }

  myRaster -= 0.6;
  mySinus += 0.03;
  mySinus2 += 0.03;
  mySinus3 += 0.03;

  awsm_logo_outline.draw(awsm_logo_blueScreen_canvas,0,0);

  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-atop';
    awsm_logo_gradient.draw(awsm_logo_blueScreen_canvas,0,myRaster);
  awsm_logo_blueScreen_canvas.contex.globalCompositeOperation='source-over';

  this.sin = Math.ceil(Math.sin(mySinus)*swing);
  this.sin2 = Math.ceil(Math.sin(mySinus2)*swing);
  this.sin3 = Math.ceil(Math.sin(mySinus3)*swing);

  awsm_logo_outline.draw(mycanvas,77+this.sin,0);
  awsm_logo_outline.draw(mycanvas,77+this.sin2,0);
  mycanvas.contex.globalCompositeOperation='darken';
    mycanvas.quad(0,0,320,70,c64.colors.dark_grey);
  mycanvas.contex.globalCompositeOperation='source-over';
  awsm_logo_blueScreen_canvas.draw(mycanvas,77+this.sin3,0);


}


function drawGreyTiles(){
  if(typeof(moveX) == "undefined"){
    moveX = 0;
  }
  if(typeof(mySinusTiles) == "undefined") mySinusTiles = 0;
  mySinTiles = Math.ceil(Math.sin(mySinusTiles)*16);

  mycanvas.quad(0,85-mySinTiles,320,70+mySinTiles*2,"#ffffff");
  mycanvas.contex.globalCompositeOperation='darken';
    bg_grey_tiles.draw(mycanvas,moveX,moveX+70);
  mycanvas.contex.globalCompositeOperation='source-over';

  rasterbar_grey.draw(mycanvas,0,85-mySinTiles);
  rasterbar_grey.draw(mycanvas,0,155+mySinTiles);

  moveX --;
  mySinusTiles += 0.06;

  if(moveX<=-60){
    moveX = 0;
  }
}

function colorcycleFont(){
  if (typeof (colorcycleX) == "undefined") colorcycleX = -1280;

  colorcycleX += 8;
  if (colorcycleX > 0) {
    colorcycleX = -1280;
  }

  myfont_small.print(mycanvas,"* PRESS JOY 1 OR SPACE TO CONTINUE *",16,192);
  mycanvas.contex.globalCompositeOperation='darken';
    colorcycle.draw(mycanvas,colorcycleX,192);
  mycanvas.contex.globalCompositeOperation='source-over';
}

function uridium_render(){
    stage.fill(c64.colors.black);
    mycanvas.fill(c64.colors.black);
    uridium_starfield.draw(mycanvas);
    drawGreyTiles();
    logoMoveAndGradient();
    myscrolltext.draw(110);
    colorcycleFont();
}
