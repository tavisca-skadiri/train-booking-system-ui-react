import React from 'react';

class FinalTicket extends React.Component {
    bookTicket(tNo,src,dest,dt,pass){
        let uId = '';
        if (localStorage.hasOwnProperty("userId")) {
            uId = localStorage.getItem("userId")
        }
        let requestBody = { userId : uId, trainNo : tNo, source : src, destination : dest, date : dt, seats : pass };
        console.log(JSON.stringify(requestBody));
        fetch('http://localhost:8080/ticket/', {
            headers: new Headers({'Content-type': 'application/json'}),
		 	method: 'post',
		    body: JSON.stringify(requestBody)
		}).then(response => {
            return response.json()
        }).then(()=>{
            this.props.loadTab('ticketHistory');
        });
    }
    render(){
        const {date,source,destination,passengers,trainNo} = this.props;
        return (
            <article>
                <h3>Ticket Summary</h3>
                <hr/>
                <table>
                    <tbody>
                        <tr><td>Train No : </td><td>{trainNo}</td><td></td><td></td></tr>
                        <tr>
                            <td>Source : </td><td>{source}</td>
                            {/* <td>Arrival Time : </td><td>{source.arrivalTime.substring(11,16)}</td> */}
                        </tr>
                        <tr>
                            <td>Destination : </td><td>{destination}</td>
                            {/* <td>Arrival Time : </td><td>{destination.arrivalTime.substring(11,16)}</td> */}
                        </tr>
                        <tr><td>Date : </td><td>{date}</td><td></td><td></td></tr>
                        {passengers.map((data) => (
                            <tr key={data.passengerName}><td>Passenger Name : </td><td>{data.passengerName}</td><td></td><td></td></tr>
                        ))}
                    </tbody>
                </table>
                <p><input type="button" value="Confirm Booking" onClick={()=>this.bookTicket(trainNo, source, destination, date, passengers)}/></p>
            </article>
        );            
    }
}
export default FinalTicket;
