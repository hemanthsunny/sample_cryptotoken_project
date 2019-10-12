import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './App.css';

import blockChainConnector from './BlockChainUtility/BlockChainConnector';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      days: [],
      token1: [],
      token2: [],
      canvasData: {},
      hideTable: false
    }
  }

  componentDidMount() {
    let numberOfDays = [];
    for(let i=1; i<=30; ++i){
      numberOfDays.push(i);
    }
    this.setState({
      days: numberOfDays
    })
  }

  getBalanceHistory = () => {
    var blockNumber = 8637066;
    var TokenNEC = [];
    var TokenDAI = [];

    var count=1;
    for(count=1;count<=30;count++)  {
      blockNumber=(blockNumber-12343)
      blockChainConnector
        .getTokenBalance('0xADEEb9d09B8Bcee10943198FB6F6a4229bAB3675','NEC',blockNumber)
        .then(r => {
          console.log(r);
          TokenNEC.push({
            label: count,
            value: r
          });
        });
    }
    console.log('TokenNEC',TokenNEC)


    count=1;
    blockNumber = 8637066
    for(count=1;count<=30;count++)  {
      blockNumber=(blockNumber-12343)
      blockChainConnector
        .getTokenBalance('0xADEEb9d09B8Bcee10943198FB6F6a4229bAB3675','DAI',blockNumber)
        .then(r => {
          console.log(r);
          TokenDAI.push({
            label: count,
            value: r
          });
        });
    }
    console.log('TokenDAI',TokenDAI)

    this.setState({
      token1: TokenNEC,
      token2: TokenDAI,
      canvasData: {
        labels: TokenNEC.map(val => val.label),
        datasets: [
          {
            label: "Token 1",
            data: TokenNEC.map(val => val.value),
            backgroundColor: "rgba(255, 0, 255, 0.5)"
          },
          {
            label: "Token 2",
            data: TokenDAI.map(val => val.value),
            backgroundColor: "rgba(0, 255, 0, 0.5)"
          }
        ]
      },
      token1CanvasData: {
        labels: TokenNEC.map(val => val.label),
        datasets: [
          {
            label: "Token 1",
            data: TokenNEC.map(val => val.value),
            backgroundColor: "rgba(255, 0, 255, 0.5)"
          }
        ]
      },
      token2CanvasData: {
        labels: TokenDAI.map(val => val.label),
        datasets: [
          {
            label: "Token 2",
            data: TokenDAI.map(val => val.value),
            backgroundColor: "rgba(0, 255, 0, 0.5)"
          }
        ]
      }
    })
  }

  handleClick = () => {
    this.getBalanceHistory();
  }

  handleChange = (e) => {
    if(!this.state.address) {
      this.setState({
        ether: [],
        token1: [],
        token2: []
      })
    }
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  hideTableFunc = (bool) => {
    this.setState({
      hideTable: !this.state.hideTable
    })
  }

  renderTableOutput = () => {
    return (
      <div className="table-wrapper">
        <table className="table text-center mt-2">
          <thead>
            <tr>
              <th>Day</th>
              <th>Token 1</th>
              <th>Token 2</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.token1.length > 0 && this.state.address ?
            (this.state.days.map(day => {
              // let token1Val = this.state.token1.find(obj => obj.label === token1Res.label);
              // let token2Val = this.state.token2.find(obj => obj.label === token1Res.label);
              let token1Val = this.state.token1[day-1];
              let token2Val = this.state.token2[day-1];
              return (
                <tr key={day}>
                  <td>{day}</td>
                  <td>
                    {token1Val ? token1Val.value : "-"}
                  </td>
                  <td>
                    {token2Val ? token2Val.value : "-"}
                  </td>
                </tr>
              )
            })):
            (
              <tr className="text-center">
                <td></td>
                <td>
                  <div className="p-2">No data found</div>
                </td>
                <td></td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    )
  }

  renderGraphs = () => {
    return !!this.state.canvasData.labels ?
    (
      <>
        <div className="container">
          <div className="row">
            <div className="col-6 text-center">
              <Line
                width={150}
                height={100}
                options={{
                  responsive: true
                }}
                data={this.state.token1CanvasData}
              />
            </div>
            <div className="col-6  text-center">
              <Line
                width={150}
                height={100}
                options={{
                  responsive: true
                }}
                data={this.state.token2CanvasData}
              />
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="container" style={{margin: "0px auto"}}>
          <div>
            <Line
              width={100}
              height={30}
              options={{
                responsive: true
              }}
              data={this.state.canvasData}
            />
          </div>
        </div>
      </>
    ) : ""
  }

  renderHeader = () => (
    <div className="d-flex parent-wrapper">
      <div className="p-2 child-wrapper-1">
        <h4>Address</h4>
      </div>
      <div className="p-2 child-wrapper-2">
        <input type="text" name="address" onChange={event => this.handleChange(event)}/>
      </div>
      <div className="p-2 child-wrapper-3">
        <button type="button" onClick={this.handleClick} disabled={!this.state.address}>
          Click
        </button>
      </div>
    </div>
  )

  render = () => (
    <>
      {this.renderHeader()}
      {
        this.state.address && this.state.canvasData.labels ?
          <div className="text-center">
            <button type="button" className="btn btn-primary btn-sm" onClick={e => this.hideTableFunc(false)}>
              {this.state.hideTable ? "Show Table" : "Show Graphs"}
            </button>
          </div>
        : ""
      }
      {this.state.hideTable ? this.renderGraphs() : this.renderTableOutput()}
    </>
  )
}

export default App;
