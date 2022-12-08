window.onload = function () {
    var c = document.getElementById('canvas');
    var context = c.getContext('2d');
    let hard = document.getElementById('hard');
    let hardLabel = document.getElementById('hardLabel');
    hardLabel.style.display = "inline";

    //////////   GIOCO   //////////
    document.onkeydown= function (key) {
        if (key.keyCode===32||key.keyCode===13) {
            start.onclick();
        }
    }
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
    let i;
    up.style.display = "none";
    left.style.display = "none";
    down.style.display = "none";
    right.style.display = "none";

    let x = 100;
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
        for (let i = 0; i < registro_reale.length; i++) {
            if (registro_reale[i][0]==x && registro_reale[i][1]==y && i != registro_reale.length-1) {
                death();
            }
        }
        registro_reale.forEach((r)=>{
        });
        registro.push([x, y])
        i=false;

        // collisioni
        if (coinx - 20 <= x + w && x <= coinx + 20 && coiny - 20 <= y + h && y <= coiny + 20) {
            score += 1;
            coinRespawn();
        }
        registro_reale=[];
        //COIN  
        context.beginPath();
        context.arc(coinx, coiny, 20, 0, 2 * Math.PI);
        context.fillStyle = "gold";
        context.fill();
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.stroke();
        //Ridisegna forma   
        for (let i = 1; i <= score+1; i++) {
            context.beginPath();
            context.rect(
                registro[registro.length-i][0], //x
                registro[registro.length-i][1], //y
                w, 
                h
            );
            context.fillStyle = "red";
            context.fill();
            registro_reale.push([
                registro[registro.length-i][0], //x
                registro[registro.length-i][1]  //y
            ]);
            
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
            i=false;
            coinx = 25+Math.floor(Math.random()*30)*50;
            coiny = 25+Math.floor(Math.random()*12)*50;
            registro_reale.forEach((r)=>{
                if (r[0]==coinx-25&& r[1]==coiny-25) {
                    i=true;
                }
            });
         
        } while (i==true);
        
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
        context.fillText("Press spacebar or enter to restart", 420, 300);
        context.font = 'bold 40px Arial';
        context.fillText("Score: "+score, 670, 360);
        
    }
    function frames() {
        fpsSpan = fps;
    }
    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     // Codice da eseguire nel caso di un dispositivo mobile
    //     start.style.display = "inline";
    // }
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
        up.style.display = "inline";
        left.style.display = "inline";
        down.style.display = "inline";
        right.style.display = "inline";
        draw();
        interval= setInterval(draw, speed);
        setInterval(frames, 100);
        context.clearRect(0, 0, 1500, 600);
    }

    // RIGHT
    right.onmousedown = function () { dir!=1 ? dir=0 : dir=1 };
    right.ontouchend = function () { dir!=1 ? dir=0 : dir=1 };

    // LEFT
    left.onmousedown = function () { dir!=0 ? dir=1 : dir=0 };
    left.ontouchend = function () { dir!=0 ? dir=1 : dir=0 };

    // UP
    up.onmousedown = function () { dir!=2 ? dir=3 : dir=2 };
    up.ontouchend = function () { dir!=2 ? dir=3 : dir=2 };

    // DOWN
    down.onmousedown = function () { dir!=3 ? dir=2 : dir=3 };
    down.ontouchend = function () { dir!=3 ? dir=2 : dir=3 };
}