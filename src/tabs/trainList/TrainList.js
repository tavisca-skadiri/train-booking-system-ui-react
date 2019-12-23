import React from 'react';
import Train from './Train';

class TrainList extends React.Component {
    render(){
        const {trains,getStations,date} = this.props;
        return (
            <article>
                <h3>Train List</h3>
                <hr/>
                <table>
                    <tbody>
                        <tr>
                            <th>Train No</th><th>Train Name</th><th>Source</th><th>Destination</th>
                            <th>Stops</th><th>Capacity</th><th>Avl seats</th><th>Select</th>
                        </tr>
                        {trains.map((data) => (
                            <Train key={data.trainNo} train={data} getStations={getStations} date={date}/>
                        ))}
                    </tbody>
                </table>	
            </article>
        );        
    }
}
export default TrainList;