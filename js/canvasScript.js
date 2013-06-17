

    var cW = 900;
    var cH = 550;
    window.onload = windowReady(33);
    /**
    windowReady
    */
    function windowReady(ascii_start) {
        // Load the context of the canvas
        var canvas = document.getElementById('canvasId')
        var ctx = canvas.getContext("2d");

        canvas.width = document.width;
        canvas.height = document.height;
        cW = canvas.width;
        cH = canvas.height;

        var charArray = [];
        for (var i = 0; i < 95; i++) {
        
            var stringArray = [];
            var velocityY = Math.random() * 2;
            var xspacing = Math.random() * 250 + 15;
            var fontSize;
            var charlength = 5 + Math.floor(Math.random()*20);

            for (var j = 0; j < charlength; j++) {
                stringArray.push(
                    new createCharacter(i * 15 + xspacing, j * 20+20, velocityY, j, fontSize)
                );
            }

            charArray.push(stringArray);
        }

        function createCharacter(xloc, yloc, velocityY, j, fontSize){

            this.x = xloc;
            this.y = -yloc;
            this.dy = velocityY;
        
            this.color = "white";
            this.fontSize = 20;
            this.text = String.fromCharCode(ascii_start + Math.floor(Math.random()*220));

        }// end of createCharacter

        function draw() {
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(0,0,0,.4)";
            ctx.fillRect(1, 1, cW, cH);
            ctx.globalCompositeOperation = "lighter";

            for (var k = 0; k < charArray.length; k++) {
                for (var m = 0; m < charArray[k].length; m++){

                    var charObject = charArray[k][m];

                    ctx.fillStyle = charObject.color;
                    ctx.font = "bold " + charObject.fontSize + "px Symbol";
                    ctx.fillText(charObject.text, charObject.x, charObject.y);

                    ctx.fill();
                    charObject.y += charObject.dy;
                    if (charObject.y > cH)
                        charObject.y = 0;
                }
            }
        }
        setInterval(draw, 20);

    }