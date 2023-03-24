const $ = (selector) => document.querySelector(selector)

const canvas = $('#canvas')
const ctx = canvas.getContext('2d')

const w = canvas.width = 823
const h = canvas.height = 800

const ground = $('.ground')


let x = 0
let x2 = 823
const movSpeed = 1

function animate(){

  ctx.clearRect(0, 0, w, h)
  if(x < - 823) {
    x = 823 - movSpeed
  } else {
    x -= movSpeed
  }
  if(x2 < - 823) {
    x2 = 823 - movSpeed
  } else {
    x2 -= movSpeed
  }

  ctx.drawImage(ground, x, 0)
  ctx.drawImage(ground, x2, 0)
  requestAnimationFrame(animate)
}
animate()
