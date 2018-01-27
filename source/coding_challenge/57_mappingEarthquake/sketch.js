
const mapboxApiKey = 'pk.eyJ1Ijoibml0aXNocHVyaSIsImEiOiI1NzQyNmQ3ODM1ZjkxZTk3MmE3NjdmYzVjMjEwOGE5OCJ9.nUSDHpSGPTDuw6YCzCPjtw'

var mapimg;

var clat = 0;
var clong = 0;

var ww = 1024;
var hh = 512;

var zoom = 1;
var earthquakes;

function preload() {
  var imgUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + clong + ',' +
    clat + ',' + zoom + '/' + ww + 'x' + hh + '?access_token=' + mapboxApiKey;

  mapimg = loadImage(imgUrl);
  earthquakes = loadStrings('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
}

function mercX(lon) {
  lon = radians(lon);
  const a = (256 / PI) * pow(2, zoom);
  const b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  const a = (256 / PI) * pow(2, zoom);
  const b = tan(PI / 4 + lat / 2);
  const c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvasCustom()
  translate(width / 2, height / 2);
  imageMode(CENTER);
  // image(mapimg, 0, 0);
  image(mapimg, 0, 0, width, height);

  const cx = mercX(clong);
  const cy = mercY(clat);

  earthquakes.forEach(e => {
    const data = e.split(/,/);
    const lat = data[1];
    const long = data[2];
    let mag = data[4];

    // const x = mercX(long) - cx;
    // const y = mercY(lat) - cy;
    const x = map(mercX(long) - cx, 0, ww, 0, width);
    const y = map(mercY(lat) - cy, 0, hh, 0, height);
    if (x < -width / 2) {
      x += width
    }
    else if (x > width / 2) {
      x -= width
    }

    mag = pow(10, mag);
    mag = sqrt(mag);
    const magmax = sqrt(pow(10, 10));
    const d = map(mag, 0, magmax, 0, 180);
    stroke(255, 0, 255);
    fill(255, 0, 255, 200);
    ellipse(x, y, d);
  });

  noLoop();
}
