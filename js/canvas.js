const $ = (selector) => document.querySelector(selector)

const canvas = $('#canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

const promo_code = 'You have reached the KEY: FG12x403df'
const count_for_win = 560

const ground = $('.ground')
const tree = $('.tree')
const mountains = $('.mountains')
const back_mountains = $('.back_mountains')
const many_trees = $('.many_trees')
const sky = $('.sky')
const moon = $('.moon')
const fox_death = $('.fox_death')

const snowman = $('.snowman')
const snowmans = []

let gameMove = true
let startGame = false
let startMoveBack = false
let isJumping = false
let isJumpingAmimation = false
let moveBackDeath = false
let dafthAnimation = false
let stopAnimationFox = false
let spaceStop = true
let stopAnimationFoxDeath = false
let checkPromo = false

const fox = $('.fox')

const count = $('#count')
let countValue = 0
count.innerHTML = '0'


// Adptive
let width_config
let speed

if (document.body.clientWidth < 2000 && document.body.clientWidth > 1000) {
  width_config = {
    widthImages         : canvas.width,
    groundPosY          : canvas.height - 126,
    many_treesPosY      : canvas.height - 126 - 130,
    treePosY            : canvas.height - 126 - 120,
    mountainsPosY       : canvas.height - 126 - 120 - 160,
    back_mountainsPosY  : canvas.height - 126 - 120 - 100,
    moonPosX            : canvas.width / 2,
    fox_posY            : canvas.height - 126 - 30,
    fox_posX            : canvas.width / 14,
    snowman_posY        : canvas.height - 126 - 30,
    jumpHeight          : 130,
    adaptHeightSnowman  : 1,
    collisionHeight     : 50,
    fox_height          : 71,
    fox_width           : 170,
    speedJumpPX         : 2.3,
  }
  speed = {
    groundLayer   : 3,
    treeLayer     : 2.5,
    manyTreeLayer : 2,
    mountLayer    : 0.8,
    backMountLayer: 0.4,
    snowman       : 3,
  }
}

if (document.body.clientWidth < 1000) {
  width_config = {
    widthImages         : 1000,
    groundPosY          : canvas.height - 126,
    many_treesPosY      : canvas.height - 126 - 130,
    treePosY            : canvas.height - 126 - 120,
    mountainsPosY       : canvas.height - 126 - 120 - 160,
    back_mountainsPosY  : canvas.height - 126 - 120 - 100,
    moonPosX            : canvas.width / 2,
    fox_posY            : canvas.height - 126,
    fox_posX            : canvas.width / 14,
    snowman_posY        : canvas.height - 126,
    jumpHeight          : 80,
    adaptHeightSnowman  : 0.5,
    collisionHeight     : 30,
    fox_height          : 71 * 0.5,
    fox_width           : 170 * 0.5,
    speedJumpPX         : 1.5,
  }
  speed = {
    groundLayer   : 2,
    treeLayer     : 1,
    manyTreeLayer : 0.7,
    mountLayer    : 0.3,
    backMountLayer: 0.1,
    snowman       : 2,
  }
}

const wh = canvas.width / canvas.height * 1.5
const groundPosY = canvas.height - ground.height * wh
const many_treesPosY = groundPosY - many_trees.height * wh
const treePosY = groundPosY - tree.height * wh
const mountainsPosY = many_treesPosY - mountains.height * wh * 0.8
const back_mountainsPosY = many_treesPosY - mountains.height * wh * 0.8

if (document.body.clientWidth > 2000) {
  width_config = {
    widthImages         : canvas.width,
    groundPosY          : groundPosY,
    many_treesPosY      : many_treesPosY,
    treePosY            : treePosY,
    mountainsPosY       : mountainsPosY,
    back_mountainsPosY  : back_mountainsPosY,
    moonPosX            : canvas.width / 2,
    fox_posY            : groundPosY - fox.height,
    fox_posX            : canvas.width / 14,
    snowman_posY        : groundPosY - fox.height,
    jumpHeight          : 180,
    adaptHeightSnowman  : 1.8,
    collisionHeight     : 80,
    fox_height          : 71 * 1.8,
    fox_width           : 170 * 1.8,
    speedJumpPX         : 4,
  }
  speed = {
    groundLayer   : 10,
    treeLayer     : 4,
    manyTreeLayer : 3,
    mountLayer    : 1,
    backMountLayer: 0.8,
    snowman       : 10,
  }
}

const death_config = {
 smowPosX: []
}

function start_Game() {
  if (!startGame) {
    countInt()
    startMoveBack = true;
    startGame = true;
    checkVariableTextToStart()
  }
}

document.addEventListener('click', start_Game)

updateSizeDoc()
jumpFox()
createTextToStart()



function updateSizeDoc() {
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
}


class Layer{
  constructor (image, movSpeed, posY, img_width, height) {
    this.x = 0
    this.y = posY || 0
    this.width = width_config.widthImages
    this.height = 1
    this.x2 = this.width
    this.image = image
    this.speed = movSpeed
    this.height = height
  }

  draw() {
    if (document.body.clientWidth > 1000 && document.body.clientWidth < 2001) {
      ctx.drawImage(this.image, this.x, this.y, canvas.width, this.image.height),
      ctx.drawImage(this.image, this.x2, this.y, canvas.width, this.image.height)
    }
    if (document.body.clientWidth > 2000) {
      ctx.drawImage(this.image, this.x, this.y, canvas.width, this.image.height * canvas.width / canvas.height * 1.5),
      ctx.drawImage(this.image, this.x2, this.y, canvas.width, this.image.height * canvas.width / canvas.height * 1.5)
    }
    if (document.body.clientWidth < 1000) {
      ctx.drawImage(this.image, this.x, this.y)
      ctx.drawImage(this.image, this.x2, this.y)
    }
  }

  update() {
    if (this.x < -this.width) this.x = this.width - this.speed * 2.5
    else this.x -= this.speed
    if (this.x2 < -this.width) this.x2 = this.width - this.speed * 2.5
    else this.x2 -= this.speed
  }
}
class Snowman{
  constructor () {
    this.x = canvas.width
    this.y = width_config.snowman_posY
    this.image = snowman
    this.speed = speed.snowman
    this.height = this.image.height
    this.width = this.image.width
  }

  draw() {
    if (document.body.clientWidth > 2000) {
      ctx.drawImage(this.image, this.x, this.y, this.image.width * width_config.adaptHeightSnowman, this.image.height * width_config.adaptHeightSnowman)
    }
    if (document.body.clientWidth > 1000 && document.body.clientWidth < 2001) {
      ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height)
    }
    if (document.body.clientWidth < 1000) {
      ctx.drawImage(this.image, this.x, this.y, this.image.width * width_config.adaptHeightSnowman, this.image.height * width_config.adaptHeightSnowman)
    }
  }

  update() {
    this.x -= this.speed
    if (this.x < 0 - 20) this.x = canvas.width
  }
}
class Fox{
  constructor () {
    this.x = width_config.fox_posX
    this.y = width_config.fox_posY
    this.image = fox
    this.jumping = false
    this.jumpSpeed = width_config.speedJumpPX
    this.heghestJump = false
    this.height = width_config.fox_height
    this.width = this.image.width
  }

