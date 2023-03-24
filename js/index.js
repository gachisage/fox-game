
  const $ = (selector) => document.querySelector(selector)
  const fox = $('.fox')
  const snowman = $('.snowman')
  const ground = $('.ground')
  const mountains = $('.mountains')
  const many_trees = $('.many_trees')


  console.log('hi');
  movefox()

  function movefox(){
    sprintsForMove(5, 100, '.fox', 'fox/run_','.png')
  }

  function sprintsForMove(count, int, selector, path1, path2){
    let currentImage = 1
    const imageCount = count
    const intervalTime = int
    const loaderImage = $(selector)
    let lastTime = 0;

    function switchImage(timestamp) {
      const deltaTime = timestamp - lastTime;
      if (deltaTime >= intervalTime) {
        currentImage = currentImage === imageCount ? 1 : currentImage + 1
        loaderImage.src = `${path1}${currentImage}${path2}`
        lastTime = timestamp;
      }
      requestAnimationFrame(switchImage)
    }
    requestAnimationFrame(switchImage)
  }
