import React, { Component } from 'react';
import './cryptoListChild.css'

class CryptoListChild extends Component {

	render() {
		let listFiltered = this.props.listCryptoValueFilter
		let currencies = listFiltered.map(crypto => {
			let arrow = ''

			if (crypto.class === "green") {
				arrow = String.fromCharCode(8593);
			} else if (crypto.class === "red") {
				arrow = String.fromCharCode(8595);
			} else {
				arrow = String.fromCharCode(8596);
			}

			return (
				<li key={crypto.currency} className = "list-group-item">
					<span className="CryptoLabel">Last rate:</span>
					&nbsp;&nbsp;&nbsp;
					<span className={crypto.class + "CryptoSymbol"}>{crypto.lastRate} {arrow}</span>
					&nbsp;&nbsp;&nbsp;
					<span className="CryptoCurrency">{crypto.currency}</span>
					&nbsp;&nbsp;&nbsp;
					<span className="CurrencySymbol">[{crypto.symbol}]</span>
				</li>	
			)
		})

		return (
			<div>
				<ul>
					{currencies}
				</ul>
			</div>
		)
	}
}
export default CryptoListChild