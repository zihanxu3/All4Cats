import React, { Component } from "react";
import { Typography, Button, TextField, List, ListItem, ListItemText } from '@material-ui/core'
import ReactDOM from "react-dom";
import Plot from 'react-plotly.js';
import PredictDataService from "../../services/predict.service";


export default class Prediction extends Component {
  constructor(props) {
    super(props);

    this.predictThisData = this.predictThisData.bind(this);
    this.onChangeSaveMonth = this.onChangeSaveMonth.bind(this);
    this.onChangeSaveYear = this.onChangeSaveYear.bind(this);
    this.state = {
      monthForPredict: "",
      yearForPredict: "",
      priceArrayJSON: [],
      predictedPrice: ""

    };

  }

  predictThisData() {
    console.log("clicked");
    const x = parseFloat(this.state.monthForPredict) + (parseFloat(this.state.yearForPredict) - 2005) * 12;
    const state = 533510.32 + -4263.94 * x + 25.84*x*x
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
          yearForPredict: state
        });
  } 


  render() {
    return (
        <div>
          <h2>
            This is ID prediction.
          </h2>
        <div>
        <Plot
        data={[
          {
            x: ["1/31/05", "2/28/05", "3/31/05", "4/30/05", "5/31/05", "6/30/05", "7/31/05", "8/31/05", "9/30/05", "10/31/05", "11/30/05", "12/31/05", "1/31/06", "2/28/06", "3/31/06", "4/30/06", "5/31/06", "6/30/06", "7/31/06", "8/31/06", "9/30/06", "10/31/06", "11/30/06", "12/31/06", "1/31/07", "2/28/07", "3/31/07", "4/30/07", "5/31/07", "6/30/07", "7/31/07", "8/31/07", "9/30/07", "10/31/07", "11/30/07", "12/31/07", "1/31/08", "2/29/08", "3/31/08", "4/30/08", "5/31/08", "6/30/08", "7/31/08", "8/31/08", "9/30/08", "10/31/08", "11/30/08", "12/31/08", "1/31/09", "2/28/09", "3/31/09", "4/30/09", "5/31/09", "6/30/09", "7/31/09", "8/31/09", "9/30/09", "10/31/09", "11/30/09", "12/31/09", "1/31/10", "2/28/10", "3/31/10", "4/30/10", "5/31/10", "6/30/10", "7/31/10", "8/31/10", "9/30/10", "10/31/10", "11/30/10", "12/31/10", "1/31/11", "2/28/11", "3/31/11", "4/30/11", "5/31/11", "6/30/11", "7/31/11", "8/31/11", "9/30/11", "10/31/11", "11/30/11", "12/31/11", "1/31/12", "2/29/12", "3/31/12", "4/30/12", "5/31/12", "6/30/12", "7/31/12", "8/31/12", "9/30/12", "10/31/12", "11/30/12", "12/31/12", "1/31/13", "2/28/13", "3/31/13", "4/30/13", "5/31/13", "6/30/13", "7/31/13", "8/31/13", "9/30/13", "10/31/13", "11/30/13", "12/31/13", "1/31/14", "2/28/14", "3/31/14", "4/30/14", "5/31/14", "6/30/14", "7/31/14", "8/31/14", "9/30/14", "10/31/14", "11/30/14", "12/31/14", "1/31/15", "2/28/15", "3/31/15", "4/30/15", "5/31/15", "6/30/15", "7/31/15", "8/31/15", "9/30/15", "10/31/15", "11/30/15", "12/31/15", "1/31/16", "2/29/16", "3/31/16", "4/30/16", "5/31/16", "6/30/16", "7/31/16", "8/31/16", "9/30/16", "10/31/16", "11/30/16", "12/31/16", "1/31/17", "2/28/17", "3/31/17", "4/30/17", "5/31/17", "6/30/17", "7/31/17", "8/31/17", "9/30/17", "10/31/17", "11/30/17", "12/31/17", "1/31/18", "2/28/18", "3/31/18", "4/30/18", "5/31/18", "6/30/18", "7/31/18", "8/31/18", "9/30/18", "10/31/18", "11/30/18", "12/31/18", "1/31/19", "2/28/19", "3/31/19", "4/30/19", "5/31/19", "6/30/19", "7/31/19", "8/31/19", "9/30/19", "10/31/19", "11/30/19", "12/31/19", "1/31/20", "2/29/20", "3/31/20", "4/30/20", "5/31/20", "6/30/20", "7/31/20", "8/31/20", "9/30/20", "10/31/20"],
                y: [157731, 159212, 160814, 162045, 163500, 165079, 167385, 170159, 172960, 176349, 178745, 180330, 181606, 183425, 185652, 188476, 191151, 194346, 196222, 197867, 199307, 198908, 199565, 200099, 201879, 201929, 201914, 202017, 202682, 202660, 202904, 202987, 203100, 203734, 204077, 204713, 204816, 205630, 205716, 205163, 203430, 201786, 200338, 198902, 197439, 195966, 194202, 192018, 189652, 187049, 184703, 182213, 180085, 178388, 176706, 175018, 173278, 171815, 170632, 169897, 168793, 167978, 166712, 166041, 165311, 163776, 161744, 159762, 157931, 156130, 154297, 152538, 151108, 149563, 148394, 146719, 145308, 144539, 144435, 144230, 144101, 144141, 144481, 144697, 144853, 145340, 145940, 147280, 148543, 149892, 151216, 153081, 154987, 156758, 158082, 159701, 161630, 163255, 165179, 166512, 168264, 169627, 171211, 172453, 173514, 174530, 175598, 176291, 176631, 177226, 177821, 178510, 178840, 179243, 179372, 179323, 179471, 179768, 180376, 181177, 182057, 183073, 183866, 185030, 186002, 187160, 188118, 189414, 190465, 191553, 192555, 193885, 195772, 197324, 198863, 199653, 200952, 202106, 203545, 204876, 206540, 208296, 209913, 211389, 212225, 213460, 214673, 216815, 218578, 220457, 222246, 224203, 226308, 228219, 230399, 232483, 234835, 237189, 239670, 242277, 245427, 248983, 252559, 255302, 257587, 259787, 262473, 265081, 267852, 270006, 272532, 274541, 276837, 278659, 280840, 283160, 285468, 287289, 288797, 290674, 292880, 295644, 298234, 301205, 303958, 307099, 310211, 313935, 318187, 323274],
                type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'scatter', x: this.state.x, y: this.state.y},
        ]}
        layout={ {width: 500, height: 400, title: 'A ID Plot'} }
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
