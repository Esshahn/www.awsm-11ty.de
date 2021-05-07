---
layout: article
date: 2021-04-16
tags: blog
title: 'The Fairlight Intro, Part II: Disassembly'
teaser: fairlight/fairlight-intro.gif
excerpt: "After successfully unpacking the program, we finally get to disassemble the Fairlight intro. We clean up the code to make it compile again, fix some issues here and there and ultimately create our own remix."
---

This article is part of a small series of articles about the Fairlight intro.  
[Writing a disassembler](/blog/pydisass/)  
[The Fairlight Intro, Part I: Unpacking](/blog/fairlight-unpacking/)  
[The Fairlight Intro, Part II: Disassembly](/blog/fairlight-disassembly/) -> this article  

## Intro

What's wrong with this piece of code? Every time I try to look at it, I end up in a totally different spot. The first attempt resulted in writing my own disassembler for fucks sake. And the second try made me rant about humans versus compilers and the pain-in-the-butt-ness of code crunchers. What is going on here, Fairlight, is this supposed to be some kind of evil copy protection? 

**I'm done** praising this *"oh so iconic masterpiece of a C64 cracktro, which massively influenced the demo scene which itself has become [accepted as UNESCO cultural heritage](http://demoscene-the-art-of-coding.net/2021/03/20/demoscene-accepted-as-unesco-cultural-heritage-in-germany/)"*. After all, [Woodo](https://csdb.dk/scener/?id=4203) was probably like 12 years old when he coded this, half acne, half chips & coke farts. I, for one, am in my mid fourties, a serious, well respected and adorable decend human being, who's in no way in a mid-life crisis.

Where was I... ah yes, disassembling the Fairlight intro.  
Let's have a look at it again.

https://youtu.be/WnYCERvc2B8?t=17


### The uncompressed binary file

