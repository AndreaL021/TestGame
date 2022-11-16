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
        // context.drawImage(img, 300, 200, 300, 200);
        context.drawImage(img, 700, 100, 200, 200);
    };
    
//////////   GIOCO   //////////

    var start=document.getElementById('start');
    var jump=document.getElementById('jump');
    let count=0;
    jump.style.display="none"

    var x = -100;
    var y = 50;
    var t = Date.now();
    var fps = 0;
    let fpsSpan;
    let speed = 100;
    function draw() {
        // TEST
            timePassed=(Date.now()-t)/1000;
            t=Date.now();
            fps = Math.round(1 / timePassed);
            // if(count==10)
            //     debugger;
        //Pulisci campo di gioco
            context.clearRect(0, 0, 1500, 600);

        //Ridisegna campo di gioco
            context.beginPath();
            context.rect(0, 0, 1500, 600);
            // context.fillStyle = "#1775b7";
            // context.fill();
            context.lineWidth = 3;
            context.stroke(); 

        //Ridisegna cerchio   
            context.beginPath();
            context.arc(x, y, 30, 0, 2 * Math.PI);
            context.fillStyle="red";
            context.fill();

        //Disegna punteggio
            context.beginPath();
            context.font = '25px Arial';
            context.fillStyle = 'black';
            context.fillText("Score: " + count, 20, 30);
        
        //Gestione animazione in base al frame rate
            x += (speed * timePassed);
            // console.log(speed * timePassed);
            // debugger; 
        //Cambia posizione cerchio per il prossimo frame
            y = (y+1)<=600 ? y+1 : 30;
            x = (x+7)<=1500 ? x+7 : -100;
            // if (x >= 1000-100) {
            //     speed = 0;
            // }
            context.fillText("FPS: " + fpsSpan, 1400, 30);
        //Richiedi nuovo frame
            window.requestAnimationFrame(draw);
    }
    function score() {
        count += 1;
    }
    function frames() {
        fpsSpan=fps;
    }
    start.onclick = function() {
        start.style.display="none"
        jump.style.display="block"
        draw();
        setInterval(frames, 100); 
        setInterval(score, 700); 
        context.clearRect(0, 0, 1500, 600);
    }
    // jump.onkeyup = function() {
    jump.onclick = function() {
        //changing the y position
        console.log(y);
        y = (y-70)>= 30 ? y-70 : 30;
        console.log(y);
    }
    jump.onkeypress = function() {
        //changing the y position
        console.log(y);
        y = (y-70)>= 30 ? y-70 : 30;
        console.log(y);
    }
    
    // onkeydown = onkeyup = function(e){
    //     e = e || event; // to deal with IE
    //     map[e.keyCode] = e.type == 'keydown';
    //     /* insert conditional here */
    // }
    
}