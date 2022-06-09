const canvas = document.getElementById("mouse");
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
window.addEventListener("resize", function(){
  canvas.width = window.innerWidth ;
  canvas.height = window.innerHeight;


})

const mouse = {
  x : null,
  y : null,
}



canvas.addEventListener("click",function(event){ 
  mouse.x = event.x ;
  mouse.y = event.y ;
  
  for(i = 0 ; i < 10 ; i ++){
  particlesArray.push(new Particle())
  }
})

canvas.addEventListener("mousemove",function(event){ 
  mouse.x = event.x ;
  mouse.y = event.y ;
  for(i = 0 ; i < 2 ; i ++){
    particlesArray.push(new Particle()) //pushed  2 times 
    
    }
})

class Particle{ //to set the object 
  constructor(){
    this.x = mouse.x;
    this.y = mouse.y; 
    this.size = Math.random() * 6 + 1;
    this.speedX = Math.random() * 5 - 1.5;
    this.speedY = Math.random() * 5 -1.5;
    this.color = "hsl(" +hue + ",100%,50%)";
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.size > 0.2)this.size -=0.15;
  }
  draw(){
    
    ctx.fillStyle= this.color
    ctx.strokeStyle = this.color
    ctx.lineWidth = "1";
    ctx.beginPath()
    ctx.arc(this.x,this.y,this.size,0,Math.PI * 2) 
    
    ctx.fill()
    
  }
}



function handleParticle(){ //place the pushed array to here
  for(let i = 0 ; i < particlesArray.length ; i++){
    particlesArray[i].update(); // in early pushed an object to array , so i can access class Particle
    particlesArray[i].draw()
    
    for(let j = i ; j <particlesArray.length ; j++ ){
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy*dy);
      if(distance < 50){
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color
        ctx.lineWidth= 1;
        ctx.moveTo(particlesArray[i].x , particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x , particlesArray[j].y)
        ctx.stroke();
        ctx.closePath()
      } 
    }
    if(particlesArray[i].size <= 0.3){
      particlesArray.splice(i,1);
      i--;

    }
  }
}

function animate(){
  ctx.clearRect(0,0 ,canvas.width , canvas.height);

  handleParticle()
  hue -= 0.8;
  requestAnimationFrame(animate)
  
}

animate()