[In part one of the article](/blog/fairlight-unpacking/) we learned how to unpack the compressed binary file in order to extract the source code. You can either follow the steps explained there or ignore all the hard work and just grab the stripped down file from the [github repo of this article](https://github.com/Esshahn/c64-fairlight/tree/main/sources).

### Disassembler of choice: pyDisass6502

As part of the fun (or punishment), I'm using my very own disassembler called [pyDisass6502](https://github.com/Esshahn/pydisass6502). In case I haven't annoyed you with the creation of this tool enough yet, you can read everything about it [in this article](/blog/pydisass/). My plan to disassemble the Fairlight intro, in combination with a notorious lack of good retro development tools on the Mac, has led me to write pyDisass6502.

If you plan to follow my steps and disassemble the binary file yourself, any disassembler out there, like [Regenerator](https://csdb.dk/release/?id=149429) or [masswerk's 6502 disassembler](https://www.masswerk.at/6502/disassembler.html) are great choices. Chances are they work just a tad better and are more user friendly. On the other hand, pyDisass6502 lets you adapt the code of the disassembler itself to your liking and is quite easy to understand.

I've configured pyDisass6502 to run from any location, instructions can be found in the repo's `readme.md` file. 

### Development environment

I'm using VSCode for cross platform development. It works remarkably well and is free. I've created the [ACME Assembler VSCode Template](https://github.com/Esshahn/acme-assembly-vscode-template) for easy development, supporting Windows, Linux and Mac. I've also included the full configuration including the `ACME Assembler` and `exomizer` binaries in the [repository for the Fairlight intro](https://github.com/Esshahn/c64-fairlight/). This should help you get started easily, yet if you are familiar with other cross platform tools it should be easy to adapt.
### Start Code

The Fairlight intro code starts at address `$c000` and lacks a proper BASIC program to autostart it. To make the disassembly process more convenient, the following code is adding the BASIC starter and then loads in the converted assembly code. 

```asm6502
;==========================================================
; created by awsm of Mayday! in 2021
; starter for fairlight intro
;==========================================================

;==========================================================
; labels
;==========================================================

BASIC           = $0801
CODE_START      = $c000


;==========================================================
; BASIC header
;==========================================================

* = BASIC

    !byte $0b, $08
    !byte $E5                     ; BASIC line number:  $E2=2018 $E3=2019 etc       
    !byte $07, $9E
    !byte '0' + CODE_START % 100000 / 10000
    !byte '0' + CODE_START %  10000 /  1000        
    !byte '0' + CODE_START %   1000 /   100        
    !byte '0' + CODE_START %    100 /    10        
    !byte '0' + CODE_START %     10             
    !byte $00, $00, $00           ; end of basic


;==========================================================
; main program
;==========================================================

!source "code/flt.asm"
```

This gives us this nice little line of BASIC code, which starts the intro by calling `SYS 49152`, which in hex, you guessed it, is `$C000`.

![BASIC starter](/assets/img/blog/fairlight/fairlight-basic.png)

With the project neatly set up, it's time to let our disassembler go wild!

## Disassembly, round 1: first automatic conversion

Our project structure:

```asm6502
bin/                      ; contains ACME & exomizer files for each OS
    linux/
    mac/
    win/
build/                    ; output directory
code/                     ; our source code lives here
    flt.asm               ; the generated file
    main.asm              ; the BASIC starter
sources/                  ; external files
    entrypoints.json      ; our custom entrypoints file
    flt.prg               ; the source binary
make.sh                   ; the make file which handles compiling and starting VICE
```

```batch
disass -i sources/flt.prg -o code/flt.asm
```

This takes `sources/flt.prg` as the input and generates `code/flt.asm`.

Here are the first lines of generated code:

```asm6502
; converted with pydisass6502 by awsm of mayday!

* = $c000

            sei
            lda #$c1
            sta $0315                       ; IRQ vector routine high byte
            lda #$74
            sta $0314                       ; IRQ vector routine low byte
            lda #$01
            sta $d012                       ; raster line
            sta $d01a                       ; interrupt control
            lda #$7f
            sta $dc0d                       ; CIA #1 - interrupt control and status
            lda #$1b
            sta $d011                       ; screen control register #1, vertical scroll
            lda #$94
            sta $dd00                       ; CIA #2 - port A, serial bus access
            lda #$12
            sta $d018                       ; memory setup
            lda #$09
            ldx #$00
```

Pretty cool! The disassembler converted the file without errors and we can see both code and data sections. As a bonus, many lines of code have comments added automatically! You can actually deactivate those comments if you do not like or need them by adding the flag `-nc` or `--nocomments`. 

However, since our disassembler follows the rule "when in doubt, assume it's data", the majority of the file looks like this:

```asm6502
lc0f1

!byte $1f, $8d, $18, $d4, $a9, $98, $a2, $00, $cd, $12, $d0
!byte $d0, $fb, $bd, $80, $c2, $a8, $ad, $12, $d0, $cd, $12
!byte $d0, $f0, $fb, $8c, $21, $d0, $e8, $e0, $2a, $d0, $ec
!byte $ad, $12, $d0, $c9, $d2, $d0, $f9, $a5, $09, $8d, $16
!byte $d0, $a2, $64, $ca, $d0, $fd, $a9, $d8, $8d, $16, $d0
!byte $c6, $09, $a5, $09, $c9, $ff, $d0, $2c, $a9, $07, $85
!byte $09, $a2, $00, $bd, $21, $c7, $9d, $20, $c7, $e8, $e0
!byte $27, $d0, $f5, $a2, $00, $a1, $39, $8d, $47, $c7, $e6
!byte $39, $a5, $39, $c9, $00, $d0, $0c, $e6, $3a, $a5, $3a
!byte $c9, $cc, $d0, $04, $a9, $ca, $85, $3a, $ad, $20, $db
!byte $48, $a2, $00, $bd, $21, $db, $9d, $20, $db, $e8, $e0
!byte $27, $d0, $f5, $68, $8d, $47, $db, $4c, $31, $ea, $a9
!byte $01, $8d, $19, $d0, $ad, $f1, $c0, $c9, $1f, $d0, $07
!byte $20, $e4, $ff, $c9, $20, $f0, $06, $20, $e4, $ff, $4c
!byte $b7, $c0, $78, $a9, $ea, $8d, $15, $03, $a9, $31, $8d
!byte $14, $03, $20, $81, $ff, $a9, $97, $8d, $00, $dd, $58
!byte $4c, $e2, $fc, $00, $00, $00, $00, $00, $00, $00, $00
```

Interestingly, since the compiler wouldn't care or even know if the code or data makes any sense, this would successfully compile even if the above section is code or just partly code.

But we are humans, not compilers. If some of you out there are actually compilers, congrats. I'll try my best to make this article interesting for you, too. But for now, we need to focus on humans, who, sadly, can't make any shit out of this data gibberish. They need more guidance. So let's take care of that next.

## Disassembly, round 2: Inspect the data

From here on, we help the disassembler identify code sections by marking them manually, if they are known. This is where the `entrypoints.json` file, which is part of pyDisAss6502, comes in handy:

```asm6502
{
    "entrypoints": [
        {"addr": "", "mode": "code"}
    ]
}
```

The usage is pretty simple. Whenever we find code hidden in the data section, we add an entrypoint to the `JSON` file. pyDisass6502 will then acknowledge them when setting the `-e` or `--entrypoints` flag and run the script again, like so:

```batch
disass -i sources/flt.prg -o code/flt.asm -e sources/entrypoints.json
```

But how do we identify code in the first place?  
Many disassemblers have an interactive UI, which lets you mark sections and convert them interactively between code and data. Our command line tool does not have that luxury, but luckily we can aways look into the monitor of the [VICE](https://vice-emu.sourceforge.io) emulator. I usually keep it open all the time to browse through the code and set manual entrypoints whenever I spot code.

The first entrypoint is easy to identify if you look at the start of the code again:

```asm6502
            lda #$c1
            sta $0315                       ; IRQ vector routine high byte
            lda #$74
            sta $0314                       ; IRQ vector routine low byte
```

The IRQ vector is changed to jump to `$c174`, which is our custom interrupt routine and therefore has to be code. Our disassembler wasn't smart enough to look for high byte and low byte addresses, but we humans are! GO HUMANS! GO HUMANS! This easily means a tie between compilers and humans.   

Our new entrypoints file:

```asm6502
{
    "entrypoints": [
        {"addr": "c174", "mode": "code"}
    ]
}
```

We start the disassembly again, et voilá! Out of the sea of data emerges our custom interrupt routine:

```asm6502
lc174
            lda #$01
            sta $d019                       ; interrupt status
            lda lc0f1
            cmp #$1f
            bne lc187
            jsr $ffe4                       ; GETIN
            cmp #$20
            beq lc18d


lc187
            jsr $ffe4                       ; GETIN
            jmp lc0b7


lc18d
            sei
            lda #$ea
            sta $0315                       ; IRQ vector routine high byte
            lda #$31
            sta $0314                       ; IRQ vector routine low byte
            jsr $ff81                       ; SCINIT
            lda #$97
            sta $dd00                       ; CIA #2 - port A, serial bus access
            cli
            jmp $fce2
```

Even cooler, like in a chain reaction, the disassembler found more jump and branch addresses in this code section and those turned into code as well. \o/ - it's a bit like playing minesweeper, just even more boring.

From here on, I just look at suspicious areas and cross reference them with the monitor output of VICE. Take this section for example:

```asm6502
lc0af
            jmp lc0af

!byte $a9, $01, $8d, $19, $d0

lc0b7
            jsr lcc5e
```

The conservative approach of the disassembler marks anything after a `jmp` as data. And rightly so. But in this case, the following bytes are not accessed from anywhere in the (currently converted) code, which you can conclude by the missing label, which would be `c0b2`. Adding this address as an entrypoint reveals the missing code:

```asm6502
lc0af
            jmp lc0af


lc0b2
            lda #$01
            sta $d019                       ; interrupt status


lc0b7
            jsr lcc5e
            inc $02
            ldx $02
            lda lc2c0,x
            ldy #$0e
            [..]
```

And again, since we told the disassembler that we're in code land, much more data was successfully converted. At this point it is tempting to make changes to the code already, but since every rerun of the disassembler generates the file from scratch, all those changes would be lost. Make sure you're happy with the conversion result before advancing to the next step.

Another hint to check for unidentified code sections is to remove one byte from a data section and check if the code crashes.

```asm6502
lc18d
            sei
            lda #$ea
            sta $0315                       ; IRQ vector routine high byte
            lda #$31
            sta $0314                       ; IRQ vector routine low byte
            jsr $ff81                       ; SCINIT
            lda #$97
            sta $dd00                       ; CIA #2 - port A, serial bus access
            cli
            jmp $fce2

!byte $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00
```

Let's remove any of the bytes above (`$00`) and check the output:

![crash](/assets/img/blog/fairlight/fairlight-crash.png)

That's a clear indicator that some code hasn't been found yet and therefore the addresses aren't converted to labels. And because of that, that code can not be moved around in memory, resulting in unlikely behaviour, like this crash. The byte sequence above is unused memory though, as long as the amount of bytes is unchanged we can replace them with any values and the intro will still run fine.

## Disassembly, round 3: First compile test

So we've made some changes and it's time to try the first compilation. We start the compiler in VSCode with `Shift + Command + B` (on Mac) and choose the `build -> C64 -> VICE` option. The compiler outputs some errors:

```bash  
Error - File code/flt.asm, line 136 (Zone <untitled>): Value not defined (lc0f1).
Error - File code/flt.asm, line 139 (Zone <untitled>): Value not defined (lc0f1).
Error - File code/flt.asm, line 194 (Zone <untitled>): Value not defined (lc720).
Error - File code/flt.asm, line 233 (Zone <untitled>): Value not defined (lc0f1).
Error - File code/flt.asm, line 233 (Zone <untitled>): Value not defined (lc0f1).
```

So four of the five errors are related to the address `c0f1`. What's happening there?

```asm6502
lc0e2
            cmp #$33
            bne lc0f0
            lda lc0f1           ; loads value from $c0f1
            cmp #$1f
            beq lc0f0
            inc lc0f1           ; increases $c0f1


lc0f0
            lda #$1f            ; ah! $c0f1 is actually the memory location of #$1f
            sta $d418                     
            lda #$98
            ldx #$00
```

So, there we have it. That damn <span id="selfmod">self modding code</span>. 

<script>
setInterval(function(){ 
  let text = ["self mod bullshit","self modding code","code is changing itself","code modifies itself"]
  document.getElementById("selfmod").innerHTML = text[Math.floor(Math.random()*text.length)]
 }, 3000);
</script>

It's a powerful method to keep the code short, but a pain in the butt to reverse engineer. We can not set a label `lc0f1`, as it would be inside the `lda #$1f` instruction, but we can change all occurances of `lc0f1` to `lc0f0 + 1`. The compiler wouldn't complain and for us humans it's a good reminder that we're looking at selfmodifying code.

```asm6502
            inc lc0f1           ; before
            inc lc0f0+1         ; after

```


The last reported issue is a missing label for a byte that is read, but not marked for some reason. Maybe we'll find out why later.

```asm6502
lc720
!byte $20
```

All problems fixed - let's try again!

![sucess](/assets/img/blog/fairlight/fairlight-compile-success.png)

That's a great milestone! We're actually compiling assembly code back into a fully working C64 intro! We haven't understood the code itself yet, but it's the first step. From here on we're starting to inspect the code itself and make it more readable.

<img src="/assets/img/blog/fairlight/carlton.gif" style="box-shadow: 0px 0px 0px;">

## Anonymous labels

Our disassembler introduced labels, which are destination points for code jumps or data fetches. They are super useful, but can be overwhelming when you try to clean up the code. Very often these labels are just used for a code loop and not called from outside that loop. I replace those with anonymous labels, for example:

```asm6502
            lda #$20            ; a = $20
            ldx #$ff            ; x = $ff
loop
            sta $d800,x         ; store a at pos $d800+x
            dex                 ; x = x - 1
            cpx #$27            ; is x = $27?
            bne loop            ; no, keep looping
```

can be cleaned up with

```asm6502
            lda #$20            ; a = $20
            ldx #$ff            ; x = $ff
-
            sta $d800,x         ; store a at pos $d800+x
            dex                 ; x = x - 1
            cpx #$27            ; is x = $27?
            bne -               ; no, keep looping
```

A `bne -` jumps to the next *previous* "-" label. A `bne +` jumps to the next *following* "+" label. In addition, you can use multiple minus or plus symbols for nested branching, e.g. `bne --`. This greatly improves readability of the code.

## Replace high and low byte indirect addresses

Most jumps to specific locations in memory are done with direct addressing, like `jmp $c000`. Our disassembler is smart enough to convert them to labels like `jmp lc000`. Indirect jumps, like our IRQ entry code, are not detected though and need to be converted.

```asm6502
            lda #$c1        ; high byte of IRQ address
            sta $0315
            lda #$74        ; low byte of IRQ address
            sta $0314

[..]

* = $c174                   ; IRQ address
            lda #$00
            sta $d020
```

This code will be replaced with the following:

```asm6502
            lda #>irq        ; high byte of IRQ address
            sta $0315
            lda #<irq        ; low byte of IRQ address
            sta $0314

[..]

irq                         ; IRQ address
            lda #$00
            sta $d020
```

## Convert data to text

For better readibilty and making changes to the program easier, we can convert data sections into text. Many disassemblers have that feature built in, but little python script doesn't yet. Thankfully, VICE does have the `i` command to display memory as text. With this, I can display the scrolltext at `$ca00` in a readable format, which can be copied and replaced the corresponding data section in our program.

<img src="/assets/img/blog/fairlight/i-command.png" style="width: 80%; box-shadow: 0px 0px 0px;">

```asm6502
scrolltext
!scr "cracked on the 21st of november 1987...   now you can train yourself "
!scr "to kill communists and iranians...    latest top pirates : beastie bo"
!scr "ys  ikari  ace  hotline  danish gold  new wizax  tpi  tlc  antitrax  "
!scr "c64cg  triad  1001 crew  yeti  triton t  fcs  sca    overseas : eagle"
!scr "soft  fbr  sol  nepa  abyss  xpb  ts  tih          pray that you will"
!scr " get an invitation to our great copy party in stockholm in december.."
!scr ".        fuckings to watcher of the silents. you'll not destroy this "
!scr "party...       l8r           "
```

## Extract code into separate files

So far our program is one single file that includes code, scrolltext, the charset and the music. That's okay for a program this small, but I like it neatly packaged. But where in our code is all that stuff?

Memory register `$d018` comes to the rescue. In it, both the screen and character memory locations are defined, let's search our code for that value:

````asm6502
            lda #$12            ; = binary 0001 0010
            sta $d018
````

We count the bits from right to left, starting at bit #0 to bit #7. Bit 1-3 (001) define the position of the character memory *relative to the VIC bank*. Looking at our [handy memory map](https://mem64.awsm.de) reveals we need to add `$0800` to the current VIC bank to find the character data in memory. So what's the address of the VIC bank then? Again, there's a register for it, this time it's `$dd00`. And right above the previous code snipped we have it defined:

````asm6502
            lda #$94            ; = binary 1001 0100
            sta $dd00
````

Here, the VIC bank is defined by bits 0-1 (00), which our memory map reveals as memory location `$c000`. Now that we have both values, we can simply add them and tadaa, find our character memory at `$c800`!

For the screen memory, the process is the same, with bits 4-7 (0001) of `$d018` pointing at `$0400`, which, with the added VIC bank location, gives us `$c400`. **Do you feel like a real hacker now? No? Well, you should!** Not because you're reverse engineering this 35 year old code, sure, that's kinda cool I guess, but apparently you lack any social contacts, I mean, let's be honest, why would you still read this article otherwise?  
Anyway, consider yourself a...

![hackerman](/assets/img/blog/fairlight/hackerman.gif)

Or hackerwoman.  
I would love to have hackerwomen on my blog. Because, you know, lack of social contacts.

I provide both the assembly data (charset.asm) and the binary (charset.bin) in the github repository, they are practically identical, but only the binary file can be opened in a character editor like [VChar64](https://github.com/ricardoquesada/vchar64) or [CharPad](https://subchristsoftware.itch.io/charpad-free-edition). If you want to make changes to the font, that's your most convenient option.

![charset](/assets/img/blog/fairlight/charset.png)

### Screen memory
As mentioned above, the screen memory can be extracted the same way, it is located from `$c400` to `$c7e7` and could be saved either as binary file or as assembly data. I was surprised to see that the text on the screen was not printed there with a loop routine, but the whole screen memory was just stored in the file. A lazy way of doing it, really, but working nevertheless.

I decided to convert the memory area to assembly code, combining repeating bytes like `$20` for the space/empty character with ACME assembler specific `!fill` instructions. This makes the screen memory much more readable and easy to modify:

````asm6502
!fill 120, $20

; fairlight logo
!byte $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $21, $00, $00, $00, $21, $20, $20, $21, $00, $00, $00, $21, $20, $21, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00, $00
!byte $20, $20, $20, $20, $20, $20, $20, $20, $21, $20, $20, $21, $20, $21, $21, $21, $20, $21, $21, $20, $20, $21, $21, $20, $20, $21, $20, $21, $20, $21, $20, $20, $20, $20, $20, $20, $20, $20, $20, $20
!byte $20, $20, $20, $20, $20, $20, $20, $20, $00, $00, $20, $21, $00, $21, $21, $21, $00, $00, $21, $20, $20, $21, $21, $20, $21, $21, $00, $00, $20, $21, $20, $20, $20, $20, $20, $20, $20, $20, $20, $20
!byte $20, $20, $20, $20, $20, $20, $20, $20, $21, $20, $20, $21, $20, $21, $21, $21, $20, $21, $00, $00, $00, $21, $00, $00, $00, $21, $20, $21, $20, $21, $20, $20, $20, $20, $20, $20, $20, $20, $20, $20

!fill 43, $20
!scr "...the home of the real crackers"
!fill 180, $20
!scr "presents:"
!fill 69, $20
!scr "combat school"
!fill 60, $20
!scr "cracked 21.11.87 by strider"
!fill 87, $20
scrollline
!fill 39, $20
last_character
!byte $20
!fill 93, $20
!scr "intro by woodo"
!fill 53, $20
````

You might notice that I inserted two labels in here, `scrollline` and `last_character`. These are used in the scrolltext code.
### Music
The music section is a mixture of the player code and the song data. I've separated it into an extra file as well, but other than that, I didn't even try to touch and optimize it. If you're familiar with SID music player code, you might want to check it out and see if I've left anything in there in need of fixing.

## Wrapping up code conversion

With all the steps above and some trial and error, you should now have code that is mostly memory location independent (except for the fixed locations like for the character and screen data), well commented (pyDisass6502 did a lot for us automatically) and ready to be analyzed and finally changed. It's a great milestone in our journey as we have successfully reverse engineered and therefore preserved the original code. It is now available to inspect and learn from. 

Time to create a new code branch (or make a copy of the source code) and make changes to it!

## Gentle optimizations

Back in 1986 assembly code was usually a bit harder to organize, it's much easier to clean up code in a modern IDE like VSCode. During code conversion I moved some code sections around a bit, e.g. when code jumps to an area only once during execution. That code could then be moved to the location of the `jmp` instruction, effectively removing that `jmp` and the corresponding `rts` command.

### Stable rasterbars
I noticed that even the slightest changes make the rasters flicker. This is a sign that the raster code isn't really stable and instead tweaked until it "magically works". And sure enough, if we look at the color information for the raster bars, we see that the rasters are much bigger than just the two red and blue bars:

````asm6502
raster_color
!byte $00, $00, $00, $00, $00, $00, $00, $00
!byte $00, $00, $00, $00, $00, $00, $00, $02
!byte $0a, $01, $01, $01, $0a, $0a, $02, $00
!byte $00, $00, $00, $00, $00, $06, $0e, $0e
!byte $01, $01, $0e, $0e, $06, $00, $00, $00
!byte $00, $00, $00, $00, $00, $00, $00, $00
!byte $00, $00, $00, $00, $00, $00, $00, $00
!byte $00, $00, $00, $00, $00, $00, $57, $59
````

Remove all the `$00` (which represents the color 'black') and the bars would be displayed several lines higher (and flicker a lot). It seems that Woodo experimented with the amount of raster lines until he found the most stable version and then made all unnecessary lines invisible. I removed all black lines except for the last one, which is needed for the black background of the rest of the screen.

````asm6502
raster_color
!byte $02, $0a, $01, $01, $01, $0a, $0a, $02
!byte $00, $00, $00, $00, $00, $00, $06, $0e
!byte $0e, $01, $01, $0e, $0e, $06, $00
raster_color_end
````

This made some changes to the display code needed, e.g. moving the start of the raster bars to a later rasterline. However, I wasn't able to get the raster lines stable again. For the sake of doing it right, I added code for generating stable rasters, which is way beyond my paygrade and was mostly copied from this excellent (german) website: [www.retro-programming.de](https://www.retro-programming.de/programming/nachschlagewerk/interrupts/der-rasterzeileninterrupt/raster-irq-endlich-stabil/).

It's worth noting that the amount of added code far exceeds the amount of bytes we saved here. Our new code is more stable and works reliably (and it also gets rid of some glitchy dots), but if you just want to have a tiny intro which magically does what it is supposed to do and was fun to hack together, Woodo's way of doing it was just right. All good, Woodo, all good.

### Optimized sine table

Similar to the rasterbars, the sinus table which stores the Y-position of the green sprite raster seemed overly long:

````asm6502
table_sprite_y_pos
!byte $57, $59, $5c, $5f, $61, $64, $66, $69, $6b, $6d, $6f, $71, $73, $75, $76, $78
!byte $79, $7a, $7a, $7b, $7b, $7b, $7b, $7b, $7b, $7a, $79, $78, $77, $76, $74, $73
!byte $71, $6f, $6d, $6a, $68, $65, $63, $60, $5e, $5b, $58, $56, $53, $50, $4e, $4b
!byte $48, $46, $43, $41, $3f, $3d, $3b, $39, $38, $36, $35, $34, $33, $32, $32, $32
!byte $32, $32, $32, $32, $33, $34, $35, $36, $38, $39, $3b, $3d, $3f, $41, $43, $46
!byte $48, $4b, $4e, $50, $53, $56, $58, $5b, $5e, $60, $63, $65, $68, $6a, $6d, $6f
!byte $71, $73, $74, $76, $77, $78, $79, $7a, $7b, $7b, $7b, $7b, $7b, $7b, $7a, $7a
!byte $79, $78, $76, $75, $73, $71, $6f, $6d, $6b, $69, $66, $64, $61, $5f, $5c, $59
!byte $57, $54, $51, $4e, $4c, $49, $47, $44, $42, $40, $3e, $3c, $3a, $38, $37, $35
!byte $34, $33, $33, $32, $32, $32, $32, $32, $32, $33, $34, $35, $36, $37, $39, $3a
!byte $3c, $3e, $40, $43, $45, $48, $4a, $4d, $4f, $52, $55, $57, $5a, $5d, $5f, $62
!byte $65, $67, $6a, $6c, $6e, $70, $72, $74, $75, $77, $78, $79, $7a, $7b, $7b, $7b
!byte $7b, $7b, $7b, $7b, $7a, $79, $78, $77, $75, $74, $72, $70, $6e, $6c, $6a, $67
!byte $65, $62, $5f, $5d, $5a, $57, $55, $52, $4f, $4d, $4a, $48, $45, $43, $40, $3e
!byte $3c, $3a, $39, $37, $36, $35, $34, $33, $32, $32, $32, $32, $32, $32, $33, $33
!byte $34, $35, $37, $38, $3a, $3c, $3e, $40, $42, $44, $47, $49, $4c, $4e, $51, $54
````

The reason here is pure lazyness in my view. We are looking at 16*16 = 256 bytes and the code loops through the table by wrapping Y (from $00 to $ff again) constantly. With a slight tweak to the code, I removed that restriction:

````asm6502
            inx
            cpx #raster_color_end - raster_color
            bne draw_rasterbars
````

Setting a start and an end label before and after a table is a neat trick to get the right value to check against automatically instead of counting the bytes and adapt the code whenever the amount changes.

````asm6502
table_sprite_y_pos
!byte  87,  89,  92,  95,  97, 100, 102, 105, 107, 109, 111, 113, 115, 116, 118, 119
!byte 120, 121, 122, 122, 123, 123, 123, 123, 122, 122, 121, 120, 119, 117, 116, 114
!byte 112, 110, 108, 106, 103, 101,  98,  96,  93,  91,  88,  85,  82,  80,  77,  75
!byte  72,  70,  67,  65,  63,  61,  59,  57,  56,  54,  53,  52,  51,  51,  50,  50
!byte  50,  50,  51,  51,  52,  53,  54,  55,  57,  58,  60,  62,  64,  66,  68,  71 
!byte  73,  76,  78,  81,  84,  87
table_sprite_y_pos_end
````

You'll see that the table data has not only become much shorter, but is different as well. Why? I noticed that the original sinus table wasn't as smooth as it could be and since I had to change it anyway I figured I could just as well create a new one. I used [this sinus table generator](https://www.daycounter.com/Calculators/Sine-Generator-Calculator.phtml) and tweaked the data to my requirements (top and bottom Y position) with a Python script, which you'll find in the repo's 'tools' folder. I find Python ideal for little tasks like this.

### Variable scrolltext length

The length of the scrolltext was also hardcoded:

````asm6502
            inc $3a
            lda $3a
            cmp #$cc
````

`$3a` contains the high byte of the current scrolltext position in memory. As soon as the scrolltext position reaches `$cc00` the text position gets reset. This not only makes it hard to move the scrolltext around in memory, it also explains why Woodo had to use so many empty characters in his message:

```asm6502
scrolltext
!scr "cracked on the 21st of november 1987...   now you can train yourself "
!scr "to kill communists and iranians...    latest top pirates : beastie bo"
!scr "ys  ikari  ace  hotline  danish gold  new wizax  tpi  tlc  antitrax  "
!scr "c64cg  triad  1001 crew  yeti  triton t  fcs  sca    overseas : eagle"
!scr "soft  fbr  sol  nepa  abyss  xpb  ts  tih          pray that you will"
!scr " get an invitation to our great copy party in stockholm in december.."
!scr ".        fuckings to watcher of the silents. you'll not destroy this "
!scr "party...       l8r           "
```

I corrected this issue by rewriting parts of the scrolltext code:

```asm6502
            lda ($39,x)                     ; fetch a new character
            cmp #$00                        ; is the current byte = $00?
            bne +                           ; yes, then reset the scrolltext
```

Instead of the position in memory, we now check for the value of the current character. To make it work, I just add `!byte $00` at the end of the scrolltext. The only downside of this approach is that we can't use character `$00` in our scrolltext, which, in our case, would be a graphic character from the logo anyway. On the upside, our scrolltext can now be as short or long as we like.

This concludes our code optimizations. We have made this lovely intro quite a bit more versatile. I find it reassuring in a way to learn about some dirty tricks and hacks that have been used. After all, quite a bit of duct tape was used to hold the intro together.

## Fairlight intro remix

Now that we finally have full control over every single byte of the code, we can change whatever we want and turn it into our own remix. There's almost no limit to your imagination and this intro serves as a great template for your own creativity. I didn't want to go way beyond with this, I like to make some artistic changes but keep mostly close to the original.

Here's the result.

https://www.youtube.com/watch?v=EvNWiIuwKQY

That's it. We're finally done with this. It was a fun ride for me and I've learned a ton from understanding Woodo's code. Thanks Woodo! 
Thank you for reading this article.  
I hope you liked it :)
