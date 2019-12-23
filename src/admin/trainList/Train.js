import React from 'react';

class Train extends React.Component{
    constructor(){
        super();
        this.state = {
            stationsVisible : false,
            stations : []
        }
        this.getStations = this.getStations.bind(this);
    }
    getStations(trainNo){
        let st = [];
        fetch('http://localhost:8080/routes/' + trainNo, {
            headers: new Headers({'content-type': 'application/json'}),
            method: 'get'
        }).then(response => {
            if (response.status === 200) 
                return response.json()
        }).then(data => {
        if(data)
            for(let j = 0; j < data.length; j++){
                st.push(data[j]);
            }
            this.setState({
                stations : st,
                stationsVisible : true
            });
        });
    }
    render(){
        const {train,deleteTrain} = this.props;
        return (  
            <React.Fragment>
                <tr key={train.trainNo}>
                    <td>{train.trainNo}</td>
                    <td>{train.trainName}</td>
                    <td>{train.source}</td>
                    <td>{train.destination}</td>
                    <td>{train.noOfStop}</td>
                    <td>{train.capacity}</td>
                    <td><input type="button" value="Stations" onClick={()=>this.getStations(train.trainNo)}/></td>
                    <td><input type="button" value="Delete" onClick={()=>deleteTrain(train.trainNo)}/></td>
                </tr>
                <tr>
                    {this.state.stationsVisible && this.state.stations.map((station) => (
                        <td key={station.routeId}>{station.stationName}:{station.arrivalTime.substring(11,16)}</td>
                    ))}
                </tr>
            </React.Fragment>  
        );    
    }
}
export default Train;