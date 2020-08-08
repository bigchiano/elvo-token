import React, { Component } from "react";

class Main extends Component {
    constructor (props) {
        super(props)
        this.state = {
            address: '',
            accBalance: 0
        }
    }
  sendToken(e) {
    e.preventDefault();
    const address = this.refs.sendAddress.value;
    const amount = this.refs.sendAmount.value;

    this.props.sendToken(address, amount);
  }

  async searchAddress(e) {
      e.preventDefault()
      const address = this.refs.searchAddress.value
      const res = await this.props.checkBalance(address)
      console.log(res)
      this.setState({ address: address, accBalance: res })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-7">
            <div>
              Total {this.props.tokenName}: {this.props.totalSupply}
            </div>
            <div>Balance: {this.props.tokenBalance}</div>
            <br />

            <form className="w-75" onSubmit={this.sendToken.bind(this)}>
              <p className="h4 mb-4">Transfer {this.props.tokenName} </p>

              <p>Input ethereum address and amount below</p>

              <input
                type="text"
                className="form-control mb-4"
                placeholder="Address"
                ref="sendAddress"
              />

              <input
                type="text"
                className="form-control mb-4"
                placeholder="Amount"
                ref="sendAmount"
              />

              <button className="btn btn-sm btn-secondary left" type="submit">
                Transfer
              </button>
            </form>
          </div>
          <div className="col-sm-5">
            <p>{this.props.tokenName} Explorer</p>

            <form className="w-75 mb-3" onSubmit={this.searchAddress.bind(this)}>
              <p>Input ethereum address to check balance</p>

              <input
                type="text"
                className="form-control mb-4"
                placeholder="Address"
                ref="searchAddress"
              />
              <button className="btn btn-sm btn-secondary" type="submit">
                Find
              </button>
            </form>
            <p>Address: {this.state.address} </p>
            <p> Balance: {this.state.accBalance} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
