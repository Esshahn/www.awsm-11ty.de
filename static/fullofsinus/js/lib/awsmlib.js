/*

  awsmlib    written by Ingo Hinterding 2014

*/

function fullscr(elemId) {
  var elem = document.getElementById(elemId);
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullScreen) {
    elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
  }
}

function turboload(){
  border.fill("#000000");
  for(i=0; i<20;i++){

    border.quad(Math.floor(Math.random()*border.width-100), (Math.floor(Math.random()*border.height)),Math.floor(Math.random()*border.width),1,c64.colors.white);
  }
}


function Decrunch (colors,screencolor,bordercolor,screencanvas,bordercanvas,chars,duration){
  // decrunch routine

  this.screencolor = screencolor;
  this.bordercolor = bordercolor;
  this.chars = chars;
  this.duration = duration;
  this.delay = 0;
  this.colors = colors;
  this.bordercanvas = bordercanvas;
  this.screencanvas = screencanvas;
  this.keys = Object.keys(this.colors);

  this.draw = function(){

    this.delay ++;

    if (this.delay < this.duration*0.6){
      for(var i = 0; i <= this.bordercanvas.height; i+=4){
        this.bordercanvas.quad(0,i,this.bordercanvas.width,4,this.colors[this.keys[Math.floor(this.keys.length * Math.random())]] );

      }

      this.screencanvas.fill(this.screencolor);
      c64.font.print(this.screencanvas,this.chars,0,0);
    }

    if (this.delay > this.duration*0.6 && this.delay < this.duration){
      this.bordercanvas.fill(this.bordercolor);

    }

    if (this.delay > this.duration){
      callNextPart();
    }

  };

}


function Starfield(canvas,amount,w,h,xdir, ydir, minSpeed,maxSpeed,colors){
  /*

  canvas = the canvas to display
  amount = number of stars to display
  w = width of a star in pixels
  h = height of a star in pixels
  xdir = horizontal direction (0, 1 or -1)
  ydir = vertical direction (0, 1 or -1)
  minSpeed = the minimum speed a star can have
  maxSpeed = the maximum speed a star can have
  colors = array with colors, e.g. ["#ff0000", "#FF00FF"]

  */
  this.canvas = canvas;
  this.amount = amount;
  this.minSpeed = minSpeed;
  this.maxSpeed = maxSpeed;
  this.w = w;
  this.h = h;
  this.xdir = xdir;
  this.ydir = ydir;
  this.colors = colors;

  this.allStars = [];

  for(var i = 0; i<this.amount; i++){
    this.star = {
      speed: this.minSpeed + Math.random()*(this.maxSpeed-this.minSpeed),
      x: Math.floor(Math.random()*this.canvas.width),
      y: Math.floor(Math.random()*this.canvas.height),
      c: this.colors[Math.floor(Math.random()*this.colors.length)]

    };

    this.allStars.push(this.star);

  }


  this.draw = function(canvas){
    this.canvas = canvas;
    for(var i = 0; i<this.amount; i++){
      this.canvas.quad(Math.floor(this.allStars[i].x),Math.floor(this.allStars[i].y),this.w,this.h,this.allStars[i].c);

      this.allStars[i].x += this.xdir * this.allStars[i].speed;
      this.allStars[i].y += this.ydir * this.allStars[i].speed;

      if(this.allStars[i].x < -this.w){
        this.allStars[i].x = this.canvas.width+this.w;
        this.allStars[i].y =Math.random()*this.canvas.height;
      }

      if(this.allStars[i].x > this.canvas.width +this.w){
        this.allStars[i].x = 0-this.w;
        this.allStars[i].y = Math.random()*this.canvas.height;
      }

      if(this.allStars[i].y < -this.h){
        this.allStars[i].y = this.canvas.height+this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }

      if(this.allStars[i].y > this.canvas.height +this.h){
        this.allStars[i].y = 0-this.h;
        this.allStars[i].x = Math.random()*this.canvas.width;
      }


    }
  };

  this.update = function(xdir, ydir){
    this.xdir = xdir;
    this.ydir = ydir;
  }

}


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


function AnimGIF (file,width,height,loops,delay){
  this.file = file;
  this.width = width;
  this.height = height;
  this.loops = loops;
  this.delay = delay;
  this.image = new image(this.file);
  this.image.initTile(this.width,this.height);

  this.play = function (canvas,x,y){
    if(typeof(this.loop)=="undefined") this.loop = 0;
    if(typeof(this.count)=="undefined") this.count = 0;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.image.drawTile(this.canvas,this.loop,this.x,this.y);

    this.count++;
    if(this.count >= this.delay){
      this.loop++;
      this.count = 0;
      if(this.loop > this.loops) this.loop = 0;
    }

  };
}


