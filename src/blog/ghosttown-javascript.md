---
layout: article
date: 2020-01-22
tags: ['blog','ghosttown']
title: 'Ghost Town - A JavaScript conversion of a Commodore 16 game'
teaser: 'ghosttown-javascript/ghosttown-js-00020.png'
excerpt: 'This is a summary of a series of posts from my last blog. I still remember the creation of this game as a very enjoyable experience, so I want to share it here.'
---



### This is a summary of a series of posts from my last blog. I still remember the creation of this game as a very enjoyable experience, so I want to share it here.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00001.png)

## Ghost Town Remake

I’m trying to convert the original Ghost Town game for the Commodore 264 series to HTML5 and JavaScript. Let’s see how far I get, this is a video of a complete playthrough of the game (SP0IL0RZ AL3RTZ!!1):

<iframe class="video"
src="https://www.youtube.com/embed/eXM6h9Q3dDQ" 
allowfullscreen></iframe>

## About the game

(most info shamelessly taken from [http://plus4world.powweb.com/software/Ghost_Town](http://plus4world.powweb.com/software/Ghost_Town)  )

Ghost Town was written by Udo Gertz with Design by Peter Hartmann in 1985 (hmmm….but why does the cover print say 1984?). If it came out today, one would classify it as Survival Horror Adventure. It was made for the Commodore 264 series C16, C116 and the Plus/4. The game was available for PAL regions only, had a german and english version and was able to run on 16k RAM.

You can download the game an run it in Yape or Vice: [http://plus4world.powweb.com/dl/games/g/ghost_town.prg](http://plus4world.powweb.com/dl/games/g/ghost_town.prg)

## The Remake

Why am I doing this? Basically, I love creating small games and demos (see [https://www.awsm.de](https://www.awsm.de) for more) and Ghost Town was one of the earliest games I owned and played. Even after 25 years I get goose bumps when I see the drop dead ugly player character and listen to the fabulously annoying title music (pulled off by TED, the mutant one-eyed DEAD frog brother of SID, the twin dolphin blowhole equipped rainbow squirting unicorn of soundchips).

Part of the challenge is to blog about it and let everybody know about the small challenges and stupidities I stumble upon. Most Projects only document the success path, and we all know it’s not really like that. 

Anyway, feel free to drop me a comment or participate in whatever way you may fancy (that’s four consecutive words with a “y” in it), I’m happy to get some motivation along the way, especially in those dark hours when I run out of fine quality liquers and ask myself who wrote that code I’m looking at since an hour or ten.

## Technology

Not sure which technology to use along the way, but it will probably be something like

* HTML (duh!)
* JavaScript (finally a project with a high class programming language here on GitHub)
* CoffeeScript (honestly, I don’t like it yet, but it’s part of the plan to get used to it)
* Pixi.js
* Maybe Phaser ([http://phaser.io/](http://phaser.io/))
* Some other shit I might figure out on the way

## The Game

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00002.jpg)

The cover of the game. This one from ANIROG is quite accurate in terms of the game theme, although a 16 year old could have drawn it. But then, artistic value wasn’t what you were looking for on your game covers back then.

And there’s the German version

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00003.jpg)

The 80s were a strange decade, full of adventure. You could do all kinds of shit (see 80s fashion and music for reference) and get away with it. This game cover is another great example. We have an astronaut with a harpoon shooting a flying robot-monster-helmet and a medieval knight protecting (or stealing) a flower power princess in a yellow dress. Clearly the creator of this amazing display of imagination had no idea what the game was about. More likely, the artwork was never supposed to be made for the game, as the Ghost Town title has a hard time fitting into the picture.

## The first plan

My usual approach when recreating C64 cracktros is to make lots of screenshots from the emulator and create the different graphical elements in Photoshop. When all assets are done, the rest is typically easy: import all images into the project and animate everything from code.

You can watch my cracktro remakes here: [http://www.awsm.de](http://www.awsm.de)

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00004.png)

The fonts and the logo are created in Photoshop, the colors and the animations are done in JavaScript.

For this game, I want to try something different: reading in the actual binary of the game and extract all necessary data from it. For convenience reasons, I might split the data up into chunks of data, e.g. for the different screens.

Only the charset (a special bitmap “font” that has all the game graphics stored in it) will be converted to a spritemap. At least that’s the plan for now.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00005.png)

Nice and wonderful Plus/4 boot screen fired up in VICE for the Mac.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00006.png)

The title screen of the game. Not exactly a beauty, but you have to give Peter credit for drawing two different “o” characters – twice the work! So unappreciated.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00007.png)

Skipping the intro story screen, this is where you take off as a brave adventurer. Some rocks, some trees/bushes/plants/green-thingys and a white fruit (?) begging for attention. Judging by your face color, worse things have happened behind the door you just came out of, so you got that going for you, which is great.

## Taking a look inside the game

For now let’s leave that green fella alone and look into the code. The game was written in assembly language and compiled into machine code. This means that we’re looking at lots of numbers from now on.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00008.png)

The character ram is located at $2000 – $27ff. This is the image data all levels are made of.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00009.png)

