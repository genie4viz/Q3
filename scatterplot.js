d3.csv("movies.csv", function (dataset) {
    console.log(dataset)
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

    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Rating
        })]).range([padding, w - padding * 2])
    var xScaleBudget = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Rating
        })]).range([padding + 30, w - padding * 2])
    var xScaleVotes = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Rating
        })]).range([padding + 10, w - padding * 2])

    var yScaleWinsNoms = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.WinsNoms
        })]).range([h - padding, padding])
    var yScaleBudget = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Budget
        })]).range([h - padding, padding])
    var yScaleVotes = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.Votes
        })]).range([h - padding, padding])
    var yScaleWinsNoms_log = d3.scale.log()
        .domain([0.5, d3.max(dataset, function (d) {
            return d.WinsNoms
        })]).range([h - padding, padding])
    var yScaleWinsNoms_sqrt = d3.scale.sqrt()
        .domain([0, d3.max(dataset, function (d) {
            return d.WinsNoms
        })]).range([h - padding, padding])

    var szScaleWinsNoms = d3.scale.linear()
        .domain([0, d3.max(dataset, function (d) {
            return d.WinsNoms
        })]).range([1, 100])

    // Define X axis

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(10);
    var xAxisBudget = d3.svg.axis().scale(xScaleBudget).orient("bottom").ticks(10);
    var xAxisVotes = d3.svg.axis().scale(xScaleimdbVotes).orient("bottom").ticks(10);

    //Define Y axis

    var yAxisWinsNoms = d3.svg.axis().scale(yScaleWinsNoms).orient("left").ticks(10);
    var yAxisBudget = d3.svg.axis().scale(yScaleBudget).orient("left").ticks(10);
    var yAxisVotes = d3.svg.axis().scale(yScaleVotes).orient("left").ticks(10);
    var yAxisWinsNoms_log = d3.svg.axis().scale(yScaleWinsNoms_log).orient("left").ticks(10);
    var yAxisWinsNoms_sqrt = d3.svg.axis().scale(yScaleWinsNoms_sqrt).orient("left").ticks(10);

    //////////////////////////////////////////////////////////////// CHART 1/////////////////////////////////////////////////////////////////

    //Create SVG element

    var svg1 = d3.select("body").append("svg").attr("width", w).attr("height", h);

    //draw points

    svg1.selectAll(".point").data(dataset)
        .enter().append("path").attr("class", "point")
        .attr("d", d3.svg.symbol().size(40).type(function (d) {
            if (d.IsGoodRating == 0) {
                return "circle"
            } else {
                return "cross"
            }
        }))
        .attr("fill", "none")
        .attr("stroke", function (d) {
            if (d.IsGoodRating == 0) {
                return "red";
            } else {
                return "blue";
            }
        })
        .attr('transform', function (d) {
            return "translate(" + xScale(d.Rating) + "," + yScaleWinsNoms(d.WinsNoms) + ")";
        });

    //draw X axis

    svg1.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxis);

    //draw Y axis

    svg1.append("g").attr("class", "axis").attr("transform", "translate(" + padding + ",0)").call(yAxisWinsNoms);

    // add label

    svg1.append("text").attr("x", (w / 2)).attr("y", h - 10).attr("text-anchor", "middle").text("Rating");
    svg1.append("text").attr("x", padding).attr("y", padding).attr("text-anchor", "middle").text("Wins+Noms");

    //add title

    svg1.append("text").attr("x", (w / 2)).attr("y", padding).attr("text-anchor", "middle").text(
        "Wins+Nominations vs. Rating");

    //add legend

    var legend = svg1.selectAll(".legend").data([0, 1]).enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("path").style("fill", "none")
        .style("stroke", function (d) {
            if (d == 0) {
                return "red";
            } else {
                return "blue";
            }
        })
        .attr("d", d3.svg.symbol().size(40).type(function (d) {
            if (d == 0) {
                return "circle"
            } else {
                return "cross"
            }
        }))
        .attr("transform", function (d, i) {
            return "translate(" + (w - 10) + "," + 47 + ")";
        })

    legend.append("text")
        .attr("x", w - 17).attr("y", 50).attr("font-size", 10).style("text-anchor", "end")
        .text(function (d) {
            if (d == 0) {
                return "Bad Rating";
            } else {
                return "Good Rating";
            }
        });

    ////////////////////////////////////////////////////////////////// CHART 2////////////////////////////////////////////////////////////////

    var svg2 = d3.select("body").append("svg").attr("width", w).attr("height", h);

    //draw points

    svg2.selectAll(".point").data(dataset)
        .enter().append("path").attr("class", "point")
        .attr("d", d3.svg.symbol().size(40).type(function (d) {
            if (d.IsGoodRating == 0) {
                return "circle"
            } else {
                return "cross"
            }
        }))
        .attr("fill", "none")
        .attr("stroke", function (d) {
            if (d.IsGoodRating == 0) {
                return "red";
            } else {
                return "blue";
            }
        })
        .attr('transform', function (d) {
            return "translate(" + xScaleBudget(d.Rating) + "," + yScaleBudget(d.Budget) + ")";
        });

    //draw X axis

    svg2.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")").call(xAxisBudget);

    //draw Y axis

    svg2.append("g").attr("class", "axis").attr("transform", "translate(" + 70 + ",0)").call(yAxisBudget);

    // add label

    svg2.append("text").attr("x", (w / 2)).attr("y", h - 10).attr("text-anchor", "middle").text("Rating");
    svg2.append("text").attr("x", padding).attr("y", padding - 10).attr("text-anchor", "middle").text("Budget");

    //add title

    svg2.append("text").attr("x", (w / 2)).attr("y", padding).attr("text-anchor", "middle").text("Budget vs. Rating");

    //draw legend

    var legend = svg2.selectAll(".legend").data([0, 1]).enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });
    legend.append("path").style("fill", "none")
        .style("stroke", function (d) {
            if (d == 0) {
                return "red";
            } else {
                return "blue";
            }
        })
        .attr("d", d3.svg.symbol().size(40).type(function (d) {
            if (d == 0) {
                return "circle"
            } else {
                return "cross"
            }
        }))
        .attr("transform", function (d, i) {
            return "translate(" + (w - 10) + "," + 47 + ")";
        });
    legend.append("text")
        .attr("x", w - 17).attr("y", 50).attr("font-size", 10).style("text-anchor", "end")
        .text(function (d) {
            if (d == 0) {
                return "Bad Rating";
            } else {
                return "Good Rating";
            }
        });
});