import React, { Component } from "react";
import { Typography, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core'
import ReactDOM from "react-dom";
import USA from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import { getLocationId, getLocationName } from './utils';
import PriceDataService from "../services/price.service";
import { Ymap } from './predictData.js';
import Plot from 'react-plotly.js';
import CAPredict from './States/allStates'
// import Table from './table.js';




export default class Prediction extends Component {
  constructor(props) {
    super(props);

    this.predictThisState = this.predictThisState.bind(this);
    this.onChangeSaveState = this.onChangeSaveState.bind(this);
    this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
    
    this.state = {
      stateForPredict: "",
      x: [],
      y_ax:[438597, 445726, 452684, 460043, 466495, 472453, 478558, 484906, 491487, 497708, 502768, 507256, 511002, 514138, 517109, 519296, 521756, 523034, 523441, 523041, 521532, 519811, 518312, 516885, 515432, 513498, 511322, 509098, 505725, 502081, 497639, 492977, 487441, 480979, 474476, 467213, 459944, 450841, 440527, 429331, 418311, 408178, 398034, 388526, 379864, 372101, 363457, 354927, 347037, 342160, 337874, 333912, 330338, 327773, 326504, 325632, 325061, 325071, 326554, 328523, 329982, 329787, 330555, 331718, 333419, 332956, 331680, 330037, 328740, 327030, 324691, 322677, 320973, 319525, 317335, 315108, 312043, 310243, 308816, 307418, 305751, 303926, 303203, 302037, 301308, 300755, 300930, 301608, 303127, 305025, 307319, 310204, 313548, 317675, 321480, 326504, 331472, 337358, 343871, 351155, 358614, 366138, 373517, 380709, 387062, 392585, 397645, 402044, 406508, 410175, 412326, 413373, 413978, 414805, 416106, 416789, 418036, 419374, 421813, 423616, 425515, 427669, 430909, 433611, 436441, 438623, 440765, 443314, 446238, 449411, 451899, 455366, 458429, 461088, 462746, 465383, 467912, 470594, 472886, 475814, 478507, 481455, 483950, 486111, 488507, 491105, 494224, 497054, 500300, 503727, 506699, 509371, 512338, 515603, 519576, 523648, 527900, 532097, 535749, 538776, 541774, 544818, 547369, 548592, 548860, 549066, 549254, 548609, 547632, 546057, 545075, 545720, 548310, 551508, 553223, 553639, 553952, 554895, 555948, 557904, 560557, 563947, 567488, 570569, 572537, 574440, 578358, 584544, 591809, 599159],
      clicked: false,
      tooltipStyle: {
        display: getLocationName
      }
    };
    this.links = {
      "ca": './states/CA',
      "fl": './states/FL',
      "ga": './states/GA',
      "il": './states/IL',
      "mi": './states/MI',
      "nc": './states/NC',
      "nj": './states/NJ',
      "ny": './states/NY',
      "ph": './states/OH',
      "pa": './states/PA',
      "tx": './states/TX',
      "ak": './states/AK',
      "al": './states/AL',
      "ar": './states/AR',
      "az": './states/AZ',
      "co": './states/CO',
      "ct": './states/DC',
      "de": './states/DE',
      "hi": './states/HI',
      "ia": './states/IA',
      "id": './states/ID',
      "in": './states/IN',
      "ks": './states/KS',
      "ky": './states/KY',
      "la": './states/LA',
      "ma": './states/MA',
      "md": './states/MD',
      "me": './states/ME',
      "mn": './states/MN',
      "mo": './states/MO',
      "ms": './states/MS',
      "mt": './states/MT',
      "mv": './states/MV',
      "my": './states/MY',
      "nd": './states/ND',
      "ne": './states/NE',
      "nh": './states/NH',
      "nm": './states/NM',
      "nv": './states/NV',
      "ok": './states/OK',
      "or": './states/OR',
      "ri": './states/RI',
      "sc": './states/SC',
      "sd": './states/SD',
      "tn": './states/TN',
      "ut": './states/UT',
      "va": './states/VA',
      "vt": './states/VT',
      "wa": './states/WA',
      "wi": './states/WI'
		};

  }


	handleLocationMouseOver(event) {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation });
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null });
	}

	handleLocationClick(event) {
		const clickedLocation = getLocationName(event);
		const clickedLocationId = getLocationId(event);
		this.setState({ clickedLocation: clickedLocation });
		window.open(this.links[clickedLocationId], '_blank');
	}

	handleLocationFocus(event) {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}
  
  predictThisState(event) {
    console.log("clicked search");
    // const clickedLocation = getLocationName(event);
		// const clickedLocationId = getLocationId(event);
    // this.setState({ clickedLocation: clickedLocation });
    this.setState({
      clicked: true
    });
		// window.open(this.links[this.state.stateForPredict.toLowerCase()], '_blank');
 
    
  }

  onChangeSaveState(e) {
    const state = e.target.value;
        this.setState({
          stateForPredict: state
        });
    // if (Ymap.has(state.toUpperCase())) {
      this.setState({
        y_ax: Ymap[state.toUpperCase()]
      });
    // } else {
    //   this.setState({
    //     y_ax: Ymap["CA"]
    //   });
    // }
 
  } 


  render() {
    return (
      <div>
        {
          this.state.clicked ?
          <div> 
          <CAPredict  dataFromParent = {this.state.stateForPredict} yFromParent = {this.state.y_ax}>

          </CAPredict>
          <Button style={{marginTop: "20px"}} variant="contained" color='primary' onClick={() => {this.setState({clicked: false})}}>
            Back
          </Button>
        </div>
        : 
        <div> 
          <h2 style={{marginTop:"40px"}}>
            This is prediction.
          </h2>
          <div style={{display: 'flex',
            flexDirection: "column",
            alignItems: 'center'}}>
            <TextField style={{marginBottom: "20px"}} id="outlined-basic" label="State" value={this.state.stateForPredict} onChange={this.onChangeSaveState} variant="outlined"/>
            <Button onClick={this.predictThisState} color="primary" variant="outlined">
              Predict the state
            </Button>
            <div style={{marginTop: '20px'}}>
              <p>
                Please use Postal Abbreviations
              </p>
              <p>
                    For instance: "CA", "IL"
              </p>
                </div>
      
          </div>
        </div> 
        }
      </div>
    )
  }
}
