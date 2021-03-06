import React, {Component} from 'react'
import { Checkbox, FormGroup, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Box, Radio, Grid, Typography, Paper, Button } from '@material-ui/core';
import axios from 'axios';

const URL = "http://localhost:5000/";

class ContestFilter extends React.Component {
    constructor(props) {
        super(props)
        console.log("constructor")
        this.state = {
            checkedItems: new Map(),
            hideBox: {basketball: false, football: false, tennis: false },
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    componentDidUpdate(prevState, prevProps) {
        if (prevProps.userInfo !== undefined) {
            if (prevProps.filterInfo.sport != this.props.sport) {
                console.log("updated")
            }
        }
    }
    
    handleChange(event) {
        const item = event.target.name
        const isChecked = event.target.checked
        console.log("item is", item)
        console.log("isChecked is", isChecked)
        this.setState( (state) => ({
            checkedItems: state.checkedItems.set(item, isChecked)
        }))
    }

    handleButton() {
        var array = []
            for (const [key,value] of this.state.checkedItems.entries()) {
                if (value) {
                    array.push(key)
                }
            }
            var filterInfo = this.props.filterInfo
            filterInfo.contest = array
            this.props.updateFilterInfo(filterInfo)
    }
    render() {
        return(
            <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography variant="h5" color="initial">Select Contest</Typography>
                <FormControl style={this.props.style} component="fieldset">
                    <FormGroup>
                    {
                        this.props.contests.map((contest) => {
                            if (this.props.filterInfo !== undefined) {
                                if (this.props.filterInfo.sport == contest.type) {
                                    return(
                                        <FormControlLabel
                                        control={<Checkbox size="small" value={contest.name} checked={this.state.checkedItems.get(contest.name)} onChange= {this.handleChange} name={contest.name} />}
                                        label={contest.name}
                                        />
                                    )
                                }
                                else {
                                    return(
                                        <FormControlLabel
                                        control={<Checkbox size="small" value={contest.name} checked={this.state.checkedItems.get(contest.name)} onChange= {this.handleChange} name={contest.name} disabled={true}/>}
                                        label={contest.name}
                                        />
                                    )
                                }
                            }
                        })
                    }    
                    </FormGroup>
                </FormControl>
                <Button size="small" variant="contained" onClick={this.handleButton}>Okay</Button>
            </Grid> 
        );
    }
}

function RenderMBNs(props){
    const mbns = [];
    for(let i = 1; i < props.max; i++)
        mbns.push(i);
    return(
        mbns.map((mbn) => {
            return(
                <FormControlLabel value={mbn.toString()} control={<Radio size="small"/>} label={mbn} />
        )})
    )
}

function MBNFilter(props) {

    const handleChange = (event) => {
        var filterInfo = props.filterInfo;
        filterInfo.mbn =  event.target.value;
        props.updateFilterInfo(filterInfo)
    }
    return(
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography variant="h5" color="initial">Select MBN</Typography>
            <FormControl style={props.style} component="fieldset">
            <RadioGroup defaultValue="none" aria-label="gender" name="gender1" onChange = {handleChange} >
                <RenderMBNs max={10}/>
            </RadioGroup>
            </FormControl>
        </Grid> 
    );
}


class KeyWordFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            input :""
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        this.setState({
            input: event.target.value
        })
        this.props.onInputChange(this.state.input)
    }

    render() {
        return(
            <Grid item lg={7} md={7} sm={12} xs={12}>
                    <TextField fullWidth="true" variant="outlined" id="input-with-icon-grid" label="Search with text (etc. Beşiktaş)"
                    value= {this.state.input} onChange={this.handleChange} />
            </Grid> 
        );
    }
}

function SportFilter(props){
    console.log("sport filter: ", props.filterInfo)

    const handleChange = (event) => {
        props.resetMatches()
        var filterInfo = props.filterInfo;
        filterInfo.sport = event.target.value;
        props.updateFilterInfo(filterInfo);
     }

    return(
        <Grid item lg={5} md={5} sm={12} xs={12}>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="FOOTBALL" onChange = {handleChange} >
                    <FormControlLabel
                    value="FOOTBALL"
                    control={<Radio color="primary" />}
                    label="Football"
                    labelPlacement="end"
                    />
                    <FormControlLabel
                    value="BASKETBALL"
                    control={<Radio color="primary" />}
                    label="Basketball"
                    labelPlacement="end"
                    />
                    <FormControlLabel
                    value="TENNIS"
                    control={<Radio color="primary" />}
                    label="Tennis"
                    labelPlacement="end"
                    />
                </RadioGroup>
            </FormControl>
        </Grid> 
    );
}

function BottomPanel(props){
    const rootStyle = {
        marginTop: 10,
        display: "inline-flex",
        width: "100%"
    }
    const childStyle={
        paddingLeft: 10,
        height: 150,
        overflowY: "scroll",
        overflowX: "hidden",
        width: "100%",
    }

    return( 
            <Grid container spacing={3} style={rootStyle}>
                <MBNFilter style={childStyle} updateFilterInfo = {props.updateFilterInfo} filterInfo = {props.filterInfo} />
                <ContestFilter style={childStyle} contests={props.contests} updateFilterInfo = {props.updateFilterInfo} filterInfo = {props.filterInfo} />
            </Grid>
    );
}

function TopPanel(props) {
    const rootStyle = {
        display: "inline-flex",
        width: "100%"
    }
    return(
        <Grid container spacing={3} style={rootStyle}>
            <SportFilter updateFilterInfo = {props.updateFilterInfo} filterInfo = {props.filterInfo} updateBetsInfo = {props.updateBetsInfo} resetMatches = {props.resetMatches}/>
            <KeyWordFilter onInputChange={props.onInputChange} updateFilterInfo = {props.updateFilterInfo} filterInfo = {props.filterInfo} />
        </Grid>
    );
}

const rootStyle = {
    width: "100%"
}

class SortPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event.target.checked)
        this.setState({
            checked: event.target.checked 
        })
        var info = this.props.filterInfo
        var bool = (this.props.filterInfo == true ? false : true)
        info.sort_type = bool
        this.props.updateFilterInfo(info)
    }

    render () {
        return(
            <Grid container spacing={3} style={rootStyle}>
                <Grid item lg={4} md={6} sm={12} xs={12}>
                    <FormControl style={this.props.style} component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                            control={<Checkbox size="medium" value="popularitySort" checked={this.state.checked} onChange={this.handleChange} name={"popularity"} />}
                            label={"Sort by popularity"}
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item lg={8} md={6} sm={0} xs={0}></Grid>
            </Grid>
        );
    }
}

class FilterPanel extends Component{
    constructor(props) {
        super(props)
    }

    render(){
        console.log("filterInfo:" ,this.props.filterInfo)
        return(
            <Paper style={{padding: 15,}} elevation={7}>
                <form>
                    <TopPanel onInputChange={this.props.onInputChange} updateFilterInfo = {this.props.updateFilterInfo} filterInfo = {this.props.filterInfo} updateBetsInfo = {this.props.updateBetsInfo} resetMatches = {this.props.resetMatches} />
                    <BottomPanel contests={this.props.contests} updateFilterInfo = {this.props.updateFilterInfo} filterInfo = {this.props.filterInfo}/>
                    <Button style={{marginTop: 20, backgroundColor: "#14FF43"}} variant="outlined" fullWidth="true" onClick={this.props.handleSubmit}>LIST</Button>
                </form>
            </Paper>
        );
    }
}

export default FilterPanel