function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const transitionDelay = 1000;
let colorSwitcher = null;

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
};

refs.startButton.addEventListener('click', startButtonClickOn);
refs.stopButton.addEventListener('click', stopButtonClickOn);

function startButtonClickOn() {
  colorSwitcher = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log('color switcher ON');
  }, transitionDelay);

  refs.startButton.disabled = colorSwitcher;
}

function stopButtonClickOn() {
  clearInterval(colorSwitcher);
  refs.startButton.disabled = !colorSwitcher;
  console.log('color switcher OFF');
}