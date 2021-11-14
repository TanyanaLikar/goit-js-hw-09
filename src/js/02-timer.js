import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector('#datetime-picker'),
    start: document.querySelector('button[data-start]'),
    timer: document.querySelector('timer'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}


refs.start.setAttribute(`disabled`, false);

flatpickr('#datetime-picker', {   
    enableTime: true,    
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,   
    onClose(selectedDates) {
        
        refs.start.setAttribute(`disabled`, false);
        const date = new Date();
        if (selectedDates[0] <= date) {
            return Notiflix.Notify.failure('Please choose a date in the future');
        }
        refs.start.removeAttribute(`disabled`);
        refs.start.addEventListener('click', handleStartTimer);
            function handleStartTimer() {
                const currentTime = selectedDates[0].getTime();
                refs.start.setAttribute(`disabled`, false);
                refs.input.setAttribute(`disabled`, false);
            const StartTimeTimer = setInterval(() => {
                const deltaTime = currentTime - (new Date()).getTime();
                const time = convertMs(deltaTime)
                if (currentTime - new Date > 0) {
                    updateTime(time)
                } 
                else {
                    clearInterval(StartTimeTimer)
                }
            
            }, 1000);
        }
        
    },
})
    

function updateTime({ days, hours, minutes, seconds }) {
            refs.days.textContent = `${days}`;
            refs.hours.textContent = `${hours}`;
            refs.minutes.textContent = `${minutes}`;
            refs.seconds.textContent = `${seconds}`;
            
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
  const seconds =pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}