  draw() {
    if(!stopAnimationFoxDeath){
      if (document.body.clientWidth > 2000) {
        ctx.drawImage(this.image, this.x, this.y, this.image.width * width_config.adaptHeightSnowman, this.height)
      }
      if (document.body.clientWidth > 1000 && document.body.clientWidth < 2001) {
        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.height)
      }
      if (document.body.clientWidth < 1000) {
        ctx.drawImage(this.image, this.x, this.y, this.image.width * width_config.adaptHeightSnowman, this.height)
      }
    }
  }

  jump() {
    if (this.jumping && !this.heghestJump && this.y > width_config.fox_posY - width_config.jumpHeight) {
      this.y -= this.jumpSpeed
    }
    else if (this.y < width_config.fox_posY) {
      this.heghestJump = true
      this.y += this.jumpSpeed
    }
    else {
      this.heghestJump = false
      this.jumping = false
    }
  }
  update() {
    this.draw()
    this.jump()
  }
}

const groundLayer = new Layer(ground, speed.groundLayer, width_config.groundPosY)
const treeLayer = new Layer(tree, speed.treeLayer, width_config.treePosY)
const manyTreeLayer = new Layer(many_trees, speed.manyTreeLayer, width_config.many_treesPosY)
const mountLayer = new Layer(mountains, speed.mountLayer, width_config.mountainsPosY)
const backMountLayer = new Layer(back_mountains, speed.backMountLayer, width_config.back_mountainsPosY)
const moveObj = [backMountLayer, mountLayer, manyTreeLayer, groundLayer, treeLayer]
const foxLayer = new Fox()
const snower = new Snowman(2, 300)


document.addEventListener('click', () => {
  if(isJumping){
    if (!foxLayer.jumping && gameMove) {
      foxLayer.jumping = true
    }
  }
  if(!isJumping){
    isJumping = true
  }

})

document.addEventListener('keydown', (event) => {
  if (event.keyCode == 32 || event.keyCode == 38) {
    if (!foxLayer.jumping) {
      foxLayer.jumping = true
    }
  }
})
// let checkGameOver = document
document.addEventListener('click', () => {
  if (!gameMove && document.querySelector('.game_over')) {
    reload()
  }
})

function reload(){
  location.reload()
}

