function credits_init()
{
  stage.clear();
  mycanvas160.clear();
  mycanvas.clear();

  credits_gradient = new image("gfx/credits_gradient.gif");
  credits_bubble1 = new image("gfx/credits_bubble1.gif");
  credits_bubble2 = new image("gfx/credits_bubble2.gif");
  credits_bubble3 = new image("gfx/credits_bubble3.gif");
  credits_font = new image("gfx/font_zxspectrum_8x8.gif");
  credits_font.initTile(8,8,32);

  credits_scroller_canvas = new canvas (320,200);

  if (demoIsLive) playSong('sid/Arctic_Circles.sid',0);

  sinusScrolltext =  "$              THE END";

  sinusScrolltext += "$$$$$";
  sinusScrolltext += "$    My god, it's full of sinus! ";
  sinusScrolltext += "$$$  A 'C64 Javascript demo' by AWSM";
  sinusScrolltext += "$         released in 2015";

  sinusScrolltext += "$$       I hope you liked it.";

  sinusScrolltext += "$$$$$Making this demo was an amazing";
  sinusScrolltext += "$experience. I revisited many great";
  sinusScrolltext += "$C64 prods again, some of them";
  sinusScrolltext += "$nothing less than legendary.";

  sinusScrolltext += "$$$This demo is intended as a";
  sinusScrolltext += "$homage to those pieces of art.";
  sinusScrolltext += "$$$I tried to stay within the C64's";
  sinusScrolltext += "$limitations (colors, resolution)";
  sinusScrolltext += "$as close as possible.";
  sinusScrolltext += "$However, any demo coder will spot";
  sinusScrolltext += "$a lot that is impossible on a C64";
  sinusScrolltext += "$while being incredibly easy on a";
  sinusScrolltext += "$modern computer.";
  sinusScrolltext += "$$I hope no real scener got offended";
  sinusScrolltext += "$by my work.";

  sinusScrolltext += "$$$I want to thank all those coders";
  sinusScrolltext += "$artists and musicians that brought";
  sinusScrolltext += "$me so many great memories and still";
  sinusScrolltext += "$amaze me with their creativity today.";

  sinusScrolltext += "$$            THANK YOU.";

  sinusScrolltext += "$$$$     --== ABOUT AWSM ==--";
  sinusScrolltext += "$$AWSM is actually just me, so most";
  sinusScrolltext += "$of the code and graphics are done";
  sinusScrolltext += "$by only me, unless stated below:";

  sinusScrolltext += "$$$$      --== C64 LOADER ==--";
  sinusScrolltext += "$$I ended up building a small lib";
  sinusScrolltext += "$for C64 effects, including colors,";
  sinusScrolltext += "$hires- and multicolor modes,";
  sinusScrolltext += "$rasterbars and other stuff.";

  sinusScrolltext += "$$$$  --== THE E.S.I. RIPOFF ==--";
  sinusScrolltext += "$$Original: EAGLESOFT INC.";
  sinusScrolltext += "$Music: Ben Daglish";
  sinusScrolltext += "$$Just a quick screen to kick things";
  sinusScrolltext += "$off. My initial idea for the demo";
  sinusScrolltext += "$was to have many screens that";
  sinusScrolltext += "$fake iconic cracktros, but in a";
  sinusScrolltext += "$ironic and probably very lame way.";
  sinusScrolltext += "$$The demo was supposed to be";
  sinusScrolltext += "$named 'The edge of disgust'.";
  sinusScrolltext += "$Well, I lost track of that goal and";
  sinusScrolltext += "$ended up somewhere else instead.";

  sinusScrolltext += "$$$$    --== FULL OF SINUS ==--";
  sinusScrolltext += "$$Music: Sasha Stojanovic (Dalton)";
  sinusScrolltext += "$$The idea of a floppy disk as a";
  sinusScrolltext += "$monolith on the moon fascinated me";
  sinusScrolltext += "$so I made this screen.";
  sinusScrolltext += "$$The whole title is obviously one";
  sinusScrolltext += "$big 2001 reference.";

  sinusScrolltext += "$$$$  --== URIDIUM SCREEN ==--";
  sinusScrolltext += "$$Music: M. Wilson & D. Haynes";
  sinusScrolltext += "$$A classic starfield cracktro with a";
  sinusScrolltext += "$funky tune from Cool Croc Twins.";
  sinusScrolltext += "$The first screen I did for this demo.";

  sinusScrolltext += "$$$$ --== AWSM9001 PLASMA ==--";
  sinusScrolltext += "$$Music: Sascha Zeidler (Linus)";
  sinusScrolltext += "$Original plasma: Kevin Roast";
  sinusScrolltext += "$$Special thanks to Linus";
  sinusScrolltext += "$for allowing me to use his";
  sinusScrolltext += "$excellent tune 'Locomotive Chef'.";

  sinusScrolltext += "$$$$--== AWSM9000 POS. KARMA ==--";
  sinusScrolltext += "$$Music: Sascha Zeidler (Linus)";
  sinusScrolltext += "$$I liked that song so much that";
  sinusScrolltext += "$I named the screen after it:";
  sinusScrolltext += "$'Positive Karma'.";

  sinusScrolltext += "$$$$   --== CREDITS SCREEN ==--";
  sinusScrolltext += "$$Music: Tomas Danko (Danko)";
  sinusScrolltext += "$$Just a small idea to show off";
  sinusScrolltext += "$my proportional charset scroll.";
  sinusScrolltext += "$I think it turned out fun.";

  sinusScrolltext += "$$$$ --== 3D CHECKERBOARD ==--";
  sinusScrolltext += "$$Music: Stellan Andersson (Dane)";
  sinusScrolltext += "$$The code for the checkerboard is";
  sinusScrolltext += "$based on a CODEF demo by Drskull.";

  sinusScrolltext += "$$$$   --== WELTRAUMQUALLE ==--";
  sinusScrolltext += "$$Music: Hein Holt";
  sinusScrolltext += "$$Original tunnel code taken from";
  sinusScrolltext += "$a CODEF demo by Totorman.";
  sinusScrolltext += "$$Weltraumqualle is german for";
  sinusScrolltext += "$jellyfish in space. This screen";
  sinusScrolltext += "$got changed so often that I";
  sinusScrolltext += "$could make a demo as big as this";
  sinusScrolltext += "$with all these versions.";

  sinusScrolltext += "$$$$     --== BLADERUNNER ==--";
  sinusScrolltext += "$$Music: Johan Astrand (Zyron)";
  sinusScrolltext += "$$A magical scene from Bladerunner.";
  sinusScrolltext += "$I had to do a C64 hommage.";
  sinusScrolltext += "$The paper unicorn at the end";
  sinusScrolltext += "$is a key symbol used in the movie.";

  sinusScrolltext += "$$$$    --== THESE CREDITS ==--";
  sinusScrolltext += "$$Music: Stellan Andersson (Dane)";
  sinusScrolltext += "$$Special thanks to Stellan for";
  sinusScrolltext += "$giving me permission to use his";
  sinusScrolltext += "$wonderful tune 'Arctic Circles'.";
  sinusScrolltext += "$I'm a big fan of his work and the";
  sinusScrolltext += "$soundtrack for 'Edge of Disgrace'";
  sinusScrolltext += "$is among the best ever done.";

  sinusScrolltext += "$$$$   --== GENERAL STUFF ==--";
  sinusScrolltext += "$$I never thought this little demo";
  sinusScrolltext += "$would end up being so huge.";
  sinusScrolltext += "$I learned to value the real C64";
  sinusScrolltext += "$prods even more, especially when";
  sinusScrolltext += "$it comes to consistancy, flow";
  sinusScrolltext += "$and linking all together.";
  sinusScrolltext += "$$FULL OF SINUS is much more";
  sinusScrolltext += "$a collection of intros than it is";
  sinusScrolltext += "$a well planned multi-part demo.";

  sinusScrolltext += "$$$$    --== TECH STUFF ==--";
  sinusScrolltext += "$Even for a one trick pony like me";
  sinusScrolltext += "$(after all, the demo is actually";
  sinusScrolltext += "$full of sinus routines...)";
  sinusScrolltext += "$there's some cool code used:";
  sinusScrolltext += "$$CODEF by NoNameNo is a";
  sinusScrolltext += "$JavaScript demo framework.";
  sinusScrolltext += "$Simple, but very powerful.";
  sinusScrolltext += "$$Tiny'r'Sid by Juergen Wothke";
  sinusScrolltext += "$is a cool player that lets you";
  sinusScrolltext += "$easily play your favorite";
  sinusScrolltext += "$SID sound files.";
  sinusScrolltext += "$$Without these, I probably would";
  sinusScrolltext += "$never started this. Thanks!";
  sinusScrolltext += "$$Besides, if you like anything";
  sinusScrolltext += "$you see here, feel free to";
  sinusScrolltext += "$look at the code and use it";
  sinusScrolltext += "$for your own demos.";
  sinusScrolltext += "$$I especially recommend the";
  sinusScrolltext += "$colorReduce() function, which";
  sinusScrolltext += "$is responsible for many effects";
  sinusScrolltext += "$in this demo. It maps any color";
  sinusScrolltext += "$on the canvas to the best match";
  sinusScrolltext += "$from the C64 palette.";
  sinusScrolltext += "$IN REALTIME!";

  sinusScrolltext += "$$$$   Alright folks, that's it.";
  sinusScrolltext += "$    Thank you for watching.";
  sinusScrolltext += "$$$$   See you in the next demo!";
  sinusScrolltext += "$$$$   PS: Any demo groups out";
  sinusScrolltext += "$   there looking for support?";
  sinusScrolltext += "$$$$          AWSM OUT.";


  credits_init_flyscroll(credits_scroller_canvas,sinusScrolltext);

  amount_of_bubbles = 6;
  initBubbles(amount_of_bubbles);

}

