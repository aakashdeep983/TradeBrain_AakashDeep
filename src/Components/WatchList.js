import React, { useState, Fragment,useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const WatchList = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const [list, setList] = useState([]);

  // useEffect(()=>{
  //   fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=TQ7K5ZFTZI2VP899`, {
  //     method: "GET",
  //   })
  //   .then((result)=> setList(result.bestMatches));
  // },[]) 

  return (
    <Fragment>
      <div>
        <div>
          <h2 className="tx-24 mg-b-5" style={{ marginLeft: "10px" }}>
            WatchList
          </h2>
        </div>
      </div>
      <button
        onClick={handleClick}
        style={{
          width: "100px",
          height: "30px",
          display: "block",
          marginLeft: "10px",
        }}
      >
        Back to Home
      </button>
      <br />
      <div style={{ marginLeft: "10px" }}>
        <table
          className="table"
          style={{
            border: "10px",
            width: "1000px",
            height: "300px",
            borderRadius: "10px",
            marginBottom: "1rem",
            padding: "0.75rem",
            verticalAlign: "bottom",
            borderBottom: "1px solid #ff00ff",
            borderTop: "1px solid #ff00ff",
            borderLeft: "1px solid #ff00ff",
            borderRight: "1px solid #ff00ff",
          }}
        >
          <thead>
            <tr role="row">
              <th
                className="sorting"
                style={{ width: "1000px", border: "none" }}
              >
                <div className="row" style={{ marginLeft: "1px" }}>
                  <span>Company Name</span>
                </div>
              </th>
              <th
                className="sorting"
                style={{ width: "1000px", border: "none" }}
              >
                <div className="row" style={{ marginLeft: "1px" }}>
                  <span>Share Price</span>
                </div>
              </th>

              <th
                className="sorting"
                style={{ width: "1000px", border: "none" }}
              >
                <div className="row" style={{ marginLeft: "1px" }}>
                  <span>Action</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
          {list &&
                    list?.map((data) => (
            <tr role="row" style={{ cursor: "pointer" }} className="odd">
              <td>{data.name}</td>
              <td>USD</td>

              <td>
                {/* <button
                    style={{ width: "50px", height: "20px",marginLeft:'5px' }}
                     onClick={() => deleteHandle(value)}
                  >
                    <i className="fa fa-trash">Delete</i>
                  </button> */}
              </td>
            </tr>
             ))} 
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};
export default WatchList;
