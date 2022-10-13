export function getDate() {
    let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return today = yyyy + '-' + mm + '-' + dd
}

export function getTime() {
    let today = new Date();
        const timestamp = today.getHours() + ":" + today.getMinutes();

        return timestamp
}