function initBubbles(amount){
  allBubbles = [];
  for (i = 0; i< amount; i++){
    allBubbles[i] = new Bubble();
  }
}

function Bubble(){

  this.bubbleImages = [credits_bubble1,credits_bubble2,credits_bubble3];
  this.image = this.bubbleImages[Math.floor(Math.random()*this.bubbleImages.length)];
  this.y = Math.random()*100+200;
  this.x = Math.random()*320;
  this.sin = Math.random()*5;
  this.amp = Math.random()*5;
  this.speed = Math.random()+0.2;

  this.draw = function (canvas){

    this.canvas = canvas;
    this.image.draw(this.canvas,this.x + Math.floor(Math.sin(this.sin)*this.amp),this.y);
    this.y -= this.speed;
    this.sin += 0.05;
    this.speed += 0.005;

    if (this.y < -50){
      this.y = Math.random()*100+200;
      this.x = Math.random()*320;
      this.speed = Math.random()+0.2;
      this.image = this.bubbleImages[Math.floor(Math.random()*this.bubbleImages.length)];
    }

  };

}

function credits_init_flyscroll(canvas,text)
{

  flyScrollText = text;
  flyScrollAllText = [];
  flyScrollFontWidth = 8;
  flyScrollX = 0;
  flyScrollY = 0;
  flyScrollStartSinX = 0;
  flyScrollStartSinY = 0;
  flyScrollCharCounter = 0;

  for (i = 0; i<flyScrollText.length;i++){
    if (flyScrollText[i]=="$"){

      flyScrollX = 20 -(i+1) * flyScrollFontWidth;
      flyScrollY+=16;
      flyScrollStartSinX = 0;
      flyScrollStartSinY = 0;

    }else{

      flyScrollAllText[flyScrollCharCounter] = new FlyScroll (canvas,flyScrollText[i],flyScrollX+flyScrollFontWidth*i,200+flyScrollY,0.2,flyScrollStartSinX, flyScrollStartSinY,0.06);
      flyScrollStartSinX -= 0.1;
      flyScrollStartSinY -= 0.15;
      flyScrollCharCounter ++;
    }


  }

}


