import React from 'react';
import SettingsTab from './settingsTab/SettingsTab';
import TicketHistory from './ticketHistory/TicketHistory';
import SearchBar from './SearchBar';
import TrainList from './trainList/TrainList';
import StationList from './stationList/StationList';
import PassengerEntry from './passengerEntry/PassengerEntry'
import FinalTicket from './finalTicket/FinalTicket';
import TicketData from './ticketData/TicketData';

class Tabs extends React.Component {
    constructor(){
        super();
        this.state = {
            visibleTab : 'searchBar',
            trainList : [], stations : [], date : '', source : '', destination : '', passengers : [],
            ticket : '', trainNo : '', availability : ''
        };
        this.loadTrains = this.loadTrains.bind(this);
        this.loadTicket = this.loadTicket.bind(this);
        this.loadTab = this.loadTab.bind(this);
        this.getStations = this.getStations.bind(this);
        this.passengerTab = this.passengerTab.bind(this);
        this.loadFinalTicket = this.loadFinalTicket.bind(this);
    }
    loadTab(tabName){
        this.setState({visibleTab : tabName});
    }
    loadTrains(src,dest,dt){        
        let requestBody = { source : src, destination : dest, date : dt };
        let trains = [];
        fetch('http://localhost:8080/search_trains_between/', {
            headers: new Headers({'Content-type': 'application/json'}),
            method: 'post',
            body: JSON.stringify(requestBody)
        }).then(response => {
            if (response.ok) 
                return response.json()
        }).then(data => {
            if(data)
                for(let j = 0;j<data.length;j++)
                    trains.push(data[j]);
            this.setState({
                trainList : trains,
                date : dt,
                source : src,
                destination : dest,
                visibleTab : 'trainList'
            });
        });
    }
    getStations(trainNo,availability){
        let st = [];
        fetch('http://localhost:8080/routes/' + trainNo, {
            headers: new Headers({'content-type': 'application/json'}),
            method: 'get'
        }).then(response => {
            if (response.status === 200) return response.json()
        }).then(data => {
            if(data)
                for(let j = 0; j < data.length; j++)
                    st.push(data[j]);
            this.setState({
                stations : st,
                trainNo : trainNo,
                availability : availability,
                visibleTab : 'stationList'
            });
        });
    }
    loadTicket(t){
        this.setState({
            ticket : t,
            visibleTab : 'ticketData'
        })
    }
    passengerTab(){
        this.setState({
            visibleTab : 'passengerEntry'
        })
    }
    loadFinalTicket(p){
        this.setState({
            passengers : p,
            visibleTab : 'finalTicket'
        })    
    }
    render(){
        return (
            <div className="tabs">
                <ul>
                    <li onClick={()=>this.loadTab('searchBar')}>Book Ticket</li>
                    <li onClick={()=>this.loadTab('ticketHistory')}>Ticket History</li>
                    <li onClick={()=>this.loadTab('settings')}>Settings</li>
                </ul>
                <div>
                    {this.state.visibleTab === 'searchBar' ? <SearchBar loadTrains={this.loadTrains}/> : 
                    this.state.visibleTab === 'trainList' ? <TrainList trains={this.state.trainList} getStations={this.getStations} date={this.state.date}/> : 
                    this.state.visibleTab === 'stationList' ? <StationList stations={this.state.stations} passengerTab={this.passengerTab}/> : 
                    this.state.visibleTab === 'passengerEntry' ? <PassengerEntry availability={this.state.availability} loadFinalTicket={this.loadFinalTicket} passengerSubmit = {this.passengerSubmit}/> : 
                    this.state.visibleTab === 'ticketData' ? <TicketData ticket={this.state.ticket}/> : 
                    this.state.visibleTab === 'finalTicket' ? 
                    <FinalTicket
                        trainNo = {this.state.trainNo}
                        loadTab = {this.loadTab}
                        date = {this.state.date}
                        source = {this.state.source}
                        destination = {this.state.destination}
                        passengers = {this.state.passengers} /> :
                    this.state.visibleTab === 'ticketHistory' ? <TicketHistory loadTicket={this.loadTicket}/> : <SettingsTab/>
                    }
                </div>
            </div>
        );        
    }
}
export default Tabs;