import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formPromise = document.querySelector('form');
const delayInput = document.querySelector('input[type="number"]');
const fulfilledRadio = document.querySelector('input[value="fulfilled"]');
const rejectedRadio = document.querySelector('input[value="rejected"]');
const submitButton = document.querySelector('button');

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

formPromise.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const state = fulfilledRadio.checked ? 'fulfilled' : 'rejected';

  createPromise(delay, state)
    .then(value => {
      iziToast.success({
        title: '',
        message: `✅ Fulfilled promise in ${value}ms`,
      });
    })
    .catch(value => {
      iziToast.error({
        title: '',
        message: `❌ Rejected promise in ${value}ms`,
      });
    })
    .finally(() => {
      formPromise.reset();
    });
});