function collision() {
  if (foxLayer.x < snower.x &&
     foxLayer.x + foxLayer.width * width_config.adaptHeightSnowman/1.3 > snower.x &&
     foxLayer.y + width_config.collisionHeight > snower.y && gameMove
    ) {
        const promoCode = document.createElement('H2')
        document.body.append(promoCode)
        promoCode.classList.add('game_over')
        promoCode.classList.add('modal')
        promoCode.innerHTML = `GAME OVER <br> click for a new game`
        countValue = 0
        fox.src = `fox/death_5.png`
        snower.x = canvas.width
        checkGameOver = $('.game_over')
        dafthAnimation = true
        if (currentAnimation) {
          cancelAnimationFrame(currentAnimation)
          currentAnimation = null
        }
        if(dafthAnimation){
          sprintsForMove(6, 100, '.fox', 'fox/death_', '.png')
          setTimeout(() => {
            // stopAnimationFox = true
            stopAnimationFoxDeath = true
          }, 500)
        }
    return gameMove = false
  }
}
function animate() {
  if(!checkPromo){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(sky, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(moon, width_config.moonPosX, 0, moon.width * wh * 0.8, moon.height * wh * 0.8)

    backMountLayer.draw()
    mountLayer.draw()
    manyTreeLayer.draw()
    treeLayer.draw()

    groundLayer.draw()
   if(stopAnimationFoxDeath){
    ctx.drawImage(fox_death, width_config.fox_posX, width_config.fox_posY, width_config.fox_width ,width_config.fox_height)
   }
    if (gameMove) {
      moveObj.forEach(item => {
        item.update()
        item.draw()
      })

      if (startMoveBack) {
        snower.update()
        snower.draw()
      }
    }
    if(!stopAnimationFox){
      foxLayer.draw()
    }
    foxLayer.jump()

    collision()
    requestAnimationFrame(animate)
  }

}
animate()


function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Promo code
function countInt() {
  setInterval(() => {
    if (gameMove && !checkPromo) {
      countValue++
      count.innerHTML = countValue
      promoСode()
    }
    else countValue = 0
  }, 100)
}



function promoСode() {
  if (countValue > count_for_win && countValue < count_for_win + 2) {
    createPromoCode()
    checkPromo = true
    $('#buttons').style.display = 'flex'
  }
}

function checkVariablePromo() {
  const promoCode = $('.promo')
  document.body.removeChild(promoCode)
}

function createPromoCode() {
  const promoCode = document.createElement('h2')
  document.body.append(promoCode)
  promoCode.classList.add('promo')
  promoCode.classList.add('modal')
  promoCode.innerHTML = promo_code
}

function checkVariableTextToStart() {
  const promoCode = $('.modal')
  document.body.removeChild(promoCode)
}

function createTextToStart() {
  const TextToStart = document.createElement('h2')
  document.body.append(TextToStart)
  TextToStart.classList.add('modal')
  TextToStart.innerHTML = 'click to start'
}


window.addEventListener('resize', () => {
  updateSizeDoc()
  // drawCanvas()
})

// Animation fox
let currentAnimation = null
let fox_config = {
  jump: false,
  timeJump: 2000,
}
function srartRun() {
  if (gameMove) sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')
  if (!gameMove) sprintsForMove(6, 100, '.fox', 'fox/death_', '.png')
}
srartRun()

function jumpFox() {
  window.addEventListener('keydown', (event) => {

    if (event.keyCode == 32 && spaceStop || event.keyCode == 38 && spaceStop) {
      spaceStop = false
      fox_config.jump = true
      switchAnimation()
      setTimeout(() => {
        spaceStop = true
      }, fox_config.timeJump - 10)
    }

  })

  window.addEventListener('click', () => {
    if(isJumpingAmimation && spaceStop){
      spaceStop = false
      fox_config.jump = true
      switchAnimation()
      setTimeout(() => {
        spaceStop = true
      }, fox_config.timeJump - 10)
    }
    if(!isJumpingAmimation){
      isJumpingAmimation = true
    }
  })
}

function switchAnimation() {
  if (!dafthAnimation){
    console.log('работает!');
    if (currentAnimation) {
      cancelAnimationFrame(currentAnimation)
      currentAnimation = null
    }
    if (fox_config.jump && gameMove) {
      sprintsForMove(9, 200, '.fox', 'fox/jump_', '.png')
      setTimeout(() => {
        fox_config.jump = false
        switchAnimation()
      }, fox_config.timeJump)
    }
    else if(!fox_config.jump && !dafthAnimation|| !currentAnimation && !dafthAnimation) {
      sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')
    }
  }
  if (dafthAnimation){
    console.log('работает смерть!')
    sprintsForMove(6, 100, '.fox', 'fox/death_', '.png')
  }
}

function sprintsForMove(count, int, selector, path1, path2) {
  let currentImage = 1
  const imageCount = count
  const intervalTime = int
  const loaderImage = $(selector)
  let lastTime = 0

  function switchImage(timestamp) {
    const deltaTime = timestamp - lastTime
    if (deltaTime >= intervalTime) {
      currentImage = currentImage === imageCount ? 1 : currentImage + 1
      loaderImage.src = `${path1}${currentImage}${path2}`
      lastTime = timestamp
    }
    currentAnimation = requestAnimationFrame(switchImage)
  }
  currentAnimation = requestAnimationFrame(switchImage)
}

//buttons copy and new Game
const text = 'FG12x403df'
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}
