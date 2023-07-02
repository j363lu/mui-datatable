import React, { useState, useEffect } from 'react';
import '../index.css';

function DisplayTXT(props) {
  return (
    <div className="modal fade" id="txtModal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.txtTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <div className="modal-body">
            {props.txt.split("\n").map((i,key) => {
              if (i === "") {
                return <br></br>;
              }
              return <div key={key} style={{margin: "0px"}}>{i}</div>;
            })}
          </div>

        </div>
      </div>
    </div>        
  )
}

export default DisplayTXT;