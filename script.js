var svg = d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 1160)
const paragraph = d3.select("body").append("p")
 d3.json("places.geojson", async function(error, data) {
   let features = [];
   const millisecondsToWait = 500;
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
     const description = data.features[i].description;
     if(description){
      paragraph.text(description);
     }
     await sleep(millisecondsToWait);
   };
  });
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