function FlyScroll(canvas,text, xPos, yPos, speed, initSinX, initSinY, ampSin)
{

  // moves text

  this.canvas = canvas;
  this.text = text;
  this.initSinX = initSinX;
  this.initSinY = initSinY;
  this.xPos = xPos;
  this.yPos = yPos;
  this.speed = speed;
  this.ampSin = ampSin;
  this.speedMulti = Math.random(1)/50;
  this.xPosMulti = (Math.random(1)-0.5)/2;
  this.burstY = 40 + Math.random()*40-20;

  this.draw = function()
  {
    // as long as the text isn't past the upper border, do the movement math
    if (this.yPos > -20){
      this.yPos -= this.speed;
      this.sinusX = Math.floor(Math.sin(this.initSinX)*10);
      this.sinusY = Math.floor(Math.sin(this.initSinY)*10);
      this.initSinX += this.ampSin/2;
      this.initSinY += this.ampSin;
    }


    if (this.yPos >-20 && this.yPos < this.burstY){
      // if the text is high enough, increase x and speed to make it slowly break apart
      this.speed += this.speedMulti;
      this.xPos += this.xPosMulti;
    }

    if (this.yPos > -20 && this.yPos < 200){
      // if text is within visible area, draw it to the canvas
      credits_font.print(this.canvas,this.text,this.xPos+this.sinusX,this.yPos+this.sinusY);
    }

  };
}

function credits_render()
{

    // clear the canvas
    mycanvas.clear();
    stage.fill(c64.colors.black);
    credits_scroller_canvas.clear();

    // draw the bubbles
    for (i = 0; i< allBubbles.length; i++){
      allBubbles[i].draw(credits_scroller_canvas);
    }

    // draw the scrolltext to the scroller canvas
    for (i = 0; i<flyScrollCharCounter;i++){
      flyScrollAllText[i].draw();
    }

    // draw the gradient ontop the scrolltext
    credits_scroller_canvas.contex.globalCompositeOperation='source-atop';
    credits_gradient.draw(credits_scroller_canvas,0,0);
    credits_scroller_canvas.contex.globalCompositeOperation='source-over';

    // reflection on top
    credits_scroller_canvas.drawPart(mycanvas,0,16,0,0,320,10,1,0,1,-1);
    credits_scroller_canvas.draw(mycanvas,0,15);

}
