const canvas = document.getElementById("myCanvas");
const c = canvas.getContext('2d');
canvas.height = 400;
canvas.width = 500;
document.getElementById("start").addEventListener('click',()=>{

var once = 1;
var score =0;
var time = 60;
var lose = false;

var m_up = false;
var m_down = false;
var m_left = false;
var m_right = false;
var avoid_height= 57;
var cbs = 4; // ? cbs = canvas border sizeAA  

var x = 0;
var y =  0;
var width =60;
var speed = 5;
var radius =5;

var targetX  = Math.floor((Math.random())*(canvas.width-radius));
var targetY  = Math.floor((Math.random())*(canvas.height-radius));

var bigRect = new InnerObject(x,y,width,speed);
var target = new InnerObject(targetX,targetY,radius);

document.getElementById('times').innerHTML = time;
document.getElementById('scores').innerHTML = score;

function setTime(){
    const timeFucn = setInterval(()=>{
        time-=1;
        document.getElementById('times').innerHTML = time;
        if(time<=0) {
            clearInterval(timeFucn);
            var checker= confirm("TIME OUT! Do you want to play again?");
            checker==true? alert("Click on start button."):alert("Thank you");
        }
        if(lose) time =60;
    },1000)
}
function makeTargetBigger(){
    var func = setInterval(()=>{
        if(time<=0) clearInterval(func);
        if(radius>=width){
            clearInterval(func);
            lose = true;
            alert("You lose!");
        }
        radius+=10;
        target.checkIsWithin();
    },2000)
}
function drawingObject(){
    c.clearRect(0,0,canvas.width,canvas.height);
    target.drawTarget();
    target.checkTargetIsWithin();
    bigRect.respone();           
    bigRect.makeMovement_();
    const reqFrame=window.requestAnimationFrame(drawingObject);
    if(time<=0|| lose){
        cancelAnimationFrame(reqFrame);
    }
    
}
setTime();
makeTargetBigger();
drawingObject();

function checkHitTarget(a,b,c){
        return (a<=b && a>=c);
}
function InnerObject(x,y,oWidth,oSpeed){
    this.x = x;
    this.y = y;
    this.oWidth = oWidth;
    this.oSpeed = oSpeed;
    this.checkIsWithin = ()=>{
        if(this.x+this.oWidth>canvas.width) this.x =canvas.width- this.oWidth;
        if(this.y+this.oWidth>canvas.height) this.y = canvas.height - this.oWidth;
        if(this.x<=0) this.x = 0;
        if(this.y<=avoid_height+cbs) this.y = avoid_height;
    }
    this.draw_ =()=>{
        c.fillStyle = "black";
        c.fillRect(this.x, this.y, this.oWidth, this.oWidth);
    }
    this.drawTarget=()=>{

        c.fillStyle="red"
        c.beginPath();
        c.arc(targetX,targetY,radius,0, Math.PI*2, false);
        c.fillSyle="black"     
        c.fill();
    }
    this.checkTargetIsWithin = ()=>{
        if(targetX+radius>canvas.width) targetX=canvas.width-radius;
        if(targetY+radius>canvas.height) targetY=canvas.height-radius;
        if(targetX<cbs)targetX = cbs;
        if(targetY<avoid_height+cbs) targetY=avoid_height+cbs;
    }
    this.respone=()=>{
        if(checkHitTarget(targetX,this.x+this.oWidth,this.x) || checkHitTarget(targetX+2*radius,this.x+this.Owidth,this.x)){
            if(checkHitTarget(targetY,this.y+this.oWidth,this.y) || checkHitTarget(targetY+2*radius,this.y+this.oWidth,this.y)){
                c.clearRect(targetX-radius,targetY-radius,2*radius,2*radius);
                console.log("touch");
                score+=10;
                document.getElementById('scores').innerHTML = score;
                targetX  = Math.floor((Math.random())*(canvas.width-radius));
                targetY  = Math.floor((Math.random())*(canvas.height-radius));
                radius =5;
                this.drawTarget();
                this.checkTargetIsWithin();
            }
        }
    }
    this.makeMovement_=()=>{
        this.draw_();
        this.checkIsWithin();
        if(m_up){
            this.y-=this.oSpeed;
        }
        if(m_down){
            this.y+=this.oSpeed;
        }
        if(m_left){
            this.x-=this.oSpeed;
        }
        if(m_right){
            this.x+=this.oSpeed;
        }
    }
}
document.getElementById("myCanvas").addEventListener("keyup",() =>{
    m_down = false;
    m_up = false;
    m_left = false;
    m_right = false;
    if(event.key=="ArrowUp") {
        m_up = true;
        console.log(event.key)
    }
    if(event.key=="ArrowDown") {
        m_down = true;
        console.log(event.key)
    }
    if(event.key=="ArrowLeft") {
        m_left = true;
        console.log(event.key)
    }
    if(event.key=="ArrowRight"){
        m_right = true;
        console.log(event.key);
    }
})
console.log(canvas.height, canvas.width, innerHeight,innerWidth)
});

document.getElementById("pause").addEventListener('click',()=>{
    alert("you are on pause. ")
})