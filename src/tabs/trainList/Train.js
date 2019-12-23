import React from 'react';

class Train extends React.Component{
    constructor(){
        super();
        this.state = {
            availability : '',
            disableSelect : true
        }
    }
    checkAvail(trainNo,src,dest,dt){        
        let requestBody = { source : src, destination : dest, date : dt };
        fetch('http://localhost:8080/availability/' + trainNo, {
            headers: new Headers({'Content-type': 'application/json'}),
            method: 'post',
            body: JSON.stringify(requestBody)
        }).then(response => {
            if (response.status === 200) 
                return response.text()
        }).then(data => {
            this.setState({
                availability : data,
                disableSelect : false
            });
            if(data === "REGRET"){
                this.setState({
                    disableSelect : true
                });             
            }
        });
    }
    render(){
        const {train,getStations,date} = this.props;
        return (  
            <tr key={train.trainNo}>
                <td>{train.trainNo}</td>
                <td>{train.trainName}</td>
                <td>{train.source}</td>
                <td>{train.destination}</td>
                <td>{train.noOfStop}</td>
                <td>{train.capacity}</td>
                {this.state.availability !== '' ? <td>{this.state.availability}</td> : 
                <td><input type="button" value="Check" onClick={()=>this.checkAvail(train.trainNo,train.source,train.destination,date)}/></td>}
                <td><input type="button" disabled={this.state.disableSelect} value="Select" onClick={()=>getStations(train.trainNo,this.state.availability.split(" ")[1])}/></td>
            </tr>
        );    
    }
}
export default Train;