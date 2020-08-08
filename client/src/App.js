import React, { Component } from "react";
import Token from "./contracts/Token.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Main from "./Main";
import NavBar from "./components/NavBar";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      web3: null,
      account: "",
      token: {},
      tokenBalance: 0,
      totalSupply: 0,
      tokenName: "Loading...",
    };
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Token.networks[networkId];
      const instance = new web3.eth.Contract(
        Token.abi,
        deployedNetwork.address
      );

      const tx = await web3.eth.getTransaction(deployedNetwork.transactionHash);
      const creator = tx.from;

      // get token balance current address
      let tokenBalance = await instance.methods.balanceOf(creator).call();
      // set token name
      let tokenName = await instance.methods.name().call();
      let totalSupply = await instance.methods.totalSupply().call();

      // Set web3, accounts, and contract to the state
      this.setState({
        web3,
        account: accounts[0],
        token: instance,
        tokenBalance,
        tokenName,
        totalSupply,
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }

    this.setState({ loading: false });
  };

  sendToken = async (address, amount) => {
    try {
      // send transfer function
      const res = await this.state.token.methods
        .transfer(address, amount)
        .send({ from: this.state.account });
      
      this.displayMessage("Token was transfered successfully!!", 'success')
    } catch (error) {
      this.displayMessage("Something went wrong!", 'danger')
    }
  };

  checkBalance = async (address) => {
    // get token balance current address
    let tokenBalance = await this.state.token.methods.balanceOf(address).call();
    return tokenBalance;
  };

  displayMessage(message, type) {
    let msgBox = document.getElementById("msg")
    msgBox.classList.add('alert')
    msgBox.classList.add(`alert-${type}`)
    msgBox.innerHTML = message
    msgBox.classList.remove('hideMsg')
    setTimeout(() => {
      msgBox.classList.add('hideMsg')
      msgBox.style.marginTop = '-65px'
      setTimeout(() => {
        msgBox.style.marginTop = '0'
        msgBox.innerHTML = ""
        msgBox.classList = ""
      }, 4000)
    }, 3000)
  }

  render() {
    let content = this.loading ? (
      <div>Loading Web3, accounts, and contract...</div>
    ) : (
      <div>
        <Main
          {...this.state}
          sendToken={this.sendToken}
          checkBalance={this.checkBalance}
        />
      </div>
    );

    return (
      <div>
        <NavBar tokenName={this.state.tokenName} />
        <div className="container">{content}</div>
      </div>
    );
  }
}

export default App;
