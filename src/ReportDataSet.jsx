// @flow
import React from 'react';

const ReportDataSet = (props) => {
  return (<iframe width="1200" height="900"
            src={`${props.reportUrl}`}
            frameBorder="0" style={{border:0}}
            allowFullScreen>
          </iframe>)
};

export default ReportDataSet;
