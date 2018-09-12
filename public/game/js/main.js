function game() {
    init();
    gameloop();
}

// 1:创建游戏变量
var DEBUG=true;

var can1 = null;
var can2 = null;
var ctx1 = null;
var ctx2 = null;
var picBg = null;
var canWidth = 0;
var canHeight = 0;

var ane = null;//海葵对象

var fruit = null;//果实对象

var mom = null;//大鱼对象

var baby=null;
//为了大鱼移动定义鼠标位置
var mx = 0;
var my = 0;

var data=null;
//大鱼吃食物特效
var wave=null;

//大鱼喂小鱼食物
var halo=null;

//漂浮物
var dust=null;
//var dustPic = [];


//创建对象并初始化
function init() {
    can1 = document.getElementById("ca1");//鱼，果实
    can2 = document.getElementById("ca2");//背景，海葵
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    picBg = new Image();
    picBg.src = "src/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;

    lastTime = Date.now();
    deltaTime = 0;

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom=new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    mx = canWidth * 0.5;
    my = canHeight * 0.5;


    can1.addEventListener("mousemove",onMouseMove,false);
    data=new dataObj();

    wave = new waveObj();
    wave.init();

    halo=new haloObj();
    halo.init();

    dust=new dustObj();
    dust.init();
}

//创建定器绘制所胡角色
function gameloop() {
    //当body加载成功后，调用game
    requestAnimFrame(gameloop)
    var now = Date.now();         //我们要计算二帧之间一共执行了多长时间
    deltaTime = now - lastTime;   //
    lastTime = now;               //
    if (deltaTime > 40) deltaTime = 40;//

    drowBackground();
    ctx1.clearRect(0,0,canWidth,canHeight);
    ane.draw();

    fruitMonitor();
    fruit.draw();

    momFruitsCollision();
    momBabyCollision();
    mom.draw();
    baby.draw();

    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();

}
function onMouseMove(e){
    //游戏结束，鼠标不能控制大鱼
    // if(data.gameOver){return;}

    if(e.offsetX || e.layerX){
        mx = e.offsetX == undefined ? e.layerX : e.offsetX;
    }
    if(e.offsetY || e.layerY){
        my = e.offsetY == undefined ? e.layerY : e.offsetY;
    }
    //console.log(mx+"|"+my);
}

document.body.onload = game;