import React, { useState, useEffect } from 'react';
import '../index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const cdf = require('cumulative-distribution-function');

function CDF(props) {
  const [x, setX] = useState("avgTOI");
  const [cdfData, setCdfData] = useState([]);

  const x_axis_change = (event) => {
    setX(event.target.value);
  }

  const computeCDF = () => {
    // if no data is loaded yet or there is no column with name x
    if (props.data.length === 0 || !props.data[0][x]) {
      return;
    }

    // get an array of the desired data
    let d = [];
    for (let row of props.data) {
      // skip if it is a string or undefined
      if (typeof row[x] === "string" || !row[x]) {
        continue
      }
      d.push(row[x])
    }  
    
    // compute cdf
    const f = cdf(d);
    let tempCDF = [];
    const minimum = Math.min(...d)
    const maximum = Math.max(...d)

    // If the data contain all the same values, only plot one point
    if (minimum !== maximum) {
      for (let i = minimum; i < maximum; i += (maximum - minimum) / 100) {
        console.log(i)
        let point = {};
        point[x] = i;
        point["CDF"] = f(i);
        tempCDF.push(point);
      }
    }
    // plot the maximum point
    let lastPoint = {};
    lastPoint[x] = maximum;
    lastPoint["CDF"] = f(maximum);
    tempCDF.push(lastPoint);

    setCdfData(tempCDF);
  }

  useEffect(() => {
    computeCDF();
  }, [props, x]);

  return (
    <>
      <div className="container">
        <div className="row">
          <form className="col-2 offset-5">
            <label for="x-axis">x-axis: </label>
            <select id="x-axis" onChange={x_axis_change} value={x}>
              {props.variables}
            </select>
          </form>
        </div>
      </div>

    <ResponsiveContainer width="90%" height="90%" >
      <LineChart data={cdfData}>
        <CartesianGrid />
        <XAxis type="number" dataKey={x} name={x} domain={['dataMin', 'dataMax']} />
        <YAxis name="CDF" domain={[0, 1]} />
        <Tooltip/>
        <Line dataKey="CDF" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
    </>  
  )
}

export default CDF;