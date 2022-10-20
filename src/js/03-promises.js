import Notiflix from 'notiflix';

let formValues = {};

const form = document.querySelector('.form');

form.addEventListener('submit', formSubmitOn);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

function formSubmitOn(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.currentTarget);

  for (let [name, value] of formData) {
    formValues[name] = value;
  }

  let delay = Number(formValues.delay);
  let step = Number(formValues.step);
  let amount = Number(formValues.amount);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}