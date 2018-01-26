var spaceData = null;


const flowersUri = 'flower.json'
const astronautsUri = 'http://api.open-notify.org/astros.json'
// owm key == c247295636ec9d96b4eb28186693ebb3
const openWeatherUri = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=c247295636ec9d96b4eb28186693ebb3'


const wordnikUri1 = 'http://api.wordnik.com/v4/word.json/'
let word = 'rainbow'
const wordnikUri2 = '/relatedWords?useCanonical=false&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'

let input;

function setup() {
  // createCanvasCustom();
  noCanvas();
  input = createInput('rainbow')
  createButton('fetch').mousePressed(askWordnik)
  noLoop();
}

function askWordnik() {
  const uri = wordnikUri1 + input.value() + wordnikUri2
  loadJSON(uri, data => {
    spaceData = data;
    console.log(data)
    // input.value(data[0].words[0])
    input.value(random(random(data).words))
  });  
}

function draw() {
  background(0);
  if(spaceData) {
    console.log(spaceData)

    // randomSeed(42)
    // for(let i = 0; i < spaceData.number; i++) {
    //   fill(255);
    //   ellipse(random(width), random(height), 16)
    // }
    noLoop()
  }

}