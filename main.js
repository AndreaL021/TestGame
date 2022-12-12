window.onload = function () {
    var c = document.getElementById('canvas');
    var context = c.getContext('2d');
    let hard = document.getElementById('hard');
    let hardLabel = document.getElementById('hardLabel');
    hardLabel.style.display = "inline";

    //////////   GIOCO   //////////
    let start = document.getElementById('start');
    let up = document.getElementById('up');
    let left = document.getElementById('left');
    let down = document.getElementById('down');
    let right = document.getElementById('right');
    let blockup=false;
    let blockleft=false;
    let blockdown=false;
    let blockright=false;
    let score = 0;
    let interval;
    let b;
    up.style.display = "none";
    left.style.display = "none";
    down.style.display = "none";
    right.style.display = "none";
    start.style.display = "none";
    // head right
    let head= new Image();
    head.src="./snakepng/Head.png";
    // head left
    let head1= new Image();
    head1.src="./snakepng/Head1.png";
    // head down
    let head2= new Image();
    head2.src="./snakepng/Head2.png";
    // head up
    let head3= new Image();
    head3.src="./snakepng/Head3.png";
    // body right/left
    let body= new Image();
    body.src="./snakepng/Body.png";
    // body up/down
    let body23= new Image();
    body23.src="./snakepng/Body23.png";
    // tail right
    let tail= new Image();
    tail.src="./snakepng/Tail.png";
    // tail left
    let tail1= new Image();
    tail1.src="./snakepng/Tail1.png";
    // tail down
    let tail2= new Image();
    tail2.src="./snakepng/Tail2.png";
    // tail up
    let tail3= new Image();
    tail3.src="./snakepng/Tail3.png";
    let curva02_31= new Image();
    curva02_31.src="./snakepng/curva02_31.png";
    let curva03_21= new Image();
    curva03_21.src="./snakepng/curva03_21.png";
    let curva12_30= new Image();
    curva12_30.src="./snakepng/curva12_30.png";
    let curva13_20= new Image();
    curva13_20.src="./snakepng/curva13_20.png";
    
    let y = 200;
    let h=50;
    let w=50;
    let registro=[[0,0]];
    let registro_reale=[];

    let t = Date.now();
    let fps = 0;
    let fpsSpan;
    let speed = 250;
    let dir = -1;
    var coinx = 25+Math.floor(Math.random()*30)*50;
    var coiny = 25+Math.floor(Math.random()*12)*50;

    function draw() {
        //Gestione animazione in base al frame rate
        let timePassed = (Date.now() - t) / 1000;
        t = Date.now();
        fps = Math.round(1 / timePassed);
        //Pulisci campo di gioco
        context.clearRect(0, 0, 1500, 600);
        //Ridisegna campo di gioco
        for (let y = 0; y < 600; y += 50) {
            for (let x = 0; x < 1500; x += 50) {
                context.beginPath();
                context.rect(x, y, w, h);
                context.lineWidth = 1;
                context.stroke();
            }
        }
        // SPOSTAMENTO/MORTE
        switch (dir) {
            case 0:
                x < 1450 ? x += 50 : death();
                break;
            case 1:
                x > 0 ? x -= 50 : death();
                break;
            case 2:
                y < 550 ? y += 50 : death();
                break;
            case 3:
                y > 0 ? y -= 50 : death();
                break;
        }
        registro.push([x, y, dir])
        registro_reale=[];
        //Ridisegna forma   
        for (let i = 1; i <= score+1; i++) {
            context.beginPath();
            //SNAKE
            if (i===1) {
                //HEAD
                switch (registro[registro.length-i][2]) {
                    case 0:
                        context.drawImage(head, x, y, w, h);
                        break;
                    case 1:
                        context.drawImage(head1, x, y, w, h);
                        break;
                    case 2:
                        context.drawImage(head2, x, y, w, h);
                        break;
                    case 3:
                        context.drawImage(head3, x, y, w, h);
                        break;
                    default:
                        context.drawImage(head, x, y, w, h);
                        break;
                }
            } else if(i===score+1){
                //TAIL
                switch (registro[registro.length-i+1][2]) {
                    case 0:
                        context.drawImage(tail, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                        break;
                    case 1:
                        context.drawImage(tail1, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                        break;
                    case 2:
                        context.drawImage(tail2, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                        break;
                    case 3:
                        context.drawImage(tail3, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                        break;
                    default:
                        context.drawImage(tail, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                        break;
                }
            } else {
                //BODY
                if (registro[registro.length-i+1][2]==0||registro[registro.length-i+1][2]==1) {
                    if(registro[registro.length-i+1][2]==1 && registro[registro.length-i][2]==3){
                        context.drawImage(curva02_31, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==1 && registro[registro.length-i][2]==2){
                        context.drawImage(curva03_21, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==0 && registro[registro.length-i][2]==3){
                        context.drawImage(curva12_30, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==0 && registro[registro.length-i][2]==2){
                        context.drawImage(curva13_20, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else{
                        context.drawImage(body, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }
                } else {
                    if (registro[registro.length-i+1][2]==2 && registro[registro.length-i][2]==0) {
                        context.drawImage(curva02_31, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==3 && registro[registro.length-i][2]==0){
                        context.drawImage(curva03_21, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==2 && registro[registro.length-i][2]==1){
                        context.drawImage(curva12_30, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else if(registro[registro.length-i+1][2]==3 && registro[registro.length-i][2]==1){
                        context.drawImage(curva13_20, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }else{
                        context.drawImage(body23, registro[registro.length-i][0], registro[registro.length-i][1], w, h);
                    }
                }
            }
            context.fill();
            registro_reale.push([
                registro[registro.length-i][0], //x
                registro[registro.length-i][1]  //y
            ]);
            
        }
        // collisioni moneta
        if (coinx - 20 <= x + w && x <= coinx + 20 && coiny - 20 <= y + h && y <= coiny + 20) {
            score += 1;
            coinRespawn();
        }
        //COIN  
        context.beginPath();
        context.arc(coinx, coiny, 20, 0, 2 * Math.PI);
        context.fillStyle = "gold";
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.stroke();
        // auto collisioni
        for (let i = 1; i < registro_reale.length; i++) {
            if (registro_reale[i][0]==x && registro_reale[i][1]==y) {
                death();
            }
        }
        blockdown=false;
        blockleft=false;
        blockright=false;
        blockup=false;


        //Disegna punteggio
        context.beginPath();
        context.font = 'bold 25px Arial';
        context.fillStyle = 'black';
        context.fillText("Score: " + score, 20, 30);
        context.fillText("FPS: " + fpsSpan, 1400, 30);
    }
    function coinRespawn() {
        do {
            b=false;
            coinx = 25+Math.floor(Math.random()*30)*50;
            coiny = 25+Math.floor(Math.random()*12)*50;
            registro_reale.forEach((r)=>{
                if (r[0]==coinx-25 && r[1]==coiny-25) {
                    b=true;
                }
            });
         
        } while (b==true);
        
    }
    function death() {
        document.onkeydown= function (key) {
            if (key.keyCode===32||key.keyCode===13) {
                start.onclick();
            }
        };
        hardLabel.style.display = "inline";
        clearInterval(interval);
        context.beginPath();
        context.fillStyle = "red";
        context.font = 'bold 50px Arial';
        context.fillText("Game Over", 600, 230);
        context.beginPath();
        context.fillStyle = "red";
        context.font = 'bold 40px Arial';
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            up.style.display = "none";
            left.style.display = "none";
            down.style.display = "none";
            right.style.display = "none";
            start.style.display = "inline";
            context.fillText("Press start to restart", 550, 300);
        }else{
            context.fillText("Press spacebar or enter to restart", 420, 300);
        }
        context.fillText("Score: "+score, 670, 360);
        
    }
    function frames() {
        fpsSpan = fps;
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // Codice da eseguire nel caso di un dispositivo mobile
        start.style.display = "inline";
        context.beginPath();
        context.fillStyle = "red";
        context.font = 'bold 50px Arial';
        context.fillText("Press start", 600, 300);
    }else{
        context.beginPath();
        context.fillStyle = "red";
        context.font = 'bold 50px Arial';
        context.fillText("Press spacebar or enter", 500, 300);
    }
    document.onkeydown= function (key) {
        if (key.keyCode===32||key.keyCode===13) {
            start.onclick();
        }
    }
    start.onclick = function () {
        hardLabel.style.display = "none";
        speed =  hard.checked===false ? 250 : 150;
        registro=[[0,0]];
        dir=-1;
        x=100;
        y=200;
        dir=0;
        score=0;
        document.onkeydown= function (key) {
            if (
                    key.keyCode==87 && blockup==false
                    ||key.keyCode===38 && blockup==false
                ) {
                dir!=2 ? dir=3 : dir=2;
                blockleft=true;
                blockright=true;
            }else if (
                    key.keyCode==65 && blockleft==false
                    ||key.keyCode===37 && blockleft==false
                ) {
                dir!=0 ? dir=1 : dir=0;
                blockdown=true;
                blockup=true;
            } else if(
                    key.keyCode==83 && blockdown==false
                    ||key.keyCode===40 && blockdown==false
                ){
                dir!=3 ? dir=2 : dir=3;
                blockleft=true;
                blockright=true;
            }else if(
                    key.keyCode==68 && blockright==false
                    ||key.keyCode===39 && blockright==false
                ){
                dir!=1 ? dir=0 : dir=1;
                blockdown=true;
                blockup=true;
            }
            // w-a-s-d
            // 87-65-83-68
            // ↑|←|↓|→
            // 38-37-40-39
        }
        start.style.display = "none";

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            up.style.display = "inline";
            left.style.display = "inline";
            down.style.display = "inline";
            right.style.display = "inline";
        }
        draw();
        interval= setInterval(draw, speed);
        setInterval(frames, 100);
        context.clearRect(0, 0, 1500, 600);
    }

    // RIGHT
    right.onmousedown = function () {if(blockright==false){dir!=1 ? dir=0 : dir=1; blockdown=true; blockup=true;}};
    right.ontouchend = function () {if(blockright==false){dir!=1 ? dir=0 : dir=1; blockdown=true; blockup=true;}};
    // LEFT
    left.onmousedown = function () {if(blockleft==false){dir!=0 ? dir=1 : dir=0; blockdown=true; blockup=true;}};
    left.ontouchend = function () {if(blockleft==false){dir!=0 ? dir=1 : dir=0; blockdown=true; blockup=true;}};

    // UP
    up.onmousedown = function () {if(blockup==false){dir!=2 ? dir=3 : dir=2; blockleft=true;blockright=true;}};
    up.ontouchend = function () {if(blockup==false){dir!=2 ? dir=3 : dir=2; blockleft=true;blockright=true;}};

    // DOWN
    down.onmousedown = function () {if(blockdown==false){dir!=3 ? dir=2 : dir=3; blockleft=true; blockright=true;}};
    down.ontouchend = function () {if(blockdown==false){dir!=3 ? dir=2 : dir=3; blockleft=true; blockright=true;}};
}