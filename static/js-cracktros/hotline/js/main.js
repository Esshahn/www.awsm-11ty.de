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

  canvas = new canvas(320,200);

  // load the assets
  blackborder = new image(basepath + "gfx/blackborder.gif");
  logo = new image(basepath + "gfx/logo_hotline.gif");
  pattern_blue = new image(basepath + "gfx/pattern_blue.gif");
  pattern_brown = new image(basepath + "gfx/pattern_brown.gif");
  colorcycle = new image(basepath + "gfx/colorcycle.gif");
  myfont = new image(basepath + "gfx/c64font_9x9_hotline.gif");
  scrollfont = new image(basepath + "gfx/c64font_hotline_big.gif");
  underlay = new image(basepath + "gfx/underlay.gif");
  introbytmc = new image(basepath + "gfx/introbytmc.gif");
  ship_left = new image(basepath + "gfx/spaceship_left.gif");
  ship_right = new image(basepath + "gfx/spaceship_right.gif");
  black_overlay = new image(basepath + "gfx/black_overlay.gif");
  myfont.initTile(8,9,33);
  scrollfont.initTile(8*8,9*8,33);

  // init variables
  colorcycleY = 105;
  logoX = 0;
  pattern_blueX = 0;
  pattern_brownX = 0;
  blinkBox = 0;
  blinkBoxColor = "#000000";

  shipAnimation = 0;

  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="CRACKED BY POPEYE. THE GAME IS FROM FIREBIRD....       THANKS TO RONNIE FOR THE ORIGINAL..        GREETINGS TO: RAD - YETI - ANTITRAX - WIZAX - TRIAD - FAIRLIGHT - THE MOVERS - RONNIE - FANTASIE CRACKING SERVICE - STARLINE - ANNIKA - THE FANATIC DUO - D.S. COMPWARE - RAW DEAL INC. - TARTAN ARMY - TRIANON - BEASTIE BOYS - THE PHANTOM - HELL RIDER - REFLEX - TRAZER - HADDOCK - DANISH GOLD - G.USA TEAM - TMC - EAGLE SOFT INC. - 1001 CREW - SYSTEM INT. - NEW EDITION        ----- REMAKE BY AWSM ----        REMAKE GREETINGS TO: AIRO - AYOROS - GANDALF - JARI VUOKSENRANTA - MELLOW MAN - NEW CORE - NONAMENO - SOLO - SUBZERO - TINY'R'SID - TOTORMAN - AND ALL MEMBERS OF THE 'CODEF' AND 'AMIGA + C64 SZENE INTROS + DEMOS' GROUPS ON FACEBOOK...        THIS CRACKTRO WAS THE HARDEST TO REMAKE. LOTS OF SCROLLING AND SOME TECHNICAL CHALLENGES. SPECIAL THANKS TO JUERGEN WOTHKE WHO RIPPED THE SOUND FROM THE ORIGINAL. IT'S STILL NOT PERFECT - I HOPE YOU LIKE IT ANYWAY. MY TODO LIST IS FINALLY EMPTY, APART FROM ONE LAST TASK: ANOTHER ORIGINAL AWSM CRACKTRO... BUT THAT MAY TAKE A WHILE.        HAVE A GREAT DAY EVERYBODY!!                        ";
  myscrolltext.init(canvas,scrollfont,6);


  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'hotline_intro.sid',0);

  requestAnimFrame(render);
}

function blinkBx(){

    blinkBox += 0.6;

    // #675200  dark brown 
    // #99692d  brown
    // #d5df7c  yellow
    // #70a4b2  light blue
    // #6c5eb5  blue
    // #352879  dark blue

    this.start = 83;
    this.step = 3;

    if(blinkBox >this.start + this.step * 1) blinkBoxColor = "#675200";   
    if(blinkBox >this.start + this.step * 2) blinkBoxColor = "#99692d";    
    if(blinkBox >this.start + this.step * 3) blinkBoxColor = "#d5df7c";
    if(blinkBox >this.start + this.step * 4) blinkBoxColor = "#ffffff";
    if(blinkBox >this.start + this.step * 5) blinkBoxColor = "#70a4b2";
    if(blinkBox >this.start + this.step * 6) blinkBoxColor = "#6c5eb5";
    if(blinkBox >this.start + this.step * 7) blinkBoxColor = "#352879";
    if(blinkBox >this.start + this.step * 8) blinkBoxColor = "#000000"; 
    if(blinkBox >this.start + this.step * 9) blinkBox = 0;

    canvas.contex.globalCompositeOperation='lighter';
    canvas.quad(64,120,184,8,blinkBoxColor);
    canvas.contex.globalCompositeOperation='source-over';
}

