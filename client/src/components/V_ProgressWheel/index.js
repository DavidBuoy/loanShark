import React from "react";
import "./style.css";

// VICTORY STUFF

import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { withRouter } from "react-router-dom";

class V_ProgressWheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      data: this.getData(0),
    };
  }

  componentWillReceiveProps(props) {
    let percent = props.percent;
    console.log(percent);

    // this.setStateInterval = window.setInterval(() => {
    // percent += Math.random() * 25;
    percent = percent > 100 ? 0 : percent;
    this.setState({
      percent,
      data: this.getData(percent),
    });
    // }, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ];
  }

  render() {
    return (
      <div className="pie-size">
        <h5>Total Percent of Loans Paid Off</h5>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 2000 }}
            width={400}
            height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = datum.y > 25 ? "#34847e" : "#698498";
                  return datum.x === 1 ? color : "transparent";
                },
              },
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {(newProps) => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45, fill: "#A9BCC3" }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
  }
}

export default V_ProgressWheel;
