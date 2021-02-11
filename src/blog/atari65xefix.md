---
layout: article
date: 2017-02-21
tags: blog
title: 'Fixing an Atari 65 XE'
teaser: atari65xe-1.jpg
excerpt: "I'm fixing a problem with the video signal on this beautiful Atari 65 XE."
---

My newly cleaned Atari 65 XE had one issue: while the antenna signal was good and showed the blue startup screen, no signal at all came out of the monitor port. Since the XE/XL use the same 5 pin cable as the most Commodore 8bit machines, I knew my cable was working ok.

After opening the machine a tiny broken contact was found. 
Can you spot it?

![{{title}}](/assets/img/blog/atari65xe-1.jpg)

Hard so see. Did you know that some social gaming companies charge you money to play games where you have to find little details… well, I’m making this completely FREE for you!
Have you found it?

![{{title}}](/assets/img/blog/atari65xe-2.jpg)

There it is. The closeup of the modulator shows a pin standing out for some reason, breaking the connection. 
Here’s an image from another angle:

![{{title}}](/assets/img/blog/atari65xe-3.jpg)

Ok, not good. But, this is a broken connection on the modulator, which displays the image on the TV just fine. How could this be related to the nonworking monitor output? A look into the circuit plan reveals the mystery:

![{{title}}](/assets/img/blog/atari65xe-4.gif)

This pin actually transfers the composite signal and forwards it to the monitor output! From here, it was just a matter of heating the soldering iron and putting some solder on the broken connection. Five minutes later I enjoyed the result of this little puzzle, a perfectly fine signal on the monitor port:

![{{title}}](/assets/img/blog/atari65xe-5.jpg)

The names listed on the screenshot are those who helped me on the Forum64 website finding the problem. Thanks again guys!

