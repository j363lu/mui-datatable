import React, { useState, useEffect } from 'react';
import '../index.css';
import $ from 'jquery';
import MUIDataTable from "mui-datatables";
import ScatterPlot from './ScatterPlot';
const csv  = $.csv = require('jquery-csv');


function FileExplorer() {
  const supported_types = ["/", ".csv"];
  const base_path = "https://metrics.syn.uwaterloo.ca";

  const [dir, setDir] = useState("/");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [options, setOptions] = useState({
    filter: true,
    filterType: 'dropdown',
    responsive: 'vertical',
    draggableColumns: {
        enabled: true,
        transitionTime: 80
    },
    rowsPerPage: 100,
    rowsPerPageOptions: [50, 100, 200, data.length],
    tableBodyHeight:'1200px',
});

  useEffect(() => {
    fetchFileList()
  }, [dir]);

  function fetchFileList() {
    $.get(base_path + dir, function(data) {
      var res_html = document.createElement("div")
      res_html.innerHTML = data

      var files = res_html.getElementsByTagName("a")
          
      $("#curr-directory").text(base_path + dir)
      $("#file-list").empty()

      for (var file of files) {
        var filename = file.innerText
        if (dir === "/" && filename === "../") {
          continue
        }

        // skips the folder that contains itself
        if (filename === "csv-viewer/") {
          continue
        }

        if (!isSupportedFileType(filename)) {
          continue
        }

        let file_entry = document.createElement("li")
        file_entry.innerText = file.innerText
        file_entry.classList.add("file-entry")
        $("#file-list").append(file_entry)

        if (filename === "../") {
          file_entry.addEventListener("click", function() {
            let last_directory = dir.slice(0, -1)
            last_directory = last_directory.substr(0, last_directory.lastIndexOf("/") + 1)
            setDir(last_directory)
          })
        } else if (filename.endsWith("/")) {
          file_entry.addEventListener("click", function() {
            let new_directory = dir + this.innerText
            setDir(new_directory)
          })
        } else if (filename.endsWith(".csv")) {
          file_entry.addEventListener("click", function() {
            readCSV(this.innerText)
          })
        }
      }
    }, "html")
  }

  function readCSV(file) {
    const path = base_path + dir + file;

    $.get(path, (csvData) => {
      setTitle(file)
      let d = $.csv.toObjects(csvData)

      // convert string to number if applicable
      for (let i = 0; i < d.length; ++i) {
        for (let c of Object.keys(d[0])) {
          if (isNaN(d[i][c])) {
            continue;
          }
          d[i][c] = Number(d[i][c]);
        }
      }

      console.log(d)
      setData(d)
      setColumns(Object.keys(d[0]))
    })

  }

  function isSupportedFileType(filename) {
    for (var suffix of supported_types) {
      if (filename.endsWith(suffix)) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <div className="page-title">
        <span id="title">CSV Viewer</span><span id="curr-directory"></span>
        <ScatterPlot data={data} columns={columns} />
      </div>

      <hr/>

      <div className="page-content">
        <div className="split left">
          <ul id="file-list">

          </ul>
        </div>
    
        <div className="split right">
          <div id="data-container">
            <MUIDataTable title={title} data={data} columns={columns} options={options} />
          </div>
        </div>
      </div>    
    </>
  );
}

export default FileExplorer;