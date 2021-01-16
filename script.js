const card = buildCard();
let features = [];
const millisecondsToWait = 500;
const svg = d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 580);
d3.json("places.geojson", async function(error, data) {
   for(let i = 0; i < data.features.length; i++){
    features.push(data.features[i])
    var group = svg.selectAll("g")
      .data(features)
      .enter()
      .append("g");

    var projection = d3.geo.mercator();
    var path = d3.geo.path().projection(projection);

    var areas = group.append("path")
      .attr("d", path)
      .attr("class", "area")
      .attr("fill", "steelblue");
    fillCard(data, card);
    await sleep(millisecondsToWait);
   };
  });
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
function buildCard() {
  const card = d3.select("body").append("div")
    .attr("class", "card")
    .attr("style", "width: 18rem;");
  const image = card.append("img")
    .attr("class", "card-image-top");
  const cardBody = card.append("div")
    .attr("class", "card-body");
  const header = cardBody.append("h5")
    .attr("class", "card-title");
  const paragraph = cardBody.append("p")
    .attr("class", "card-text");
  return { card, cardBody, header, paragraph, image };
}
function buildParagraph(data) {
 if(!data.event || !data.dateOfEvent || !data.location){
  return "";
 }
 else {
  return `${data.event}: ${data.dateOfEvent}
${data.location}`;
 }
}
function fillCard(data, card){
   const img = data.features[i].img;
   if(img){
     card.image.attr("src", img);
   }
   const name = data.features[i].name;
   if(name){
     card.header.text(name);
   }
   const paragraph = buildParagraph(data.features[i]);
   card.paragraph.text(paragraph);
}
