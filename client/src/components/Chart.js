import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';



class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    }

    this.getChartDara = this.getChartDara.bind(this);
  }

  componentDidMount() {
    this.getChartDara()
  }

  getChartDara() {
    let options = this.props.options;
    let labels = options.map((option) => { return option.option });
    let data = options.map((option) => { return option.points });

    this.setState({ chartData: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#1fb6ff', '#278fc6', '#266991', '#21465e', '#172530', '#000000', '#ffa600']
      }]
    }});
  }


  render() {
    const { chartData } = this.state;

    return (
      <Doughnut
      data={ chartData }
      width={250}
	    height={250}
      options={{
        legend: {
          position: 'top'
        },

      }}
      />
    )
  }
}

export default Chart;