function ships(){

  // lots of small animations for the ships
  // too lazy to replicate the char movement though

  // init some variables
  if (shipAnimation == 0){

      ship_left_x = -40;
      ship_left_x_end = 1;
      ship_right_x = 335;
      ship_right_x_end = 295;

      ships_speed = 1;

      black_top_x = 0;
      black_bottom_x = 0;

      ships_out = 0;

      shipAnimation = 1;

  }

  // move the right ship in
  // keep the 2 scrollers hidden
  if (shipAnimation == 1){

    black_overlay.draw(canvas,0,105);
    black_overlay.draw(canvas,0,120);

    if(ship_right_x_end < ship_right_x){
      ship_right.draw(canvas,ship_right_x,98);
      ship_right_x -= ships_speed;
    }else{
      shipAnimation = 2;
    }

  }

  // right ship stands still
  // top scroller is revealed
  if (shipAnimation == 2){

    if(black_top_x <320){
      black_overlay.draw(canvas,black_top_x,105);
      black_top_x += 4;
    }else{
      shipAnimation = 3;
    }

    black_overlay.draw(canvas,0,120);
    ship_right.draw(canvas,ship_right_x_end,98);

  }

  // right ship stands still
  // left ship moves in
  if (shipAnimation == 3){

    black_overlay.draw(canvas,0,120);

    if(ship_left_x_end > ship_left_x){
      ship_left.draw(canvas,ship_left_x,116);
      ship_left_x += ships_speed;
    }else{
      shipAnimation = 4;
    }

    ship_right.draw(canvas,ship_right_x_end,98);
  }


  // left ship stands still
  // bottom scroller is revealed
  if (shipAnimation == 4){

    if(black_bottom_x >-320){
      black_overlay.draw(canvas,black_bottom_x,120);
      black_bottom_x -= 4;
    }else{
      shipAnimation = 5;
    }

    ship_left.draw(canvas,ship_left_x_end,116);
    ship_right.draw(canvas,ship_right_x_end,98);
  }


  // both ships move out
  if (shipAnimation == 5){

    if(ships_out < 50){
      ship_left.draw(canvas,ship_left_x_end-ships_out,116);
      ship_right.draw(canvas,ship_right_x_end+ships_out,98);
      ships_out += ships_speed;
    }else{
      shipAnimation = 6;
    }
  }

}


function render(){


    colorcycleY -= 0.8;
    if (colorcycleY <= 77) {
      colorcycleY = 105;
    } 

    logoX -= 3.5;
    if (logoX < -1000) {
      logoX = -105;
    } 

    pattern_blueX -= 2;
    if (pattern_blueX < -8) {
      pattern_blueX = 0;
    } 

    pattern_brownX -= 2;
    if (pattern_brownX < -8) {
      pattern_brownX = 0;
    } 

    
    // clear canvases
    canvas.fill("#000000");  
    //underlay.draw(canvas,0,0);
    
    if (shipAnimation > 1){
      myfont.print(canvas,"PRESENTS ON 29-09-1987:",63,103);
      myfont.print(canvas,"BUBBLE BOBBLE",95,119);
      canvas.contex.globalCompositeOperation='darken';
      colorcycle.draw(canvas,0,colorcycleY);
      canvas.contex.globalCompositeOperation='source-over';
    }

  
    ships();

    if (shipAnimation == 6) blinkBx();

    pattern_blue.draw(canvas,pattern_blueX,16);
    logo.draw(canvas,logoX,0);
    pattern_brown.draw(canvas,pattern_brownX,145);
    introbytmc.draw(canvas,233,193);

    if (shipAnimation == 6) myscrolltext.draw(128);  
 
    blackborder.draw(canvas,0,-104);
    blackborder.draw(canvas,312,-104);
    
    // draw the 320*200 canvas on the scaled stage including the borders
    canvas.draw(stage,60,60,1,0,2,2);
    requestAnimFrame(render);
}
