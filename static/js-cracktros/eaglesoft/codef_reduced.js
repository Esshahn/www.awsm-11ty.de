
function ltrobj(posx,posy,ltr){
    this.posx=posx;
    this.posy=posy;
    this.ltr=ltr;
    return this;
}

function sortPosx(a, b) {
        var x = a.posx;
        var y = b.posx;
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

function image(img){
	this.img = new Image();
	this.img.src=img;
    this.handlex=0;
    this.handley=0;
	this.tilew=0;
	this.tileh=0;
	this.tilestart=0;
	
	this.initTile=function(tilew,tileh,tilestart){
		this.tileh=tileh;
		this.tilew=tilew;
		if(typeof(tilestart)!='undefined')
			this.tilestart=tilestart;			
	}

 
    this.drawTile = function(dst, nb, x, y){		
        this.drawPart(dst,x,y,Math.floor((nb%(this.img.width/this.tilew)))*this.tilew,Math.floor(nb/(this.img.width/this.tilew))*this.tileh,this.tilew,this.tileh);
		
	}
      
    this.drawPart = function(dst,x,y,partx,party,partw,parth){                      
        dst.ctx.translate(x,y);
        dst.ctx.drawImage(this.img,partx,party,partw,parth,null,null,partw,parth);
        dst.ctx.setTransform(1, 0, 0, 1, 0, 0);        
     
    }        
        
	return this;
}




function scrolltext_horizontal(){
    this.scroffset=0;
    this.oldspeed=0;
    this.speed=1;
    this.font;
    this.letters = new Object();
    this.scrtxt=" ";
    this.pausetimer=0;
    this.pausedelay=0;
 
    this.init = function(dst, font,speed,startX,sinparam,type){
        this.speed=speed;
        this.dst=dst;
        this.font=font;
        this.fontw = this.font.tilew;
        this.fonth = this.font.tileh;
        this.fontstart = this.font.tilestart;
        this.startX = startX;
        this.wide=Math.ceil(this.startX/this.fontw)+1;
        for(i=0;i<=this.wide;i++){
            this.letters[i]=new ltrobj(Math.ceil((this.wide*this.fontw)+i*this.fontw),0,this.scrtxt.charCodeAt(this.scroffset));
            this.scroffset++;
        }
        
        if(typeof(type)=='undefined')
                        this.type=0;
        else
            this.type=type;
    }
 
    this.draw = function(posy){
        var prov = 0;
        var temp = new Array();        
        var oldvalue=new Array();
        var i;
        
        if(this.speed==0){
            this.pausetimer+=1;
            if(this.pausetimer==60*this.pausedelay){
                this.speed=this.oldspeed;
            }
        }
        var speed=this.speed;
        for(i=0;i<=this.wide;i++){
            this.letters[i].posx-=speed;
            if(this.letters[i].posx<=-this.fontw){

                this.letters[i].posx=this.wide*this.fontw+(this.letters[i].posx+this.fontw);
                if(typeof(this.sinparam)!='undefined'){
                    for(var j=0;j<this.sinparam.length;j++){
                        oldvalue[j]+=this.sinparam[j].inc;
                     }
                }
                this.letters[i].ltr=this.scrtxt.charCodeAt(this.scroffset);
                this.scroffset++;
                if(this.scroffset> this.scrtxt.length-1)
                    this.scroffset=0;
                }
         } 
        
        
        for(j=0;j<=this.wide;j++){
            temp[j]={indice:j, posx:this.letters[j].posx};
        }
        temp.sort(sortPosx);
        for(i=0;i<=this.wide;i++){           
            this.font.drawTile(this.dst,this.letters[temp[i].indice].ltr-this.fontstart,this.letters[temp[i].indice].posx,prov+posy);
         }
            

    }
    return this;
}




