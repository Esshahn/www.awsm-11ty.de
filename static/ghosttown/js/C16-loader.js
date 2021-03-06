// Generated by CoffeeScript 1.10.0
var C16Loader, Cursor,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

C16Loader = (function() {
  function C16Loader() {
    this.step8 = bind(this.step8, this);
    this.image_kingsoft = new PIXI.Sprite.fromImage('img/kingsoft.png');
    this.image_credits = new PIXI.Sprite.fromImage('img/credits.png');
    this.image_boot = new PIXI.Sprite.fromImage('img/boot.png');
    this.image_loading = new PIXI.Sprite.fromImage('img/loading.png');
    this.image_presents = new PIXI.Sprite.fromImage('img/presents.png');
    this.display_boot();
    this.cover_screen(5, 25);
    this.cursor = new Cursor();
    this.step0();
  }

  C16Loader.prototype.step0 = function() {
    return this.wait(1000, (function(_this) {
      return function() {
        return _this.step1();
      };
    })(this));
  };

  C16Loader.prototype.step1 = function() {
    return this.reveal_line(5, 8, 240, true, (function(_this) {
      return function() {
        return _this.step2();
      };
    })(this));
  };

  C16Loader.prototype.step2 = function() {
    this.cursor.hide();
    return this.wait(500, (function(_this) {
      return function() {
        return _this.step3();
      };
    })(this));
  };

  C16Loader.prototype.step3 = function() {
    return this.reveal_line(7, 40, 0, false, (function(_this) {
      return function() {
        return _this.step4();
      };
    })(this));
  };

  C16Loader.prototype.step4 = function() {
    return this.wait(2000, (function(_this) {
      return function() {
        return _this.step5();
      };
    })(this));
  };

  C16Loader.prototype.step5 = function() {
    return this.reveal_line(8, 40, 0, false, (function(_this) {
      return function() {
        return _this.step6();
      };
    })(this));
  };

  C16Loader.prototype.step6 = function() {
    return this.wait(4000, (function(_this) {
      return function() {
        return _this.step7();
      };
    })(this));
  };

  C16Loader.prototype.step7 = function() {
    return this.reveal_line(9, 40, 0, false, (function(_this) {
      return function() {
        return _this.step8();
      };
    })(this));
  };

  C16Loader.prototype.step8 = function() {
    this.cursor.show();
    this.cursor.set_position(0, 10);
    return this.wait(1000, (function(_this) {
      return function() {
        return _this.step9();
      };
    })(this));
  };

  C16Loader.prototype.step9 = function() {
    return this.reveal_line(10, 3, 500, true, (function(_this) {
      return function() {
        return _this.step10();
      };
    })(this));
  };

  C16Loader.prototype.step10 = function() {
    this.cursor.destroy();
    return this.wait(1000, (function(_this) {
      return function() {
        return _this.step11();
      };
    })(this));
  };

  C16Loader.prototype.step11 = function() {
    this.display_kingsoft();
    return controls.init("kingsoft", 300);
  };

  C16Loader.prototype.step12 = function() {
    this.display_credits();
    return controls.init("credits", 300);
  };

  C16Loader.prototype.step13 = function(lang) {
    this.lang = lang;
    this.display_loading();
    return this.wait(1000, (function(_this) {
      return function() {
        return _this.step14(_this.lang);
      };
    })(this));
  };

  C16Loader.prototype.step14 = function(lang) {
    this.lang = lang;
    this.display_presents();
    return this.wait(3000, (function(_this) {
      return function() {
        return init_lang(_this.lang);
      };
    })(this));
  };

  C16Loader.prototype.wait = function(milliseconds, callback) {
    this.milliseconds = milliseconds;
    return setTimeout((function(_this) {
      return function() {
        return callback();
      };
    })(this), this.milliseconds);
  };

  C16Loader.prototype.cover_screen = function(start, end, color) {
    var i, results;
    this.start = start;
    this.end = end;
    this.color = color != null ? color : COLOR_BOOT_GREY;
    this.empty_line = [];
    i = this.start;
    results = [];
    while (i < this.end) {
      this.empty_line[i] = new PIXI.Graphics;
      this.empty_line[i].beginFill(this.color);
      this.empty_line[i].drawRect(0, 0, 320, 8);
      this.empty_line[i].endFill();
      this.empty_line[i].position.y = i * 8;
      display.addElement(this.empty_line[i]);
      results.push(i++);
    }
    return results;
  };

  C16Loader.prototype.reveal_line = function(line, amountOfCharacters, speed, showCursor, callback) {
    this.line = line;
    this.amountOfCharacters = amountOfCharacters != null ? amountOfCharacters : 40;
    this.speed = speed != null ? speed : 100;
    this.showCursor = showCursor != null ? showCursor : true;
    if (this.speed > 0) {
      return this.line_interval = setInterval(((function(_this) {
        return function() {
          if (_this.empty_line[_this.line].position.x / 8 < _this.amountOfCharacters) {
            _this.empty_line[_this.line].position.x += 8;
            if (_this.showCursor) {
              return _this.cursor.set_position(_this.empty_line[_this.line].position.x / 8, _this.line);
            }
          } else {
            clearInterval(_this.line_interval);
            return callback();
          }
        };
      })(this)), this.speed);
    } else {
      this.empty_line[this.line].position.x = 320;
      return callback();
    }
  };

  C16Loader.prototype.reveal_screen = function(speed) {
    var i;
    this.speed = speed;
    i = 0;
    return this.screen_interval = setInterval(((function(_this) {
      return function() {
        if (i < 25) {
          display.removeElement(_this.empty_line[i]);
          return i++;
        } else {
          return clearInterval(_this.screen_interval);
        }
      };
    })(this)), this.speed);
  };

  C16Loader.prototype.display_kingsoft = function() {
    display.change_screen_colors("full", COLOR_BLUE, COLOR_BLUE);
    display.clear();
    display.addElement(this.image_kingsoft);
    this.cover_screen(0, 25, COLOR_BLUE);
    return this.reveal_screen(20);
  };

  C16Loader.prototype.display_credits = function() {
    display.change_screen_colors("full", COLOR_BLACK, COLOR_BLACK);
    display.clear();
    display.addElement(this.image_credits);
    this.cover_screen(0, 25, COLOR_BLACK);
    return this.reveal_screen(60);
  };

  C16Loader.prototype.display_boot = function() {
    display.change_screen_colors("full", COLOR_BOOT_PURPLE, COLOR_BOOT_GREY);
    display.clear();
    return display.addElement(this.image_boot);
  };

  C16Loader.prototype.display_loading = function() {
    display.change_screen_colors("full", COLOR_BOOT_PURPLE, COLOR_BOOT_GREY);
    display.clear();
    display.addElement(this.image_loading);
    this.cover_screen(0, 25, COLOR_BOOT_GREY);
    return this.reveal_screen(30);
  };

  C16Loader.prototype.display_presents = function() {
    display.change_screen_colors("full", COLOR_BLACK, COLOR_BLACK);
    display.clear();
    display.addElement(this.image_presents);
    this.cover_screen(0, 25, COLOR_BLACK);
    return this.reveal_screen(30);
  };

  return C16Loader;

})();

