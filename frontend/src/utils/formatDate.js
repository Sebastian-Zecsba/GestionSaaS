export function formatDate(isoString){
    const date = new Date(isoString)
    const formatter = new Intl.DateTimeFormat('es-Es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    return formatter.format(date)
}