/*

awsmlib.js
Ingo Hinterding

*/

// request anim frame
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function CanvasStage(elementID,resolutionX,resolutionY){
// creates a canvas object that acts as the main stage
// elementID = the ID of the canvas element
// resolutionX, resolutionY = the pixel resolution. Can be lower than the width of the canvas,
// resulting in a scaled up image, e.g. canvas width is 640x400 and resX and resY are 320x200

  this.canvas = document.getElementById(elementID);
  this.canvas.ctx=this.canvas.getContext("2d");
  
  // disables image smoothing for unblurred pixels
  this.canvas.ctx.imageSmoothingEnabled = false;
  this.canvas.ctx.webkitImageSmoothingEnabled = false;
  this.canvas.ctx.mozImageSmoothingEnabled = false;  
  
  this.canvas.resolutionX = resolutionX;
  this.canvas.resolutionY = resolutionY;
  this.canvas.ctx.scale(this.canvas.width/this.canvas.resolutionX,this.canvas.height/this.canvas.resolutionY);

  this.canvas.clear = function(color){
    if(!color) color ="#000000";
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0,0,this.resolutionX,this.resolutionY); 
  }
  return this.canvas;
}

function CanvasObj(width,height){
  this.canvas = document.createElement('canvas');
  this.width = width;
  this.height = height;
  this.canvas.setAttribute('width', this.width);
  this.canvas.setAttribute('height', this.height);
  this.canvas.ctx=this.canvas.getContext("2d");
  
  this.canvas.clear = function(color){
    if(!color) color ="#000000";
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0,0,this.width,this.height); 
  }
  return this.canvas;
}

function Sprite(file){
  this.img = new Image();
  this.img.src = file;
  return this.img;
}

