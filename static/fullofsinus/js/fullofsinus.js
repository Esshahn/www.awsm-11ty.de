function fullofsinus_init()
{

  fos_earth = new image ("gfx/earth.gif");
  fos_moon = new image ("gfx/floppy_moon.gif");
  fos_title = new image ("gfx/title4.gif");

  fos_starfield = new Starfield(mycanvas160,100,1,1,0,-20,0.1,0.1,[c64.colors.white,c64.colors.dark_grey,c64.colors.grey,c64.colors.light_grey]);
  fos_earth.y = 290;
  fos_moon.y = 520;
  fos_title.y = 220;
  fos_timer = 0;
  fos_timer_starfield = 0;
  fos_counter_starfield_speed = -20;

  fos_blend_black = new Blend(mycanvas160,4,0);
  fos_blend_white = new Blend(mycanvas160,4,1);
  tiles = new Tiles(mycanvas160,40,20,0.9,"#000000");

  if (demoIsLive) playSong('sid/Odisey_2001_AD.sid',0);
  border.fill("#000000");

}



function fullofsinus_render()
{

  stage.fill(c64.colors.black);
  mycanvas160.fill(c64.colors.black);
  fos_timer += 1;
  fos_timer_starfield += 1;

  if (fos_timer_starfield >= 5 && fos_counter_starfield_speed < 0){
    fos_timer_starfield = 0;
    fos_counter_starfield_speed += 0.2;
    if (fos_counter_starfield_speed >0) fos_counter_starfield_speed = 0;
    fos_starfield.update(0,fos_counter_starfield_speed);
  }


  if (fos_timer <2100){
    fos_starfield.draw(mycanvas160);

    if (fos_earth.y > -100) fos_earth.y -= 0.2;
    if (fos_moon.y > 1) fos_moon.y -= 0.3;

    fos_earth.draw(mycanvas160,70,Math.floor(fos_earth.y));
    fos_moon.draw(mycanvas160,0,Math.floor(fos_moon.y));
  }

  if (fos_timer > 2000 && fos_timer < 2100){
    fos_blend_black.draw();
  }

  if (fos_timer > 2100){
    if (fos_title.y >= 1) fos_title.y -= 0.3;
  //  fos_title.draw(mycanvas160,0,Math.floor(fos_title.y));
    fos_title.draw(mycanvas160,0,0);
    tiles.shrinkYUp();
  }

  if (fos_timer > 3200 && fos_timer < 3270){
    fos_blend_white.draw();
  }
  if (fos_timer > 3260){
    playPart++;
    mycanvas160.clear();
  }

}
