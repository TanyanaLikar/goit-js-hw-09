import Notiflix from 'notiflix';

let delay = 0;
let position = 0;
const formEl = document.querySelector('.form')
const delayEl =document.querySelector(`[name = delay]`)
const stepEl = document.querySelector(`[name = step]`)
const amountEl = document.querySelector(`[name = amount]`)

formEl.addEventListener('submit', onFormSubmit);


function onFormSubmit(event){
  event.preventDefault();
  
  let firstDelay = Number(delayEl.value);
  let step = Number(stepEl.value);
  let amount = Number(amountEl.value);

  makeMultiplePromises(firstDelay, step, amount); 
  formEl.reset()
  delay = 0;
}
function makeMultiplePromises (firstDelay, step, amount){
  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      delay = firstDelay;
    } else {
      delay += step;
    }
    position = i;
    
createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);  });
   
}
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve,reject) =>{

   setTimeout(() =>{
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  }, delay)
 })
 return promise;
} ;
