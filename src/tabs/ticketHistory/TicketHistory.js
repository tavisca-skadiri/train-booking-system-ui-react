import React from 'react';

class TicketHistory extends React.Component {
	constructor(){
		super();
		this.state = {
			tickets : []
		}
	}
	componentDidMount(){
        let uId = '';
        if (localStorage.hasOwnProperty("userId")) {
            uId = localStorage.getItem("userId")
        }
		let ticketsRetrieved = [];
        fetch('http://localhost:8080/user_tickets/' + uId, {
            headers: new Headers({'Content-type': 'application/json'}),
            method: 'get'
        }).then(response => {
            if (response.status === 200) 
                return response.json()
        }).then(data => {
            if(data)
                for(let j = 0;j<data.length;j++)
                    ticketsRetrieved.push(data[j]);
            this.setState({
                tickets : ticketsRetrieved
            });
        });
    }
    render(){
        const {loadTicket} = this.props;
		return (
			<article>
				<h3>Ticket History</h3><hr/>
					<table>
                    <tbody>
                        <tr>
                            <th>PNR</th><th>Train No</th><th>Source</th><th>Destination</th><th>Details</th>
                        </tr>
                        {this.state.tickets.map((ticket) => (
                            <tr key={ticket.pnr}>
                                <td>{ticket.pnr}</td>
                                <td>{ticket.trainNo}</td>
                                <td>{ticket.source}</td>
                                <td>{ticket.destination}</td>
                                <td><input type="button" value="Details" onClick={()=>loadTicket(ticket)}/></td>
                            </tr>
						))}
                    </tbody>
                </table>	
			</article>
		);		
	}
}

export default TicketHistory;