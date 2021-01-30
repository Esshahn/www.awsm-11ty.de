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

  // weirdly, canvasSinus has to be created before canvas
  // otherwise codef throws an error
  canvasSinus = new canvas(320,200);
  canvas = new canvas(320,200);

  // load the assets
  logo = new image(basepath + "gfx/logo_ikari.gif");
  forthebest = new image(basepath + "gfx/forthebest.gif");
  copperbar_red = new image(basepath + "gfx/copperbar_red.gif");
  copperbar_brown = new image(basepath + "gfx/copperbar_brown.gif");
  copperbar_blue = new image(basepath + "gfx/copperbar_blue.gif");
  myfont = new image(basepath + "gfx/c64font_ikari.gif");
  myfont.initTile(8,9,33);

  // init variables
  copperY = 0;
  mySinus = 0;

  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="TRI-DOS AND JUST ICE OF IKARI IS HERE TO PRESENT YOU WITH 'RETURN OF THE JEDI+' (C) 1988 DOMARK SOFTWARE , CRACKED AND TRAINED ON 11/11/88! THIS GAME WAS A WEIRD FUCKER TO CRACK!   GREETINGS GO TO:     @@@  NONAMENO  @@@  NEW CORE  @@@  MELLOW MAN  @@@  SOLO  @@@  AIRO  @@@  TOTORMAN  @@@  AYOROS  @@@  SUBZERO  @@@  GANDALF  @@@   ............. WHOOP WHOOP!!! ............. THIS IS CRACKTRO REMAKE NUMBER FOUR FROM AWSM ............. AGAIN, A CRACKTRO THAT ENGRAVED ITSELF DEEP INTO MY MEMORIES... IKARI WAS ONE OF THE MOST ACTIVE GROUPS ON THE COMMODORE 64, AND THIS CRACKTRO - WHILE NOT THE ULTIMATE TECHNICAL ACHIEVEMENT - WAS JUST AS ICONIC AS THE LEGENDARY PRODS FROM EAGLE SOFT INCORPORATED AND FAIRLIGHT... THREE REMAKES DONE - TWO MORE TO GO (THINKING ABOUT 'HOTLINE' AND 'DYNAMIC DUO' REMAKES)!!     @  @@  @@@ @@ @     AGAIN, MOST OF THE TIME FOR THIS REMAKE WAS SPENT ON CONVERTING THE GRAPHICS, ESPECIALLY THE BEAUTIFUL FONT WHICH I WAS UNABLE TO FIND ANYWHERE. SO I HAD TO CREATE IT MYSELF. THAT'S DOZENS OF EMULATOR SCREENSHOTS TO TRACK ALL THE CHARACTERS ('Q' WAS A BITCH!). IT ISN'T COMPLETE, THOUGH, SOME CHARACTERS WERE ANIMATED.         ANYWAY, IT WAS GREAT FUN AGAIN, I LEARNED TONS ABOUT DEMO MAKING ON THE WAY (IT'S SOOO EASY TO GET LOST BROWSING THE WEB HUNTING DOWN ALL THOSE MEMORIES). IF YOU WANT TO DROP ME SOME FEEDBACK CONTACT ME AT INGO AT HINTERDING DOT COM OR JOIN THE 'CODEF' DEMO GROUP ON FACEBOOK!! THAT'S IT FOR TODAY, BYE!                                  10    9    8    7    6    5    4    3    2    1    0      ";
  myscrolltext.init(canvas,myfont,2);


  // SID data
  SAMPLES_PER_BUFFER = 16384;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'Ikari_Intro.sid',0);

  render();
}


function sinusMove(){ 
  this.sin = Math.ceil(Math.sin(mySinus)*120)-9;  
  mySinus += 0.0235; 
  myfont.print(canvasSinus,"@@ - RETURN OF THE JEDI + BY DOMARK! - @@",this.sin,80); 
}


function render(){

    // the movement of the charset gradient scrollers
    copperY -= 0.5;

    if (copperY < -22) {
      copperY = 0;
    } 

    // clear canvases
    canvas.fill("#000000");  
    canvasSinus.fill("#000000");

    // draw the sinus text
    sinusMove();    
    canvasSinus.contex.globalCompositeOperation='darken';
    copperbar_brown.draw(canvasSinus,0,80+copperY);
    canvasSinus.contex.globalCompositeOperation='source-over';
    canvasSinus.draw(canvas,0,0);

    // PROUDLY PRESENTS
    myfont.print(canvas,"PROUDLY PRESENTS",96,56);
    canvas.contex.globalCompositeOperation='darken';
    copperbar_blue.draw(canvas,0,56+copperY);
    canvas.contex.globalCompositeOperation='source-over';

    // CRACKED ON
    myfont.print(canvas,"CRACKED ON :11/11/88",80,104);
    canvas.contex.globalCompositeOperation='darken';
    copperbar_red.draw(canvas,0,104+copperY);
    canvas.contex.globalCompositeOperation='source-over';

    // scrolltext
    myscrolltext.draw(136);   
    canvas.contex.globalCompositeOperation='darken';
    copperbar_red.draw(canvas,0,136+copperY);
    canvas.contex.globalCompositeOperation='source-over';

    // "for the best" typo and ikari logo
    forthebest.draw(canvas,40,168);
    logo.draw(canvas,52,0);

    // draw the 320*200 canvas on the scaled stage including the bordes
    canvas.draw(stage,60,60,1,0,2,2);
    requestAnimFrame(render);
}