function Rasterbar (width, colorheight, colors){

  this.width = width;
  this.colorheight = colorheight;
  this.colors = colors;

  this.canvas = new canvas(this.width, this.colors.length * this.colorheight);

  for(var i = 0; i <= this.colors.length; i++){
    this.canvas.quad(0,i * this.colorheight,this.width,this.colorheight,this.colors[i]);
  }

  return this.canvas;
}


function colorReduce(canvas,cols)
{
    // reduces all colors on a canvas to the palette defined

    var canvasOriginal=canvas;
    var ctx=canvasOriginal.contex;
    var canvasMapped=canvas;
    var ctxMapped=canvasMapped.contex;

    // create an array of palette colors
    if (typeof(cols)!="undefined" && cols !="")
      {
        var palette = cols;
      }else{
        var palette=[
            {r:0,g:0,b:0},
            {r:255,g:255,b:255},
            {r:104,g:55,b:43},
            {r:112,g:164,b:178},

            {r:111,g:61,b:134},
            {r:88,g:141,b:67},
            {r:53,g:40,b:121},
            {r:184,g:199,b:111},

            {r:111,g:79,b:37},
            {r:67,g:57,b:0},
            {r:154,g:103,b:89},
            {r:68,g:68,b:68},

            {r:108,g:108,b:108},
            {r:154,g:210,b:132},
            {r:108,g:94,b:181},
            {r:149,g:149,b:149}
            ];
      }



    // load all pixels into an array
    var imageData=ctx.getImageData(0,0,canvasOriginal.width,canvasOriginal.height);
    var data=imageData.data;

    // rewrite all pixels using only the mapped colors
    var mappedColor;
    for(var i=0; i<data.length; i+=4) {
      mappedColor = mapColorToPalette(data[i], data[i+1], data[i+2]);

      if(data[i+3]>10){
          data[i]   = mappedColor.r;
          data[i+1] = mappedColor.g;
          data[i+2] = mappedColor.b;
      }
    }
    ctxMapped.putImageData(imageData,0,0);

    // use Euclidian distance to find closest color
    function mapColorToPalette(red,green,blue){
        var color,diffR,diffG,diffB,diffDistance,mappedColor;
        var distance=250000;
        for(var i=0;i<palette.length;i++){
            color=palette[i];
            diffR=( color.r - red );
            diffG=( color.g - green );
            diffB=( color.b - blue );
            diffDistance = diffR*diffR + diffG*diffG + diffB*diffB;
            if( diffDistance < distance  ){
                distance=diffDistance;
                mappedColor=palette[i];
            };
        }
        return(mappedColor);
    }

}


function Blend(canvas,time,blendmode)
{
  this.canvas = canvas;
  this.time = time;
  this.blendmode = blendmode;
  this.counter = 0;

  this.palette=[
    {r:0,g:0,b:0},
    {r:67,g:57,b:0},
    {r:53,g:40,b:121},
    {r:104,g:55,b:43},
    {r:68,g:68,b:68},
    {r:111,g:61,b:134},
    {r:111,g:79,b:37},
    {r:108,g:94,b:181},
    {r:108,g:108,b:108},
    {r:154,g:103,b:89},
    {r:88,g:141,b:67},
    {r:149,g:149,b:149},
    {r:112,g:164,b:178},
    {r:184,g:199,b:111},
    {r:154,g:210,b:132},
    {r:255,g:255,b:255}
    ];


  this.draw = function()
  {

      this.counter ++;

      if(this.counter >= this.time && this.palette.length > 0){
        if(this.blendmode == 0){
          this.palette.pop();
        }else{
          this.palette.shift();
        }
        this.counter = 0;
      }
      if (this.palette.length == 0 && blendmode == 0) this.palette=[{r:0,g:0,b:0}];
      if (this.palette.length == 0 && blendmode == 1) this.palette=[{r:255,g:255,b:255}];
      colorReduce(this.canvas,this.palette);
  }


}

