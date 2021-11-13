function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const bodyEl = document.querySelector('body')
const startBtn= document.querySelector('button[data-start]');
const stopBtn= document.querySelector('button[data-stop]');
// console.log(bodyEl)
// console.log(btnStart)
// console.log(btnStop)
stopBtn.disabled = true;
startBtn.addEventListener("click", startClick);
stopBtn.addEventListener('click', stopClik)
 function startClick(){
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor()
        bodyEl.style.backgroundColor = color;
      }, 1000);
    };

    function stopClik(){
        startBtn.disabled = false;
        stopBtn.disabled = true;
        clearTimeout(timerId);
    }
  

