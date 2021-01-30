function c64end_init(){
  c64end = [];
  vbl = 0;
  c64end.switch = 1;
}



function c64end_render(){

  stage.fill(c64.colors.light_blue);
  mycanvas.fill(c64.colors.blue);

  c64.font.print(mycanvas,"**** COMMODORE 64 BASIC V2 ****",32,7);
  c64.font.print(mycanvas,"64K RAM SYSTEM  38911 BASIC BYTES FREE",8,23);
  c64.font.print(mycanvas,"READY.",0,39);

  c64.font.print(mycanvas,'LOAD"'+c64_game+'",8,1',0,47);
  c64.font.print(mycanvas,"SEARCHING FOR "+c64_game,0,63);
  c64.font.print(mycanvas,"LOADING",0,71);
  c64.font.print(mycanvas,"READY.",0,79);
  c64.font.print(mycanvas,"RUN",0,87);

  c64.font.print(mycanvas,"?OUT OF AWSM  ERROR",0,105);
  c64.font.print(mycanvas,"READY.",0,113);

  vbl++;

  if(vbl%19===0){
    c64end.switch *=-1;
  }

  if (c64end.switch == 1){
    mycanvas.quad(0,122,8,8,c64.colors.light_blue);
  }

}