The color ram at $0800 – $0be7. This area of the memory stores the color information of the current screen. Look at the first three numbers: 39 39 39. This is a code for some uglyish brown, exactly the color the rocks in the top left border of the screen have.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00010.png)

Finally, the screen ram from $0c00 – $0fe7, storing the characters that create the graphics like a little puzzle. Again, look at the first three numbers: 0c, 0d, 0e. These are hex codes for the different chars that, combined together, make up for this nice brown wall on the top left.

To give you an idea about that jibberish above (well, at least I have no idea what I’m talking about), here’s a screenshot with the characters set to the standard charset:

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00011.png)

So, after all the whole game is just fancy styled letters and some questionable color choices. The Commodore 264 series (that is easier to say than C16, C116 and Plus/4) has no hardware sprites, that’s why even the player is made from characters. In this screen he is in the top middle of the screen, try to find the inverted STU VWX YZ[ chars.

Thanks to Hexworx from the forum64 who gave me some valuable hints. If you’re the super smart type of person you would ask yourself now “this guy must be pretty damn good looking, but why was the last screenshot taken with the C64 emulator and not the C16 emulator?” Well, the reason is that Hexworx provided me with a nice little code snipped that displays the extracted code on the C64 (which I’m far more familiar with). I’m not going into details, but here’s the code I use for my tests:

``` asm6502
; Ghost Town C64 Test
!to “build/ghost.prg”,cbm

= $0801                               ; BASIC start address (#2049)

!byte $0d,$08,$dc,$07,$9e,$20,$31,$32   ; BASIC loader 
!byte $32,$38,$38,$00,$00,$00           ; puts BASIC line  

*=$0c00
!bin “screen-ghost.bin”,,2

*=$1800
!bin “col-ghost.bin”,,2
 
*=$2000
!bin “char-ghost.bin”,,2

*=$3000
; copy color ram to new position
    ldx #$00
–   lda $1800,x
    sta $d800,x
    lda $1900,x
    sta $d900,x
    lda $1a00,x
    sta $da00,x
    lda $1b00,x
    sta $db00,x
    dex
    bne –
 ; background color = black
    lda #$00
    sta $d021
 ; border color = red
    lda #$02
    sta $d020
 ; extra background color
    lda #$0a
    sta $d022
 ; extra background color 2
    lda #$09
    sta $d023
 ; set char memory = 2000
 ; and screen memory = 0c00
    lda #$38
    sta $d018
 ; screen = multicolor with 40 chars
    lda #$d8
    sta $d016
    jmp –
```

This might not make sense to you, but at least now you know what 6502 assembly language looks like.

## Cool story, bro, but how does that help?

It was quite cool to see the game graphics displayed on the C64, but I’ll try to stick to the C16 from now on. At least one learning is that I can now change the screen data in the monitor and take a look at the changes. So I did change the screen ram by loading a small binary with the values $00 to $ff, which should show all characters available. There might be smarter ways to extract the charset visually, but this was simple enough so let’s take a look:

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00012.png)

Tadaaaa! All characters are now displayed starting from the top left of the screen. The colors got even worse, but that’s fine, matching the color data would be way more difficult. I have to fix this up in Photoshop. Since I have screenshots of all levels, I can match the right colors.

The reason to go into this trouble instead of just building a spritemap based on the level screenshots is to have the exact same characters in the exact same position they are within the game memory. That’s my best chance to build a simple parser that reads in the binary and matches the level data to the sprites. I’m not sure how this will work but it’s a start.

## Download free Ghost Town track!!!11

You probably remember the music of Ghost Town. 

**Welcome friends of the interwebs who come looking for the BAND Ghost Town. They are not here today. This is a nerd place. Nerds and hipsters don’t mix very well. You guys are way cooler than us, and, well… we’re pretty fine with that. Please point your internet communication device to a different location now.**

Anyway, where were we. Ah, that awful music of err… Ghost Town. The game.

The 264 series hasn’t got the amazing SID chip of the big brother C64 and you can hear that in every millisecond of frequency-raping noise that comes out of your TV set. All sounds are created by the all-purpose TED chip (for “Text Editing Device” – even the creator must have been underwhelmed by that overheating piece of silicon).

There are some cool tunes though, like the title music of Mr. Puniverse:

<iframe class="video"
src="https://www.youtube.com/embed/3JxU1qmFdf4" 
allowfullscreen></iframe>

I still whistle it from time to time. Like before I hurt people.

Here’s that music of Ghost Town again:

