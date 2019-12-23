import React from 'react';


class PassengerEntry extends React.Component {
    constructor(){
        super();
        this.state = {
            name : '',
            passengers : []
        }
    }
    passengerSubmit(n,availability){
        let obj = {passengerName : n}
        let p = this.state.passengers;
        if(p.length >= 8 || p.length >= availability)
            alert("Maximum available seats reached");
        else{
            p.push(obj);
            this.setState({
                passengers : p,
                name : ''
            });    
        }
    }
    render(){
        const {loadFinalTicket,availability} = this.props;
        return (
            <article>
                <h3>Enter Passenger Details</h3>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <td><input type="text" placeholder="Enter Name" 
                                    value={this.state.name} onChange={e => this.setState({name: e.target.value})} /></td>
                            <td><input type="button" value="Add" onClick={()=>this.passengerSubmit(this.state.name,availability)}/></td>
                        </tr>
                    </tbody>
                </table>
                {this.state.passengers.map((data) => (
                    <React.Fragment key={data.passengerName}>
                        <label>Passenger Name : {data.passengerName}</label><br/>
                    </React.Fragment>
                ))}
                <br/>
                <input type="button" value="Show Final Ticket" onClick={()=>loadFinalTicket(this.state.passengers)}/>
            </article>
        );            
    }
}
export default PassengerEntry;
