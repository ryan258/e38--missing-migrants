import React from 'react'
import { scaleLinear, scaleTime, extent, timeFormat, bin, timeMonths, sum } from 'd3'
import AxisBottom from './components/AxisBottom'
import AxisLeft from './components/AxisLeft'
import Marks from './components/Marks'
import { useData } from './hooks/useData'
// import { message } from './utils/message'
// useCallback - good for adding event listeners only once
// - arg0 - function you want to control
// - arg1 - [array, of, dependencies] - things it needs to run

const width = 960
const height = 500
const margin = {
  top: 20,
  right: 30,
  bottom: 65,
  left: 90
}
const xAxisLabelOffset = 80
const yAxisLabelOffset = 45

const App = () => {
  const data = useData()

  if (!data) {
    return <pre>'Loading...'</pre>
  }

  const xValue = (d) => d['Reported Date']
  const xAxisLabel = 'Time'

  const yValue = (d) => d['Total Dead and Missing']
  const yAxisLabel = 'Total Dead and Missing'

  // console.log(data[0])

  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.right - margin.left

  const xScale = scaleTime() //
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice()

  const yScale = scaleLinear() //
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice()

  const [start, stop] = xScale.domain()

  const binnedData = bin() // construct our bins
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)
    .map((array) => ({
      totalDeadAndMissing: sum(array, yValue), // array of individual dead and missing events
      x0: array.x0,
      x1: array.x1
    }))

  console.log(binnedData)

  const xAxisTickFormat = timeFormat('%m/%d/%Y')

  // Fortunately scales can tell us their ticks
  // console.log(xScale.ticks())

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        {/* use the tick generation logic */}
        <AxisBottom //
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={5}
        />
        <text //
          textAnchor="middle"
          className="axis-label"
          transform={`translate(${-yAxisLabelOffset},
          ${innerHeight / 2}) rotate(-90) `}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />
        <text //
          x={innerWidth / 2}
          textAnchor="middle"
          y={innerHeight + xAxisLabelOffset}
          className="axis-label"
        >
          {xAxisLabel}
        </text>
        <Marks //
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
          circleRadius={2}
        />
      </g>
    </svg>
  )
}

export default App
