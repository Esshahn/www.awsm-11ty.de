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
  canvas = new canvas(320,200);

  // load the assets
  logo1 = new image(basepath + "gfx/logo_1.gif");
  logo2 = new image(basepath + "gfx/logo_2.gif");
  underlay = new image(basepath + "gfx/underlay.png");
  copperbar1 = new image(basepath + "gfx/colorscroll1.gif");
  copperbar2 = new image(basepath + "gfx/colorscroll2.gif");
  colorscroll_grey = new image(basepath + "gfx/colorscroll_grey.gif");
  myfont = new image(basepath + "gfx/c64font_9x9_dynamic.gif");
  myfontBig = new image(basepath + "gfx/c64font_18x9_dynamic.gif");
  myfont.initTile(8,9,33);
  myfontBig.initTile(16,9,33);

  // init variables
  copperY = 0;
  scrollColor = 0;
  scrollColorYpos = 170;

  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="THE DYNAMIC-DUO TO THE REST OF THE WORLD: LOOK OUT FOR STREETHAWK & COBRA !                            TIME WARP...      THIS IS AWSM AGAIN...     I'M SUPER TIRED AND NEED SOME SLEEP, BUT AFTER A HARD BATTLE I FINALLY MANAGED TO HAVE A NEARLY PIXEL EXACT REMAKE OF ANOTHER LEGENDARY CRACKTRO THAT LAYED THE FOUNDATION TO THE AMAZING C64 DEMO SCENE.     LET'S QUICKLY DO SOME GREETINGS BEFORE GOING INTO MORE DETAIL ON THE REMAKE:     NONAMENO     NEW CORE     MELLOW MAN     TINY'R'SID     SOLO     AIRO     TOTORMAN     AYOROS     SUBZERO     GANDALF     ................ I STILL REMEMBER WHEN I WAS A KID LOOKING AT THIS BEAUTIFULLY COLORFUL LOGO, ADMIRING THE ART OF CODING. WELL, I STILL SUCK AT CODING, BUT IT WAS A HUGE SATISFACTION TO GET THIS CRACKTRO SO CLOSE TO THE ORIGINAL. IT TOOK HOURS TO MATCH THE COLOR GRADIENTS EXACTLY, AND EVEN MORE TIME TO FIND ENOUGH VERSIONS OF THIS CRACKTRO TO GENERATE THE FONT FROM THE SCREENSHOTS. AND JUST LIKE WITH THE 'IKARI' DEMO, 'Q' WAS A REAL BITCH TO HUNT DOWN.... OH AND AS SOME MIGHT NOTICE, DYNAMIC DUO CRACKTROS USUALLY HAD NO MUSIC - I TOOK THE 'ARTISTIC FREEDOM' TO ADD ROB HUBBARD'S 'SYNTH SAMPLE III' FROM THE YEAR 1985....           THIS MIGHT BE MY LAST CRACKTRO FOR A WHILE, I CAN'T THINK OF ANOTHER ONE THAT I FEEL THE NEED TO REDO, BUT PLEASE LET ME KNOW IF YOU STILL WANT TO SEE YOUR FAVORITE DEMO REMADE WITH CODEF.            OK, I NEED TO GET SOME SLEEP.... IF YOU WANT TO DROP ME SOME FEEDBACK CONTACT ME AT INGO AT HINTERDING DOT COM OR JOIN THE 'CODEF' DEMO GROUP ON FACEBOOK!! THAT'S IT FOR TODAY, BYE!                                  10    9    8    7    6    5    4    3    2    1    0      ";

  myscrolltext.init(canvas,myfontBig,2);


  // SID data
  SAMPLES_PER_BUFFER = 16384;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  playSong(basepath + 'Synth_Sample_III.sid',9);

  render();
}




function render(){

    // the movement of the charset gradient scrollers
    copperY -= 0.55;
    if (copperY < -79) {
      copperY = 0;
    } 
    
    // clear canvases
    canvas.fill("#000000");  
    canvasLogo1.fill("#000000"); 
    canvasLogo2.fill("#000000"); 
    
    //underlay.draw(canvas,0,0);
    
  
    logo1.draw(canvasLogo1,48,30);
    canvasLogo1.contex.globalCompositeOperation='darken';
    copperbar1.draw(canvasLogo1,0,30+copperY);
    canvasLogo1.contex.globalCompositeOperation='source-over';
    canvas.contex.globalCompositeOperation='lighter';
    canvasLogo1.draw(canvas,0,0);
    canvas.contex.globalCompositeOperation='source-over';
    
    logo2.draw(canvasLogo2,48,30);
    canvasLogo2.contex.globalCompositeOperation='darken';
    copperbar2.draw(canvasLogo2,0,-151-copperY);
    canvasLogo2.contex.globalCompositeOperation='source-over';
    canvas.contex.globalCompositeOperation='lighter';
    canvasLogo2.draw(canvas,0,0);
    canvas.contex.globalCompositeOperation='source-over';

    // PROUDLY PRESENTS
    myfont.print(canvas,"THE WORLD FAMOUS",96,14);
    myfont.print(canvas,"PRESENTS",128,102);
    myfont.print(canvas,"MIKIE!",137,118);
    myfont.print(canvas,"CRACKED ON: 02/10/86",80,142);
    myfont.print(canvas,"PRESS SPACE",112,158);
    
    // scrolltext

    scrollColor += 0.6;

    if(scrollColor >10) scrollColorYpos = 189;    
    if(scrollColor >25) scrollColorYpos = 180;    
    if(scrollColor >45) scrollColorYpos = 170;
    if(scrollColor >70) scrollColor = 0;

    myscrolltext.draw(188);   
    canvas.contex.globalCompositeOperation='darken';
    colorscroll_grey.draw(canvas,0,scrollColorYpos);
    canvas.contex.globalCompositeOperation='source-over';

    // draw the 320*200 canvas on the scaled stage including the borders
    canvas.draw(stage,60,60,1,0,2,2);
    requestAnimFrame(render);
}
