import React from 'react';

class Station extends React.Component{
    render(){
        const {station} = this.props;
        return (  
                <tr key={station.routeId}>
                    <td>{station.stationName}</td>
                    <td>{station.arrivalTime.substring(11,16)}</td>
                </tr>
        );    
    }
}
export default Station;