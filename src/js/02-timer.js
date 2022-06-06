import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    selectorPicker: document.querySelectorAll('#datetime-picker'),
    startTimer: document.querySelector('button[data-start]'),
    dataDays: document.querySelector('span[data-days]'),
    dataHours: document.querySelector('span[data-hours]'),
    dataMinutes: document.querySelector('span[data-minutes]'),
    dataSeconds: document.querySelector('span[data-seconds]'),
};

refs.startTimer.disabled = true;
let userDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            Notiflix.Notify.failure('Please choose a date in the future'); 
        } else {
            refs.startTimer.disabled = false;
        } 
        userDate = selectedDates[0];    
    },
  };

flatpickr(refs.selectorPicker, options);  

let timeId = null;

refs.startTimer.addEventListener('click', clickStartTimer);

function clickStartTimer() {
    timeId = setInterval(() => {
        const diff = userDate - new Date();

        if(diff <= 0) {
            clearInterval(timeId);
            return;
        }
        setTimeStart();
    }, 1000);
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
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function pad(value) {
    return String(value).padStart(2, '0');
}

function setTimeStart() {
    const { days, hours, minutes, seconds } = convertMs(userDate - new Date());

    refs.dataDays.textContent = pad(days);
    refs.dataHours.textContent = pad(hours);
    refs.dataMinutes.textContent = pad(minutes);
    refs.dataSeconds.textContent = pad(seconds);

}