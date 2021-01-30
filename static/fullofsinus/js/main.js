/*

  MY GOD, IT'S FULL OF SINUS
  A hommage to old school C64 demos in JavaScript
  Created by Ingo Hinterding, 2014, 2015

  All code and graphics in this demo are free to be copied
  and used in your own demos, just don't blame me for any shitty code.
  I know there's lots and lots of it in here.

  If you use any of the code, fonts or graphics, please let me
  know by sending me an email at ingo@awsm.de
  and put me in your greetings section.

  This demo is pretty resource heavy and probably works
  best (or only) in a Chrome browser.

*/



function init(){

  // the stage canvas includes the c64 stages
  // canvas is 320*200 scaled up to 640*400, so the borders are 60 pixels each
  stage = new canvas(760,580,"main");
  stage.contex.imageSmoothingEnabled = false;
  stage.contex.mozImageSmoothingEnabled = false;
  stage.contex.oImageSmoothingEnabled = false;
  stage.contex.webkitImageSmoothingEnabled = false;
  stage.fill("#000000");
  mycanvas = new canvas(320,200);    // the inner screen of the C64
  mycanvas160 = new canvas (160,200); // the inner screen of the C64 with low resolution
  border = new canvas(380,320);      // the border of the C64

  tempPlayPart = 0;
  // -----------------

  window.addEventListener("keydown", checkKeyPressed, false);
  document.getElementById("toucharea").addEventListener('touchstart',   waitBeforeContinue , false)


  // -----------------

  // SID data
  SAMPLES_PER_BUFFER = 8192;  // allowed: buffer sizes: 256, 512, 1024, 2048, 4096, 8192, 16384
  var audiocontex;
  var bufferSource;
  var gainNode;
  var analyzerNode;

  // -----------------

  // c64 load routine

  var c64_games = Array(
    "AWSM IS BACK!", "WORLD GAMES/EPYX", "GIANA SISTERS +5",
    "TURRICAN +7", "*", "BUBBLE BOBBLE +","GRAND THEFT AUTO VI",
    "FULL OF SINUS","WINDOWS 3.11","MANIAC MANSION","PARALLAX+++",
    "SKATEORDIE!","MIKIE +3 /TRIAD",
    "AMIGA EMULATOR","ATARI ST EMULATOR","M.U.L.E.","GHOSTS'N'GOBLINS -5");
  c64_game = c64_games[Math.floor(Math.random()*c64_games.length)];

  c64 = new C64Load();    // needs to be set always (e.g. for colors)

  decrunch = new Decrunch(c64.colors,c64.colors.blue,c64.colors.light_blue,mycanvas,border,"@@@",200);

  // -----------------
  // Adding a variable "dev" as a URL param switches to dev mode
  // and starts with the demo part number set by m
  // eg. m=3 start the demo with part 3

  URL_param = location.search.split('dev=')[1];

  if(typeof(URL_param) != "undefined"){
    playPart = parseInt(URL_param);
    demoIsLive = false;
    c64.init(c64_game,stage,60,60,2,1,render);
  }else{
    playPart = 1;
    demoIsLive = true;
    c64.init(c64_game,stage,60,60,2,0,render);
  }


}

function checkKeyPressed(e){
  var keyCode = e.keyCode;

  if (keyCode == 32){
    // space key
    e.preventDefault(); // block scrolling behaviour of browsers for pressing 'space'

    // the code below simulates some waiting time between the parts
    // to make it look more like a c64. If stuff comes too fast the
    // illusion of sitting in front of the 64 is easily destroyed.
    // the number in the if statement needs to be the last number of the switch case below
    // to actually stop at the last demo part
    if (playPart < 999) waitBeforeContinue();
  }

  if (keyCode == 70){
    // f key
    e.preventDefault(); // block behaviour of browsers for pressing 'f'
    fullscr('main');
  }

  if (keyCode == 80){
    // p key
    if (playPart === 0){
       playPart = tempPlayPart;
    }else{
      tempPlayPart = playPart;
      playPart = 0;
    }
  }
}

function waitBeforeContinue(){
  if (playPart != 26){
    clearTimeout(loop);
    tempPlayPart = playPart;
    playPart = 999;
    stage.fill(c64.colors.black);
    mycanvas.fill(c64.colors.black);
    mycanvas160.fill(c64.colors.black);
    border.fill(c64.colors.black);
    playSong('sid/empty.sid',0);
    window.setTimeout(callNextPartKeyPress,Math.random()*2000+500);
  }
}

function callNextPartKeyPress(){
  // after the window timeout, the right part to play needs to be restored
  // before we can move on. This only gets called from they keypress event.
  playPart = tempPlayPart;
  callNextPart(); // this needs to be set to the last part in the switch case below
}

function callNextPart(){
  border.clear();
  mycanvas.clear();
  mycanvas160.clear();
  playPart++;
}


function render(){

  /*
  Main demo loop. Usually there are different parts with functions named after the JS file.
  init funcs are run only once, so callNextPart can be called right after calling the init.
  loop funcs are running in loops, so the callNextPart runs from within the demo part when needed.

  Some window timeouts are set to continue the demo after some time to the next part.
  Especially important for mobile devices that don't show a keyboard to skip manually.
  */

  switch (playPart){

    case 1:
            //clearScreen();
            callNextPart();
            break;

    case 2:
            eaglesoft_init();
            loop = setTimeout(waitBeforeContinue,60000);
            callNextPart();
            break;

    case 3:
            eaglesoft_render();
            break;

    case 4:
            callNextPart();
            break;

    case 5:
            decrunch.draw();
            break;

    case 6:
            fullofsinus_init();
            callNextPart();
            break;

    case 7:
            fullofsinus_render();
            break;

    case 8:
            whiteToBlack();
            break;

    case 9:
            uridium_init();
            loop = setTimeout(waitBeforeContinue,80000);
            callNextPart();
            break;

    case 10:
            uridium_render();
            break;

    case 11:
            plasma_init();
            loop = setTimeout(waitBeforeContinue,80000);
            callNextPart();
            break;

    case 12:
            plasma_render();
            break;

    case 13:
            karma_init();
            loop = setTimeout(waitBeforeContinue,80000);
            callNextPart();
            break;
    case 14:
            karma_render();
            break;

    case 15:
            planier_init();
            loop = setTimeout(waitBeforeContinue,200000);
            callNextPart();
            break;

    case 16:
            planier_render();
            break;

    case 17:
            checker_init();
            loop = setTimeout(waitBeforeContinue,100000);
            callNextPart();
            break;
    case 18:
            checker_render();
            break;

    case 19:
            tunnel_init();
            loop = setTimeout(waitBeforeContinue,200000);
            callNextPart();
            break;

    case 20:
            tunnel_render();
            break;

    case 21:
            roy_init();
            callNextPart();
            break;

    case 22:
            roy_render();
            break;

    case 23:
            credits_init();
            loop = setTimeout(waitBeforeContinue,400000);
            callNextPart();
            break;

    case 24:
            credits_render();
            break;

    case 25:
            c64end_init();
            callNextPart();
            break;

    case 26:
            c64end_render();
            break;

    case 999:
            turboload();
            break;
  }

  // draw the canvas on the scaled stage including the stages

  border.draw(stage,0,0,1,0,2,2);
  mycanvas.draw(stage,60,60,1,0,2,2);
  mycanvas160.draw(stage,60,60,1,0,4,2);


  // only show the scanlines when in live mode and not in fullscreen
  if (demoIsLive &&
    !(document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement)) {
    c64.showScanlines();
  }

  requestAnimFrame(render);
}
