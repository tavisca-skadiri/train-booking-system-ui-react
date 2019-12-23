import React from 'react';
import Train from './Train';
import AddTrain from './AddTrain';

class TrainList extends React.Component {
    constructor(){
        super();
        this.state = {
            trainList : [],
            isAddRowVisible : false
        };
        this.deleteTrain = this.deleteTrain.bind(this);
        this.addTrain = this.addTrain.bind(this);
    }
    componentDidMount(){
        this.getTrains();
    }
    getTrains(){
        let trains = [];
        fetch('http://localhost:8080/trains/', {
            headers: new Headers({'content-type': 'application/json'}),
            method: 'get'
        }).then(response => {
            if (response.status === 200) 
                return response.json()
        }).then(data => {
            if(data)
                for(let j = 0;j<data.length;j++)
                    trains.push(data[j]);
            this.setState({
                trainList : trains
            });
        });
    }
    async addSt(requestBody2){
        fetch('http://localhost:8080/route/', {
            headers: new Headers({'content-type': 'application/json'}),
                method: 'post',
            body: JSON.stringify(requestBody2)
        }).then(response => {
            return response.json()
        });
    }

    addTrain(tNo,tName,src,dest,stps,cty,stations){
    	stations.forEach(async station => {
            let requestBody2 = { trainNo : tNo, stationName : station.stationName, arrivalTime : station.arrivalTime };
            await this.addSt(requestBody2);                
        });
        let requestBody = { trainNo : tNo, trainName : tName, source : src, destination : dest, noOfStop : stps, capacity : cty };
		fetch('http://localhost:8080/train/', {
            headers: new Headers({'Content-type': 'application/json'}),
		 	method: 'post',
		    body: JSON.stringify(requestBody)
		}).then(response => {
            return response.json()
        }).then(()=>{
            this.getTrains();
            this.setState({
                isAddRowVisible:false
            })   
        });
    }
    deleteTrain(trainNo){
        let url = 'http://localhost:8080/train/' + trainNo;
        fetch(url, {
            headers: new Headers({'content-type': 'application/json'}),
            method: 'delete'
        }).then(()=>{
            this.getTrains();   
        });
    }
    render(){
        return (
            <article>
                <h3>Train List<input type="button" value="Add" id="adminAddBtn" onClick={()=>this.setState({isAddRowVisible:!this.state.isAddRowVisible})}/></h3>
                <hr/>
                <table>
                    <tbody>
                    <tr>
                        <th>Train No</th><th>Train Name</th><th>Source</th><th>Destination</th><th>Stops</th><th>Capacity</th><th>Stations</th><th>Delete</th>
                    </tr>
                    {this.state.trainList.map((data) => (
                        <Train key={data.trainNo}train={data} deleteTrain={this.deleteTrain}/>
                    ))}
                    {this.state.isAddRowVisible ? 
                        <AddTrain addTrain={this.addTrain}/> : null}
                    </tbody>
                </table>	
            </article>
        );        
    }
}
export default TrainList;