function Shutter(canvas,lines,speed, color){
  this.canvas = canvas;
  this.lines = lines;
  this.speed = speed;
  this.color = color;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.thickness = 0;
  this.step = this.canvas.height / this.lines;

  this.out = function(){
    if(this.thickness <= this.step){
      for(var i = 0; i < this.height; i+=this.step){
        this.canvas.quad(0,i,this.width,Math.floor(this.thickness),this.color);
      }
      this.thickness += this.speed;
    }else{
      this.canvas.quad(0,0,this.width,this.height,this.color);
    }
  }

  this.in = function(){
    if(this.thickness <= this.step){
      for(var i = 0; i < this.height; i+=this.step){
        this.canvas.quad(0,i,this.width,this.step-Math.floor(this.thickness),this.color);
      }
      this.thickness += this.speed;
    }
  }

}


function Tiles(canvas,tilesX,tilesY,wait,color){
  this.canvas = canvas;
  this.tilesX = tilesX;
  this.tilesY = tilesY;
  this.wait = wait;
  this.color = color;

  this.tilesWidth = this.canvas.width / this.tilesX;
  this.tilesHeight = this.canvas.height / this.tilesY;

  this.allTiles = [];

  this.position = 0;

  for (var i = 0; i< this.tilesY; i++){
    for (var j = 0; j< this.tilesX; j++){
      this.tile = {
        x : this.tilesWidth*j,
        y : this.tilesHeight*i,
        width : this.tilesWidth,
        height: this.tilesHeight
      }
      this.position++;

      this.allTiles.push(this.tile);

    }
  }

  this.allTiles = shuffle(this.allTiles);

  for (var i = 0; i< this.allTiles.length; i++){
    this.allTiles[i].pos = i;
    this.allTiles[i].wait = i*this.wait;
  }

  this.flyUp = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].y > -this.tilesHeight){

        this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.tilesWidth,this.tilesHeight,this.color);
        //this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.allTiles[i].pos,2,"#ff0000");

        if (this.allTiles[i].wait > 0){
          this.allTiles[i].wait --;
        }else{
          this.allTiles[i].y --;
        }
      }

    }
  }


  this.shrinkYUp = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].height > 0){
        this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y,this.tilesWidth,Math.floor(this.allTiles[i].height),this.color);
        if (this.allTiles[i].wait > 0){
          this.allTiles[i].wait --;
        }else{
          this.allTiles[i].height -= 0.5;
        }
      }

    }
  }


  this.shrinkYDown = function(){
    for (var i = 0; i< this.allTiles.length; i++){

      if (this.allTiles[i].height > 0){
        this.canvas.quad(this.allTiles[i].x,this.allTiles[i].y+this.tilesHeight-Math.floor(this.allTiles[i].height),this.tilesWidth,Math.floor(this.allTiles[i].height),this.color);
        if (this.allTiles[i].wait > 0){
          this.allTiles[i].wait --;
        }else{
          this.allTiles[i].height -= 0.5;
        }
      }

    }
  }

}



function clearScreen(){
  stage.fill(c64.colors["black"]);
  if(typeof(counter) == "undefined") counter = 0;
  counter+=2;

  if(counter <= 120){
    mycanvas.fill(c64.colors["blue"]);
    stage.fill(c64.colors["light_blue"]);
    mycanvas.quad(0,100-counter,320,counter*2,this.c64.colors["light_blue"]);
  }

  if(counter > 120 && counter <= 460){
    if(typeof counter2 == "undefined") counter2 = 0;
    mycanvas.clear();
    stage.fill(c64.colors["light_blue"]);
    border.quad(0,border.height-counter2*1.2,border.width,border.height,this.c64.colors["blue"]);
    border.quad(0,border.height-counter2+20,border.width,border.height,this.c64.colors["black"]);
    counter2+=2;
  }

  if(counter > 520){

    mycanvas.fill(c64.colors["black"]);
    stage.fill(c64.colors["black"]);
    border.clear();
    playPart++;
  }
}


function whiteToBlack(){
  if (typeof(wtbCounter) == "undefined") wtbCounter = 0;

  if (wtbCounter <= 20)  mycanvas.fill(c64.colors["white"]);
  if (wtbCounter >= 20 && wtbCounter <= 40)  mycanvas.fill(c64.colors["light_grey"]);
  if (wtbCounter >= 40 && wtbCounter <= 60)  mycanvas.fill(c64.colors["grey"]);
  if (wtbCounter >= 60 && wtbCounter <= 80)  mycanvas.fill(c64.colors["dark_grey"]);
  if (wtbCounter >= 80 && wtbCounter <= 100)  mycanvas.fill(c64.colors["black"]);
  if (wtbCounter >= 100)  playPart++;

  wtbCounter+=3;

}
