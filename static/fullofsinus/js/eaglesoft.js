
function eaglesoft_init(){

  // load media
  eagle = new image('gfx/eaglesoft.gif');
  scrollBlink = new image('gfx/colorBlink.gif');
  myfont = new image('gfx/c64font_18x9_styled.gif');

  scrollBlink.x = 0;
  myfont.initTile(16,9,33);

  myscrolltext = new scrolltext_horizontal();
  myscrolltext.scrtxt="*** " + c64_game + " *** BROKEN BY AWSM SOFT INCORPORATED ON JULY 23TH, 1987... THIS CRACKTRO IS TRULY ORIGINAL AND CREATED BY THE WZZ0RDZ OF AWSM. WHOEVER SAID IT'S STOLEN FROM SOME E.S.I. GUYS IS A BLOODY LIAR!!!11      ANYWAY, ERR...PRESS SPACE TO CONTINUE.     ";
  myscrolltext.init(mycanvas,myfont,2,380);


  blackbox = new BlackBox();
  blackbox.init();

  scrollerColorX=0;
  stage.fill("#000000");

  if (demoIsLive) playSong('sid/Future_Knight.sid',0);
  
}



function BlackBox(){
  this.init = function(){
    this.width = 320;
    this.height = 220;
    this.color = "#000000";
    this.speed = 1;
    this.y = -20;

  };

  this.draw = function(){
    if (this.y < this.height){
      mycanvas.contex.fillStyle = this.color;
      mycanvas.contex.fillRect(0,this.y,this.width,this.height);
      this.y+=0.8;
    }else{
      myscrolltext.draw(190);

    }

  };

}


function eaglesoft_render(){
    eagle.draw(mycanvas,0,0);
    blackbox.draw();
    mycanvas.contex.globalCompositeOperation='darken';
    scrollBlink.draw(mycanvas,scrollerColorX,190);
    scrollerColorX=scrollerColorX-6;
    if(scrollerColorX<-480) scrollerColorX = 0;
    mycanvas.contex.globalCompositeOperation='source-over';
}
