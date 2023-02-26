let exchangeRate = document.querySelector('.exchange-rate')
let inputGBP = document.getElementById('gb')
let inputPLN = document.getElementById('pl')
let errMsg_gb = document.querySelector('.error-msg--gb')
let errMsg_pl = document.querySelector('.error-msg--pl')

const URL_API = 'https://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json'

// ==============
// HELP FUNCTIONS
// ==============
const getDataFromApi = () => {
	axios
		.get(URL_API)
		.then(res => {
			const GBP = res.data.rates[0].mid.toFixed(2)
			exchangeRate.textContent = GBP
		})
		.catch(err => console.error(err))
}

const inputHandle = obj => {
	// Variables initialization
	let obj_from = obj
	let val = obj.value
	let id_from
	let id_to
	let errMsg_var
	let obj_to

	if (obj_from == inputGBP) {
		id_from = 'gb'
		id_to = 'pl'
		errMsg_var = errMsg_gb
		obj_to = document.getElementById(id_to)
	} else {
		id_from = 'pl'
		id_to = 'gb'
		errMsg_var = errMsg_pl
		obj_to = document.getElementById(id_to)
	}

	// Check if input is currency format
	try {
		if (val.match(/^-?\d*[.,]?\d{0,2}$/)) {
			obj_from.oldValue = val

			// calculate value to "other input"
			axios
				.get(URL_API)
				.then(res => {
					const GBP = res.data.rates[0].mid
					let rate
					id_to === 'pl' ? (rate = GBP) : (rate = 1 / GBP)
					console.log(rate)
					document.getElementById(id_to).value = (val * rate).toFixed(2)
				})
				.catch(err => console.error(err))

			// css and html - error style reset
			obj_from.parentElement.parentElement.classList.remove('error-animation')
			obj_from.classList.remove('input-error')
			obj_to.parentElement.parentElement.classList.remove('error-animation')
			obj_to.classList.remove('input-error')
			errMsg_pl.textContent = ''
			errMsg_gb.textContent = ''
			// ---
		} else {
			document.getElementById(id_from).value = ''
			document.getElementById(id_to).value = ''

			//css and html  - error style set reset
			obj_from.parentElement.parentElement.classList.add('error-animation')
			obj_from.classList.add('input-error')
			errMsg_var.textContent = ' - Enter currency format please.'
			// ---
		}
	} catch (err) {
		console.error(err)
	}
}

// =============
// MAIN FUNCTION
// =============
const main = () => {
	getDataFromApi()

	// Conversion GBP => PLN
	inputGBP.addEventListener('input', () => {
		inputHandle(inputGBP)
	})

	// Conversion PLN => GBP
	inputPLN.addEventListener('input', () => {
		inputHandle(inputPLN)
	})
}

document.addEventListener('DOMContentLoaded', main)
