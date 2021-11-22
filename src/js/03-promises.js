import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')
const delayEl =document.querySelector(`[name = delay]`)
const stepEl = document.querySelector(`[name = step]`)
const amountEl = document.querySelector(`[name = amount]`)
formEl.addEventListener('submit', onFormSubmit);

let delay = 0;
let position = 0;
function onFormSubmit(evt) {
  evt.preventDefault();

  
  let firstDelay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);
  
  for (let i = 1; i <= amount; i += 1) {
      if (i === 1) {
        delay = firstDelay;
      } else {
        delay += step;
      }
      position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
    
  }
}
   

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
     } else {
        reject({ position, delay })
      }
    },delay);
  })
}