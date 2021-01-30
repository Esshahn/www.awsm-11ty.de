function init(){
  // init assets
  stage = new CanvasStage("main",320,200);
  canvas = new CanvasObj(320,200);
  logo = new Sprite("gfx/awsm_logo_320.gif");
  line = new Sprite("gfx/line.gif");
  raster = new Sprite("gfx/raster.gif");
  copperbar = new Sprite("gfx/copperbar_gold.gif");
  myfont = new image('gfx/c64font_fairlight.gif');
  myfont.initTile(8,9,33);
  scrollCanvas = new CanvasObj(320,110);
  scrollBlink = new Sprite("gfx/colorscroll.gif");


  // init variables
  canvas.contex = canvas.ctx; // needed for codef to work
  scrollCanvas.contex = scrollCanvas.ctx;
  copperSin = 0;
  logoSin = 0;

  starfield= new starfield3D(canvas, 1000, 0, 320,110, 130, 60,'#888888', 100,0,80);
  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="CRACKED ON THE 14TH OF SEPTEMBER 1987...   GREETINGS GO TO:     ***  NONAMENO  ***  NEW CORE  ***  MELLOW MAN  ***  SOLO  ***  AIRO  ***  TOTORMAN  ***  AYOROS  ***  SUBZERO  ***  GANDALF  ***   THIS IS MY THIRD CRACKTRO, THIS TIME AN ORIGINAL RELEASE! CREDITS GO TO FAIRLIGHT FOR THE FONT, JEROEN TEL FOR THE MUSIC (S-EXPRESS), NONAMENO FOR THE CODEF FRAMEWORK AND JUERGEN WOTHKE FOR TINYJSSID.     * * * * * *     CREATING THIS CRACKTRO WAS EXTREMELY FUN AS I GOT TO DRAW SOME PIXEL GFX AGAIN. THE AWSM LOGO WAS DONE IN PHOTOSHOP (TRIED TO DO IT IN KOALAPAINT AND AMICA PAINT BEFORE BUT THAT WAS TOO PAINFUL), DRAWN BY HAND WITH THE REAL C64 COLORS AND A 160X200 MULTICOLOR RESOLUTION. I USED MORE OF THE CODEF FRAMEWORK THIS TIME (SCROLLER, STARFIELD, CORE) AND IT WAS A GREAT LEARNING. HOWEVER, I REALLY WOULD LOVE TO BUILD ON MY OWN AWSMLIB MORE AND NEED TO FIND A WAY TO MAKE BOTH MORE COMPATIBLE (WHICH WAS GIVING ME THE BIGGEST HEADACHES THIS TIME).     * * * * * *     ALRIGHT, THAT'S IT FOR TODAY, HOPE YOU LIKE MY LITTLE RETRO CRACKTRO... SEE YOU NEXT TIME AND DON'T FORGET TO VISIT WWW.AWSM.DE FOR MORE CRACKTROS! BYE!          * ** *** ** *          ";
  myscrollparam=[{myvalue: 0, amp: 48, inc:0.1, offset: -0.02}];  
  myscrolltext.init(scrollCanvas,myfont,1,myscrollparam);


  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audioCtx;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong('S-Express.sid',0);
  render();
}



function drawLogo(){ 
  this.sin = 92+Math.ceil(Math.sin(logoSin)*60);  
  logoSin += 0.040; 
  canvas.ctx.drawImage(logo,this.sin,10);    
}

function drawCopper(){ 
  this.sin = Math.ceil(Math.sin(copperSin)*14);  
  copperSin += 0.10; 
  myfont.print(canvas,"DELTA+++",130,130);   
  canvas.ctx.globalCompositeOperation='darken';
  canvas.ctx.drawImage(copperbar,0,114+this.sin); 
  canvas.ctx.globalCompositeOperation='source-over';
}


function render(){     
    canvas.clear();  
    //canvas.ctx.drawImage(raster,0,0); 
    drawLogo();

    // draw the text on top and bottom and merge with copperbar
    myfont.print(canvas,"QUALITY SOFTWARE KAPUT PROUDLY PRESENTS",4,69);
    myfont.print(canvas,"PRESS JOYSTICK IN PORT 1 TO START GAME",8,192);
    canvas.ctx.globalCompositeOperation='darken';
    canvas.ctx.drawImage(copperbar,0,56);
    canvas.ctx.drawImage(copperbar,0,173);
    canvas.ctx.globalCompositeOperation='source-over';

    starfield.draw();
    canvas.ctx.drawImage(line,0,80);
    canvas.ctx.drawImage(line,0,190);
    drawCopper();
    
    // draw scroll canvas and scroller
    canvas.ctx.drawImage(scrollCanvas,0,80);
    scrollCanvas.ctx.clearRect (0,0,320,110);
    myscrolltext.draw(50);   
    scrollCanvas.ctx.globalCompositeOperation='source-atop';
    scrollCanvas.ctx.drawImage(scrollBlink,0,0);
    scrollCanvas.ctx.globalCompositeOperation='source-over';
    stage.clear();
    stage.ctx.drawImage(canvas,0,0);
    
    requestAnimFrame(render);
}
