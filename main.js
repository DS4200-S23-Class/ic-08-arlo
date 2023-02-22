// ic 08 js file

// creating constant visualization dimenions
const FRAME_HEIGHT = 600;
const FRAME_WIDTH = 600;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

// add frame for bar chart
const FRAME = d3.select('.vis1')
				.append('svg')
					.attr('height', FRAME_HEIGHT)
					.attr('width', FRAME_HEIGHT)
					.attr('class', 'frame')
                    .attr('id', 'FRAME');

// read in the bar chart data
d3.csv('data/data.csv').then((data) => {

   // create scaling functions
    let X_SCALE = d3.scaleBand()
                .domain(data.map((d)=>{
                    return d.Category;
                }))
                .range([0, VIS_WIDTH])
                .padding(0.4);

    let Y_SCALE =  d3.scaleLinear()
                .domain([0,d3.max(data, (d)=> {
                    return d.Value;
                })])
                .range([VIS_HEIGHT - 50,0]);



    // append all bars to chart 
    FRAME.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x", (d) => {return X_SCALE(d.Category);})
        .attr("y", (d) => {return Y_SCALE(d.Value)})
        .attr("width", X_SCALE.bandwidth())
        .attr("height", (d) => {return VIS_HEIGHT - Y_SCALE(d.Value) -50;});    

        FRAME.append("g")
            .attr('transform','translate(0,' + (VIS_HEIGHT - 50) + ')')
            .call(d3.axisBottom(X_SCALE))
            .attr("font-size", '20px');

        FRAME.append('g')
            .call(d3.axisLeft(Y_SCALE)                 
            .tickFormat((d)=>{
                            return d;
                        }).ticks(8))
            .attr("font-size", '20px')
            ;
    });
