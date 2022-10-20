import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startButton.addEventListener('click', startButtonClickOn);
refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectDateUTC = selectedDates[0].getTime();
    const todaysDate = Date.now();

    if (selectDateUTC <= todaysDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else refs.startButton.disabled = false;
  },
};

flatpickr('input#datetime-picker', options);
const inputFlatpickr = document.querySelector(
  'input#datetime-picker'
)._flatpickr;

function startTimer() {
  const timeId = setInterval(() => {
    const timeNow = Date.now();
    const timeSelect = inputFlatpickr.selectedDates[0].getTime();
    const delay = timeSelect - timeNow;
    const timeDelay = convertMs(delay);
    refreshContentsClock(timeDelay);

    const { days, hours, minutes, seconds } = timeDelay;

    if (days === 0 && hours === '00' && minutes === '00' && seconds === '00') {
      clearInterval(timeId);
    }
  }, 1000);
}

function startButtonClickOn() {
  startTimer();
  refs.startButton.disabled = true;
}

function setInitialNumber(value) {
  return String(value).padStart(2, '0');
}

function refreshContentsClock({ days, hours, minutes, seconds }) {
  refs.daysField.innerText = `${days}`;
  refs.hoursField.innerText = `${hours}`;
  refs.minutesField.innerText = `${minutes}`;
  refs.secondsField.innerText = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = setInitialNumber(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = setInitialNumber(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = setInitialNumber(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}