import React, { useState, useEffect } from "react";
import "bootswatch/dist/lux/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import CurrencyRow from "./components/CurrencyRow";
import FontawesomeIcon from "./components/FontawesomeIcon";
import axios from "axios";

library.add(fas, faSync);
const BASE_URL = "http://api.exchangeratesapi.io/v1/latest";
const API_KEY = "e25898d976df05934f6b6845eda09037";
const App = () => {
	const [currencyOptions, setCurrencyOptions] = useState([]);
	const [fromCurrency, setFromCurrency] = useState();
	const [toCurrency, setToCurrency] = useState();
	const [amount, setAmount] = useState(1);
	const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
	const [exchangeRate, setExchangeRate] = useState();
	console.log(currencyOptions);
	let fromAmount, toAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate;
	}
	//api call
	useEffect(() => {
		axios.get(`${BASE_URL}?access_key=${API_KEY}`).then((res) => {
			const firstCurrency = Object.keys(res.data.rates)[0];
			setCurrencyOptions([res.data.base, ...Object.keys(res.data.rates)]);
			setFromCurrency(res.data.base);
			setToCurrency(firstCurrency);
			setExchangeRate(res.data.rates[firstCurrency]);
		});
	}, []);

	//useEffect for currency change
	useEffect(() => {
		if (fromCurrency != null && toCurrency != null) {
			fetch(
				`${BASE_URL}?access_key=${API_KEY}&base=${fromCurrency}&symbols=${toCurrency}`
			)
				.then((res) => res.json())
				.then((data) => {
					setExchangeRate(data.rates[toCurrency].toFixed(5));
				});
		}
	}, [fromCurrency, toCurrency]);

	function handleFromAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	}
	function handleToAmountChange(e) {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	}

	return (
		<div>
			<Header />
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency}
				onChangeCurrency={(e) => setFromCurrency(e.target.value)}
				onChangeAmount={handleFromAmountChange}
				amount={fromAmount}
			/>
			<FontawesomeIcon />
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency}
				onChangeCurrency={(e) => setToCurrency(e.target.value)}
				onChangeAmount={handleToAmountChange}
				amount={toAmount}
			/>
		</div>
	);
};

export default App;
