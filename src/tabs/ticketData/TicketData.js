import React from 'react';

class TicketData extends React.Component {
    cancelTicket(pnr){
        fetch('http://localhost:8080/cancel/' + pnr, {
            headers: new Headers({'Content-type': 'application/json'}),
            method: 'put'
        }).then(response => {
            if (response.status === 200) 
                return response.text()
        }).then(data => {
            alert(data);
        });
    }
	render(){
        const {ticket} = this.props;
		return (
			<article>
                <h3>Ticket Summary</h3>
                <hr/>
                <table>
                    <tbody>
                        <tr><td>Pnr No : </td><td>{ticket.pnr}</td><td></td><td></td></tr>
                        <tr><td>Train No : </td><td>{ticket.trainNo}</td><td></td><td></td></tr>
                        <tr><td>Source : </td><td>{ticket.source}</td></tr>
                        <tr><td>Destination : </td><td>{ticket.destination}</td></tr>
                        <tr><td>Date : </td><td>{ticket.date}</td><td></td><td></td></tr>
                        {ticket.seats.map((data) => (
                            <tr key={data.passengerName}>
                                <td>Passenger Name : </td><td>{data.passengerName}</td>
                                <td>Seat Status: {data.seatStatus}/{data.seatIndex}</td>
                                <td></td>
                            </tr>
                        ))}
                        <tr><td>
                        { ticket.seats[0].seatStatus === "CANCELLED" ? 
                            <input type="button" disabled value="Cancel" onClick={()=>this.cancelTicket(ticket.pnr)}/> :
                            <input type="button" value="Cancel" onClick={()=>this.cancelTicket(ticket.pnr)}/>
                        }
                        </td></tr>
                    </tbody>
                </table>
            </article>
		);		
	}
}

export default TicketData;