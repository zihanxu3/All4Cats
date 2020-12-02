import React, { Component } from "react";
import logo from '../assets/logo_transparent.png';
import {Typography, Button, TextField, List, ListItem, ListItemText, Grid, FormControl, InputLabel} from '@material-ui/core'
import PriceDataService from "../services/price.service";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ReactDOM from "react-dom";
import USA from "@svg-maps/usa";
import { SVGMap } from "react-svg-map";
import "./Price.css";

import { getLocationId, getLocationName, locationMap } from './utils';
import { universityList } from './utils';

import { Link } from "react-router-dom";

export default class Price extends Component {
    constructor(props) {
        super(props);
        // For the search field
        this.onChangeSaveDate = this.onChangeSaveDate.bind(this);
        this.onChangeSaveZip = this.onChangeSaveZip.bind(this);
        this.onChangeSaveValue = this.onChangeSaveValue.bind(this);
        this.insertInstance = this.insertInstance.bind(this);
        this.updateInstance = this.updateInstance.bind(this);
        this.searchAllPrice = this.searchAllPrice.bind(this);
        // this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        // this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.searchPriceByDateAndZip = this.searchPriceByDateAndZip.bind(this);
        this.deleteAllPrice = this.deleteAllPrice.bind(this);
        this.deletePriceByDateAndZip = this.deletePriceByDateAndZip.bind(this);
        // For city and state
        this.searchPriceByDateStateCity = this.searchPriceByDateStateCity.bind(this);
        this.onChangeSaveCity = this.onChangeSaveCity.bind(this);
        this.onChangeSaveState = this.onChangeSaveState.bind(this);
        this.onChangeSaveUniversity = this.onChangeSaveUniversity.bind(this);
        //avg
        this.searchStateAvgPrice = this.searchStateAvgPrice.bind(this);
        this.searchUniverityPrice = this.searchUniverityPrice.bind(this);

    
        // For the interactive map
        this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationClick = this.handleLocationClick.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);

