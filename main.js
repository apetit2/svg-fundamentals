const CONSTANTS = {
  upperEyeLidXStart: 60,
  upperEyeLidYStart: 275,
  upperEyeLidXHalfWay: 220,
  upperEyeLidXStep: 9.72,
  svgType: 'http://www.w3.org/2000/svg',
};

const eyeColors = ['#B8D8E1', '#357388', 'purple', 'red', 'green', 'brown'];

const createPolygon = () => document.createElementNS(CONSTANTS.svgType, 'polygon');

/**
 * Cycles through different eye colors
 */
const cycleThroughEyeColors = () => {
  const innerColor = document.querySelector('#inner-color');
  const outerColor = document.querySelector('#outer-color');
  innerColor.setAttribute(
    'stop-color',
    eyeColors[Math.floor(Math.random() * 6)]
  );
  outerColor.setAttribute(
    'stop-color',
    eyeColors[Math.floor(Math.random() * 6)]
  );
};

/**
 * Adds all the eye lashes to the eye
 */
const addEyeLashes = () => {
  const eyeLashGroup = document.querySelector('#eye-lash-group');
  const upperEyeLid = document.querySelector('#upper-eyelid');

  let index = 0;
  while (index < 100) {
    const eyeLash = createPolygon();

    const xLength = index * CONSTANTS.upperEyeLidXStep;

    const x1 = upperEyeLid.getPointAtLength(xLength).x;
    const x2 = upperEyeLid.getPointAtLength(xLength + 10).x;
    const y1 = upperEyeLid.getPointAtLength(xLength).y;
    const y2 = upperEyeLid.getPointAtLength(xLength + 10).y;

    const y3 = y1 + 50;
    let x3;
    if (x1 < CONSTANTS.upperEyeLidXHalfWay) {
      x3 = x1 - 10;
    } else {
      x3 = x1 + 10;
    }

    eyeLash.setAttribute('points', `${x1},${y1}, ${x2},${y2}, ${x3},${y3}`);
    eyeLashGroup.appendChild(eyeLash);
    index++;
  }

  // build the eye lash for the weird transition
  const eyeLash = createPolygon();
  const x1 = upperEyeLid.getPointAtLength(190).x;
  const x2 = upperEyeLid.getPointAtLength(200).x;
  const x3 = 220;
  const y1 = upperEyeLid.getPointAtLength(190).y;
  const y2 = upperEyeLid.getPointAtLength(200).y;
  const y3 = y1 + 50;
  eyeLash.setAttribute('points', `${x1},${y1}, ${x2},${y2}, ${x3},${y3}`);
  
  eyeLashGroup.appendChild(eyeLash);
};

window.addEventListener('DOMContentLoaded', () => {
  addEyeLashes();

  setInterval(cycleThroughEyeColors, 500);
});
