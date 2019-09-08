import React, { Component } from 'react';
import CryptoListChild from './CryptoListChild';
import axios from 'axios';

class CryptoParent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cryptoList: [],
			filterCryptoList: []
		}
	}
	getCryptoData = () => {
		axios.get('https://blockchain.info/pl/ticker')
			.then(response => {
				const cryptoData = response.data;
				let lastCryptoList = this.state.cryptoList;
				let cryptoListArray = [];

				cryptoListArray = Object.keys(cryptoData).map(key => {
					let cryptoObj = {};
					cryptoObj.currency = key;
					cryptoObj.symbol = cryptoData[key].symbol;
					cryptoObj.buy = cryptoData[key].buy;
					cryptoObj.sell = cryptoData[key].sell;
					cryptoObj.lastRate = cryptoData[key].last;

					let lastObj = lastCryptoList.find(lastObj => cryptoObj.currency === lastObj.currency);

					if (lastObj !== undefined) {
						if (cryptoObj.lastRate > lastObj.lastRate) {
							cryptoObj.class = "green"
						}
						else if (cryptoObj.lastRate < lastObj.lastRate) {
							cryptoObj.class = "red"
						} else {
							cryptoObj.class = "blue"
						}
					} else {
						cryptoObj.class = "blue"
					}

					return cryptoObj
				})

				this.setState({
					cryptoList: cryptoListArray
				})
				this.filter()
				// console.log('cryptoData', cryptoData)
				// console.log('lastCryptoList', lastCryptoList)
				// console.log('cryptoListArray', cryptoListArray)
			})
			.catch(error => {
				alert(error);
			})
	}
	componentDidMount = () => {
		this.getCryptoData()
		this.timer = setInterval(() => this.getCryptoData(), 5000)
	}
	filter = () => {
		let value = this.inputFiltr.value.toUpperCase().trim();
		let filterList = this.state.cryptoList

		filterList = filterList.filter((item) => {
			return (item.currency.search(value) !== -1)
		})
		this.setState({
			filterCryptoList: filterList
		})
	}

	render = () => {
		return (
			<div>
				<input ref={(data) => { this.inputFiltr = data }} placeholder="Currency:" onChange={this.filter} />
				<CryptoListChild
					listCryptoValueFilter={this.state.filterCryptoList} />
			</div>
		)
	}
}
export default CryptoParent