<iframe class="video"
src="https://www.youtube.com/embed/eXM6h9Q3dDQ" 
allowfullscreen></iframe>

Some catchy badass polyphonic stuff, eh?
For the remake, I have two realistic options (and I might implement both):

## 1. Just convert the music to MP3 and play it

The easy way out. 100% original, pure Ghost Town greatness. File size shouldn’t exceed 1.5 MB and today, that is not so much anymore. The problem with that is: I hate wasting so much space and there’s no challenge NOR FAME in going into that direction. Still, it’s a viable option and may be the only way to have a truly original experience.

## 2. Convert the music to the SID format and use the SID web player

As far as I understand, frequency tables of the TED are quite different from the SID and I haven’t come across a TED2SID converter yet. Otherwise this would have been a great option as filesize of the music would be around 4kb only. Spider-J, who’s a very talented musician not only with the SID, recommended to do a TED2EARS2SID conversion, meaning to actually listen and guess the right notes. This is what I tried today and it turned out so bad that I wanted to share it with you:

[http://www.awsm.de/ghosttown/ghosttown-dubstep-remix-aoki.mp3](http://www.awsm.de/ghosttown/ghosttown-dubstep-remix-aoki.mp3)

**I will never judge other artist’s work again. Ever.**

In case you wonder how I created that sound, it’s a SID tune I created with Goattracker, a music tracker software (one of the few if not the only available for Mac) that is cryptic, buggy and unforgiving, yet it seems to be the best option nowadays to create SID music cross platform.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00013.png)

The goat in action. And we all know [goats are funny](https://www.youtube.com/watch?v=AnVv0RkiG4U).

TL;DR: I will need help to get this right.

PS: No actual frequencies have been raped nor does anybody intend to. Calm down.

## More Ghost Town

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00014.png)

**Update**: This, again, doesn’t seem like much, but this time it’s actually a big deal, at least for me. One of my main issues with Pixi, namely limiting Sprites to a fixed width and height, has been solved.

What you see are all characters of the game, read in from the main texture and turned into 8×8 Sprites displayed on the screen.

## Ghost Town progress

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00015.png)

## Milestone reached -> pants party!

Yesterday and today have been pretty productive. What you can see above are screenshots of Ghost Town running in VICE emulator (below) and Ghost Town level data displayed correctly in my JavaScript test scenario!

The initial idea of loading in the pure binary machine code from the C16 game surprisingly worked and one screen like this takes only 1 kilobyte of data! I can now display every level of the game just by switching the binary data – sweet!

There’s tons of stuff to improve to make it usable for a full game, but for now, that’s pretty satisfying.

<iframe class="video"
src="https://www.youtube.com/embed/oFSWsKiWNBc" 
allowfullscreen></iframe>


## Ghost Town: I’m walking

Today was the first day in ages when I found some time (and, to be honest, motivation – as Fallout 4 is waiting right next to me) to make some progress with the game.

I restructured the code quite a bit, introducing a room class that hosts all data and events happening on one screen of the game. I now have a basic parsing structure working:

1. load in the unrefined binary data of a screen/room
2. create a copy to work with
3. parse unneeded content out of the copy
4. parse in the starting point of the player
5. parse the current state of the inventory (room) 

The idea is to repeat these steps whenever the player enters a room. It always starts fresh and manipulates the data to reflect the latest state just before rendering on screen. No idea if that really makes sense and given the amount of beer I drank during the last hour it doesn’t even make much sense while I write this.

Anyway, this is what the game currently looks like (no surprises here)

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00016.png)

Some changes to the (temporary) UI happened on the way, too. 

So what does the “game” really do so far?

* I can select a screen by clicking on one of the numbers
* The screen with that number displays correctly
* Some info about the room is displayed in the blue box
* The player sprite starts at the correct position
* The player can be moved with the cursor keys
* The player’s movement is limited to the dark areas only

So essentially you can load in a room and walk around in it.
That’s somethin’.

The todo list is scaringly long though

* Enter and leave rooms through the doors
* Adjust the player position to the correct door
* Trigger events when touching items
* Pickup items when possible
* Use items
* Die!
* Show message screens
* Animate objects
* and so so so so soooo much more

Some stuff on the list can be beaten up with the same bat, but I wouldn’t be surprised if this requires me to rewrite 90% of what I have so far.

Anyway, progress made today, motivation in the project restored.

To be continued

## Ghost Town: It all falls into place

After making some good progress the other day with walking around and going through doors, I was a bit anxious about how to integrate object manipulation to the game. I thought about having a config file, describing each object and the consequences when trying to pick it up, like

gloves {position …, replace by …, items that need to be in inventory to pickup…, die sequence…} 

and so on. Then I thought about how to read in the configs and run them through each time an object it touched.

