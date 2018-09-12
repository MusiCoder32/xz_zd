var dataObj=function () {
    this.fruitNum=0;
    this.double=1;
    this.score=0;
    this.gameOver=false;
    this.alpha=0;

};
dataObj.prototype.reset=function(){
    this.fruitNum=0;
    this.double=1;
};
dataObj.prototype.draw=function () {
    var w=can1.width;
    var h=can1.height;

    ctx1.save();
    ctx1.fillStyle="white";
    ctx1.font="35px Verdana";
    ctx1.textAlign="center";

    ctx1.fillText("SCORE:"+this.score,w*0.5,h-80);

    if(this.gameOver){
        this.alpha+=deltaTime*0.0003;
        this.alpha=this.alpha>1?1:this.alpha;
        ctx1.fillStyle=`rgba(255,255,255,${this.alpha})`;
        ctx1.font="55px Verdana";
        ctx1.fillText("GAMEOVER",w*0.5,h*0.5);
    }

    ctx1.restore();
}
dataObj.prototype.addScore=function(){
    this.score+=this.fruitNum*100*this.double;
    this.fruitNum=0;
    this.double=1;
    for(var i=0;i<parseInt(this.score/500);i++){
        baby.alive[i]=true;
    }
}