(function () {
  const startBtn = document.querySelector("[data-start]");
  const input = document.querySelector("#datetime-picker");

  const daysEl = document.querySelector("[data-days]");
  const hoursEl = document.querySelector("[data-hours]");
  const minutesEl = document.querySelector("[data-minutes]");
  const secondsEl = document.querySelector("[data-seconds]");

  let userSelectedDate = null;
  let timerId = null;

  function showError(message) {
    if (window.iziToast) {
      iziToast.error({ title: "Error", message, position: "topRight" });
    } else {
      alert(message);
    }
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function updateTimer({ days, hours, minutes, seconds }) {
    daysEl.textContent = String(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }

  if (typeof flatpickr !== "function") {
    console.error("Flatpickr not loaded");
    return;
  }

  flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
      const selected = selectedDates[0];

      if (!selected || selected <= new Date()) {
        showError("Please choose a date in the future");
        startBtn.disabled = true;
        return;
      }

      userSelectedDate = selected;
      startBtn.disabled = false;
    }
  });

  startBtn.addEventListener("click", () => {
    if (!userSelectedDate) return;

    startBtn.disabled = true;
    input.disabled = true;

    tick();
    timerId = setInterval(tick, 1000);

    function tick() {
      const diff = userSelectedDate - new Date();

      if (diff <= 0) {
        clearInterval(timerId);
        timerId = null;
        updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        input.disabled = false;
        startBtn.disabled = true;
        return;
      }

      updateTimer(convertMs(diff));
    }
  });
})();