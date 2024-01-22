import React from 'react';


const Loading = ({toload}) => {
  return (
    <div className={"loading-spinner-container" + (toload? " showup" : " vanish")}>
      {/* <div className="loading-spinner"></div> */}
    </div>
  );
};

export default Loading;
