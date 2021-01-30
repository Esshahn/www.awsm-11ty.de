function planier_init()
{
  stage.fill(c64.colors.black);

  if (demoIsLive) playSong('sid/Big_Funk.sid',0);

  planier = [];

  planier.logo = new image ("gfx/awsm_logo_bubble.gif");
  planier.logoborder = new image ("gfx/awsm_logo_bubble320.gif");

  lessFPSCounter = 0;

  planier.canvas = new canvas (120,30);
  planier.checker = new Planier_checker(c64.colors.dark_grey,c64.colors.black,12,24,2.2);

  planier.font1 = new image("gfx/font_awsm_5x5_shadow.gif");
  planier.font1.initTile(5,8,33);
  planier.font2 = new image("gfx/font_awsm_5x10_shadow.gif");
  planier.font2.initTile(5,12,33);

  planier.scrolltext = "$$  THE GREETINGS SCREEN!";
  planier.scrolltext += "$$$$ADT // ABSOLUTE";
  planier.scrolltext += "$$AIRO";
  planier.scrolltext += "$$AYOROS";
  planier.scrolltext += "$$BL4CK // N-VC 1993";
  planier.scrolltext += "$$BRAINWALKER";
  planier.scrolltext += "$$CRAYFISH77 // DESIRE";
  planier.scrolltext += "$$DAGON // EVENT HORIZON";
  planier.scrolltext += "$$DANE // BOOZE DESIGN";
  planier.scrolltext += "$$DOC2k";
  planier.scrolltext += "$$DRSKULL";
  planier.scrolltext += "$$DYNO";
  planier.scrolltext += "$$EOF // SCIZORS";
  planier.scrolltext += "$$ESG // HOKUTO FORCE";
  planier.scrolltext += "$$GANDALF";
  planier.scrolltext += "$$GUNSTICK // UNL. MATRICKS";
  planier.scrolltext += "$$HIQ // COMPAGIONS";
  planier.scrolltext += "$$JOHN // IPHONE1911";
  planier.scrolltext += "$$LINUS // VIRUZ";
  planier.scrolltext += "$$MELLOW MAN // UP ROUGH";
  planier.scrolltext += "$$NEW CORE";
  planier.scrolltext += "$$NONAMENO // CODEF";
  planier.scrolltext += "$$SOLO";
  planier.scrolltext += "$$SPEEDSTAR";
  planier.scrolltext += "$$STC // HEMOROIDS";
  planier.scrolltext += "$$STF // FLOOD";
  planier.scrolltext += "$$STIVEGATES // WINDOWS93";
  planier.scrolltext += "$$SUBZERO";
  planier.scrolltext += "$$TINY'R'SID";
  planier.scrolltext += "$$TOTORMAN";
  planier.scrolltext += "$$WERTSTAHL // GENESIS PR.";
  planier.scrolltext += "$$WEZO";
  planier.scrolltext += "$$ZEROLF // SPACEWOLF";
  planier.scrolltext += "$$AND ALL CODEF DEVS";

  planier_init_planierscroll(mycanvas160,planier.scrolltext);
  planier.sinY = 1.5;

}


function planier_init_planierscroll(canvas,text)
{

  plaScrollText = text;
  plaScrollAllText = [];
  plaScrollFontWidth = 4;
  plaScrollX = 0;
  plaScrollY = 0;
  plaScrollCharCounter = 0;
  playSinY = 0;

  for (i = 0; i<plaScrollText.length;i++){

    playSinY += 0.2;
    if (plaScrollText[i]=="W" || plaScrollText[i]=="N" || plaScrollText[i]=="M" ){
      plaScrollX+=1;
    }

    if (plaScrollText[i]=="I"){
      plaScrollX-=1;
    }

    if (plaScrollText[i]=="$"){
      plaScrollX = -(i+1) * plaScrollFontWidth;
      plaScrollY-=14;
    }else{

      plaScrollAllText[plaScrollCharCounter] = new PlanierScroll (canvas,plaScrollText[i],30+plaScrollX+plaScrollFontWidth*i,plaScrollY,0.6,playSinY,planier.font1,planier.font2);
      plaScrollCharCounter ++;
    }

    if (plaScrollText[i]=="W" || plaScrollText[i]=="N" || plaScrollText[i]=="M" || plaScrollText[i]=="Q"){
      plaScrollX+=1;
    }

    if (plaScrollText[i]=="I"){
      plaScrollX-=1;
    }
  }
  fullScrollerHeight = Math.abs(plaScrollY);
}


