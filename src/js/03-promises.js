import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', didSubmit);

function didSubmit(el) {
  el.preventDefault();

  const inputItems = el.currentTarget.elements;

  let amount = Number(inputItems.amount.value);
  let delay = Number(inputItems.delay.value);
  let step = Number(inputItems.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
    .then(({ i, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
    })
    .catch(({ i, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
    });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
