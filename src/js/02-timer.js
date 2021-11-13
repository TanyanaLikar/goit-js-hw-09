import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const input = document.querySelector("#datetime-picker")
const startBtn = document.querySelector('[data-start]')
const timerEl = document.querySelector('.timer')
const refs = {
    days:document.querySelector('[data-days]'),
    hours:document.querySelector('[data-hours]'),
    minutes:document.querySelector('[data-minutes]'),
    seconds:document.querySelector('[data-seconds]')
}
startBtn.disabled = true;
const timer = {
    start(){
        const startTime = Date.now();
        timeId = setInterval(() =>{
            const currentTime = Date.now();
            const deltaTime = currentTime - startTime;
            const time = convertMs(deltaTime);
            updateTimer(time)
        },1000);
    }
       
}




// flatpickr(selector, options)
// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       console.log(selectedDates[0]);
//     },
//   };
function updateTimer({hours,minutes,seconds}){
    refs.clockfase.textContent = `${hours}:${minutes}:${seconds}`
}
function pad(value) {
    return String(value).padStart(2, '0');
}
  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute)) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}