function PlanierScroll(canvas,text, xPos, yPos, speed,sinY, font1,font2)
{

  // moves text

  this.canvas = canvas;
  this.text = text;
  this.xPos = xPos;
  this.yPos = yPos;
  this.speed = speed;
  this.sinY = sinY;
  this.font1 = font1;
  this.font2 = font2;
  this.currentFont = this.font1;
  this.planiert = 0;
  this.sinYPos = 0;

  this.draw = function(){

    // as long as the text isn't past the upper border, do the movement math
    if (this.yPos <= fullScrollerHeight+this.canvas.height){
      this.yPos += this.speed;
    }

    if (this.yPos >= fullScrollerHeight){
      this.yPos -= fullScrollerHeight + this.canvas.height;
      this.currentFont = this.font1;
      this.planiert = 0;
    }

    if (this.yPos > 30 && this.yPos < 210){

      this.sinYPos = Math.floor(Math.sin(this.sinY)*4);

      if (!this.planiert){
        this.sinY += 0.4;
      }

      if (this.yPos > planier.yPos+10){
        // if text is within visible area, draw it to the canvas
        this.currentFont = this.font2;
        this.planiert = 1;
      }

      // if text is within visible area, draw it to the canvas
      this.currentFont.print(this.canvas,this.text,this.xPos,Math.floor(this.yPos+this.sinYPos));
    }

  };
}


function Planier_checker(color1,color2,xtilesize,ytilesize,yspeed){
  this.color1 = color1;
  this.color2 = color2;
  this.xtilesize = xtilesize;
  this.ytilesize = ytilesize;
  this.yspeed = yspeed;
  this.ymove = 0;

  this.draw = function (canvas,yspeed){
    this.yspeed = yspeed;
    this.canvas = canvas;
    this.xstart = 0;
    this.ymove += this.yspeed;
    this.canvas.fill(this.color2);
    this.canvasYMax = (this.canvas.height+this.ytilesize*2)/this.ytilesize;
    this.canvasXMax = (this.canvas.width+this.xtilesize*2)/this.xtilesize;

    if (Math.abs(this.ymove) >= this.ytilesize*2){
      this.ymove = 0;
    }

    for (var j= -this.ytilesize; j<= this.canvasYMax; j++){
      if (this.xstart === 0){
        this.xstart = this.xtilesize;
      }else{
        this.xstart = 0;
      }

      this.tileYPos = Math.floor(this.ymove+j*this.ytilesize);

      for (var i= -xtilesize; i<= this.canvasXMax; i+=2){
        this.tileXPos = Math.floor(this.xstart+i*this.xtilesize);
        this.canvas.quad(this.tileXPos,this.tileYPos,this.xtilesize,this.ytilesize,this.color1);
      }

    }

    this.canvas.contex.globalCompositeOperation='lighter';
    this.canvas.quad(0,4,120,22,c64.colors.grey);
    this.canvas.quad(0,11,122,8,c64.colors.dark_grey);
    this.canvas.quad(0,6,120,1,c64.colors.dark_grey);
    this.canvas.contex.globalCompositeOperation='source-over';

  };

}


function planier_render()
{

  lessFPSCounter ++;
  if (lessFPSCounter%3===0){

    // black canvas with red stripe in the middle
    mycanvas160.fill(c64.colors.black);
    mycanvas160.quad(25,0,110,200,c64.colors.light_red);

    // draw the open red border and the white lines
    border.quad(80,0,220,30,c64.colors.red);
    border.quad(80,200,220,120,c64.colors.red);
    border.quad(80,29,220,1,c64.colors.white);
    border.quad(80,230,220,1,c64.colors.white);

    // the sinus shizzle for the moving cylinder
    planier.yPos = Math.floor(Math.sin(planier.sinY)*50+100);
    planier.sinY+=0.03;

    // draw the shadow of the cylinder
    mycanvas160.quad(25,planier.yPos+30,110,10,c64.colors.red);

    // draw the scrolltext
    for (i = 0; i<plaScrollCharCounter;i++){
      plaScrollAllText[i].draw();
    }

    // draw the shadow that darkens the scrolltext
    mycanvas160.contex.globalCompositeOperation='darken';
    mycanvas160.quad(25,36,110,5,c64.colors.light_grey);
    mycanvas160.quad(25,planier.yPos+30,110,10,c64.colors.light_grey);
    mycanvas160.contex.globalCompositeOperation='source-over';

    // draw the checker on the cylinder and the cylinder to the main canvas
    planier.checker.draw(planier.canvas,Math.floor(Math.cos(planier.sinY)*3)+0.2);
    planier.canvas.draw(mycanvas160,20,planier.yPos);

    // draw invisible red area below the logo to cover the scroller
    mycanvas160.quad(25,0,110,36,c64.colors.light_red);

    // draw the logo. Partly in the main area, party in the border.
    planier.logoborder.draw(border,136,18);
    planier.logo.draw(mycanvas160,53,-12);

  }

  colorReduce(mycanvas160);
}
