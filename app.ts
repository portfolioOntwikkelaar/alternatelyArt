interface ISimObject {
  Update():void
  Draw(ctx:CanvasRenderingContext2D):void
}

class Simulation implements ISimObject{
  constructor(private width:number, private height:number){}
  Update(){
   //imp this
  }
  Draw(ctx:CanvasRenderingContext2D){
    //imp this
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