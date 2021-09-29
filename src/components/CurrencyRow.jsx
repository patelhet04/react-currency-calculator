import React from "react";

const CurrencyRow = (props) => {
	const {
		currencyOptions,
		selectedCurrency,
		onChangeCurrency,
		amount,
		onChangeAmount,
	} = props;
	return (
		<div class="row mt-5">
			<div class="col-md-6 m-auto">
				<div class="card card-body">
					<form action="" method="">
						<div class="form-group">
							<label class="form-label mt-4 required">Input Value</label>
							<input
								type="number"
								value={amount}
								class="form-control mb-2"
								onChange={onChangeAmount}
							/>
							<select
								value={selectedCurrency}
								class="form-select mb-5"
								onChange={onChangeCurrency}
							>
								{currencyOptions.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</select>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CurrencyRow;
