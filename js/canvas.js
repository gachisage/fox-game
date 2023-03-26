const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => [...document.querySelectorAll(selector)]

const canvas = $('#canvas')
canvas.width = '528'
canvas.height = '900'
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const key = `FG12x403df`

const promo_code = `You have reached the KEY: ${key}`
const count_for_win = 560

const ground = $('.ground')
const tree = $('.tree')
const mountains = $('.mountains')
const back_mountains = $('.back_mountains')
const many_trees = $('.many_trees')
const sky = $('.sky')
const moon = $('.moon')
const fox_death = $('.fox_death')
const fox = $('.fox')
const count = $('#count')
const snowman = $('.snowman')

let gameMove = true
let isGameStarted = false
let startMoveBack = false
let isJumping = false
let isJumpingAmimation = false
let moveBackDeath = false
let dafthAnimation = false
let stopAnimationFox = false
let spaceStop = true
let stopAnimationFoxDeath = false
let checkPromo = false

let countValue = 0
count.innerHTML = countValue

// Animation fox
let currentAnimation = null

const foxConfig = {
  jump: false,
  timeJump: 2000,
}

const width_config = {
  widthImages         : canvas.width,
  groundPosY          : canvas.height - 110,
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

const speed = {
  groundLayer   : 3,
  treeLayer     : 2.5,
  manyTreeLayer : 2,
  mountLayer    : 0.8,
  backMountLayer: 0.4,
  snowman       : 3,
}

const wh = canvas.width / canvas.height * 1.5
const groundPosY = canvas.height - ground.height * wh
const many_treesPosY = groundPosY - many_trees.height * wh
const treePosY = groundPosY - tree.height * wh
const mountainsPosY = many_treesPosY - mountains.height * wh * 0.8
const back_mountainsPosY = many_treesPosY - mountains.height * wh * 0.8

const death_config = {
 smowPosX: []
}

class Layer {
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
    ctx.drawImage(this.image, this.x, this.y)
    ctx.drawImage(this.image, this.x2, this.y)
  }

  update() {
    if (this.x < -this.width) this.x = this.width - this.speed * 2.5
    else this.x -= this.speed
    if (this.x2 < -this.width) this.x2 = this.width - this.speed * 2.5
    else this.x2 -= this.speed
  }
}

class Snowman {
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

class Fox {
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
    if (!stopAnimationFoxDeath) {
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

function startGame() {
  $('.modal.start')?.remove()
  if (!isGameStarted) {
    countInt()
    startMoveBack = true
    isGameStarted = true
  }
}

function collision() {
  if (foxLayer.x < snower.x &&
      foxLayer.x + foxLayer.width * width_config.adaptHeightSnowman / 1.3 > snower.x &&
      foxLayer.y + width_config.collisionHeight > snower.y && gameMove) {

      playSound('loose')
      $('.modal.game_over').style.display = 'block'
      countValue = 0
      fox.src = `fox/death_5.png`
      snower.x = canvas.width
      dafthAnimation = true

      if (currentAnimation) {
        cancelAnimationFrame(currentAnimation)
        currentAnimation = null
      }

      if (dafthAnimation) {
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
  if (!checkPromo) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(sky, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(moon, width_config.moonPosX, 0, moon.width * wh * 0.8, moon.height * wh * 0.8)

    backMountLayer.draw()
    mountLayer.draw()
    manyTreeLayer.draw()
    treeLayer.draw()

    groundLayer.draw()

    if (stopAnimationFoxDeath) {
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
    if (!stopAnimationFox) {
      foxLayer.draw()
    }
    foxLayer.jump()

    collision()
    requestAnimationFrame(animate)
  }

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
    playSound('win')
    $('.modal.promocode').style.display = 'block'
    $('#promocode').textContent = promo_code
    checkPromo = true
  }
}

function switchAnimation() {
  if (!dafthAnimation) {
    console.log('Работает!')

    if (currentAnimation) {
      cancelAnimationFrame(currentAnimation)
      currentAnimation = null
    }

    if (foxConfig.jump && gameMove) {
      sprintsForMove(9, 200, '.fox', 'fox/jump_', '.png')
      setTimeout(() => {
        foxConfig.jump = false
        switchAnimation()
      }, foxConfig.timeJump)
    } else if (!foxConfig.jump && !dafthAnimation|| !currentAnimation && !dafthAnimation) {
      sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')
    }
  }

  if (dafthAnimation) {
    console.log('Работает смерть!')
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

// Start

onLoad()

function onLoad() {
  if (gameMove) sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')
  if (!gameMove) sprintsForMove(6, 100, '.fox', 'fox/death_', '.png')
  animate()
}

// Events
document.addEventListener('click', () => {
  startGame()

  if (isJumpingAmimation && spaceStop) {
    spaceStop = false
    foxConfig.jump = true
    switchAnimation()
    setTimeout(() => {
      spaceStop = true
    }, foxConfig.timeJump - 10)
  }

  if (!isJumpingAmimation) isJumpingAmimation = true

  if (isJumping) {
    if (!foxLayer.jumping && gameMove) {
      foxLayer.jumping = true
    }
  } else isJumping = true

  if (!gameMove && document.querySelector('.game_over')) {
    reload()
  }
})

document.addEventListener('keydown', (event) => {
  startGame()

  if (event.keyCode == 32 && spaceStop || event.keyCode == 38 && spaceStop) {
    spaceStop = false
    foxConfig.jump = true
    switchAnimation()
    setTimeout(() => {
      spaceStop = true
    }, foxConfig.timeJump - 10)
  }

  if (event.keyCode == 32 || event.keyCode == 38) {
    if (!foxLayer.jumping) {
      foxLayer.jumping = true
    }
  }
})

// Utils

function reload() {
  location.reload()
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function playSound(sound) {
  const audio = new Audio(`./sounds/${sound}.wav`)
  audio.play()
}

// Buttons copy and new Game
const copyContent = async () => {
  try {
    if (countValue < count_for_win) return
    await navigator.clipboard.writeText(key)
    console.log('Content copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}