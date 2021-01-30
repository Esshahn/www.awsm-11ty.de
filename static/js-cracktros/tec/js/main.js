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
  dotline = new image(basepath + "gfx/dotline.gif");
  logo_t = new image(basepath + "gfx/logo_tec_t.gif");
  logo_e = new image(basepath + "gfx/logo_tec_e.gif");
  logo_c = new image(basepath + "gfx/logo_tec_c.gif");
  colorcycle = new image(basepath + "gfx/colorcycle.gif");
  myfont = new image(basepath + "gfx/c64font_9x9_dynamic.gif");
  //underlay = new image(basepath + "gfx/underlay.gif");
  myfont.initTile(8,9,33);

  // init variables
  colorcycleX = 0;
 
  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="HELLO GUYS  THIS IS THE NEW TITLE FROM DJANGO DUO ..     TEC PRESENTS  : P.O.D.  THIS GAME IS FROM MASTERTRONIC  THE TRAINER IS BY DJANGO AND TIM FROM THE FAMOUS TEC          --- BEEP BEEEEP BEEP ---     HIJACKING ANOTHER CRACKTRO, THIS IS AWSM FROM, ERRRR.... AWSM AGAIN WITH ANOTHER REMAKE. THIS NICE CRACKTRO WASN'T REALLY ON MY TODO LIST, BUT IT WAS TOO TEMPTING TO SKIP... I HAD MOST OF IT ALREADY DONE ELSEWHERE (THE LOGO MOVEMENT FROM FAIRLIGHT, THE CHARSET FROM DYNAMIC DUO AND SO ON). SO, THIS WAS A QUICK ONE (ABOUT 3 HOURS, WITH LESS THAN ONE HOUR FOR THE CODE).... I LIKE THAT THIS INTRO HAS TWO SCROLLERS, SO YOU DON'T NEED TO WAIT FOR THE GREETINGS IN THIS ONE....    ANYWAY, I LEARNED SOME MORE ABOUT C64 DEMOS ON THE WAY (E.G. I DID NOT KNOW THAT AMIGA'S 'COPPERBARS' ARE CALLED 'RASTERBARS' ON THE 64) AND IT WAS RELAXING AND FUN TO DO ANOTHER REMAKE...     AS ALWAYS, I'M REALLY HAPPY ABOUT FEEDBACK, IT'S A BIG MOTIVATION TO CONTINUE DOING REMAKES...     SEE YOU NEXT TIME IN ANOTHER CRACKTRO!      ";
  myscrolltext.init(canvas,myfont,1.8);

  greetsscrolltext = new scrolltext_horizontal();
  greetsscrolltext.scrtxt="ORIGINAL GREETINGS GO TO: AEK CRACKWARE ESSEN.TMC.CFB.MORX.TDC.TLC..MR.Z.TAC.MZP.KRABAT.THE FALL GUYS.TDG.UCF.SOFTRUNNER.ELITE.TMM.ACE.CYBORG.AND ALL MEMBERS OF TEC          ADDITIONAL GREETINGS (CODEF REMAKE) GO TO: AIRO.AYOROS.GANDALF.JARI VUOKSENRANTA.MELLOW MAN.NEW CORE.NONAMENO.SOLO.SUBZERO.TINY'R'SID.TOTORMAN.AND ALL MEMBERS OF THE 'CODEF' AND 'AMIGA + C64 SZENE INTROS + DEMOS' GROUPS ON FACEBOOK!!!          ";
  greetsscrolltext.init(canvas,myfont,1);

  // SID data
  SAMPLES_PER_BUFFER = 16384;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'Leviathan.sid',0);

  logo_maxX = 186;
  logo_minX = 86;
  logo_dir = 1;
  logo_count = 0;

  render();
}


function drawLogo(){
    logo_count += logo_dir * 1.3;

    if (logo_dir == 1){
          logo_t.draw(canvas,86 + logo_count,3);
          logo_e.draw(canvas,136,3);
          logo_c.draw(canvas,186 - logo_count,3);
    }else{
          logo_c.draw(canvas,186 - logo_count,3);
          logo_e.draw(canvas,136,3);          
          logo_t.draw(canvas,86 + logo_count,3);
    }

    if(logo_count >= 100 || logo_count <= 0) logo_dir = logo_dir * (-1);
}


function render(){

    // the movement of the charset gradient scrollers
    colorcycleX -= 3.5;
    if (colorcycleX < -325) {
      colorcycleX = 0;
    } 
    
    // clear canvases
    canvas.fill("#000000");  
    //underlay.draw(canvas,0,0);
    drawLogo();

    dotline.draw(canvas,0,43);
    dotline.draw(canvas,0,75);
    dotline.draw(canvas,0,139);
   
    myfont.print(canvas,"THE FAMOUS T.E.C. INDUSTRIES ESSEN",24,55);
    
    canvas.contex.globalCompositeOperation='darken';
    colorcycle.draw(canvas,colorcycleX,43);
    canvas.contex.globalCompositeOperation='source-over';

    myfont.print(canvas,"PRESENTS:",120,87);
    myfont.print(canvas,"POD WITH TRAINER",88,103);

    myscrolltext.draw(151);  
    greetsscrolltext.draw(167); 

    blackborder.draw(canvas,0,0);
    blackborder.draw(canvas,312,0);
    
    // draw the 320*200 canvas on the scaled stage including the borders
    canvas.draw(stage,60,60,1,0,2,2);
    requestAnimFrame(render);
}