Cursor = (function() {
  function Cursor() {
    this.position_x = 0;
    this.position_y = 5;
    this.cursor = new PIXI.Graphics;
    this.cursor.beginFill(COLOR_BLACK);
    this.cursor.drawRect(0, 0, 8, 8);
    this.cursor.endFill();
    this.cursor.position.x = this.position_x * 8;
    this.cursor.position.y = this.position_y * 8;
    this.cursor_interval = setInterval(((function(_this) {
      return function() {
        return _this.cursor.visible = 1 - _this.cursor.visible;
      };
    })(this)), 322);
    display.addElement(this.cursor);
  }

  Cursor.prototype.set_position = function(x, y) {
    this.cursor.position.x = x * 8;
    return this.cursor.position.y = y * 8;
  };

  Cursor.prototype.destroy = function() {
    clearInterval(this.cursor_interval);
    return display.removeElement(this.cursor);
  };

  Cursor.prototype.hide = function() {
    this.cursor.visible = 0;
    return clearInterval(this.cursor_interval);
  };

  Cursor.prototype.show = function() {
    this.cursor.visible = 1;
    return this.cursor_interval = setInterval(((function(_this) {
      return function() {
        return _this.cursor.visible = 1 - _this.cursor.visible;
      };
    })(this)), 322);
  };

  return Cursor;

})();

//# sourceMappingURL=C16-loader.js.map
