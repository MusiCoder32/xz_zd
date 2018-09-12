var fruitObj=function () {
    this.alive=[];
    this.orange=new Image();
    this.blue=new Image();
    this.x=[];
    this.y=[];
    this.l=[];
    this.spd=[];
    this.fruitType=[];
    this.aneNO=[];
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]=0;
        this.y[i]=0;
        //变大的速度，向上的速度
        this.spd[i]=Math.random()*0.017+0.003;
        this.fruitType[i]="";
    }
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
};

//保持屏幕上的果实数量，至少15个;
fruitObj.prototype.draw=function () {
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            //设置果实类型
            if(this.fruitType[i]!=="blue"){
                var pic=this.orange;
            }
            else{
                var pic=this.blue;
            }

            if(this.l[i]<=14){
                var NO=this.aneNO[i];
                this.x[i]=ane.headx[NO];
                this.y[i]=ane.heady[NO];
                this.l[i]+=this.spd[i]*deltaTime;

                ctx2.drawImage(pic,
                    this.x[i]-this.l[i]*0.5,
                    this.y[i]-this.l[i]*0.5,
                    this.l[i], this.l[i]
                );
            }
            else{
                this.y[i]-=this.spd[i]*3*deltaTime;
                ctx2.drawImage(pic,
                    this.x[i]-this.l[i]*0.5,
                    this.y[i]-this.l[i]*0.5,
                    this.l[i],
                    this.l[i]
                );
            }
            if(this.y[i]<10){
                this.alive[i]=false;
            }
        }
    }
};
//果实出生的方法
fruitObj.prototype.born = function (i) {
    this.aneNO[i] = Math.floor(Math.random() * ane.num);
    this.l[i] = 0;//初始化时大小均为0
    this.alive[i] = true;
    this.fruitType[i] = Math.random() > 0.8 ? "orange" : "blue";
};
//监听如果活的果实不足15个就创建一个活的食物
function fruitMonitor() {
    var num = 0;
    for (var i = 0; i < fruit.num; i++) {
        if (fruit.alive[i]) num++;
    }
    if (num < 15) {//如果食物小于15个就
        //send fruit
        sendFruit();
        return;
    }
}
//果实的生长与死亡
function sendFruit() {
    for (var i = 0; i < fruit.num; i++) {
        if (!fruit.alive[i]) {
            fruit.born(i);//!!!!!!!在这里出生一个食物
            return;
        }
    }
}

fruitObj.prototype.dead = function (i) {
    this.alive[i] = false;
}