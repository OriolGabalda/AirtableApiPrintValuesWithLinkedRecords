import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyYgnMRoedqztpTB'}).base('appjGbgJWQpofyJVe');
var valor = '';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      airtable: [],
      accounts: [],
      contacts: [],
      interactions: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/appjGbgJWQpofyJVe/Opportunities?api_key=keyYgnMRoedqztpTB')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ airtable: data.records });
    }).catch(err => {
      // Error :(
    });

    fetch('https://api.airtable.com/v0/appjGbgJWQpofyJVe/Accounts?api_key=keyYgnMRoedqztpTB')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ accounts: data.records });
    }).catch(err => {
      // Error :(
    });

    fetch('https://api.airtable.com/v0/appjGbgJWQpofyJVe/Contacts?api_key=keyYgnMRoedqztpTB')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ contacts: data.records });
    }).catch(err => {
      // Error :(
    });

    fetch('https://api.airtable.com/v0/appjGbgJWQpofyJVe/Interactions?api_key=keyYgnMRoedqztpTB')
    .then((resp) => resp.json())
    .then(data => {
       this.setState({ interactions: data.records });
    }).catch(err => {
      // Error :(
    });

  }

  createData(){
    const airtable = this.state.airtable; 

    const accounts = this.state.accounts;

    const contacts = this.state.contacts;

    const interactions = this.state.interactions;
    
    function getAccountsValues(variable){
      var foundAccounts = accounts.find(accounts=> accounts.id == variable);

      const name = foundAccounts ? foundAccounts.fields['Name']: '';
      return name;
    }

    function getContactsValues(variable){

        var foundNameOrganization = contacts.find(contacts=> contacts.id == variable);

        const name = foundNameOrganization ? foundNameOrganization.fields["Name & organization"]: '';
        return name;     
    }

    function getInteractionsValues(variable){

      if(variable != null){

        var largada = variable.length;
        var interactionsNames = "";

        for (let i = 0; i <= largada; i++){

          var foundInteraction = interactions.find(interactions=> interactions.id == variable[i]);

          const interaction = foundInteraction ? foundInteraction.fields["Interaction"]: '';

          interactionsNames = interactionsNames + interaction + ",";

        }

        interactionsNames = interactionsNames.slice(0,-1);

        return interactionsNames;        
      }
      else{
        const interaction = null;
        return interaction;
      }
      
    }

    function convertToMoney(variable){
      var moneyPoint = (variable).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      var moneySimbol = "$"+moneyPoint;
      return moneySimbol; 
    }

    function convertDate(variable){
      if(variable != null){
        var year = variable.slice(0,4);
        var month = variable.slice(5,7);
        var day = variable.slice(8,10);
        var date = day+"/"+month+"/"+year;
        return date;
      }
      
    }
 
    const entry = airtable.map((airtable, accounts) =>
      <tr>
      <td className="tableContent">{airtable.fields["Opportunity name"]}</td>
      <td className="tableContent">{airtable.fields.Status}</td>
      <td className="tableContent">{airtable.fields.Priority}</td>
      <td className="tableContent">{airtable.fields.Owner.name}</td>
      <td className="tableContent">{getAccountsValues(airtable.fields.Account)}</td>
      <td className="tableContent">{convertToMoney(airtable.fields["Estimated value"])}</td>
      <td className="tableContent">{convertDate(airtable.fields["Proposal deadline"])}</td>
      <td className="tableContent">{convertDate(airtable.fields["Expected close date"])}</td>
      <td className="tableContent">{convertDate(airtable.fields["Last contact"])}</td>
      <td className="tableContent">{getContactsValues(airtable.fields["Primary contact for"])}</td>
      <td className="tableContent">{getInteractionsValues(airtable.fields["Interactions"])}</td>
      <td className="tableContent">{getContactsValues(airtable.fields["Decision maker for"])}</td>
      </tr>
    );
    return entry;
  }

  render() {
    return(
      <div className= "body">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="tableHeader">Opportunity name</th>
              <th className="tableHeader">Status</th>
              <th className="tableHeader">Priority</th>
              <th className="tableHeader">Owner</th>
              <th className="tableHeader">Account</th>
              <th className="tableHeader">Estimated value</th>
              <th className="tableHeader">Proposal deadline</th>
              <th className="tableHeader">Expected close date</th>
              <th className="tableHeader">Last contact</th>
              <th className="tableHeader">Primary contact for</th>
              <th className="tableHeader">Interactions</th>
              <th className="tableHeader">Decision maker for</th>
            </tr>
          </thead>
          <tbody>
            {this.createData()}
          </tbody>
        </table>
      </div> 
    );
  }
}

export default App;