import React, { useState, Component } from 'react';
import { Doughnut } from "react-chartjs-2";

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class PieGraph extends Component {
  props = {
    displayName: 'DoughnutExample',
  }
    
  render() {
    return (
      <div>
        <h2>Doughnut Example</h2>
		<Doughnut 
			data={data}
			options={{
				padding:"0px",
				responsive:false,
				maintainAspectRatio:false,
				defaultFontSize:"14px",
				width:"400",
				height:"400",
				legend:{
					display:false,
				}
			}}
		/>
      </div>
    );
  }
}

export default PieGraph