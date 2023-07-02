// documentation for recharts: https://recharts.org/en-US/guide

import React, { useState, useEffect } from 'react';
import '../index.css';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const calculateCorrelation = require("calculate-correlation");

function ScatterPlot(props) {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [correlation, setCorrelation] = useState("NaN");

  // The tooltip style when you hover your mouse on points
  const tooltipWrapperStyle = { 
    "background-color": "rgba(255, 255, 255, 0.8)",
    border: "2px groove",
    "border-radius": "6px",
    padding: "0px 5px",
  }

  const x_axis_change = (event) => {
    setX(event.target.value);
    const d = getXYData(event.target.value, y);
    updateCorrelation(d["x"], d["y"])
  }

  const y_axis_change = (event) => {
    setY(event.target.value);
    const d = getXYData(x, event.target.value);
    updateCorrelation(d["x"], d["y"])
  }

  // given a column name, returns an array of data of that column 
  const getXYData = (xCol, yCol) => {
    if (!xCol || !yCol) {
      return {}
    }
    const xResult = []
    const yResult = []
    for (let row of props.data) {
      const x_val = row[xCol]
      const y_val = row[yCol]
      if (x_val === 'nan' || y_val === 'nan') {
        continue
      }
      xResult.push(x_val)
      yResult.push(y_val)
    }
    return {x: xResult, y: yResult}
  }

  const updateCorrelation = (a, b) => {
    console.log(a)
    console.log(b)
    if (!a || !b) {
      return
    }
    const cor = calculateCorrelation(a, b)
    setCorrelation(cor)
    console.log(`Correlation coefficient: ${cor}`)
  }

  // payload is an array of two objects [x, y]
  // both have properties dataKey, name, payload, type, unit, value
  const customizedToolTip = (point) => {
    if (!point || point.payload.length === 0) {
      return;
    }

    const data_point = point.payload[0]["payload"];
    const x_val = point.payload[0];
    const y_val = point.payload[1];
    let name = data_point["Name"];

    // no name column in data
    if (!name) {
      name = "N/A"
    }


    return (
      <div className="custom-tooltip">
        <p className="label">{`Name : ${name}`}</p>
        <p className="label">{`${x_val["dataKey"]} : ${x_val["value"]}`}</p>
        <p className="label">{`${y_val["dataKey"]} : ${y_val["value"]}`}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div>Correlation coefficient: {correlation}</div>
        <div className="row">
          <form className="col-2 offset-2">
            <label for="x-axis">x-axis: </label>
            <select id="x-axis" onChange={x_axis_change} value={x}>
              {props.variables}
            </select>
          </form>

          <form className="col-2 offset-4">
            <label for="y-axis">y-axis: </label>
            <select id="y-axis" onChange={y_axis_change} value={y}>
              {props.variables}
            </select>
          </form>
        </div>
      </div>

      <ResponsiveContainer width="90%" height="90%" >
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey={x} name={x} domain={['dataMin', 'dataMax']} />
          <YAxis type="number" dataKey={y} name={y} domain={['dataMin', 'dataMax']} />
          <ZAxis type="number" range={[25, 25]} />
          <Tooltip content={customizedToolTip} wrapperStyle={tooltipWrapperStyle} />
          <Scatter data={props.data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </>  
  )
}

export default ScatterPlot;