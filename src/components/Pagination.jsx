import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const NavigatePage = ({ pages, movePage, currPage }) => {
  const pgnums = [];
  for (var i = 1; i <= pages; i++) {
    pgnums.push(i);
  }
  return (
    <div className="pagination">
      {pgnums.map((num) => {
        return (
          <div onClick={() => movePage(num)} key={num} className={currPage === num ? "pagenum selected" : "pagenum"}>
            {num}
          </div>
        );
      })}
    </div>
  );
};

const DataToDisplay = ({ grandList, RowComponent, headers }) => {
  return (
    <div className="grid-list">
      <div key="1" className="grid-row head">
        {headers.map((colname) => (
          <div className="head-cell" key={colname}>
            {colname[0]}
            <p>{colname[1]}</p>
          </div>
        ))}
      </div>
      {grandList.map((coin) => {
        return <RowComponent key={coin.id} coin={coin} />;
      })}
    </div>
  );
};

const Pagination = ({ dataSet, rowsPerPage, RowComponent, headers }) => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const lastIndex = CurrentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  var rowsToDisplay = dataSet.slice(firstIndex, lastIndex);

  const handleMovePage = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    handleMovePage(1)
  }, [dataSet])
  

  return (
    <div className="grand-list">
      {rowsToDisplay.length !== 0 ? (
        <DataToDisplay headers={headers} grandList={rowsToDisplay} RowComponent={RowComponent} />
      ) : (
        <div>No data found</div>
      )}
      <NavigatePage pages={Math.ceil(dataSet.length / rowsPerPage)} movePage={handleMovePage} currPage={CurrentPage} />
    </div>
  );
};

export default Pagination;
