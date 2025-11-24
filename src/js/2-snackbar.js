
window.addEventListener('DOMContentLoaded', () => {
  
  const hasIzi = typeof window.iziToast === 'object' || typeof window.iziToast === 'function';
  if (!hasIzi) {
    console.warn('iziToast JS не знайдено. Повідомлення будуть через alert як фолбек.');
  }

  const form = document.querySelector('.form');
  if (!form) {
    console.error('Форма .form не знайдена в DOM. Додай форму у HTML.');
    return;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stateInput = form.querySelector('input[name="state"]:checked');

    if (!delayInput) {
      console.error('Інпут delay не знайдено.');
      return;
    }
    if (!stateInput) {
      
      showMessage('error', 'Please choose a state (fulfilled or rejected).');
      return;
    }

    const delay = Number(delayInput.value);
    const state = stateInput.value;

    if (!Number.isFinite(delay) || delay < 0) {
      showMessage('error', 'Please enter a valid non-negative delay in ms.');
      return;
    }

   
    console.log(`Creating promise: state=${state}, delay=${delay}ms`);

    createPromise(delay, state)
      .then(ms => {
        const text = `✅ Fulfilled promise in ${ms}ms`;
     
        showMessage('success', text);
      })
      .catch(ms => {
        const text = `❌ Rejected promise in ${ms}ms`;
      
        showMessage('error', text);
      });
  });

 
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

 
  function showMessage(type, message) {
    if (hasIzi && window.iziToast) {
      if (type === 'success') {
        iziToast.success({ title: 'Success', message, position: 'topRight' });
      } else if (type === 'error') {
        iziToast.error({ title: 'Error', message, position: 'topRight' });
      } else {
        iziToast.info({ title: 'Info', message, position: 'topRight' });
      }
    } else {
      
      if (type === 'error') {
        alert('Error: ' + message);
      } else {
        alert(message);
      }
    }
  }
});
