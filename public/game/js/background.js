function drowBackground() {
    ctx2.drawImage(picBg,0,0,canWidth,canHeight)
    var str="小心，不要靠近小鱼与水底的海草哦"
    ctx2.font="24px Verdana";
    ctx2.textAlign="center";
    ctx2.fillStyle="rgb(240,240,240)";
    ctx2.fillText(str,canWidth*0.5,canHeight*0.1)
}