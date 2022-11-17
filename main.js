window.onload= function() {
    var c= document.getElementById('canvas');
    var context= c.getContext('2d');


    context.strokeStyle = "red";
    context.lineWidth = 3;

    context.beginPath();
    context.rect(0, 0, 1500, 600);
    context.fillStyle = "#1775b7";
    context.fill();
    // context.stroke(); 


    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(50, 200);
    context.lineTo(150, 200);
    context.lineTo(100, 100);
    context.stroke();

    context.beginPath();
    context.moveTo(550,200)
    context.arc(400, 200, 150, 0, 2 * Math.PI);
    context.fillStyle = "green";
    context.fill();
    context.stroke(); 

    context.beginPath();
    context.fillStyle = "red";
    context.font = '50px Arial';
    context.fillText("Hello World", 270, 200); 
    context.lineWidth = 2;
    context.strokeStyle = "blue";
    context.strokeText("Hello World", 270, 200);

    context.beginPath();
    var img = new Image();
    img.src = 'https://blob.sololearn.com/avatars/sololearn.jpg';
    img.onload = function() {
        context.drawImage(img, 700, 100, 200, 200);
    };
    
//////////   GIOCO   //////////

    let start=document.getElementById('start');
    let jump=document.getElementById('jump');
    let up=document.getElementById('up');
    let left=document.getElementById('left');
    let down=document.getElementById('down');
    let right=document.getElementById('right');
    let score=0;
    jump.style.display="none";
    up.style.display="none";
    left.style.display="none";
    down.style.display="none";
    right.style.display="none";

    let x = 300;
    let y = 150;
    let t = Date.now();
    let fps = 0;
    let fpsSpan;
    let speed = 500;
    let dirx=0;
    let diry=0;
    var coinx = 15 + (Math.random() * (1500-50)); 

    var coiny = 15 + (Math.random() * (600-50));
    function draw() {
        // TEST
            timePassed=(Date.now()-t)/1000;
            t=Date.now();
            fps = Math.round(1 / timePassed);
        //Pulisci campo di gioco
            context.clearRect(0, 0, 1500, 600);

        //Ridisegna campo di gioco
            context.beginPath();
            context.rect(0, 0, 1500, 600);
            // context.fillStyle = "#1775b7";
            // context.fill();
            context.lineWidth = 3;
            context.stroke(); 

        //Ridisegna forma   
            context.beginPath();
            context.rect(x, y, 100, 50);
            context.fillStyle="red";
            context.fill();
        //COIN  
            context.beginPath();
            context.arc(coinx, coiny, 15, 0, 2 * Math.PI);
            context.fillStyle="gold";
            context.fill();
            context.strokeStyle="black";
            context.lineWidth = 1;
            context.stroke();

        //Disegna punteggio
            context.beginPath();
            context.font = '25px Arial';
            context.fillStyle = 'black';
            context.fillText("Score: " + score, 20, 30);
        
        //Gestione animazione in base al frame rate
        //dir=direzione
            if((dirx == 1 && x<1400) || (dirx == -1 && x>0)) { 
                x += (speed * timePassed * dirx);
            } 
            if((diry == 1 && y<550) || (diry == -1 && y>0)) { 
                y += (speed * timePassed * diry);
            } 
            if (coinx-15<=x+100 && x<=coinx+15 && coiny-15<=y+50 && y<=coiny+15) {
                score+=1;
                coinx = 15 + (Math.random() * (1500-50)); 
                coiny = 15 + (Math.random() * (600-50));
                console.log(coinx);
                console.log(coiny);
            }
            context.fillText("FPS: " + fpsSpan, 1400, 30);
        //Richiedi nuovo frame
            window.requestAnimationFrame(draw);
    }
    function frames() {
        fpsSpan=fps;
    }
    start.onclick = function() {
        start.style.display="none";
        jump.style.display="inline";
        up.style.display="inline";
        left.style.display="inline";
        down.style.display="inline";
        right.style.display="inline";
        draw();
        setInterval(frames, 100); 
        context.clearRect(0, 0, 1500, 600);
    }
    // jump.onkeyup = function() {
    jump.onclick = function() {
        y = (y-70)>= 0 ? y-70 : 0;
    }
    // RIGHT
    right.onmousedown = function() {dirx = 1;}
    right.onmouseup = function() {dirx = 0;} 
    right.ontouchstart = function() {dirx = 1;}
    right.ontouchend = function() {dirx = 0;}

    // LEFT
    left.onmousedown = function() {dirx = -1;}
    left.onmouseup = function() {dirx = 0;} 
    left.ontouchstart = function() {dirx = -1;}
    left.ontouchend = function() {dirx = 0;} 

    // UP
    up.onmousedown = function() {diry = -1;}
    up.onmouseup = function() {diry = 0;} 
    up.ontouchstart = function() {diry = -1;}
    up.ontouchend = function() {diry = 0;}

    // DOWN
    down.onmousedown = function() {diry = 1;}
    down.onmouseup = function() {diry = 0;} 
    down.ontouchstart = function() {diry = 1;}
    down.ontouchend = function() {diry = 0;}
}

// OLD DRAW
// function draw() {
//     // TEST
//         timePassed=(Date.now()-t)/1000;
//         t=Date.now();
//         fps = Math.round(1 / timePassed);
//         // if(count==10)
//         //     debugger;
//     //Pulisci campo di gioco
//         context.clearRect(0, 0, 1500, 600);

//     //Ridisegna campo di gioco
//         context.beginPath();
//         context.rect(0, 0, 1500, 600);
//         // context.fillStyle = "#1775b7";
//         // context.fill();
//         context.lineWidth = 3;
//         context.stroke(); 

//     //Ridisegna cerchio   
//         context.beginPath();
//         context.arc(x, y, 30, 0, 2 * Math.PI);
//         context.fillStyle="red";
//         context.fill();

//     //Disegna punteggio
//         context.beginPath();
//         context.font = '25px Arial';
//         context.fillStyle = 'black';
//         context.fillText("Score: " + count, 20, 30);
    
//     //Gestione animazione in base al frame rate
//     //dir=direzione
//         x += dirx*(speed * timePassed);
//         y += diry*(speed /4 * timePassed);
//         // console.log(speed * timePassed);
//         // debugger; 
//     //Cambia posizione cerchio per il prossimo frame
//         // x = x+7;
//         if (x >= 1500-30 || x<=30) {
//             dirx*=-1;
//         }
//         if (y >= 600-30 || y<=30) {
//             diry*=-1;
//         }
//         context.fillText("FPS: " + fpsSpan, 1400, 30);
//     //Richiedi nuovo frame
//         window.requestAnimationFrame(draw);
// }