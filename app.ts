function GetRandomFloat(min:number, max:number):number{
  return Math.random() * (max-min) + min
}
function GetRandomInt(min:number, max:number):number{
  return Math.floor(GetRandomFloat(min,max))
}
function FromPolar(v:number, theta:number){
  return [v * Math.cos(theta), v * Math.sin(theta)]
}
interface ISimObject {
  Update():void
  Draw(ctx:CanvasRenderingContext2D):void
}
const MaxParticleSize = 3
class Particle implements ISimObject{
  x = 0; y = 0;
  speed = 0; theta = 0
  radius = 1.0
  ttl = 500
  lifetime = 500
  color = 'black'
  constructor(private w:number, private h:number){
    this.x = GetRandomFloat(0, w)
    this.y = GetRandomFloat(0, h)

    this.speed = GetRandomFloat(0, 3.0)
    this.theta = GetRandomFloat(0, 2 * Math.PI)

    this.radius = GetRandomFloat(0.05, MaxParticleSize)
    this.lifetime = this.ttl = GetRandomInt(25, 50)
  }
  Update(){
    //imp this
   }
   Draw(ctx:CanvasRenderingContext2D){
     //imp this
     
   }
}
const ParticleCount = 200

class Simulation implements ISimObject{
  
  particles:Particle[] = []
  constructor(private width:number, private height:number){
    for (let i = 0; i < ParticleCount; i++) {
      this.particles.push(
        new Particle(this.width, this.height)
      )
      
    }
  }
  Update(){
   //imp this
  }
  Draw(ctx:CanvasRenderingContext2D){
    //imp this
    ctx.fillStyle = 'green'
    ctx.fillRect(0,0,this.width,this.height)
  }
}

function bootstrapper() {
  const width = 400
  const height = 400

  const updateFrameRate = 50
  const renderFrameRate = 50
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  if(!canvas) return
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if(!ctx) return
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  const sim = new Simulation(width,height)
  setInterval(
    () => {sim.Update()},
    1000/updateFrameRate
  )
  setInterval(
    ()=>{sim.Draw(ctx)},
    1000/renderFrameRate
  )
}
bootstrapper()