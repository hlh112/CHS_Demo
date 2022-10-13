export default function closeOtherModals() {
    const otherModals = document.querySelectorAll('.show')
    otherModals.forEach(modal => modal.classList.remove('show'))
}