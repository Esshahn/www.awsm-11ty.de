function karma_init()
{

  awsm9000_scrollercanvas = new canvas(140,200);

  awsm9000_background = new image("gfx/awsm9000_background.gif");
  awsm9000_window = new image("gfx/awsm9000_window.gif");

  awsm9000_font = new image("gfx/font_hotline_3x1_2.gif");
  awsm9000_font.initTile(8,48,33);

  awsm9000_scroller = new scrolltext_horizontal();
  awsm9000_scrollparam=[{myvalue: 0, amp: 12.0, inc:0.25, offset: -0.06}];
  awsm9000_scroller.scrtxt="..............10 9 8 7 6 5 4 3 2 1 0       BOOOOM!!!     ^P2      THIS SCREEN IS CALLED   POSITIVE KARMA   ^P2 BECAUSE THAT IS THE NAME OF THE AMAZING TUNE FROM SASCHA ZEIDLER (LINUS). I'M LISTENING TO THIS TRACK FOR DAYS NOW AND I THINK I'M GOING CRAZY... GRAPHICS PAINTED BY AWSM IN MULTICOLOR, CODE BY AWSM.";
  awsm9000_scroller.init(awsm9000_scrollercanvas,awsm9000_font,1.3,awsm9000_scrollparam);

  zoom = new Zoombar();
  awsm9000_sinus = 0;

  playSong('sid/Positive_Karma.sid',1);

}

function Zoombar(){

  this.canvas = new canvas (160,200);

  this.draw = function(targetcanvas,x,y){
    this.targetcanvas = targetcanvas;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;

    j = 0;
    pixelStep = 0;

    for(var i=0; i<this.width; i++){
      this.targetcanvas.drawPart(this.canvas,i,0,this.x+pixelStep+this.width/2,this.y,1,this.height,1,0,1,1);
      j=j+1;
      if (j>=2) {
        j=0;
        pixelStep ++;
      }
    }

    this.canvas.draw(targetcanvas,this.x,this.y);
  };
}

function karma_render()
{

    stage.fill(c64.colors.black);

    stage.quad(0,108,760,2,c64.colors.white);
    stage.quad(0,110,760,22,c64.colors.cyan);

    stage.quad(0,136,760,2,c64.colors.white);
    stage.quad(0,138,760,22,c64.colors.yellow);

    stage.quad(0,164,760,2,c64.colors.white);
    stage.quad(0,166,760,22,c64.colors.cyan);

    stage.quad(0,202,760,216,c64.colors.purple);
    stage.quad(0,302,760,116,c64.colors.orange);
    stage.quad(0,440,760,216,c64.colors.dark_grey);

    awsm9000_background.draw(mycanvas160,0,0);

    awsm9000_sinus+=0.01;

    mycanvas160.quad(Math.floor(Math.sin(awsm9000_sinus)*50)+61,126,40,54,c64.colors.light_green);
    awsm9000_scrollercanvas.clear();
    awsm9000_scroller.draw(120);
    awsm9000_scrollercanvas.draw(mycanvas160,10,0);


    zoom.draw(mycanvas160,Math.floor(Math.sin(awsm9000_sinus)*50)+61,120);
    awsm9000_window.draw(mycanvas160,Math.floor(Math.sin(awsm9000_sinus)*50)+59,111);

}
