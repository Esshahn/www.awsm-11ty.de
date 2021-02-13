---
layout: article
date: 2021-02-07
tags: blog
title: '6502 Syntax Highlighting with highlight.js'
teaser: 'commodore-highlight.png'
excerpt: 'I created syntax highlighting for the ACME assembler which you can implement on your own website or blog.'
---

## Update!

Well it didn't take me long to realize that there's a superior library to `highlight.js` called [Prism.js](http://www.prismjs.com), which does basically the same job, but supports 6502 assembly out of the box. Moreover, it is easier to include in markdown templates (which is what I'm mostly using for my articles) and it comes as a plugin for [Eleventy](http://www.11ty.com) and generates javascript-free static highlighting, which is even more amazing.

But if for some reason Prism would not work for you, using highlight.js is still a great option.

## Highlight.js 

One of the main reasons for me why I took the extra effort and build my own little CMS for this website was to gain more control over the content and styling again. Wordpress is quite convenient, but complex and bulky and therefore limited in what you can achieve without deep diving into the realm of ancient PHP code.

I'm using a library called [highlightjs](https://highlightjs.org) for all code syntax highlighting on this website. It has support for 191 different languages and allows for theming as well, with 97 styles to start and extend from.

Since ACME Assembler syntax was missing I added it with this little javascript, which you can use for your own website if you like:

``` js
hljs.registerLanguage(
  "6502acme",
  (() => {
    "use strict";
    return (r) => ({
      name: "6502acme",
      case_insensitive: true,
      keywords: {
        keyword:
          "ADC AND ASL BCC BCS BEQ BIT BMI BNE BPL BRK BVC BVS CLC CLD CLI CLV CMP CPX CPY DEC DEX DEY EOR INC INX INY JMP JSR LDA LDX LDY LSR NOP ORA PHA PHP PLA PLP ROL ROR RTI RTS SBC SEC SED SEI STA STX STY TAX TAY TSX TXA TXS TYA",
        built_in: "x|0 y|0",
        symbol:
          "scr by byte txt pet to source binary initmem wo word hex h align fi fill skip convtab ct text tx raw scrxor zone sl if ifdef ifndef for set do while endoffile warn error serious macro pseudopc cpu to al as rl rs",
      },
      contains: [
        r.COMMENT(";", "$", { relevance: 0 }),
        {
          className: "number",
          begin:
            "(-?)(\\$[a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",
        },

        r.QUOTE_STRING_MODE,
        {
          className: "string",
          begin: "'",
          end: "[^\\\\]'",
          illegal: "[^\\\\][^']",
        },
        { className: "symbol", begin: "^![A-Za-z0-9_.$]+:" },
      ],
    });
  })()
);
```

As a result, assembly code on this page now looks almost as good as in VSCode. Take this example program from my [VSCode Template for ACME](https://github.com/Esshahn/acme-assembly-vscode-template) repo:

``` asm6502
;==========================================================
; 6502 assembly template for VSCode
; https://github.com/Esshahn/acme-assembly-vscode-template
;==========================================================
 
; C16, C116, Plus/4
;BGCOLOR      = $ff15
;BORDERCOLOR  = $ff19
;BASIC        = $1001
;SCREENRAM    = $0c00

; C64
BGCOLOR       = $d020
BORDERCOLOR   = $d021
BASIC         = $0801
SCREENRAM     = $0400

;==========================================================
; BASIC header
;==========================================================

* = BASIC

        !byte $0b, $08
        !byte $E3                     ; BASIC line number:  $E2=2018 $E3=2019 etc       
        !byte $07, $9E
        !byte '0' + entry % 10000 / 1000        
        !byte '0' + entry %  1000 /  100        
        !byte '0' + entry %   100 /   10        
        !byte '0' + entry %    10             
        !byte $00, $00, $00           ; end of basic

;==========================================================
; CODE
;==========================================================

entry

        lda #$00                ; the color value
        sta BGCOLOR             ; change background color
        sta BORDERCOLOR         ; change border color
        ldy #$0c                ; the string "hello world!" has 12 (= $0c) characters
        ldx #$00                ; start at position 0 of the string

character_loop

        lda hello,x             ; load character number x of the string
        sta SCREENRAM,x         ; save it at position x of the screen ram
        inx                     ; increment x by 1
        dey                     ; decrement y by 1
        bne character_loop      ; is y positive? then repeat
        rts                     ; exit the program

hello   !scr "hello world!"     ; our string to display
```

To integrate [highlightjs](https://highlightjs.org) checkout their [usage guide](https://highlightjs.org/usage/) or copy this snippet below and paste it into your site header.

``` html
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/monokai-sublime.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/highlight.min.js"></script>
<script type="text/javascript" charset="UTF-8" src="/your/lokal/js/path/commodore-highlight.js"></script>
```

[Commodore-Highlight on Github](https://github.com/Esshahn/commodore-highlight)


