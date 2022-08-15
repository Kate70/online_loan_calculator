export const percentFormatter = new Intl.NumberFormat('de-DE', {style:'percent', maximumFractionDigits: 3});
export const priceformatter = new Intl.NumberFormat('de-DE',{
    style: "currency", currency: "EUR", maximumFractionDigits: 0
})


export const priceformatterDecimal = new Intl.NumberFormat('de-DE',{
    style: "currency", currency: "EUR", maximumFractionDigits: 2
})
