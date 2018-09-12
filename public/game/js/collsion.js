function momFruitsCollision() {
    if(data.gameOver){return;}

    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
            if(l<900){
                fruit.dead(i);
                data.fruitNum++;
                if(fruit.fruitType[i]==="orange"){
                    data.double=2;
                }
                wave.born(fruit.x[i],fruit.y[i]);
                data.addScore();
            }
        }
    }

}
function momBabyCollision(){
    if(data.gameOver){return;}
    if(DEBUG){};
    for(var i=0;i<baby.num;i++){
        var l=calLength2(mom.x,mom.y,baby.x[i],baby.y[i]);
        if(l<2500){
            data.gameOver=true;
            halo.born(baby.x[i],baby.y[i]);
        }
    }
}