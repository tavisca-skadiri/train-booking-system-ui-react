import React from 'react';

class AddTrain extends React.Component{
    constructor(){
        super();
        this.state = {
            trainNo : '', trainName : '', source : '', destination : '', 
            stops : '', capacity : '', stations : [], stationName : '', arrivalTime : '', addTrainDisable : true
        };
    }
    componentDidMount(){
        this.setState({
            trainNo : '', trainName : '', source : '', destination : '', stops : '', capacity : '' , stations : [], stationName : '', arrivalTime : ''
        });
    }
    addStation(sName,aTime){
        let st = this.state.stations;
        let obj = {stationName:sName,arrivalTime:aTime};
        st.push(obj);
        this.setState({
            stations : st,
            arrivalTime : '',
            stationName : ''
        })
    }
    render(){
        const {addTrain} = this.props;
        
        return (   
            <React.Fragment>     
            <tr>
                <td><input type="text" value={this.state.trainNo} onChange={e => this.setState({trainNo: e.target.value})}/></td>
                <td><input type="text" value={this.state.trainName} onChange={e => this.setState({trainName: e.target.value})}/></td>
                <td><input type="text" value={this.state.source} onChange={e => this.setState({source: e.target.value})}/></td>
                <td><input type="text" value={this.state.destination} onChange={e => this.setState({destination: e.target.value})}/></td>
                <td><input type="text" value={this.state.stops} onChange={e => this.setState({stops: e.target.value})}/></td>
                <td><input type="text" value={this.state.capacity} onChange={e => this.setState({capacity: e.target.value})}/></td>
                <td><input type="button" value="Add Train" onClick={()=>addTrain(this.state.trainNo,this.state.trainName,this.state.source,this.state.destination,this.state.stops,this.state.capacity,this.state.stations)}/></td>
            </tr>
            <tr>
                <td>StationName:</td>
                <td><input type="text" value={this.state.stationName} onChange={e => this.setState({stationName: e.target.value})}/></td>
                <td>ArrivalTime:</td>
                <td><input type="datetime-local" value={this.state.arrivalTime} onChange={e => this.setState({arrivalTime: e.target.value})}/></td>
                <td><input type="button" value="Add Station" onClick={()=>this.addStation(this.state.stationName,this.state.arrivalTime)}/></td>
            </tr>
            </React.Fragment>
        );            
    }
}
export default AddTrain;