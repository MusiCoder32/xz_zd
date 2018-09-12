var momObj = function () {
    this.x = 0;
    this.y = 0;
    //大鱼角度
    this.angle = 0;
    this.bigEye = [];
    this.bigBody = [];
    this.bigTail = [];

    this.bigTailIndex = 0;
    ;
    this.bigTailEndtime = 1000;
    this.bigTailStart = 1;

    this.bigBodyIndex = 0;
    this.bigBodyEndtime = 3000;
    this.bigBodyStart = 1;

    this.bigEyeIndex = 0;
    this.bigEyeEndtime = 2000;
    this.bigEyeStart = 1;
}
momObj.prototype.init = function () {
    this.x = canWidth * 0.5;
    this.y = canHeight * 0.5;
    this.angle = 0;
    for (var i = 0; i < 2; i++) {
        this.bigEye[i] = new Image();
        this.bigEye[i].src = "./src/bigEye" + i + ".png"
    }
    for (var i = 0; i < 8; i++) {
        this.bigBody[i] = new Image();
        this.bigBody[i].src = "./src/bigSwim" + i + ".png";
    }
    for (var i = 0; i < 8; i++) {
        this.bigTail[i] = new Image();
        this.bigTail[i].src = "./src/bigTail" + i + ".png";
    }
};

momObj.prototype.draw = function () {
    this.x = lerpDistance(mx, this.x, 0.98);
    this.y = lerpDistance(my, this.y, 0.99);

    var deltaY = my - this.y;
    var deltaX = mx - this.x;
    //大鱼与鼠标角度差
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    //让大鱼与鼠标的角度趋同
    this.angle = lerpAngle(beta, this.angle, 0.9)

    //下标切换的太快添加一个时间改变
    this.bigTailStart=this.bitTailStart+deltaTime;
    if(this.bigTailStart>this.bigTailEndtime) {
        this.bigTailStart = 1;
        this.bigTailIndex = (this.bigTailIndex + 1) % 8;
    }

    this.bigBodyStart=this.bigBodyStart+deltaTime;
    if(this.bigBodyStart>this.bigBodyEndtime){
        this.bigBodyStart = 1;
        this.bigBodyIndex = (this.bigBodyIndex+1);
        if(this.bigBodyIndex>7){
            this.bigBodyIndex = 7;
        }
    }

    this.bigEyeStart = this.bigEyeStart+deltaTime;
    if(this.bigEyeStart>this.bigEyeEndtime){
        this.bigEyeStart = 1;
        this.bigEyeIndex = (this.bigEyeIndex+1)%2;
        if(this.bigEyeIndex===1){
            this.bigEyeEndtime = 300;
        }
        if(this.bigEyeIndex===0){
            this.bigEyeEndtime = 3000;
        }
    }

    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
ctx1.drawImage(this.bigBody[this.bigBodyIndex],
    -this.bigBody[this.bigBodyIndex].width*0.5,
    -this.bigBody[this.bigBodyIndex].height*0.5);
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
        -this.bigTail[this.bigTailIndex].width*0.5+30,
        -this.bigTail[this.bigTailIndex].height*0.5);
    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
        -this.bigEye[this.bigEyeIndex].width*0.5,
        -this.bigEye[this.bigEyeIndex].height*0.5);

    ctx1.restore();

}