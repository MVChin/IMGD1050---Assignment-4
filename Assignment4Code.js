let AllData;
let startIndex = 190012;
let endIndex = 200012;
let count = 0;
let yPosition = 0;
let xPosition = 0;

function preload() {
  AllData = loadJSON(
    "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/national/time-series/110-pcp-ytd-12-1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000"
  );
}
function handleData(thisYear) {
  //console.log(thisYear.value)

  rotate(25 * count);
  if (thisYear.anomaly < 0) {
    fill(255, 0, 0);
  } else {
    fill(0, 255, 0);
  }

  circle(xPosition, yPosition, thisYear.value);

  fill(255);
  //rotate(-45*count)
  text(startIndex, xPosition, yPosition);
  count++;
}

function handleFailure(error) {
  console.log("Error", 100, 100);
}

function setup() {
  createCanvas(500, 500);
  strokeWeight(2);
  stroke(0);
  frameRate(60);
  background(200);
  angleMode(DEGREES);
}

function draw() {
  const tempData = AllData.data[String(startIndex)];

  if (tempData === undefined) {
    text("No data returned", 0, 0);
    noLoop();
    return;
  }

  if (startIndex <= endIndex) {
    translate(width / 2, height / 2);

    xPosition = width / 100 + xPosition;
    yPosition = height / 100 + yPosition;
    handleData(tempData);

    startIndex = startIndex + 100;
  }
}
