let nav = document.querySelector('.nav')
let trigger = document.querySelector('.nav__trigger')
let icon = document.querySelector('.fa-solid')

const triggerHandle = () => {
	nav.classList.toggle('show')

	if (nav.classList.contains('show')) {
		trigger.style.transform = 'translate(50%, -50%) rotate(180deg)'
		icon.style.marginLeft = '0rem'
		icon.style.marginRight = '4rem'
	} else {
		trigger.style.transform = 'translate(50%, -50%) rotate(0deg)'
		icon.style.marginLeft = '5rem'
		icon.style.marginRight = '0rem'
	}
}

const mainNavJs = () => {
  nav.classList.toggle('show')
	trigger.addEventListener('click', triggerHandle)
}

document.addEventListener('DOMContentLoaded', mainNavJs)
