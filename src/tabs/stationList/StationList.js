import React from 'react';
import Station from './Station'

class StationList extends React.Component {
    render(){
        const {stations, passengerTab} = this.props;
        return (
            <article>
                <h3>Route Map</h3><hr/>
                <table>
                    <tbody>
                    <tr>
                        <th>Station Name</th><th>Arrival Time</th>
                    </tr>
                    {stations.map((data) => (
                        <Station 
                            key={data.routeId} 
                            station={data} 
                    />
                    ))}
                    </tbody>
                </table>
                <input type="button" value="Enter Passenger Details" onClick={()=>passengerTab()}/>	
            </article>
        );        
    }
}
export default StationList;