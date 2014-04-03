/* from /vendor/javascripts dir */

//= require modernizr/modernizr
//= require jquery/jquery
//= require jquery.nicescroll.min

/* from  bootstrap-sass gem */

//= require bootstrap

var Robot = function(e) {
    this.element = e;
    var t = this.element.getElementsByTagName("span");
    this.leftEye = t[0];
    this.rightEye = t[1];
    this.siren = t[2];
    this.leftTimeout = null;
    this.rightTimeout = null;
    this.randomTimeout = null;
    this.prepareEventListeners()
};
Robot.prototype.prepareEventListeners = function() {
    var e = this;
    e.leftEye.addEventListener("mousedown", function() {
        e.blinkLeft()
    });
    e.leftEye.addEventListener("mouseover", function() {
        e.blinkLeft()
    });
    e.rightEye.addEventListener("mousedown", function() {
        e.blinkRight()
    });
    e.rightEye.addEventListener("mouseover", function() {
        e.blinkRight()
    })
};
Robot.prototype.blinkLeft = function(e) {
    var t = this;
    e = e || 1;
    while (e > 0) {
        setTimeout(function() {
            t.leftTimeout && clearTimeout(t.leftTimeout);
            t.leftEye.className = "left eye";
            setTimeout(function() {
                t.leftEye.className = "left eye blink"
            }, 0);
            t.leftTimeout = setTimeout(function() {
                t.leftTimeout = null;
                t.leftEye.className = "left eye"
            }, 200)
        }, (e - 1) * 250);
        e--
    }
};
Robot.prototype.blinkRight = function(e) {
    var t = this;
    e = e || 1;
    while (e > 0) {
        setTimeout(function() {
            t.rightTimeout && clearTimeout(t.rightTimeout);
            t.rightEye.className = "right eye";
            setTimeout(function() {
                t.rightEye.className = "right eye blink"
            }, 0);
            t.rightTimeout = setTimeout(function() {
                t.rightTimeout = null;
                t.rightEye.className = "right eye"
            }, 200)
        }, (e - 1) * 250);
        e--
    }
};
Robot.prototype.blinkBoth = function(e) {
    this.blinkLeft(e);
    this.blinkRight(e)
};
Robot.prototype.blinkRandom = function() {
    var e = Math.random(), t = Math.ceil(Math.random() * 2);
    e < .4 ? this.blinkLeft(t) : e < .8 ? this.blinkRight(t) : this.blinkBoth(t)
};
Robot.prototype.start = function() {
    var e = this, t = function() {
        if (e.playing === !0) {
            e.blinkRandom();
            e.randomTimeout = setTimeout(t, 2500 + Math.random() * 2e3)
        }
    };
    this.playing = !0;
    t()
};
Robot.prototype.stop = function() {
    if (this.randomTimeout) {
        this.clearTimeout(this.randomTimeout);
        this.randomTimeout = null
    }
    this.playing = !1
};
