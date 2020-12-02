import React, { Component } from "react";
import HouseDataService from "../services/house.service";
import {Button, TextField, List} from '@material-ui/core'
import {auth, addFavoriteHouse, deleteFavoriteHouse } from '../firebase';
import { GridList, GridListTile, Grid } from '@material-ui/core'
import HouseCard from "./HouseCard"

export default class SearchHouse extends Component {
    constructor(props) {
        super(props);
        this.onChangeSaveBed = this.onChangeSaveBed.bind(this);
        this.onChangeSavePrice = this.onChangeSavePrice.bind(this);
        this.searchByBed = this.searchByBed.bind(this);
        this.searchByPrice = this.searchByPrice.bind(this);
        this.state = {
            user: null,
            bedForSearch: '',
            priceForSearch: null,
            houseArrayJSON: [],
            allLikes: null,
        };
    }

    onChangeSaveBed(e) {
        const bed = e.target.value;
        this.setState({
            bedForSearch: bed
        });
    }
    onChangeSavePrice(e) {
        const price = e.target.value;

        this.setState({
            priceForSearch: price
        });
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user})
            } 
        });
    }

    searchByBed() {
        HouseDataService.getByBed(this.state.bedForSearch)
            .then(response => {
            this.setState({
                houseArrayJSON: response.data
            });
            })
            .catch(e => {
            console.log(e);
        });
    }

    searchByPrice() {
        HouseDataService.getByPrice(this.state.priceForSearch)
            .then(response => {
            this.setState({
                houseArrayJSON: response.data
            });
            console.log(response.data);
            })
            .catch(e => {
            console.log(e);
        });
    }

    render() {
        return(
            <div> 
                <div style={{display:"flex", justifyContent: "center"}}>
                    <div style={{display: 'flex',
                                flexDirection: "column",
                                alignItems: 'center'}}>
                        <h2 style={{marginTop: "50px", marginBottom: "30px", fontWeight: "normal"}} >Search For Your Favorite House</h2>
                        <TextField style={{width: "25ch", marginTop: "20px"}} id="outlined-basic1" label="Lowest Price" value={this.state.priceForSearch} onChange={this.onChangeSavePrice} variant="outlined"/>
                        <TextField style={{width: "25ch",marginTop: "20px"}} id="outlined-basic2" label="Number of Bedrooms" value={this.state.bedForSearch} onChange={this.onChangeSaveBed} variant="outlined"/>
                        <Button style={{width: "30ch", marginTop: "20px"}} onClick={this.searchByPrice} variant='outlined'>
                            Search By Price
                        </Button>
                        <Button style={{width: "30ch", marginTop: "20px"}} onClick={this.searchByBed} variant='outlined'>
                            Search By Number of Bedrooms
                        </Button>
                    </div>
                </div>
                <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-around',
                            overflow: 'hidden',
                            marginTop: "50px"}}>
                    <GridList cellHeight={380} style={{width: 1000, marginBottom: "100px"}}>
                        {this.state.houseArrayJSON &&
                        this.state.houseArrayJSON.map((houseJSON, index) => (
                            <GridListTile key={index} style={{display: 'flex', justifyContent: 'center'}}>
                                <HouseCard houseInfo = {houseJSON} user = {this.state.user}/>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}