import React, { Component } from "react";
import { Typography, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core'
import Plot from 'react-plotly.js';
import { YParaMap } from '../predictPara.js';



    
export default class CAPredict extends Component {
  constructor(props) {
    super(props);

    this.predictThisData = this.predictThisData.bind(this);
    this.onChangeSaveMonth = this.onChangeSaveMonth.bind(this);
    this.onChangeSaveYear = this.onChangeSaveYear.bind(this);
    this.state = {
      monthForPredict: "",
      yearForPredict: "",
      priceArrayJSON: [],
      predictedPrice: "",
      x: [],
      y_ax: [],
      stateForPredict : ""
    };

  }

  predictThisData() {
    console.log("clicked");
    const x = parseFloat(this.state.monthForPredict) + (parseFloat(this.state.yearForPredict) - 2005) * 12;
    let state = 533510.32 + -4263.94 * x + 25.84 * x * x;
    let para = YParaMap[this.props.dataFromParent.toUpperCase()]
    state = para[0] + para[1] * x + para[2] * x * x;
    
    this.setState({
      predictedPrice: state
    });
  }

  onChangeSaveMonth(e) {
    const state = e.target.value;
        this.setState({
          monthForPredict: state
        });
  } 

  onChangeSaveYear(e) {
    const state = e.target.value;
        this.setState({
          yearForPredict: state,
        });
  } 


  render() {
    return (
      <div>
        <div>
          <h2>
              This is prediction for {this.props.dataFromParent}.
          </h2>
          <Plot
          data={[
            {
              x: ["1/31/05", "2/28/05", "3/31/05", "4/30/05", "5/31/05", "6/30/05", "7/31/05", "8/31/05", "9/30/05", "10/31/05", "11/30/05", "12/31/05", "1/31/06", "2/28/06", "3/31/06", "4/30/06", "5/31/06", "6/30/06", "7/31/06", "8/31/06", "9/30/06", "10/31/06", "11/30/06", "12/31/06", "1/31/07", "2/28/07", "3/31/07", "4/30/07", "5/31/07", "6/30/07", "7/31/07", "8/31/07", "9/30/07", "10/31/07", "11/30/07", "12/31/07", "1/31/08", "2/29/08", "3/31/08", "4/30/08", "5/31/08", "6/30/08", "7/31/08", "8/31/08", "9/30/08", "10/31/08", "11/30/08", "12/31/08", "1/31/09", "2/28/09", "3/31/09", "4/30/09", "5/31/09", "6/30/09", "7/31/09", "8/31/09", "9/30/09", "10/31/09", "11/30/09", "12/31/09", "1/31/10", "2/28/10", "3/31/10", "4/30/10", "5/31/10", "6/30/10", "7/31/10", "8/31/10", "9/30/10", "10/31/10", "11/30/10", "12/31/10", "1/31/11", "2/28/11", "3/31/11", "4/30/11", "5/31/11", "6/30/11", "7/31/11", "8/31/11", "9/30/11", "10/31/11", "11/30/11", "12/31/11", "1/31/12", "2/29/12", "3/31/12", "4/30/12", "5/31/12", "6/30/12", "7/31/12", "8/31/12", "9/30/12", "10/31/12", "11/30/12", "12/31/12", "1/31/13", "2/28/13", "3/31/13", "4/30/13", "5/31/13", "6/30/13", "7/31/13", "8/31/13", "9/30/13", "10/31/13", "11/30/13", "12/31/13", "1/31/14", "2/28/14", "3/31/14", "4/30/14", "5/31/14", "6/30/14", "7/31/14", "8/31/14", "9/30/14", "10/31/14", "11/30/14", "12/31/14", "1/31/15", "2/28/15", "3/31/15", "4/30/15", "5/31/15", "6/30/15", "7/31/15", "8/31/15", "9/30/15", "10/31/15", "11/30/15", "12/31/15", "1/31/16", "2/29/16", "3/31/16", "4/30/16", "5/31/16", "6/30/16", "7/31/16", "8/31/16", "9/30/16", "10/31/16", "11/30/16", "12/31/16", "1/31/17", "2/28/17", "3/31/17", "4/30/17", "5/31/17", "6/30/17", "7/31/17", "8/31/17", "9/30/17", "10/31/17", "11/30/17", "12/31/17", "1/31/18", "2/28/18", "3/31/18", "4/30/18", "5/31/18", "6/30/18", "7/31/18", "8/31/18", "9/30/18", "10/31/18", "11/30/18", "12/31/18", "1/31/19", "2/28/19", "3/31/19", "4/30/19", "5/31/19", "6/30/19", "7/31/19", "8/31/19", "9/30/19", "10/31/19", "11/30/19", "12/31/19", "1/31/20", "2/29/20", "3/31/20", "4/30/20", "5/31/20", "6/30/20", "7/31/20", "8/31/20", "9/30/20", "10/31/20"],
              y: this.props.yFromParent,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            },
            {type: 'scatter', x: this.state.x, y: this.state.y},
          ]}
          layout={ {width: 500, height: 400, title: 'Time V.S. Average Price'} }
            />
        </div>
        <div>
          <form noValidate autoComplete="off" className="formStyle">
                {/* listening for title in value, once change call onChange function to temporarily hold the title, until submission */}
              <TextField id="outlined-basic10" label="Month" value={this.state.monthForPredict} onChange={this.onChangeSaveMonth} variant="outlined" />
              <TextField id="outlined-basic11" label="Year" value={this.state.yearForPredict} onChange={this.onChangeSaveYear} variant="outlined"/>
          </form>
          <Button onClick={this.predictThisData}>
              Predict the state at this Month-Year
          </Button>
          <Typography>
                Predicted State Average Price: {this.state.predictedPrice}
          </Typography>
        </div>

      </div>
    )
  }
}

