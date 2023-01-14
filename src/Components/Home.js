import React, { useState, useEffect, Fragment } from "react";
import "./Home.css";
import "./WatchList";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

function Home({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [searchTitleSuggestions, setSearchTitleSuggestions] = useState([]);
  const searchHandle = (name) => {
    setWordEntered(name);
    setSearchTitleSuggestions([]);
    setFilteredData([]);
  };

  localStorage.setItem("message", "saved in browser storage");
  console.log(localStorage.getItem("message"));
  console.log(filteredData[1])

  // const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
        const rowsInput={
            name:'',
        } 
        setFilteredData([...filteredData, rowsInput]) 
    }
    const handleChange = (index, evnt)=>{
      const { name, value } = evnt.target;
      const rowsInput = [...filteredData];
      rowsInput[index][name] = value;
      setFilteredData(rowsInput);
  }

  
  const handleFilter = (event) => {
    // const getData = setTimeout(() => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    let newFilter = [];
    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchWord}&apikey=TQ7K5ZFTZI2VP899`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // setItems(result.bestMatches);
        console.log(result?.bestMatches[0]);
        if (result?.bestMatches?.length) {
          newFilter = result?.bestMatches?.map((value) => {
            console.log(value);
            return value["2. name"];
          });
        }
        console.log(newFilter);
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      });
    // }, 2000)
  };
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <Fragment>
      <div>
        <div>
          <h2 className="tx-24 mg-b-5" style={{ marginLeft: "10px" }}>
            Home Main Screen
          </h2>
        </div>
      </div>
      <div className="search ">
        <div className="searchInputs">
          <input
            type="text"
            name="name"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem"
                  // href={value?.link}
                  onClick={() => searchHandle(value)}
                  target="_blank"
                >
                  <p>{value} </p>
                </a>
              );
            })}
          </div>
        )}

        <br />
        <br />
        <table
          className="table container"
          style={{
            border: "1px",
            width: "1000px",
            height: "300px",
            borderRadius: "10px",
            marginLeft: "0rem",
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
            {filteredData &&
              filteredData?.map((value,index) => (
                <tr role="row" style={{ cursor: "pointer" }} className="odd">
                  <td>
                    {/* {value} */}
                    <input type="text" value={value} onChange={(evnt)=>(handleChange(index, evnt))} name="name" className="form-control"/>
                  </td>
                  <td>USD Rate</td>

                  <td>
                    <button
                      style={{
                        width: "50px",
                        height: "20px",
                        marginLeft: "5px",
                      }}
                      onClick={addTableRows}
                    >
                      <i className="fa fa-trash">ADD</i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Link 
          to="/WatchList"
          style={{
            border: "1px solid #ff00ff",
            textAlign:'center',
            backgroundColor: "Highlight",
            color: "#ffffff",
            marginLeft: "450px",
            marginTop: "-400px",
            width: "100px",
            height: "30px",
            display: "block",
          }}
        >
          WatchList
        </Link>
      </div>
    </Fragment>
  );
}
export default Home;