Today I thought “heck, why not start simple and have it all right where it is needed: in a simple script?” And due to the beauty of how the whole game is read in and displayed, the idea worked right out of the box.

**This is the (still quick and dirty, but working) example code for picking up the gloves in room one:**

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00017.png)

* Are we in Room 1?
* Is “a9″ (the hexcode for the gloves) where the player wants to go?
* take the glove
* delete the gloves from the game world

That’s it. It can even be optimized (and needs to), especially when it comes to inventory handling. But anyway, it took me 10 minutes to define the first three rooms, which is nothing short of exciting for me. 

Edit: quickly added proper inventory handling, so the glove example now comes down to this:

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00018.png)

**So much fun!**

## Ghost Town: 14/20

Two more screens are in, the one with the light bulb (easy) and the one with the nails on the ground (not so easy). I had to rethink the logic a bit to include this. All screens before had a layout where changes are permanent, but the nails keep coming back whenever the player reenters the room. The solution was easy: all rooms are stored as an additional copy that never gets changed. Whenever I need to reset a room, I just copy the original data back into the game. 

I’m hoping the changes are a solid base for the remaining screens, all of them being special:

* Room 11: Animate Boris the spider. My approach would be to set an interval when I init the room and reset the room with each visit. It could be fairly easy and be done within 30 minutes if my plan works – if not, I would be stuck looking for other ideas.
* Room 12: The laser fence. If room 11 works, this one will be a matter of 1-2 minutes to implement. In fact, I would start with this one and then do room 11.
* Room 17: The skeleton. Same as room 11 really, so again, no challenge if the original plan works.
* Room 18: The code number. No idea yet how to implement that one. I’ve changed message data before, so it might be okay.
* Room 19: Belegro. The hardest screen in the game will be the hardest screen to remake as well. Moving the boulder shouldn’t be complicated after I already completed room 11,12 and 17. I have no idea how the logic behind the movement of Belegro works though. I’m mostly concerned about the timing, which is essential here. If Belegro moves too fast, the game can not be completed. If Belegro moves too slow, it won’t be the same challenge. Most likely the last screen I will do for the game.
* Room 20: The Treasure. Easy. I probably could do this one already, but I haven’t thought about how to implement the winning screen. Now that I think about it, that one might be the next room I finish.

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00019.png)

## Ghost Town: First successful playthrough

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00020.png)

Yep. I did it. 
The last gameplay screen has been implemented and for the first time I am able to play the complete game from first to last room – everything included. I wasn’t sure I would ever reach this state, therefore the satisfaction is through the roof.

The code number room was pretty difficult for me. I didn’t want to fake the view or shortcut anything and keep using the original data, not so easy. Moreover, I was stuck for way too long with my KeyboardController. It was the only piece of code I got from somewhere and I had no idea why it kept failing. In the end I had to rewrite a good portion of it, make it a proper class and it worked. On the upside, solving this issue is beneficial for the other screens left to include, so that’s something. **On the downside, the code I wrote in the last two days is most likely the ugliest piece of shit ever written by anyone**. I’m not exaggerating.

So, the current state:

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00021.png)

It looks like I’m almost done, but there’s heaps of issues to take care of

* I still have no sound at all
* The title screen and the intro screen need to be implemented
* When the player dies, quit the game and go back to the title screen
* Test if everything falls apart when playing multiple rounds
* Include a better asset loader, mine is crap

And then there’s the additional stuff that I’d like to do

* Include all screens for the German version
* Create a proper start menu to choose between the versions
* Eventually do a “trainer” with a cracktro
* Setup a nice little page where the game can be played, including additional information, trivia and so on
* Offer additional features, like an inventory, turn scanlines on/off, music on/off
* do a proper code review to reduce the embarrassment this project will cause me
* Provide a hint system

And finally there’s the awesome stuff I’d like to do (but might never)

* Offer a color corrected version of the game
* Offer a version with different charset
* Do some nice artworks to download
* redo the music for the C64
* convert the game to the C64 (could be easier than this project)
* Change the Display class to render to Three.js (making this game 3D)

The list is almost discouragingly long.
But for today, I’ve won another battle.
**And that’s pretty damn cool.**

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00022.jpg)

## Ghost Town (finished!)

![Cover](/assets/img/blog/ghosttown-javascript/ghosttown-js-00023.png)

Visit the mysterious Ghost Town, a place full of unexpected dangers and hidden treasures!

Ghost Town JS is a JavaScript remake of the fantastic game written by Udo Gertz and released in 1985 for the Commodore C16, C116 & Plus/4. This remake is pixel perfect as it reads in the binary screen data from the original game. For more information and additional links, scroll down the page after launching the game. Have fun!

[http://www.kingsoft.de](http://www.kingsoft.de)

The source code of the game is available on Github: 

[Ghost Town JS on Github](https://github.com/Esshahn/ghosttown)