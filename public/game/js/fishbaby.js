var babyObj = function () {
    this.x = [];
    this.y = [];
    //鱼宝宝角度
    this.angle = [];
    this.NO = [];

    this.babyEye = []; //鱼宝宝眼睛身体尾巴数组
    this.babyBody = [];
    this.babyTail = [];

    this.babyEyeIdx = 0;            //显示图片下标
    this.babyEyeEndtime = 2000;     //显示睁眼时间长度
    this.babyEyeStart = 1;          //计时开始

    this.babyBodyIdx = 0;
    this.babyBodyEndtime = 3000;
    this.badyBodyStart = 1;

    this.babyTailIdx = 0;
    this.babyTailEndTime = 1000;
    this.babyTailStart = 1;
    //小鱼条数
    this.alive = [];
    //小鱼跟随点坐标
    this.dotted = [];
    //小鱼跟随点坐标切换时间
    this.moveTime=[];
}
babyObj.prototype.num = 10;
babyObj.prototype.init = function () {
    //初始鱼宝宝在屏幕中间
    for (var i = 0; i < this.num; i++) {
        this.NO[i] = (ane.num * Math.random()).toFixed();
        this.x[i] = ane.rootx[this.NO[i]];
        this.y[i] = canHeight - 250 * Math.random();
        this.angle[i] = 0;
        this.alive[i] = false;
        this.angle[i] = (Math.random().toFixed() > 0 ? Math.PI : 0);
        this.dotted[i] = [Math.random() * canWidth, Math.random() * canHeight];
        this.moveTime[i]=1;


        //初始化图片组
    }
    for (var j = 0; j < 2; j++) {
        this.babyEye[j] = new Image();
        this.babyEye[j].src = "./src/babyEye" + j + ".png";
    }
    for (var j = 0; j < 20; j++) {
        this.babyBody[j] = new Image();
        this.babyBody[j].src = "./src/babyFade" + j + ".png";
    }
    for (var j = 0; j < 8; j++) {
        this.babyTail[j] = new Image();
        this.babyTail[j].src = "./src/babyTail" + j + ".png";
    }
};

babyObj.prototype.draw = function () {

    for (var i = 0; i < this.num; i++) {
        if (this.alive[i]) {
            this.badyBodyStart += deltaTime;
            if (this.badyBodyStart > this.babyBodyEndtime) {
                this.babyBodyIdx = (this.babyBodyIdx + 1) % 18;
                this.badyBodyStart = 1;
                // if (this.babyBodyIdx > 18) {
                //     this.babyBodyIdx = 18;
                //     data.gameOver = true;
                // }
            }
            this.babyTailStart += deltaTime;
            if (this.babyTailStart > this.babyTailEndTime) {
                this.babyTailIdx = (this.babyTailIdx + 1) % 8;
                this.babyTailStart = 1;
            }

            this.babyEyeStart += deltaTime;
            if (this.babyEyeStart > this.babyEyeEndtime) {
                this.babyEyeIdx = (this.babyEyeIdx + 1) % 2;
                this.babyEyeStart = 1;          //计时开始
            }            //显示图片下标
            if (this.babyEyeIdx === 0) {
                this.babyEyeEndtime = 3000;
            }
            if (this.babyEyeIdx === 1) {
                this.babyEyeEndtime = 300;
            }
            var eye = this.babyEye[this.babyEyeIdx];
            var body = this.babyBody[this.babyBodyIdx];
            var tail = this.babyTail[this.babyTailIdx];

            //让目标点随机移动
            this.moveTime[i]+=deltaTime;
            if(this.moveTime[i]>1000){
                this.dotted[i][0] += (Math.random()*2-1) * canWidth;
                this.dotted[i][1] += (Math.random()*2-1) * canHeight;

                this.dotted[i][0] = (this.dotted[i][0] < 0 ? 0
                    : this.dotted[i][0] );
                this.dotted[i][1] = (this.dotted[i][1] < 0 ? 0
                    : this.dotted[i][1] );
                this.dotted[i][0] = (this.dotted[i][0] >canWidth ? canWidth
                    : this.dotted[i][0] );
                this.dotted[i][1] = (this.dotted[i][1] > canHeight ? canHeight
                    : this.dotted[i][1] );
                this.moveTime[i]=1;
            }
            this.x[i] = lerpDistance(this.dotted[i][0], this.x[i], 0.99);
            this.y[i] = lerpDistance(this.dotted[i][1], this.y[i], 0.99);



// 	//lerp angle
            var deltaY = this.dotted[i][1] - this.y[i];
            var deltaX = this.dotted[i][0] - this.x[i];
            var beta = Math.atan2(deltaY, deltaX) + Math.PI;//-PI,PI
// 	//lerp angle
            this.angle[i] = lerpAngle(beta, this.angle[i], 0.6);

            ctx1.save();
            ctx1.translate(this.x[i], this.y[i]);
            ctx1.rotate(this.angle[i]);
            ctx1.drawImage(body, -body.width * 0.5, -body.height * 0.5);
            ctx1.drawImage(tail, -tail.width * 0.5 + 23, -tail.height * 0.5);
            ctx1.drawImage(eye, -eye.width * 0.5, -eye.height * 0.5);
            ctx1.restore();
        }
    }
};
