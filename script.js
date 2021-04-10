let features = [];
const MILLISECONDS_TO_WAIT = 1500;
const X_TRANSLATE = -40;
const Y_TRANSLATE = -20;
const svg = d3.select("body")
	.append("svg");
const card = createCard(); 
d3.select(window).on("resize", sizeChange);
// d3.json("places.geojson", (error, data) => {
// 	for(let i = 0; i < data.features.length; i++){
// 	   features.push(data.features[i]);
// 	   updateMap(features, svg);
// 	   sizeChange();
// 	};
// });

d3.json("events.geojson", async function(error, data) {
	for(let i = 0; i < data.features.length; i++){
	   features.push(data.features[i]);
	   updateMap(features, svg);
	   updateCard(data.features[i], card);
	   sizeChange();
	   await sleep(MILLISECONDS_TO_WAIT);
	};
});

function sizeChange() {
  d3.selectAll("g").attr("transform", `translate(${X_TRANSLATE}, ${Y_TRANSLATE}) scale(${$("body").width()/600})`);
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
  const eventText = body.append("h5")
  	.attr("class", "card-text");
  const locationText = body.append("h6")
  	.attr("class", "card-text");
  return { title, eventText, locationText, image };
}

function updateMap(features, svg){
	const fill = features[0].event ? "steelblue" : "none"
	const group = svg.selectAll("g")
		.data(features)
		.enter()
		.append("g");
  	const projection = d3.geo.mercator();
  	const path = d3.geo.path().projection(projection);
  	const areas = group.append("path")
  		.attr("d", path)
  		.attr("class", "area")
		.style("border", 1)
		.style("fill", fill);
}

const updateCard = async (feature, card) => {
	let img = feature.img;
  	if(!img){
		img = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
	}
  	card.image.attr("src", img);
	// The image takes a while to load so waiting for the image to load
	await sleep(100);
	const name = feature.name;
	if(name){
		card.title.text(name);
	}
	const paragraph = createParagraph(feature);
	card.eventText.text(paragraph);
	if(feature.location){
		card.locationText.text(feature.location);
	}
};

function createParagraph(feature) {
 if(!feature.event || !feature.dateOfEvent){
	 return "";
 }
 else {
	 const event = feature.event == "Death" ? "Passed" : feature.event;
	 return `${event}: ${feature.dateOfEvent}`;
 }
}
