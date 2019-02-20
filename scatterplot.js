d3.csv("movies.csv").then(function (dataset) {
    
    dataset.forEach(function (d) {
        d.Rating = +d.Rating;
        d.WinsNoms = +d.WinsNoms;
        d.IsGoodRating = +d.IsGoodRating;
        d.Budget = +d.Budget;
        d.Votes = +d.Votes;
    });
    var w = 600;
    var h = 400;
    var padding = 40;

    var xScaleRating = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Rating;
        })]).range([padding, w - padding * 2]);

    var yScaleWinsNoms = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.WinsNoms;
        })]).range([h - padding, padding]);
    
    // Define X axis
    var xAxisRating = d3.axisBottom(xScaleRating).ticks(10);
    //Define Y axis
    var yAxisWinsNoms = d3.axisLeft(yScaleWinsNoms).ticks(10);

    //////////////////////////////////////////////////////////////// CHART 1/////////////////////////////////////////////////////////////////

    //Create SVG element
    var svg1 = d3.select("body").append("svg").attr("width", w).attr("height", h);
    //draw points
    svg1.selectAll(".point").data(dataset)
        .enter().append("path").attr("class", "point")
        .attr("d", d3.symbol().size(40).type(d => d.IsGoodRating == 0 ? d3.symbolCircle : d3.symbolCross))
        .attr("fill", "none")
        .attr("stroke", d => d.IsGoodRating ? "red" : "blue")
        .attr('transform', function (d) {
            return "translate(" + xScaleRating(d.Rating) + "," + yScaleWinsNoms(d.WinsNoms) + ")";
        });

    //draw X axis
    svg1.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxisRating);
    //draw Y axis
    svg1.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxisWinsNoms);
    // add label
    svg1.append("text").attr("x", (w / 2)).attr("y", h - 10).attr("text-anchor", "middle").text("Rating");
    svg1.append("text").attr("x", padding).attr("y", padding).attr("text-anchor", "middle").text("Wins+Noms");
    //add title
    svg1.append("text").attr("x", (w / 2)).attr("y", padding).attr("text-anchor", "middle").text("Wins+Nominations vs. Rating");
    //add legend
    var legendRW = svg1.selectAll(".legendrw").data([0, 1]).enter().append("g")
        .attr("class", "legendrw")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legendRW.append("path").style("fill", "none")
        .style("stroke", d => d == 0 ? "red" : "blue")
        .attr("d", d3.symbol().size(40).type(d => d.IsGoodRating == 0 ? d3.symbolCircle : d3.symbolCross))
        .attr("transform", function (d, i) {
            return "translate(" + (w - 10) + "," + 47 + ")";
        });
    legendRW.append("text")
        .attr("x", w - 17).attr("y", 50).attr("font-size", 10).style("text-anchor", "end")
        .text(d => d == 0 ? "Good Rating" : "Bad Rating");

    ////////////////////////////////////////////////////////////////// CHART 2////////////////////////////////////////////////////////////////
    var yScaleBudget = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Budget;
        })]).range([h - padding, padding]);
    var yAxisBudget = d3.axisLeft(yScaleBudget).ticks(10);

    var svg2 = d3.select("body").append("svg").attr("width", w).attr("height", h);
    //draw points
    svg2.selectAll(".point").data(dataset)
        .enter().append("path").attr("class", "point")
        .attr("d", d3.symbol().size(40).type(d => d.IsGoodRating == 0 ? d3.symbolCircle : d3.symbolCross))
        .attr("fill", "none")
        .attr("stroke", d => d.IsGoodRating ? "red" : "blue")
        .attr('transform', function (d) {
            return "translate(" + xScaleRating(d.Rating) + "," + yScaleBudget(d.Budget) + ")";
        });

    //draw X axis
    svg2.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxisRating);
    //draw Y axis
    svg2.append("g").attr("class", "axis").attr("transform", "translate(" + 70 + ",0)").call(yAxisBudget);
    // add label
    svg2.append("text").attr("x", (w / 2)).attr("y", h - 10).attr("text-anchor", "middle").text("Rating");
    svg2.append("text").attr("x", padding).attr("y", padding - 10).attr("text-anchor", "middle").text("Budget");
    //add title
    svg2.append("text").attr("x", (w / 2)).attr("y", padding).attr("text-anchor", "middle").text("Budget vs. Rating");
    //draw legend
    var legendRB = svg2.selectAll(".legendrb").data([0, 1]).enter().append("g")
        .attr("class", "legendrb")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });
    legendRB.append("path").style("fill", "none")
        .style("stroke", d => d == 0 ? "red" : "blue")
        .attr("d", d3.symbol().size(40).type(d => d == 0 ? d3.symbolCircle : d3.symbolCross))
        .attr("transform", function (d, i) {
            return "translate(" + (w - 10) + "," + 47 + ")";
        });
        legendRB.append("text")
        .attr("x", w - 17).attr("y", 50).attr("font-size", 10).style("text-anchor", "end")
        .text(d => d == 0 ? "Good Rating" : "Bad Rating");
});