import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
iziToast.show({
  title: 'Hello',
  titleColor: '#FFF',
  message: 'Welcome',
  messageColor: '#FFF',
  backgroundColor: '#09F',
});

const form = document.querySelector('.form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = form.elements.delay.value;
  const status = form.elements.state.value;
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (status === 'fulfilled') {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        titleColor: '#fff',
        messageColor: '#fff',
        backgroundColor: '#59a10d',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        titleColor: '#fff',
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
      });
    });
  form.reset();
});