/**
 * 
 */
var canvas = document.querySelector('#tutorial');

var ctx = canvas.getContext('2d');

//canvas.width = 50 * 6;
//canvas.height = 50 * 6;

function draw(ctx) {
	ctx.fillStyle = 'rgb(200, 0, 0)';
	ctx.fillRect(10, 10, 50, 50);
}

function draw2(ctx) {
	ctx.beginPath();
	ctx.moveTo(75, 50);
	ctx.lineTo(100, 75);
	ctx.lineTo(100, 40);
	ctx.lineTo(40, 120);
	ctx.strokeStyle = '#cdcdcd';
	//ctx.closePath();
	ctx.stroke();
}

function draw3(ctx) {
	ctx.beginPath();
	//ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	ctx.lineWidth = 1;
	//ctx.moveTo(125, 125);
	ctx.arc(45, 45, 25, 0, Math.PI/4, false);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(45, 45);
	ctx.lineTo(75, 45);
	ctx.strokeStyle = 'rgb(0, 0, 0)';
	ctx.stroke();
}

function draw4(ctx) {
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(75, 125);
	ctx.lineTo(125, 125);
	ctx.lineCap = 'round';
	ctx.stroke();
}

var offset = 0;

function draw5(ctx) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.setLineDash([4, 2]);
	ctx.lineDashOffset = -offset;
	ctx.strokeRect(10, 10, 100, 100);
}

function march() {
	offset++;
	if(offset > 2) {
		offset = 0;
	}
	draw5(ctx);
	setTimeout(march, 20);
}

function draw6(ctx) {
	var grad = ctx.createLinearGradient(0, 0, 200, 0);
	grad.addColorStop(0, 'red');
	grad.addColorStop(0.5, 'green');
	grad.addColorStop(1, 'blue');
	ctx.fillStyle = grad;
	ctx.fillRect(10, 10, 120, 130);
}

function draw7(ctx) {
	var grad = ctx.createRadialGradient(45, 45, 10, 55, 55, 55);
	grad.addColorStop(0, 'green');
	grad.addColorStop(1, 'red');
	ctx.fillStyle = grad;
	ctx.arc(75, 75, 55, 0, 2*Math.PI, false);
	ctx.fill();
}

function draw8(ctx) {
	var radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
	radgrad.addColorStop(0, '#A7D30C');
	radgrad.addColorStop(0.9, '#019F62');
	radgrad.addColorStop(1, '#FFF');
	ctx.fillStyle = radgrad;
	ctx.fillRect(0, 0, 150, 150);
}

function draw9(ctx) {
	var img = new Image();
	img.src = './image/img_metlife_logo@3x.png';
	img.onload = function() {
		console.log('image on load');
		ctx.drawImage(img, 0, 0, 40, 40, 20, 20, 20, 20);
		ctx.drawImage(img, 0, 0, 20, 20, 30, 30, 20, 20);
	}
}

function draw10(ctx) {
	ctx.fillRect(0, 0, 150, 150);
	ctx.save();
	
	ctx.fillStyle = '#09F';
	ctx.fillRect(15, 15, 120, 120);
	ctx.save();
	
	ctx.fillStyle = '#FFF';
	ctx.globalAlpha = 0.5;
	ctx.fillRect(30, 30, 90, 90);
	
	ctx.restore();
	ctx.fillRect(45, 45, 60, 60);
	
	ctx.restore();
	ctx.fillRect(60, 60, 30, 30);	
}

function draw11(ctx) {
	ctx.font = '27px serif';
	ctx.fillText('MDN', 15, 80);
	ctx.save();
	ctx.font = '48px serif';
	ctx.fillText('MDN', 15, 80);
	ctx.restore();
}

function draw12(ctx) {
	ctx.save();
	ctx.scale(2, 2);
	ctx.fillStyle = '#DDD';
	ctx.fillRect(1, 1, 10, 10);
	ctx.restore();
	
}


/**
 * penceil
 * 
 */

function Pencil(x,y, ctx) {
	
	this.PgCache = ctx.getImageData(0, 0, canvas.width, canvas.height);
	
	this.X = x;
	this.Y = y;
	
	this.BgSaver = function(e, ctx) {
		this.PgCache = ctx.getImageData(0, 0, canvas.width, canvas.height);
	}
	
	this.BgLoader = function(ctx) {
		ctx.putImageData(this.PgCache, 0, 0);
	}
	
	this.drawLine = function(ax, ay, ctx) {
		ctx.beginPath();
		ctx.moveTo(this.X, this.Y);
		ctx.lineTo(ax, ay);
		ctx.stroke();
		
		this.X = ax;
		this.Y = ay;
	}
	
	this.drawRect = function(ax, ay, ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.BgLoader(ctx);
		ctx.strokeRect(this.X, this.Y, ax - this.X, ay - this.Y);
	}
	
	this.drawCircle = function(ax, ay, ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.BgLoader(ctx);
		ctx.beginPath();
		ctx.arc(this.X, this.Y, Math.pow(Math.pow(ax - this.X, 2) + Math.pow(ay - this.Y, 2), 0.5), 0, 2*Math.PI, false);
		ctx.stroke();
	}
	
		
}

Pencil.prototype.coordGetter = function(event) {
	var penPt = event.changedTouches[0];
	var canX = penPt.clientX - penPt.target.offsetLeft;
	var canY = penPt.clientY - penPt.target.offsetTop;
	return {
		canX: canX,
		canY: canY
	};
}


var pencil = null

canvas.addEventListener('touchstart', function(e) {
	var coodObj = Pencil.prototype.coordGetter(e);
	var canX = coodObj.canX;
	var canY = coodObj.canY;
	pencil = new Pencil(canX, canY, ctx);
});

canvas.addEventListener('touchmove', function(e) {
	var coodObj = Pencil.prototype.coordGetter(e);
	var canX = coodObj.canX;
	var canY = coodObj.canY;
	//ctx.strokeRect(10, 10, 50, 50);
	//pencil.drawLine(canX, canY, ctx);
	pencil.drawRect(canX, canY, ctx);
});


canvas.addEventListener('touchend', function(e) {
	var coodObj = Pencil.prototype.coordGetter(e);
	var canX = coodObj.canX;
	var canY = coodObj.canY;
	//ctx.strokeRect(10, 10, 50, 50);
	//pencil.drawLine(canX, canY, ctx);
	//pencil.drawRect(canX, canY, ctx);
	pencil.BgSaver(e, ctx);
});