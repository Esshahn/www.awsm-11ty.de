---
layout: article
date: 2021-04-16
tags: blog
title: 'The Fairlight Intro, Part II: Disassembly'
teaser: fairlight/fairlight-intro.gif
excerpt: "This C64 intro from Fairlight ist nothing less than iconic and engraved in our collective memory as the beginning of an art form. In this article I share my learnings unpacking the code."
---

This article is part of a small series of articles about the Fairlight intro.  
[The Fairlight Intro, Part I: Unpacking](/blog/fairlight-unpacking/)

Alright, before starting, I've got to admit that this is my second attempt at disassembling this program. Last time I got sidetracked and ended up [writing a new disassembler in python](/blog/pydisass/). That's why I'm just a hobby developer - I can chase ideas like an overexcited puppy dog hunts squirrels on a sunny june's flower meadow, giving a damn shit about the worrying sprint cycle burndown chart and the product owner being up my arse about fixing those critical bugs that keep exposing customer's credit card data to the public. Did I mention I'm a product owner in real life?

![squirrel](/assets/img/blog/fairlight/squirrel.gif)

Where was I... ah yes, unpacking the Fairlight intro.

## The Fairlight Intro

https://youtu.be/WnYCERvc2B8?t=17

Let's take a look at this beauty from the year 1987. You can [download it from csdb.dk](https://csdb.dk/release/?id=53390) and use an emulator like [VICE](https://vice-emu.sourceforge.io) to watch it. It's worth noting that many Commodore 64 intros of that time were more impressive from a technical standpoint, like the wonderful [Papillons intro](https://csdb.dk/release/?id=3345) (1988) or the [Dynamic Duo intro](https://csdb.dk/release/?id=54050) (1986). But besides the equally iconic [Eagle Soft Incorportated intro](https://csdb.dk/release/?id=53330), very few managed to leave such a lasting impression. I have so fond memories of these cracktros that I [converted some of my favorites to JavaScript](/jscracktros/). My demo group *Mayday!* did a [tribute to the intro as well](https://csdb.dk/release/?id=148407).

csdb.dk counts a massive 185 games that released with this cracktro. That's like four big boxes of 5 1/4 inch floppy discs. No wonder there was no way around this intro as Fairlight was impressively active during that time.

Written by [Woodo](https://csdb.dk/scener/?id=4203), who's last C64 release was in 1992, this intro still scores high for many demo sceners:

> *I'd say together with ESI's eagle intro, this is the most legendary intro on the c-64. Still get goose bumps looking at it. (Freestyle)*

> *Probably the most known intro scene-wise. Brings back a lot of memories. (Jailbird)*

> *"L" like LEGENDARY! "O" like OMG! "V" like VIRTUOSIC! "E" like EPIC! Short: LOVE <3 (Shine)*

> *I must be an exception, I've only learned about this intro and its legendaryness in the late 90's and honestly **I think its awful.** (Oswald)*

Err... thanks Oswald.

## How to disassemble a binary program

The easiest way to convert machine language into readable assembly code is to use a disassembler program. There are several options available and I've written an extensive [article about the topic on how to write a 6502 disassembler](/blog/pydisass/). I'll use [pydisass6502](https://github.com/Esshahn/pydisass64) since I've written it myself and can tweak it whenever needed. It's part of the fun.

## Step 1: run the program in the emulator

As mentioned earlier I'm using the [VICE](https://vice-emu.sourceforge.io) emulator, mostly because it's reliable and I got used to it. But there are alternatives, and the [64debugger](https://sourceforge.net/projects/c64-debugger/) is an especially powerful tool, which, if mastered, can provide you with some shortcuts to the process mentioned further on. I encourage you to check it out and give it a try, however, I will stick to old trusty VICE for this article.

The PRG file [downloaded from csdb.dk](https://csdb.dk/release/?id=53390) can be executed by double clicking or by drag'n'drop into the emulator window. Since it started automatically, you would not see the BASIC program (usually a `SYS 2064`). You can check for that from the VICE monitor, but here's a little workaround in case you want to not start the program immediately (there's a reason why I explain this, more about that later).

### Setting drive 9 as a SD2IEC device

Go to Settings (either from the menu "Settings > Settings...") or by pressing `command + o` (Mac, not sure about Windows or Linux). 

1. Click on "Peripheral Devices" > "Drive".
2. Click on Drive 9
3. Choose a drive type (1541 or 1541-II for example)
4. Check IEC-Device
5. Choose "Host file system" from dropdown

![vice-1](/assets/img/blog/fairlight/vice-1.png)

6. Next, go to "Peripheral Devices" > "Filesystem Device"
7. Click on Drive 9
8. Click on "Browse..." button and choose the folder where your file is in
9. Click "Close" button
10. Make sure you save your settings

![vice-2](/assets/img/blog/fairlight/vice-2.png)

VICE looks quite different on various operating systems and your menu structure might vary from the screenshots above, but the overall process should be the same.

### Loading the PRG via drive 9

Using the new configuration, we can simply type

```bash
load"$",9
```

to get the directory of the host file system displayed on the C64.

![iecdir](/assets/img/blog/fairlight/iecdir.png)

And we can load and list the program as if we loaded it from a `D64` image or real floppy.

```bash
load"flt-01.prg",9,1
```

![iecdir2](/assets/img/blog/fairlight/iecdir2.png)

Now we know that the program is located at address `2064` or hex `$0810` in memory. And sure enough, this is the beginning of the code, with added comments. Hint: it's useful to have a [memory map of the C64](https://mem64.awsm.de) at hand when analyzing code.

```asm6502
.C:0810  78          SEI                ; disable interrupts
.C:0811  A9 34       LDA #$34           ; A = $34
.C:0813  85 01       STA $01            ; store it at address $01 to configure RAM and IO
.C:0815  A2 05       LDX #$05           ; X = $05
.C:0817  BD 42 08    LDA $0842,X        ; load the next 5 bytes from $0842 
.C:081a  9D 2D 00    STA $002D,X        ; and store them in zeropage from $2d
.C:081d  CA          DEX                ; X--
.C:081e  10 F7       BPL $0817          ; loop
.C:0820  9A          TXS                ; put X on stack
.C:0821  A0 00       LDY #$00           ; Y = $00
.C:0823  C6 32       DEC $32            ; decrease zeropage address $32
.C:0825  CE 2C 08    DEC $082C          ; decrease $082c <- selfmod 
.C:0828  B1 31       LDA ($31),Y        ; load from address that is at $31 + Y
.C:082a  99 00 00    STA $0000,Y        ; store at $0000 <- selfmod destination
.C:082d  C8          INY                ; Y++
.C:082e  D0 F8       BNE $0828          ; loop
.C:0830  A5 32       LDA $32            ; A = byte at address $32
.C:0832  C9 08       CMP #$08           ; is it $08?
.C:0834  D0 ED       BNE $0823          ; no
.C:0836  B9 48 08    LDA $0848,Y        ; yes, load more stuff
.C:0839  99 00 01    STA $0100,Y        ; and move it to $0100
.C:083c  C8          INY                ; Y++
.C:083d  D0 F7       BNE $0836          ; loop
.C:083f  4C 00 01    JMP $0100          ; jump to address $0100
```

Hm. This is not exactly what I expected. Instead of the intro code we see a sophisticated program that moves data in memory and then calls that data by `jmp $1000` at the end. What's going on?

## Packing / Crunching

A little interlude while I wait for the 45 gigabytes download of the Cyberpunk 2077 patch...
Back in the 80's disk space and computer memory were extremely limited. In addition, especially Commodore's 1541 disk drives were so slow you could almost high five every single byte that snailed its way through the serial cable into the computer. "Hey there `$A9`, how are things today? Wow, `$32`, haven't seen you in a while... oh boy, if that isn't my man `$FF`...". 

<span id="bytes"></span>
<script>
let bytes = ["$FF"]
setInterval(function(){ 
  byte = (" $"+("0" + Math.floor(Math.random()*255).toString(16)).slice(-2)).toUpperCase()
  if(bytes.length > 20){ bytes = []}
  bytes.push(byte)
  document.getElementById("bytes").innerHTML = bytes
 }, 2000);
</script>

Therefore, file compressing was needed and these tools are called packers, or crunchers. Some popular ones are for example [exomizer](https://bitbucket.org/magli143/exomizer/wiki/Home) or [Pucrunch](https://github.com/mist64/pucrunch). Packing a program with these would greatly reduce the filesize and hence the loading speed. The additional time the computer needs to unpack the file again can be ignored in comparison to the much faster loading.

Unfortunately for us who are sticking our noses into decades old intros, packed code is a pain the butt, because we can't just disassemble the program without unpacking it first. Let's cover this next.

## Unpacking method 1: the lazy aka wrong way

Since the program comes with batteries included, it can unpack itself and run the intro code when it's done. So why not let that unpack routine do the hard work for us? We start the intro either by typing `RUN` or by entering `SYS2064`. Everything works as expected and we see the fake rasterbars moving, the logo, the scroller, the music. Cool. But a fundamental question comes up now. 

### Where in memory is the actual intro located?

There are some usual suspects that help you find the right entry point. The simplest is usually following the code that gets executed first, which in our case is at address `2064`. If the program isn't packed, this might be the actual code right there. Another typical location in memory is `$c000` hex or `49152` decimal. Let's take a look there:

```asm6502
.C:c000  78          SEI
.C:c001  A9 C1       LDA #$C1
.C:c003  8D 15 03    STA $0315
.C:c006  A9 74       LDA #$74
.C:c008  8D 14 03    STA $0314
[..]
```

Bingo. This is a typical code section at the beginning of a program. It disables interrups with `SEI` and then sets the IRQ vector with `STA $0315` and `STA $0314`. Whenever you find code like this, it's likely at the beginning. I highly recommend getting familiar with [VICE's monitor commands](https://vice-emu.sourceforge.io/vice_12.html), which provide powerful tools like the `hunt` command. For example, to search through the whole memory for the `STA $0315` (or `8d 15 03` hex) instruction, just enter

```asm6502
h 0000 ffff 8d 15 03    ; format: start_addr end_addr byte byte byte
```
and VICE returns all occurances of that byte sequence:
```asm6502
093e
0acb
c003  ; <- the one we were looking for
c190
fcad
fcc6
```

Now we know where the code starts, but where does it end? In this case it's quite easy. Our code sits in the [upper RAM area](https://mem64.awsm.de), which is a section of 4096 bytes from `C000` to `CFFF`. We can now save that memory area in VICE using the monitor command `save` or short `s`. It takes the path to where you want to save the file, then a `0` for the host file system, then the start address and lastly the end address.

```bash
save "/path/to/wherever/the/fuck/you/want/fairlight.prg" 0 0c00 0cfff
```

Alright, time for a test! Let's drop that newly created file into VICE and see what happens.

![fairlight-no-basic](/assets/img/blog/fairlight/fairlight-no-basic.png)

Why doesn't it work? Well, when we saved the file, we stripped the BASIC program that starts the intro. But everything should be still there, so let's type in `SYS2064` to run the code.

![fairlight-scroller](/assets/img/blog/fairlight/fairlight-scroller.png)

Success! \o/  
All done. Thanks for reading this article. Roll the credits.  
...  
Wait.  
Why doesn't that scolltext start at the beginning like it should?  
That doesn't look right.

Yup. That's because we saved code that was already running and changing data in memory. Depending on the time it took us to save the file after starting the intro, a lot might have changed. Like the position of the scrolltext, or the fake rasterbars, or the music. We can't be sure what the initial state was and in some cases the program might not work at all anymore.

Success? More like sucks ass.  

![facepalm](/assets/img/blog/fairlight/facepalm.gif)

Let's try a different approach.

## Unpacking method 2: tracing the unpacker code

The trick here will be to let the unpacker do it's work but insert a command that prevents execution right where it would otherwise jump to the intro. It is important that the program has not been started yet, that's why I explained earlier how to load the `PRG` without running it. Let's start by looking for a `JMP $C000`  or `JSR $C000` in memory.

```asm6502
h 0000 ffff 4c 00 c0      ; JMP $C000
h 0000 ffff 20 00 c0      ; JSR $C000
```

```asm6502
.C:08e6  20 00 C0    JSR $C000
```

Ha! There is our jump command. Let's change the `$20` to `$60` (RTS)

```asm6502
>08e6 60      
```

For the fun of it, since it's a quick hack, we can do the same from BASIC with a `POKE` command:

```bash
POKE 2278, 96
RUN
```

Okay, right after running the program from basic, we are greeted with a clean screen:

![fairlight-clean](/assets/img/blog/fairlight/fairlight-clean.png)

This at least means that we achieved something as the intro is not starting as it would normally do. If everyhting worked as planned, we unpacked the code and left to BASIC right before starting it. If we type in

```bash
SYS 49152
```

the intro should now start. But before we do this, we save the program again just like we did earlier.

![fairlight-scroller](/assets/img/blog/fairlight/fairlight-scroller.png)

And it does! And most of all, everything looks like it should, including the correct scroller position and all. 

### Breakpoints

For the sake of completeness, we look into yet another option, which is using breakpoints. With the `break` command you can specify any address in memory and execution stops once the program counter reaches that address.

I've run the unpacking routine and inspected the code it generated to find the right address to set the breakpoint at. I didn't mention it earlier, but the `JMP $C000` actually gets copied to a different location before execution and we have to find that address where it is copied to.

Here it is:

```asm6502
.C:019e  20 00 C0    JSR $C000
```

Setting a breakpoint works like this:

```asm6502
break 019e
BREAK: 1  C:$019e  (Stop on exec)
```

To verify if it works, we repeat the process as before: 
1. reset the emulator
2. load the program
3. enter monitor
4. set the breakpoint
5. exit the monitor
6. run the BASIC program.
7. save the program
8. (in monitor) find a `RTS` and continue execution from there `g 0870`
9. check with `SYS 49152`

Yes! The result is the same as with the previous method. I've shown you both approaches since either can come in handy.
Now that we have done our homework and learned how to do it manually, we can lean back and check out a tool that does this automatically for us.

What did you say?  
Oh, you mean, err.., I should have shown you that one first?

![drevil](/assets/img/blog/fairlight/drevil.gif)


## Unpacking method 3: Unp64

[Unp64](https://csdb.dk/release/index.php?id=173885) is a generic C64 unpacker and it works surprisingly well. Here's how the developer Ian Coog describes it:

<div class="quote">
The idea is simple: to simulate the C64 memory/processor, run the program until
it reaches the unpack routine, usually relocated to an address lower than $0800,
then to continue execution until the Program Counter returns to a normal address
usually higher than $0800. At this point, save all the memory.
I normally do this process in emulators by setting breakpoints but an automatic
program that does it for me is handy.
</div>

The process is quite similar to what we did manually. 

The downloaded ZIP file of Unp64 containes an executable for Windows only. But gladly a `Makefile` is included as well, together with the sources, so you can build your own Mac or Linux version by simply running 

```bash
> make
```

in the terminal. After about a minute you should have the right executable file for your operating system.

Using Unp64 is super simple, but be sure to check out the documentation to understand all the extra options. In our case, we make sure Unp64 and the Fairlight intro are in the same folder (it's just easier) and then run

```bash
> unp64 flt-01.prg

ECA Compacker, unpacker=$0100
Entry point: $0811
pass1, find unpacker: $0100
pass2, return to mem: $c000
saved $c000-$cfff as flt-01.prg.c000
```

Wow. That's... impressive. I love when logical assumptions put into a function yield such great results. Now that we've done it the hard way ourselves we can appreciate it even more. The converted program was saved as `flt-01.prg.c000` and should be identical to the versions we created before.

The unpacking is done. We can finally look into disassembling the code.  
Phew.