        // this.state = {
		// 	pointedLocation: null,
		// 	tooltipStyle: {
		// 		display: 'none'
		// 	}
		// };

		
        this.state = {
            // states for search field
            dateForSearch: "",
            zipForSearch: "",
            stateForSearch: "",
            cityForSearch: "",
            valueForSearch: null,
            universityForSearch: null,
            priceArrayJSON: [],
            stateAvgPrice: 'No data',
            // currentTutorial: null,
            // currentIndex: -1,
            // states for interactive map
            pointedLocation: null,
			focusedLocation: null,
            clickedLocation: null,
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

    // componentDidMount() {
    //     this.retrieveTutorials();
    // }

    ////////---- For search field ----////////
    onChangeSaveDate(e) {
        const date = e.target.value;

        this.setState({
            dateForSearch: date
        });
    }

    onChangeSaveZip(e) {
        const zip = e.target.value;

        this.setState({
            zipForSearch: zip
        });
    }

    onChangeSaveValue(e) {
        const value = e.target.value;

        this.setState({
            valueForSearch: value
        });
    }

    onChangeSaveCity(e) {
        const city = e.target.value;

        this.setState({
            cityForSearch: city
        });
    }
    onChangeSaveState(e) {
        const state = e.target.value;

        this.setState({
            stateForSearch: state
        });
    }
    onChangeSaveUniversity(e) {
        const university = e.target.value;
        this.setState({
            universityForSearch: university
        });
    }

    searchPriceByDateAndZip() {
        console.log("clicked search");
        PriceDataService.getByDateAndZip(this.state.dateForSearch, this.state.zipForSearch)
            .then(response => {
            this.setState({
                priceArrayJSON: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }

    searchPriceByDateStateCity() {
        PriceDataService.getByDateAndStateAndCity(this.state.dateForSearch, this.state.stateForSearch, this.state.cityForSearch)
            .then(response => {
            this.setState({
                priceArrayJSON: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }

    searchStateAvgPrice() {
        PriceDataService.getStateAvgPrice(this.state.stateForSearch)
            .then(response => {
                console.log("avgClicked");
                console.log(response.data);
            this.setState({
                priceArrayJSON: [response.data]
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }

    searchUniverityPrice() {
        PriceDataService.getUniversityAvgPrice(this.state.universityForSearch)
            .then(response => {
                this.setState({
                    priceArrayJSON: [response.data]
                });
                console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }


    searchAllPrice() {
        console.log("clicked show all");
        PriceDataService.getAll()
            .then(response => {
            this.setState({
                priceArrayJSON: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.setState({
            priceArrayJSON: [],
            currentIndex: -1
        });
    }

    insertInstance() {
        var data = {
            date: this.state.dateForSearch,
            zipcode: this.state.zipForSearch,
            value: this.state.valueForSearch,
            state: this.state.stateForSearch,
            city: this.state.cityForSearch
        };
      
        PriceDataService.createAll(data)
            .then(response => {
                console.log(response.data);
                this.setState({
                    priceArrayJSON: [response.data],
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateInstance() {
        PriceDataService.updateByDateAndZip(
            this.state.dateForSearch,
            this.state.zipForSearch,
            {
                date: this.state.dateForSearch,
                zipcode: this.state.zipForSearch,
                value: this.state.valueForSearch,
            }
          )
            .then(response => {
              console.log(response.data);
              this.setState({
                priceArrayJSON: [response.data]
              });
            })
            .catch(e => {
              console.log(e);
            });
    }

    deleteAllPrice() {
        PriceDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    deletePriceByDateAndZip() {
        console.log("delete one clicked");
        PriceDataService.deleteByDateAndZip(this.state.dateForSearch, this.state.zipForSearch)
            .then(response => {
                console.log(response);
                this.setState({
                    priceArrayJSON: [{
                        value: "Deleted Successfully"
                    }]
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    ////////---- End search field ----////////

    // retrieveTutorials() {
    //     PriceDataService.getAll()
    //     .then(response => {
    //     this.setState({
    //         tutorials: response.data
    //     });
    //     console.log(response.data);
    //     })
    //     .catch(e => {
    //     console.log(e);
    //     });
    // }

    // setActiveTutorial(tutorial, index) {
    //     console.log("set active");
    //     this.setState({
    //         currentTutorial: tutorial,
    //         currentIndex: index
    //     });
    // }


    
    
    // for map:
	handleLocationMouseOver(event) {
		const pointLoc = getLocationName(event);
        this.setState({ pointedLocation: pointLoc });
        PriceDataService.getStateAvgPrice(locationMap[pointLoc])
        .then(response => {
            console.log(response);
            this.setState({
                stateAvgPrice: response.data.value
            });
        })
        .catch(e => {
            console.log(e);
        });
	}

	handleLocationMouseOut() {
        this.setState({ 
            pointedLocation: null,
            stateAvgPrice: null,
        });
	}

	handleLocationClick(event) {
		const clickedLocation = getLocationName(event);
        const clickedLocationId = getLocationId(event);
        
        console.log(clickedLocationId);
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


    render() {
        // const { titleForSearch, tutorials, currentTutorial, currentIndex } = this.state;
        return (
            <div style={{marginTop: "20px"}}>
                {/* <header>
                    <img src={logo} alt='Logo' height='200'></img>
                </header> */}
                
                <Grid container spacing={1} style={{marginBottom: "3rem"}}>
                    <Grid item xs={9}>
                        <div style={{ display: "flex", justifyContent: "center", height:"37rem", marginTop:"2rem", marginBottom:"2rem"}}>
                            <SVGMap map={USA}
                                type="link"
                                onLocationMouseOver={this.handleLocationMouseOver}
                                onLocationMouseOut={this.handleLocationMouseOut}
                                onLocationClick={this.handleLocationClick}
                                onLocationFocus={this.handleLocationFocus}
                                onLocationBlur={this.handleLocationBlur} />
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ marginTop: "250px", display: "flex", flexDirection: 'column', alignItems: "flex-start" }}>
                            <Typography>
                                    Region: {this.state.pointedLocation}
                            </Typography>
                            <Typography>
                                    Average Price: {this.state.stateAvgPrice == -1 ? "No Data" : this.state.stateAvgPrice}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

                {/* ------------- */}
                <Grid container spacing={1} style={{marginBottom: "2rem"}}>
                    <Grid item xs={8}>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <Grid container spacing={1} style={{marginBottom: "2rem", width: "40rem"}}>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex',
                                                    flexDirection: "column",
                                                    alignItems: 'center'}}>
                                        <TextField style={{ marginBottom: "20px"}} id="outlined-basic1" label="Date" value={this.state.dateForSearch} onChange={this.onChangeSaveDate} variant="outlined"/>
                                        <TextField style={{ marginBottom: "20px"}} id="outlined-basic2" label="Zip Code" value={this.state.zipForSearch} onChange={this.onChangeSaveZip} variant="outlined"/>
                                        <TextField style={{ marginBottom: "20px"}} id="outlined-basic3" label="Price" value={this.state.valueForSearch} onChange={this.onChangeSaveValue} variant="outlined"/>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex',
                                                    flexDirection: "column",
                                                    alignItems: 'center'}}>
                                        <TextField style={{ marginBottom: "20px"}} id="outlined-basic4" label="City" value={this.state.cityForSearch} onChange={this.onChangeSaveCity} variant="outlined"/>
                                        <TextField style={{ marginBottom: "20px"}} id="outlined-basic5" label="State" value={this.state.stateForSearch} onChange={this.onChangeSaveState} variant="outlined"/>
                                        <FormControl style={{margin: "10px", minWidth: 160}}>
                                            <InputLabel>Select University</InputLabel>
                                            <Select
                                                value={this.state.universityForSearch}
                                                onChange={this.onChangeSaveUniversity}
                                                >
                                                {universityList.map((university) => (
                                                    <MenuItem value={university}>
                                                    {university}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        
                                    </div>
                                </Grid> 
                            </Grid>
                        </div>
                        <div style={{display: "flex", justifyContent: 'center'}}>
                            <Grid container spacing={1} style={{marginBottom: "2rem", width: "40rem"}}>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex',
                                                    flexDirection: "column",
                                                    alignItems: 'center'}}>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.searchPriceByDateAndZip}>
                                            Search One by Date and Zipcode
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.searchUniverityPrice}>
                                            Show University Price
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.searchAllPrice}>
                                            Show All Price
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.searchStateAvgPrice}>
                                            Show State Avg_Price
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{display: 'flex',
                                                    flexDirection: "column",
                                                    alignItems: 'center'}}>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.searchPriceByDateStateCity}>
                                            Search One by DateStateCity
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.refreshList}>
                                            Refresh List
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.insertInstance}>
                                            Insert One
                                        </Button>
                                        <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="primary" onClick={this.updateInstance}>
                                            Update One
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{display: 'flex',
                                    flexDirection: "column",
                                    alignItems: 'center'}}>
                            <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="secondary" onClick={this.deletePriceByDateAndZip}>
                                Delete One
                            </Button>

                            <Button style={{width: "30ch", marginBottom: "20px"}} variant="outlined" color="secondary" onClick={this.deleteAllPrice}>
                                Delete All
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div style={{display:"flex", flexDirection: 'column', justifyContent: "center"}}>
                            <div style={{width: 330}}>
                                <p>Results:</p>
                                <List component="nav">
                                    {this.state.priceArrayJSON &&
                                    this.state.priceArrayJSON.map((priceJSON, index) => (
                                        <ListItem button
                                            onClick={() => {}}
                                            key={index}
                                        >
                                            <ListItemText>Date: {priceJSON.date}, Zip: {priceJSON.zipcode}, Price: {priceJSON.value}, City: {priceJSON.city}, State: {priceJSON.state}</ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                
                <footer>
                    <div style={{display:"flex", justifyContent: "center", marginTop: "20vmin"}}>
                        <p style={{fontSize: "10px"}}>All Rights Reserved @All4CatsTeam</p>
                    </div>
                </footer>
            </div>
        );
    }
}
 

