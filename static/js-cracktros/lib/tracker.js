/*------------------------------------------------------------------------------
Written 2012 by Ingo Hinterding
Feel free to do whatever you want with this.
I'm a JS noob, so I guess there's plenty of room to optimize this.

TRACKER
A basic time based script execution arranger.
It works similar to a music tracker, adding functions to an array 
which executes the code based on the elapsed time.
This makes it easy to arrange different effects to build a demo.

USAGE
Add the code below to your init and go functions

function init(){
	tracker = new tracker();
	tracker.init();		
	tracker.add("initScrollerGold()",0,-1);
	tracker.add("scrolltextGold.draw(240-16)",0,99999999);
	tracker.add("initScrollerSilver()",25000,-1);
	tracker.add("scrolltextSilver.draw(240-16)",25000,99999999);
	tracker.add("initStarfield()",45000,-1);
	tracker.add("starfield.draw()",45000,99999999);	
	go();
}
 
function go(){
	// main program loop
	tracker.play();
	requestAnimFrame(go);
}

------------------------------------------------------------------------------*/

function tracker(){
	this.init = function(){
		// init

		this.timer = new Date();
		this.startTime = this.timer.getTime();
		this.score = new Array();
	}

	this.elapsedTime = function(){
		// gets the elapsed time since the script started in milliseconds

		this.timer = new Date();
		return this.timer.getTime()-this.startTime;
	}

	this.add = function(func,start,duration){
		// func = the name of the function to call
		// start = the start time in milliseconds from script execution
		// duration = the duration time in milliseconds. Set it to -1 if it should only execute once
		
		this.func = func;
		this.start = start;
		this.duration = duration;

		this.scoreItem = {};
		this.scoreItem[0] = this.func;
		this.scoreItem[1] = this.start;
		this.scoreItem[2] = this.duration;
		this.score.push(this.scoreItem);
	}

	this.play = function(){
		// plays the current score

		this.currentTime = this.elapsedTime();
		
		for (var i = 0; i < this.score.length; i++) {
			// check if the actor should be executed only once (-1)
			// and remove it from the array after execution
			if(this.score[i][1] < this.currentTime && this.score[i][2] == -1){
				eval(this.score[i][0]);
				this.score.splice(i,1);
			}else{
	    		if(this.score[i][1] < this.currentTime && this.score[i][1]+this.score[i][2] > this.currentTime){
	    			eval(this.score[i][0]);
	    		}
	    	}
    		
		}
	}
	

}