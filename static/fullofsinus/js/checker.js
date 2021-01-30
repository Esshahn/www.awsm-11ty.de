function checker_init(){

  playSong('sid/Shiit.sid',0);

  checker_logo = new image("gfx/awsm_logo_ripley.gif");

  stage.fill("#000000");

  lessFPSCounter = 0;

  chessboardhpos = 0;
  chessboardvpos = 0;
  chessboardhpos = 0;
  chessboardvpos = 0;
  chessboardmovey = 0;

  canvas_w = 120;
  canvas_h = 100;

  tile_w = 256;
  tile_h = 256;

  angle = [];

  z=0;
  rand=0;

  mycanvasmini=new canvas(canvas_w,canvas_h);
  mycanvasmini.fill('#000000');

  /* Generate the chessboard */

  chessboard=new canvas(256,256);
  for (var i=0;i<32;i++)
    {
      if(chessboardhpos>256-64)
        {
          chessboardhpos=0;
          chessboardvpos+=64;
        }
        chessboard.quad(chessboardhpos,chessboardvpos,32,32,c64.colors.white);
        chessboard.quad(chessboardhpos+32,chessboardvpos+32,32,32,c64.colors.white);
        chessboardhpos+=64;
    }

  imgd = chessboard.contex.getImageData(0, 0, tile_w, tile_h);
  pix = imgd.data;
  imgd2 = mycanvasmini.contex.getImageData(0, 0, canvas_w, canvas_h);
  pix2 = imgd2.data;


  /* init 3d code */


  myobjvert=[
  {x:-200, y: 50, z: 10},
  {x:-200, y:-50, z: 10},
  {x: 200, y:-50, z: 10},
  {x: 200, y: 50, z: 10},
  {x: 200, y: 50, z:-10},
  {x: 200, y:-50, z:-10},
  {x:-200, y:-50, z:-10},
  {x:-200, y: 50, z:-10},
  ];

  col1=0xaaaaaa;
  opa1=1;


  myobj=[
  {p1:0, p2:1, p3:2, p4:3, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},
  {p1:3, p2:2, p3:5, p4:4, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},
  {p1:7, p2:6, p3:1, p4:0, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},
  {p1:7, p2:0, p3:3, p4:4, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},
  {p1:1, p2:6, p3:5, p4:2, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},
  {p1:4, p2:5, p3:6, p4:7, params:new MeshLambertMaterial({ color: col1, shading: FlatShading})},

  ];


  my3d=new codef3D(mycanvas160, 750, 40, 1, 1600 );
  my3d.camera.position.y= -20;
  my3d.faces4(myobjvert,myobj, false, true );
  my3d.addAmbiLight(0x333300);
  my3d.addDirLight(0,5,10,0xffffff);


  /* end 3d code */

  sinus_3d = 0;


  // init scroller

  checker_font = new image('gfx/font_wiki.gif');
  checker_font.initTile(8,16,32);

  checker_scroller = new scrolltext_horizontal();
  checker_scroller.scrtxt="           This is the dawn of a new era. Many have thought the Amiga will rule this planet for the years to come. How wrong they all have been... Who needs 16bit when you can have antialiased realtime 3D on your beloved 8bit machine? Nobody!!!      Is it witchcraft?          Maybe.         Does it change the demo scene forever?        Probably.       Can only the magicians from AWSM pull this off?         Defnitly-- err defenitely-- err... difeni--         of course.         All hail to the old and new king, the Commodore 64!!!!11                                 ";
  checker_scroller.init(mycanvas160,checker_font,1);

  // end scroller

}


function mode7(angle, cx, cy, space_z, horizon )
{

var scale_x = 256;
var scale_y = 256;
var screen_x, screen_y;
var distance, horizontal_scale;
var mask_x = tile_w - 1;
var mask_y = tile_h -1;
var line_dx, line_dy;
var space_x, space_y;

for (screen_y=0; screen_y < canvas_h; screen_y++)
  {
    distance = (space_z * scale_y) / (screen_y + horizon);
    horizontal_scale = distance / scale_x;

    line_dx = (-Math.sin(angle)*horizontal_scale);
    line_dy = (Math.cos(angle) * horizontal_scale);

    space_x = cx + (distance * Math.cos(angle)) - canvas_w/2 * line_dx;
    space_y = cy + (distance * Math.sin(angle)) - canvas_w/2 * line_dy;

    for (screen_x=0; screen_x < canvas_w; screen_x++)
      {

        var dx = ~~ (0.5 + space_x)&mask_x;
        var dy = ~~ (0.5 + space_y)&mask_y;

        var index2 = ( screen_y * canvas_w + screen_x ) *4;
        var index = ( dy * tile_w + dx ) * 4;

        pix2[index2] = pix[index];
        pix2[index2+1] = pix[index+1];
        pix2[index2+2] = pix[index+2];

        space_x += line_dx;
        space_y += line_dy;
      }
  }
}


function checker_render()
{

  rand+=0.002;
  z++;
  lessFPSCounter ++;
  if (lessFPSCounter >= 3){

    // everything that should have less fps goes here

    lessFPSCounter = 0;

    mycanvas160.fill(c64.colors.black);

    // draw the checkerboard

    mode7(rand,z,16,50,30);
    mycanvasmini.contex.putImageData(imgd2, 0, 0);
    mycanvasmini.draw(mycanvas160,20,80);

    mycanvas160.contex.globalCompositeOperation='darken';
    mycanvas160.quad(0,80,160,10,c64.colors.brown);
    mycanvas160.quad(0,90,160,20,c64.colors.orange);
    mycanvas160.quad(0,110,160,25,c64.colors.yellow);
    mycanvas160.contex.globalCompositeOperation='source-over';

    // draw the 3d object

    my3d.group.rotation.x+=0.08;
    my3d.group.position.z = -Math.cos(sinus_3d)*240-200;
    my3d.group.position.y= 150+Math.floor(Math.sin(sinus_3d)*140);
    sinus_3d += 0.08;

    // based on z position of the 3d object, draw the object or the logo first

    if (my3d.group.position.z > -80){

      checker_logo.draw(mycanvas160,36,15);
      my3d.draw();
    }else{
      my3d.draw();

      checker_logo.draw(mycanvas160,36,15);
    }

  }


  // draw the rasterbar

  border.quad(0,212,460,15,c64.colors.white);
  border.quad(0,213,460,13,c64.colors.light_grey);

  mycanvas160.quad(0,182,160,15,c64.colors.light_grey);
  mycanvas160.quad(0,183,160,13,c64.colors.grey);

  mycanvas160.quad(10,182,140,15,c64.colors.grey);
  mycanvas160.quad(10,183,140,13,c64.colors.dark_grey);

  // draw the scroller

  checker_scroller.draw(182);

  // map all wrong colors to the c64 palette on the fly

  colorReduce(mycanvas160);
}
