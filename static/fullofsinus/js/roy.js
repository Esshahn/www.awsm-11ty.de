function roy_init(){

  roy = new image("gfx/roy3.gif");
  roy_bg = new image("gfx/roy_bg.gif");
  roy_text = new image("gfx/roy_text2.gif");
  unicorn = new image("gfx/unicorn.gif");
  rain_gfx = new image ("gfx/rain3.gif");
  rain_gfx_bg = new image ("gfx/rain_bg.gif");
  roy_bg_canvas = new canvas (320,100);
  roy_fg_canvas = new canvas (320,133);
  roy_text_y = 440;

  if (demoIsLive) playSong('sid/Bladerunner.sid',0);

  rain = new Rain(roy_fg_canvas,rain_gfx,6,10,14);
  rain_bg = new Rain(roy_bg_canvas,rain_gfx_bg,120,8,10);

  tiles = new Tiles(mycanvas,160,4,2,"#000000");
  shutter = new Shutter(mycanvas,8,0.1,"#000000");
  shutter2 = new Shutter(mycanvas,8,0.15,"#000000");
  shutter3 = new Shutter(mycanvas,8,0.20,"#000000");
  roy_part = 1;

}


function Rain(canvas,image,amount,minSpeed,maxSpeed){
  this.canvas = canvas;
  this.image = image;
  this.amount = amount;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;

  this.shower = [];

  for(var i = 0; i<this.amount; i++){
        this.raindrop = {
          speed: this.minSpeed + Math.floor(Math.random()*(this.maxSpeed+1-this.minSpeed) ),
          x: Math.floor(Math.random()*this.canvas.width),
          y: Math.floor(Math.random()*this.canvas.height)
        };

        this.shower.push(this.raindrop);

  }


  this.draw = function(canvas){
    this.canvas = canvas;
    for(var i = 0; i<this.amount; i++){
        this.image.draw(this.canvas,this.shower[i].x,this.shower[i].y);
        this.shower[i].y+=this.shower[i].speed;
        if(this.shower[i].y > this.canvas.height){
          this.shower[i].x = Math.floor(Math.random()*this.canvas.width);
          this.shower[i].y = -50;
        }
    }
  };

}

function waitReturn(waitVar){
  roy_part ++;
}

function roy_render(){

  stage.fill(c64.colors.black);
  mycanvas.fill(c64.colors.black);

  switch(roy_part){

    case 1:
          roy_bg.draw(roy_bg_canvas,0,0);
          rain_bg.draw(roy_bg_canvas);
          roy_bg_canvas.draw(mycanvas,0,51);
          roy.draw(mycanvas,0,34);
          roy_fg_canvas.clear();
          rain.draw(roy_fg_canvas);
          roy_fg_canvas.draw(mycanvas,0,34);
          tiles.shrinkYDown();

          if (roy_text_y>-568){
            roy_text_y -= 0.22;
          }else{
            if (typeof(waitforit)=="undefined") waitforit = window.setTimeout(waitReturn,4000);
          }
          roy_text.draw(mycanvas,0,roy_text_y);
          break;

    case 2:
          roy_bg.draw(roy_bg_canvas,0,0);
          rain_bg.draw(roy_bg_canvas);
          roy_bg_canvas.draw(mycanvas,0,51);
          roy.draw(mycanvas,0,34);
          roy_fg_canvas.clear();
          rain.draw(roy_fg_canvas);
          roy_fg_canvas.draw(mycanvas,0,34);
          shutter.out();
          if (typeof(waitforit2)=="undefined") waitforit2 = window.setTimeout(waitReturn,7000);
          roy_text.draw(mycanvas,0,roy_text_y);
          break;

    case 3:
          unicorn.draw(mycanvas, 100, 6);
          shutter2.in();
          roy_text.draw(mycanvas,0,roy_text_y);
          if (typeof(waitforit3)=="undefined") waitforit3 = window.setTimeout(waitReturn,5000);
          break;

    case 4:
          unicorn.draw(mycanvas, 100, 6);
          roy_text.draw(mycanvas,0,roy_text_y);
          shutter3.out();
          if (typeof(waitforit4)=="undefined") waitforit4 = window.setTimeout(waitReturn,4000);
          break;

    case 5:
          playPart++;
          break;
  }

}
