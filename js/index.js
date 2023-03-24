  const $ = (selector) => document.querySelector(selector)
  const fox = $('.fox')
  const snowman = $('.snowman')
  const ground = $('.ground')
  const mountains = $('.mountains')
  const back_mountains = $('.back_mountains')
  const many_trees = $('.many_trees')
  const background = $('#background')
  const count = $('#count')

  const ground_double = $('.doubleground')
  const mountains_double = $('.doublemountains')
  const many_trees_double = $('.doublemanytree')
  const back_mountains_double = $('.doublemountainsback')
  const tree_double = $('.doubletree')

  let currentAnimation = null;
  let fox_config = {
    jump: false,
    timeJump: 1000,
  };

  const config = {
    speed_ground : 1.5,
    wDoc         : background.clientWidth,
    posX1_ground : 0,
    posX2_ground : background.clientWidth,
    speed_mount  : 0.5,
    posX1_mount  : 0,
    posX2_mount  : background.clientWidth,
    speed_mount_back  : 0.3,
    posX1_mount_back  : 0,
    posX2_mount_back  : background.clientWidth,
    speed_mount_back  : 1,
    posX1_mount_back  : 0,
    posX2_mount_back  : background.clientWidth,
  }


  animateMount()
  animateGround()
  animateMountBack()
  jumpFox()
  sprintsForMove(5, 100, '.fox', 'fox/run_', '.png')





  function animateGround(){

    if(config.posX1_ground > - config.wDoc)
    config.posX1_ground = config.posX1_ground - config.speed_ground;
    ground.style.left = config.posX1_ground + 'px'

    if(config.posX1_ground < - config.wDoc + 1){
      config.posX1_ground = 0
      ground.style.left = config.posX1_ground + 'px'
    }

    if(config.posX2_ground > 0){
      config.posX2_ground = config.posX2_ground - config.speed_ground;
      ground_double.style.left = config.posX2_ground + 'px'
    }

    if(config.posX2_ground < 0 + 1){
      config.posX2_ground = background.clientWidth
      ground_double.style.left = config.posX2_ground + 'px'
    }

    requestAnimationFrame(animateGround)
  }

  function animateMount(){

    if(config.posX1_mount > - config.wDoc)
    config.posX1_mount -= config.speed_mount;
    mountains.style.left = config.posX1_mount + 'px'

    if(config.posX1_mount < - config.wDoc + 1){
      config.posX1_mount = 0
      mountains.style.left = config.posX1_mount + 'px'
    }

    if(config.posX2_mount > 0){
      config.posX2_mount -= config.speed_mount;
      mountains_double.style.left = config.posX2_mount + 'px'
    }

    if(config.posX2_mount < 0 + 1){
      config.posX2_mount = background.clientWidth
      mountains_double.style.left = config.posX2_mount + 'px'
    }
    requestAnimationFrame(animateMount)
  }

  function animateMountBack(){

    if(config.posX1_mount_back > - config.wDoc)
    config.posX1_mount_back -= config.speed_mount_back;
    back_mountains.style.left = config.posX1_mount_back + 'px'

    if(config.posX1_mount_back < - config.wDoc + 1){
      config.posX1_mount_back = 0
      back_mountains.style.left = config.posX1_mount_back + 'px'
    }

    if(config.posX2_mount_back > 0){
      config.posX2_mount_back -= config.speed_mount_back;
      back_mountains_double.style.left = config.posX2_mount_back + 'px'
    }

    if(config.posX2_mount_back < 0 + 1){
      config.posX2_mount_back = background.clientWidth
      back_mountains_double.style.left = config.posX2_mount_back + 'px'
    }
    requestAnimationFrame(animateMountBack)
  }

  function jumpFox(){
    window.addEventListener('keydown', (event) => {

      if(event.keyCode == 32 || event.keyCode == 38) {
        jump()
        fox_config.jump = true;
        switchAnimation();

        setTimeout(() => {
          jump()
        }, fox_config.timeJump)
      }
    })
    window.addEventListener('click', () => {

        jump()
        fox_config.jump = true;
        switchAnimation();

        setTimeout(() => {
          jump()
        }, fox_config.timeJump)

    })
  }


  function jump(){
    fox.classList.toggle('jump')
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

function switchAnimation() {
  if (currentAnimation) {
    cancelAnimationFrame(currentAnimation);
    currentAnimation = null;
  }
  if (fox_config.jump) {
    sprintsForMove(6, 100, '.fox', 'fox/jump_', '.png');
    setTimeout(() => {
      fox_config.jump = false;
      switchAnimation()
    }, fox_config.timeJump);
  } else {
    sprintsForMove(5, 100, '.fox', 'fox/run_', '.png');
  }
}





  // console.log(config.posX1_mount, mountains, config.posX2_mount, mountains_double);
  // function animateMount(){
  //   animateBack(config.posX1_mount, mountains, config.posX2_mount, mountains_double)
  // }


  // function animateBack(posX1, element, posX2, element_double){

  //   if(posX1 > - config.wDoc)
  //   posX1 -= config.speed;
  //   element.style.left = posX1 + 'px'

  //   if(posX1 < - config.wDoc + 1){
  //     posX1 = 0
  //     element.style.left = posX1 + 'px'
  //   }

  //   if(posX2 > 0){
  //     posX2 -= config.speed;
  //     element_double.style.left = posX2 + 'px'
  //   }

  //   if(posX2 < 0 + 1){
  //     posX2 = background.clientWidth
  //     element_double.style.left = posX2 + 'px'
  //   }
  //   requestAnimationFrame(animateBack)
  // }



  // function hi(posX1, element){
  //   element.style.left = posX1 + 'px'
  // }

  // hi(100, count)


  function createRandomElement() {
    // function createElement(){
    //   const element = document.createElement('img');

    // }


    const delay = Math.floor(Math.random() * 1000) + 2000; // рандомное время задержки от 5 до 10 секунд
    setTimeout(() => {
      const element = document.createElement('img');
      element.classList.add('snowman');
      element.classList.add('thing');
      element.setAttribute('src', 'source/snowman.png')
      background.append(element);
      element.src = "source/snowman.png"

      let position = background.clientWidth; // начальная позиция элемента справа от экрана
      const interval = setInterval(() => {
        position -= 1.5; // шаг перемещения элемента
        element.style.transform = `translateX(${position}px)`; // перемещаем элемент
        if (position < -background.clientWidth) {
          clearInterval(interval); // останавливаем перемещение, когда элемент ушел за левую грань экрана
          background.removeChild(element); // удаляем элемент из DOM
        }
      }, 16); // частота обновления экрана (60 кадров в секунду)
    }, delay);
  }

  setInterval(createRandomElement, 7000)
