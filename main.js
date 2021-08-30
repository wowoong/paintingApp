const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const range = document.querySelector('#jsRange');
const mode = document.querySelector('#jsMode');
const save = document.querySelector('#jsSave');

const DEFAULT_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

function handleClolrClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function modeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'Paint Download';
  link.click();
}
if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handleCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}
colors.forEach(color => color.addEventListener('click', handleClolrClick));

if (range) {
  range.addEventListener('input', handleRange)
}

mode.addEventListener('click', modeClick);

if (save) {
  save.addEventListener('click', handleSaveClick)
}