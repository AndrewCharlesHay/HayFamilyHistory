let features = [];
const MILLISECONDS_TO_WAIT = 500;
const svg = d3.select("body")
	.append("svg")
const card = createCard(); 
d3.select(window).on("resize", sizeChange);
d3.json("places.geojson", async function(error, data) {
	for(let i = 0; i < data.features.length; i++){
	   features.push(data.features[i]);
	   updateMap(features, svg);
	   updateCard(data.features[i], card);
	   sizeChange();
	   await sleep(MILLISECONDS_TO_WAIT);
   };
});

function sizeChange() {
  d3.selectAll("g").attr("transform", "scale(" + $("body").width()/600 + ")");
	$("svg").height($("body").width()*0.35);
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

function createCard() {
  const card = d3.select("body").append("div")
  	.attr("class", "card");
  const row = card.append("div")
  	.attr("class", "container");
  const imgCol = row.append("div")
  	.attr("class", "c1");
  const bodyCol = row.append("div")
  	.attr("class", "c2");
  const image = imgCol.append("img")
  	.attr("class", "card-image-top");
  const body = bodyCol.append("div")
  	.attr("class", "card-body");
  const title = body.append("h2")
  	.attr("class", "card-title");
  const text = body.append("h5")
  	.attr("class", "card-text");
  return { title, text, image };
}

function updateMap(features, svg){
  const group = svg.selectAll("g")
    .data(features)
    .enter()
    .append("g");
  const projection = d3.geo.mercator();
  const path = d3.geo.path().projection(projection);

  const areas = group.append("path")
    .attr("d", path)
    .attr("class", "area")
    .attr("fill", "steelblue");
}

function updateCard(feature, card){
  const img = feature.img;
  if(img){
    card.image.attr("src", img);
  }
  const name = feature.name;
  if(name){
    card.title.text(name);
  }
  const paragraph = createParagraph(feature);
  card.text.text(paragraph);
}

function createParagraph(data) {
 if(!data.event || !data.dateOfEvent || !data.location){
  return "";
 }
 else {
  return `${data.event}: ${data.dateOfEvent}
${data.location}`;
 }
}
