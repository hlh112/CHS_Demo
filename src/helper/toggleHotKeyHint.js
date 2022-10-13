export const showHint = (event) => {
    const identifier = event.currentTarget.getAttribute('id')
    const targetHint = document.querySelector(`[data-hint="${identifier}"]`)
    targetHint?.classList.add('show')
}

export const hideHint = (event) => {
    const targetHint = document.querySelector(`[data-hint].show`)
    targetHint?.classList.remove('show')
}