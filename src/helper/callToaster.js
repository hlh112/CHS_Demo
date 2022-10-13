export default function callToaster(state, msg) {
    const toaster = document.querySelector('#toasterBox')
    toaster.classList.add('show', state)
    toaster.innerText = msg
    setTimeout(() => toaster.classList.remove('show', 'blue', 'red'), 2500)
}