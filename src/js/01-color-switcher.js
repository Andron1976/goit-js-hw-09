const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
  };
console.log(refs.startButton);
console.log(refs.stopButton);
let intervalId = null;
refs.stopButton.disabled = true;

function getRandomColor() {
    return `#${Math.floor(Math.random()*16777215).toString(16)}`
};

refs.startButton.addEventListener('click', () => {
    refs.startButton.disabled = true;
    refs.stopButton.disabled = false;

    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = `${getRandomColor()}`;
    }, 1000);
})

refs.stopButton.addEventListener('click', () => {
    clearInterval(intervalId);
    refs.startButton.disabled = false;
    refs.stopButton.disabled = true;
});