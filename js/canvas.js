const $ = (selector) => document.querySelector(selector)

const canvas = $('#canvas')
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

const promo_code = "You have reached the KEY: FG12x403df"
const count_for_win = 560

const ground = $('.ground')
const tree = $('.tree')
const mountains = $('.mountains')
const back_mountains = $('.back_mountains')
const many_trees = $('.many_trees')
const sky = $('.sky')
const moon = $('.moon')

const snowman = $('.snowman')
const snowmans = []

let gameMove = true

const fox = $('.fox')

const count = $('#count')
let countValue = 0
count.innerHTML = '0'


//adpt
let width_config
let speed

if(document.body.clientWidth < 2000 && document.body.clientWidth > 1000){
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

if(document.body.clientWidth < 1000){
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

const wh = canvas.width/canvas.height * 1.5
const groundPosY = canvas.height - ground.height * wh
const many_treesPosY = groundPosY - many_trees.height * wh
const treePosY = groundPosY - tree.height * wh
const mountainsPosY = many_treesPosY - mountains.height * wh * 0.8
const back_mountainsPosY = many_treesPosY - mountains.height * wh * 0.8

if(document.body.clientWidth > 2000){
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

updateSizeDoc()
drawCanvas()
jumpFox()


function updateSizeDoc(){
  canvas.width = document.body.clientWidth
  canvas.height = document.body.clientHeight
}

function drawCanvas(){

  class Layer{
    constructor (image, movSpeed, posY, img_width, height){
      this.x = 0
      this.y = posY || 0
      this.width = width_config.widthImages
      this.height = 1
      this.x2 = this.width
      this.image = image
      this.speed = movSpeed
      this.height = height
    }

    draw(){
      if(document.body.clientWidth > 1000 && document.body.clientWidth < 2001){
        ctx.drawImage(this.image, this.x, this.y, canvas.width, this.image.height),
        ctx.drawImage(this.image, this.x2, this.y, canvas.width, this.image.height)
      }
      if(document.body.clientWidth > 2000){
        ctx.drawImage(this.image, this.x, this.y, canvas.width, this.image.height* canvas.width/canvas.height*1.5),
        ctx.drawImage(this.image, this.x2, this.y, canvas.width, this.image.height* canvas.width/canvas.height*1.5)
      }
      if(document.body.clientWidth < 1000) {
        ctx.drawImage(this.image, this.x, this.y)
        ctx.drawImage(this.image, this.x2, this.y)
      }
    }

    update(){
      if(this.x < -this.width) this.x = this.width - this.speed*2.5
      else this.x -= this.speed

      if(this.x2 < - this.width) this.x2 = this.width - this.speed*2.5
      else this.x2 -= this.speed
    }
  }

  class Snowman{
    constructor (){
      this.x = canvas.width
      this.y = width_config.snowman_posY
      this.image = snowman
      this.speed = speed.snowman
    }

    draw(){
      if(document.body.clientWidth > 2000){
        ctx.drawImage(this.image, this.x, this.y, this.image.width *1.8, this.image.height*1.8)
      }
      if(document.body.clientWidth > 1000 && document.body.clientWidth < 2001){
        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height)
      }
      if(document.body.clientWidth < 1000){
        ctx.drawImage(this.image, this.x, this.y, this.image.width * 0.5, this.image.height * 0.5)
      }
    }

    update(){
      this.x -= this.speed
      if(this.x < 0 - 20) this.x = canvas.width
    }
  }

  class Fox{
    constructor (){
      this.x = width_config.fox_posX
      this.y = width_config.fox_posY
      this.image = fox
      this.jumping = false
      this.jumpSpeed = 2
      this.heghestJump = false
    }

    draw(){

      if(document.body.clientWidth > 2000){
        ctx.drawImage(this.image, this.x, this.y, this.image.width*1.8, this.image.height*1.8)
      }
      if(document.body.clientWidth > 1000 && document.body.clientWidth < 2001){
        ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height)
      }
      if(document.body.clientWidth < 1000){
        ctx.drawImage(this.image, this.x, this.y, this.image.width * 0.5, this.image.height * 0.5)
      }
    }

    jump(){
      if(this.jumping && !this.heghestJump && this.y > width_config.fox_posY - 130){
        this.y -= this.jumpSpeed
        console.log('up');
      }
      else if(this.y < width_config.fox_posY){
        this.heghestJump = true
        this.y += this.jumpSpeed
        console.log('dovn');
      }
      else {
        this.heghestJump = false
        this.jumping = false
        console.log('end');
      }
    }

    update(){
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
      if(!foxLayer.jumping && gameMove){
        foxLayer.jumping = true
      }
  })

  document.addEventListener('keydown', (event) => {
    if(event.keyCode == 32 || event.keyCode == 38) {
      if(!foxLayer.jumping){
        foxLayer.jumping = true
      }
    }
  })

  // let checkGameOver = document
  document.addEventListener('click', () => {

    if(!gameMove && document.querySelector('.game_over')){
        location.reload();
    }
  })

  function collision(){
    if(foxLayer.x < snower.x &&
       foxLayer.x + 40 > snower.x &&
       foxLayer.y + 70 > snower.y && gameMove
      ){
      const promoCode = document.createElement('H2')
      document.body.append(promoCode)
      promoCode.classList.add('game_over')
      promoCode.classList.add('modal')
      promoCode.innerHTML = `GAME OVER <br> click for a new game`

      countValue = 0
      fox.src = `fox/death_5.png`
      snower.x = canvas.width
      checkGameOver = $('.game_over')
      cancelAnimationFrame(animate)
      addEventListener('click', drawCanvas, {once: true} )

      return gameMove = false
    }
  }

  function animate(){
    if(gameMove){
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(sky, 0, 0, canvas.width, canvas.height)
      ctx.drawImage(moon, width_config.moonPosX, 0, moon.width*wh*0.8, moon.height*wh *0.8)

      moveObj.forEach(item => {
        item.update()
        item.draw()
      })

      snower.draw()
      snower.update()
      foxLayer.update()
    }

    collision()
    requestAnimationFrame(animate)
  }


  animate()
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//promo_code
const countInt = setInterval(() => {
  if(gameMove){
  countValue++
  count.innerHTML = countValue
  promoСode()
  }
  else countValue = 0
}, 100);

let checkPromo = false

function promoСode() {
  if(countValue > count_for_win && countValue < count_for_win + 2) {
    createPromoCode()
    console.log('ehf');
    checkPromo = true
    setTimeout(() => {
      if(checkPromo == true){
        checkVariablePromo()
      }
    }, 4000)
  }
}

function checkVariablePromo(){
  const promoCode = $('.promo')
  document.body.removeChild(promoCode)
}

function createPromoCode(){
  const promoCode = document.createElement('H2')
  document.body.append(promoCode)
  promoCode.classList.add('promo')
  promoCode.classList.add('modal')
  promoCode.innerHTML = promo_code
}

window.addEventListener('resize',() => {
  updateSizeDoc()
  drawCanvas()
})

//fnimation fox
let currentAnimation = null;
let fox_config = {
  jump: false,
  timeJump: 2000,
};

if(gameMove) sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')
if(!gameMove) sprintsForMove(6, 100, '.fox', 'fox/death_', '.png')

function jumpFox(){
  window.addEventListener('keydown', (event) => {
    if(event.keyCode == 32 || event.keyCode == 38) {
      fox_config.jump = true;
      switchAnimation();
    }
  })

  window.addEventListener('click', () => {
      fox_config.jump = true;
      switchAnimation();
  })
}

function switchAnimation() {
  if (currentAnimation && gameMove) {
    cancelAnimationFrame(currentAnimation);
    currentAnimation = null;
  }

  if (fox_config.jump && gameMove) {
    sprintsForMove(6, 350, '.fox', 'fox/jump_', '.png');
    setTimeout(() => {
      fox_config.jump = false;
      switchAnimation()
    }, fox_config.timeJump);
  } else {
    sprintsForMove(5, 100, '.fox', 'fox/run_', '.png');
  }
}

function sprintsForMove(count, int, selector, path1, path2) {
  let currentImage = 1;
  const imageCount = count;
  const intervalTime = int;
  const loaderImage = $(selector);
  let lastTime = 0;

  function switchImage(timestamp) {
    const deltaTime = timestamp - lastTime;
    if (deltaTime >= intervalTime) {
      currentImage = currentImage === imageCount ? 1 : currentImage + 1;
      loaderImage.src = `${path1}${currentImage}${path2}`;
      lastTime = timestamp;
    }
    currentAnimation = requestAnimationFrame(switchImage);
  }
  currentAnimation = requestAnimationFrame(switchImage);
}
