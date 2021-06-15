// import "./style.css";

// // VICTORY STUFF
// import React from "react";
// // import ReactDOM from "react-dom";
// // import * as V from "victory";
// import { VictoryBar, VictoryChart, Bar } from "victory";

// class V_BarGraph extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       clicked: false,
//       style: {
//         data: { fill: "tomato" },
//       },
//     };
//   }

//   render() {
//     const handleMouseOver = () => {
//       const fillColor = this.state.clicked ? "green" : "tomato";
//       const clicked = !this.state.clicked;
//       this.setState({
//         clicked,
//         style: {
//           data: { fill: fillColor },
//         },
//       });
//     };

//     return (
//       <div className="graph-size">
//         <VictoryChart
//           height={400}
//           width={400}
//           domainPadding={{ x: 50, y: [0, 20] }}
//           scale={{ x: "time" }}
//         >
//           <VictoryBar
//             dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
//             style={this.state.style}
//             data={[
//               { x: new Date(1986, 1, 1), y: 2 },
//               { x: new Date(1996, 1, 1), y: 3 },
//               { x: new Date(2006, 1, 1), y: 5 },
//               { x: new Date(2016, 1, 1), y: 4 },
//             ]}
//           />
//         </VictoryChart>
//       </div>
//     );
//   }
// }

// export default V_BarGraph;
