import Web3 from 'web3';
import { Injectable } from '@angular/core';

declare let require: any;
declare let window: any;

@Injectable()
export class ContractsService {
  private account: string = null;
  private web3: any;
  private optionFactoryABI = require('./tokenContract.json');

  private optionFactoryContract: any;
  private optionFactory: any;
  private optionFactoryAddress: string;

  constructor() {
    this.optionFactoryAddress = '0x7781eda1e54b66d50638fa68e40d98dd92b42fe5';
    // this.optionFactoryABI = JSON.parse(this.optionFactoryABI);

    if (typeof window.web3 !== 'undefined') {
      // using Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);

      this.web3.version.getNetwork((err, netId) => {
        // synchronous way
        switch (netId) {
          case '1':
            console.log('Connected to the Main network');
            break;
          case '2':
            console.log('Connected to the deprecated Morden test network');
            break;
          case '3':
            console.log('Connected to the Ropsten test network');
            break;
          case '4':
            console.log('Connected to the Rinkeby test network');
            this.deployContract();
            break;
          default:
            console.log('Connected to an unknown network');
            alert('Please connect to an Ethereum blockchain network!');
        }
      });
      // asynchronous way
      // if (this.web3.version.network !== '4') {
      // } else {
      //  this.deployContract();
      // }
    } else {
      console.warn(
        'Please use a DApp browser like Mist or the MetaMask plugin for Chrome!'
      );
    }
  }

  async deployContract(): Promise<string> {
    // checking and deploying contract
    this.web3.eth.getCode(this.optionFactoryAddress, function (error, result) {
      if (!error) {
        // checking if provided address corresponds to a contract or just account
        if (JSON.stringify(result) === '0x' || JSON.stringify(result) === '0x0') {
          console.log('Contract not deployed');
          this.optionFactoryContract = this.web3.eth.contract(this.optionFactoryABI);
          this.optionFactory = this.optionFactoryContract.new({
            from: this.web3.eth.accounts[0],
            // tslint:disable-next-line:max-line-length
            data: '0x6080604052670de0b6b3a7640000600555336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610e0b8061005f6000396000f3006080604052600436106100a4576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe0146100a9578063168fd6d1146100d457806324ad848e14610141578063409e22051461016e57806351826dbd146102225780638da5cb5b146102ba578063d0e30db014610311578063f2fde38b1461031b578063f3fef3a31461035e578063fea33db2146103ab575b600080fd5b3480156100b557600080fd5b506100be6103ed565b6040518082815260200191505060405180910390f35b3480156100e057600080fd5b506100ff60048036038101908080359060200190929190505050610434565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561014d57600080fd5b5061016c60048036038101908080359060200190929190505050610467565b005b34801561017a57600080fd5b50610199600480360381019080803590602001909291905050506104cc565b6040518080602001848152602001838152602001828103825285818151815260200191508051906020019080838360005b838110156101e55780820151818401526020810190506101ca565b50505050905090810190601f1680156102125780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34801561022e57600080fd5b50610263600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061059d565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156102a657808201518184015260208101905061028b565b505050509050019250505060405180910390f35b3480156102c657600080fd5b506102cf6106cf565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6103196106f4565b005b34801561032757600080fd5b5061035c600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610754565b005b34801561036a57600080fd5b506103a9600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506108a9565b005b6103eb6004803603810190808035906020019082018035906020019190919293919293908035906020019092919080359060200190929190505050610a78565b005b6000600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b60026020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156104c257600080fd5b8060058190555050565b6001818154811015156104db57fe5b9060005260206000209060030201600091509050806000018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105875780601f1061055c57610100808354040283529160200191610587565b820191906000526020600020905b81548152906001019060200180831161056a57829003601f168201915b5050505050908060010154908060020154905083565b606080600080600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040519080825280602002602001820160405280156106115781602001602082028038833980820191505090505b50925060009150600090505b6001805490508110156106c4578473ffffffffffffffffffffffffffffffffffffffff166002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156106b7578083838151811015156106a057fe5b906020019060200201818152505081806001019250505b808060010191505061061d565b829350505050919050565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600554341015151561070557600080fd5b34600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156107af57600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141515156107eb57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16148015610923575080600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b151561092e57600080fd5b80600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501580156109c1573d6000803e3d6000fd5b507fdf273cb619d95419a9cd0ec88123a0538c85064229baa6363788f743fff90deb8282600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001838152602001828152602001935050505060405180910390a15050565b600060018060606040519081016040528088888080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050508152602001868152602001854201815250908060018154018082558091505090600182039060005260206000209060030201600090919290919091506000820151816000019080519060200190610b14929190610d3a565b5060208201518160010155604082015181600201555050039050336002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610bd36001600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054610d1c90919063ffffffff16565b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555034600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055507facdca046fc2bbd753a96081d8f4226b3ae19626f351c335ce373a661612efceb8133600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051808481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a15050505050565b6000808284019050838110151515610d3057fe5b8091505092915050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610d7b57805160ff1916838001178555610da9565b82800160010185558215610da9579182015b82811115610da8578251825591602001919060010190610d8d565b5b509050610db69190610dba565b5090565b610ddc91905b80821115610dd8576000816000905550600101610dc0565b5090565b905600a165627a7a72305820b6db52ffe96662fc1b85ecc839dce991890137c92f11ebe8f5611fb4022ecbc10029',
            gas: '4700000'
          }, function (e, contract) {
            console.log(e, contract);
            if (typeof contract.address !== 'undefined') {
              console.log('Contract mined');
              console.log('address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
            }
          });
        } else {
          console.log('Contract already deployed');
        }
      } else {
        console.error(error);
      }
    });

    return Promise.resolve('Check done');
  }

  async getAccount(): Promise<string> {
    if (this.account == null) {
      this.account = await new Promise((resolve, reject) => {
        this.web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts!');
            return;
          }

          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        });
      }) as string;

      this.web3.eth.defaultAccount = this.account;
    }

    return Promise.resolve(this.account);
  }

  async getContractBalance(): Promise<number> {
    const account = await this.getAccount();
    const contract = this.web3.eth.contract(this.optionFactoryABI);
    const contractInstance = contract.at(this.optionFactoryAddress);

    return new Promise((resolve, reject) => {
      const web3 = this.web3;
      contractInstance.getBalance.call(function (error, result) {
        if (error) {
          console.log(error);
        } else {
          resolve(web3.fromWei(result));
        }
      });
    }) as Promise<number>;
  }

  async deposit(amount: number) {
    const account = await this.getAccount();
    const contract = this.web3.eth.contract(this.optionFactoryABI);
    const contractInstance = contract.at(this.optionFactoryAddress);

    // letting the user know that the transaction has been sent
    console.log('Sending your deposit; this may take a while...');
    // sending the transaction to our contract
    return new Promise((resolve, reject) => {
      const web3 = this.web3;
      contractInstance.deposit.sendTransaction({
        from: web3.eth.accounts[0],
        gas: 4000000,
        value: amount
      }, function (error, result, transactionHash) { // getting the transaction key as callback from the function
        if (error) {
          console.log(error);
        } else {
          console.log('Successful deposit');
          console.log('Transaction hash: ' + transactionHash);
        }
      });
    });
  }
}