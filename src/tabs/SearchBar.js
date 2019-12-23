import React from 'react';

class SearchBar extends React.Component {
    constructor(){
        super();
        this.state = {
            source : '', destination : '', date : '', stations : [], disableBtn : true
        }
    }
    componentDidMount(){
        let stationsRetrieved = [];
        fetch('http://localhost:8080/stations/', {
            headers: new Headers({'Content-type': 'application/json'}),
            method: 'get'
        }).then(response => {
            if (response.status === 200) 
                return response.json()
        }).then(data => {
            if(data)
                for(let j = 0;j<data.length;j++)
                    stationsRetrieved.push(data[j]);
            this.setState({
                stations : stationsRetrieved,
                source : stationsRetrieved[0],
                destination : stationsRetrieved[0]
            });
        });
    }
    dateHandler(dt){
        var today = new Date();
        var lastdate = new Date();
        lastdate.setDate(new Date(dt).getDate() + 7);
        if ((new Date(dt).getTime() < today.getTime()) || (new Date(dt).getTime() > lastdate.getTime())) {
            alert("The Date must be bigger than todays date and upto 7 days");
            return;
        }
        this.setState({date: dt,disableBtn:false});
    }
    render(){
        const {loadTrains} = this.props;
        return (
            <article>
                <h3>Search Train</h3><hr/>
                <table>
                    <tbody>
                        <tr>
                            <td>Select Source : </td>
                            <td><select value={this.state.source} onChange={e => this.setState({source: e.target.value})}>
                                {this.state.stations.map((st,index) => (
                                    <option key={index} value={st}>{st}</option>
                                ))}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Select Destination : </td>
                            <td><select value={this.state.destination} onChange={e => this.setState({destination: e.target.value})}>
                                {this.state.stations.map((st,index) => (
                                    <option key={index} value={st}>{st}</option>
                                ))}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Select Date : </td>
                            <td><input type="date" placeholder="Enter Date" 
                                    value={this.state.date} onChange={e => this.dateHandler(e.target.value)}/></td>
                        </tr>
                    </tbody>
                </table>
                <input type="button" value="Search" disabled={this.state.disableBtn} 
                    onClick={()=>loadTrains(this.state.source,this.state.destination,this.state.date)}/>
            </article>
        );        
    }
}
export default SearchBar;