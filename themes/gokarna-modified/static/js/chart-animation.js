const SAMPLE_SIZE = 200;
const BINS = 10; // bins = thresholds + 1
const MU = 0;
const SIGMA = 1;
const MAX_DEVIATE = 2.7 * SIGMA;

// 2. Create chart dimensions

const BAR_PADDING = 1;
const WIDTH = 230;
const DIMENSIONS = {
  width: WIDTH,
  height: WIDTH * 0.45,
  margin: {
    top: 30,
    right: 10,
    bottom: 0,
    left: 10,
  },
}
DIMENSIONS.boundedWidth = DIMENSIONS.width
  - DIMENSIONS.margin.left
  - DIMENSIONS.margin.right
DIMENSIONS.boundedHeight = DIMENSIONS.height
  - DIMENSIONS.margin.top
  - DIMENSIONS.margin.bottom

//
// const BIN_WIDTH = (MAX_DEVIATE*2) / (THRESHOLDS + 1);

// console.log(BIN_WIDTH)

// x scale, not dependent on data
const xScale = d3.scaleLinear()
    // .domain(d3.extent(data, valueAccessor))
    // .domain([-MAX_DEVIATE-(BAR_WIDTH/2), MAX_DEVIATE+(BAR_WIDTH/2)])
    .domain([-MAX_DEVIATE, MAX_DEVIATE])
    .range([0, DIMENSIONS.boundedWidth]);

// bins are fixed for this animation
THRESHOLDS = d3.range(-MAX_DEVIATE, MAX_DEVIATE, (2*MAX_DEVIATE) / BINS)

// data accessors
const valueAccessor = d => d.value;
// completed?
const yAccessor = d => d3.max([d.length, 1]);

/////////////

function generateData(n = SAMPLE_SIZE, clip = true) {
  let gen = d3.randomNormal(MU, SIGMA);
  let data = [];
  for (let i = 0; i < n; i++) {
    let sample = gen();
    // apply clipping at 2.5*sigma
    if (clip === true) {
      let bound = ((i < 1) || (i > (n-2))) ? SIGMA : MAX_DEVIATE;
      if (sample > bound) {
        sample = bound;
      } else if (sample < -bound) {
        sample = -bound;
      }
    }  
    data.push({index: i, value: sample});
  }
  return data;
}

function initChart() {

  // 3. Draw canvas

  const wrapper = d3.select("#chart-wrapper").append("svg")
      .attr("width", DIMENSIONS.width)
      .attr("height", DIMENSIONS.height)
      .attr("id", "chart");

  console.log(d3.select("#chart-wrapper"));

  const bounds = wrapper.append("g")
      .style("transform", `translate(${
        DIMENSIONS.margin.left
      }px, ${
        DIMENSIONS.margin.top
      }px)`)
      .attr("id", "chart-bounds")
      .append("g")
      .attr("id", "chart-bins");

  console.log(bounds);
}

// actually generate and draw data
function drawChart() {
  
  // 1. generate data
  let data = generateData();
  
  // Create bins

  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(valueAccessor)
    .thresholds(THRESHOLDS);

  const bins = binsGenerator(data);
  
  console.log(xScale.domain())
  console.log(`# of bins: ${bins.length}`);
  console.log(bins.map(b => [b.x0, b.x1]));

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([DIMENSIONS.boundedHeight, 0])
    // .nice();

  // Draw data

  // const bounds = d3.select("#chart-bounds");
  const binsGroup = d3.select("#chart-bins");

  const binGroups = binsGroup.selectAll("rect")
    .data(bins)
    .join("g");

  const barRects = binGroups.append("rect")
      .attr("x", d => xScale(d.x0) + BAR_PADDING / 2)
      .attr("y", d => yScale(yAccessor(d)))
      .attr("width", d => d3.max([
        0,
        xScale(d.x1) - xScale(d.x0) - BAR_PADDING
      ]))
      .attr("height", d => DIMENSIONS.boundedHeight - yScale(yAccessor(d)));
}

function updateChart() {
  
  let data = generateData();

  const binsGenerator = d3.bin()
    .domain(xScale.domain())
    .value(valueAccessor)
    .thresholds(THRESHOLDS);

  const bins = binsGenerator(data);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([DIMENSIONS.boundedHeight, 0])
    // .nice();

  // Draw data

  // const bounds = d3.select("#chart-bounds");
  const binsGroup = d3.select("#chart-bins");

  // const binGroups = binsGroup.selectAll("rect")
  //   .data(bins)
  //   .join("g");
  
  // const rects = d3.selectAll("rect");

  const barPadding = 1
  const barRects = binsGroup.selectAll("rect").data(bins)
      .transition()
      .duration(500)
      .ease(d3.easeBackOut.overshoot(1.3)) // need to fix negative height issue
  // .ease(d3.easeBounceOut)
      // .attr("x", d => xScale(d.x0) + barPadding / 2)
      .attr("y", d => yScale(yAccessor(d)))
      // .attr("width", d => d3.max([
      //   0,
      //   xScale(d.x1) - xScale(d.x0) - barPadding
      // ]))
      // .attr("height", d => DIMENSIONS.boundedHeight
      //   - yScale(yAccessor(d))
      // )
  .attr("height", d => DIMENSIONS.boundedHeight - yScale(yAccessor(d)))
      // .attr("fill", "#d795ed");
}


initChart();

drawChart();

// let chart = document.querySelector("#chart");
// chart.addEventListener("click", (e) => {
//   // need to seperate drawing of chart and refreshing data
//   updateChart();
// });

var t = setInterval(updateChart, 2000);
