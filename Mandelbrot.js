let AllData;
let startIndex = 190012;
let endIndex = 200012;
let count = 0;
let yPosition = 0;
let xPosition = 0;
let div = 0;
let prevX = 0;
let prevY = 0;

function preload() {
  AllData = loadJSON(
    "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/national/time-series/110-pcp-ytd-12-1895-2016.json?base_prd=true&begbaseyear=1901&endbaseyear=2000"
  );
}
function handleData(thisYear) {
  //console.log(thisYear.value)

  //rotate(25 * count);
  if (thisYear.anomaly < 0) {
    stroke(255, 0, 0);
  } else {
    stroke(0, 255, 0);
  }

  line(xPosition, 0, xPosition, -thisYear.value * 10);

  stroke(255);
  fill(255);
  //place year at the base of the line
  text(String(startIndex).slice(0, 4), xPosition, 0);
  
  //Draw line connecting the peaks
  line(prevX, prevY, xPosition, -thisYear.value * 10);
  prevX = xPosition;
  prevY = -thisYear.value * 10;
  count++;
}

function handleFailure(error) {
  console.log("Error", 100, 100);
}

function setup() {
  createCanvas(580, 400);
  strokeWeight(1);
  stroke(0);
  frameRate(60);
  background(200);
  angleMode(DEGREES);
  div = (endIndex - startIndex) / 100;
}

function draw() {
  const tempData = AllData.data[String(startIndex)];

  if (tempData === undefined) {
    text("No data returned", 0, 0);
    noLoop();
    return;
  }

  if (startIndex <= endIndex) {
    translate(0, height - 20);

    xPosition = width / div + xPosition;
    handleData(tempData);

    startIndex = startIndex + 100;
  }
}
