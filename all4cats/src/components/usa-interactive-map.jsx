import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import USA from "../svg-maps/packages/usa";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { getLocationName } from './utils';
import { csv } from 'd3';

class TooltipHeatMap extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			pointedLocation: null,
			tooltipStyle: {
				display: 'none'
            },
            data: [],
        };
        
        // const [data, setData] = useState([]);
        // useEffect(() => {
        //     csv('../../data/corona-virus-data-2.29.2020.csv').then(setData);
        //     console.log(data);
        // });

        csv("data.csv").then(function(data) {
            alert("123");
            console.log(data[0]);
        });

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationMouseMove = this.handleLocationMouseMove.bind(this);
	}

	handleLocationMouseOver(event) {
        const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null, tooltipStyle: { display: 'none' } });
	}

	handleLocationMouseMove(event) {
		const tooltipStyle = {
			display: 'block',
			top: event.clientY + 10,
			left: event.clientX - 100
		};
		this.setState({ tooltipStyle });
	}

	getLocationClassName(location, index) {
		// Generate random heat map
		return `svg-map__location svg-map__location--heat${index % 4}`;
	}

	render() {
		return (
			<article className="examples__block">
				<h2 className="examples__block__title">
					USA SVG heat map with tooltips
				</h2>
				<div className="examples__block__map examples__block__map--usa">
					<SVGMap
						map={USA}
						locationClassName={this.getLocationClassName}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationMouseMove={this.handleLocationMouseMove} />
					<div className="examples__block__map__tooltip" style={this.state.tooltipStyle}>
						{this.state.pointedLocation}
					</div>
				</div>
			</article>
		);
	}
}

export default TooltipHeatMap;