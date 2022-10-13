let ClaimContract = [
    'Swedish Apartment',
    'Swedish Accident',
    'Swedish Car',
    'Swedish Home',
    'Swedish Travel',
    'Norwegian Apartment',
    'Norwegian Accident',
    'Norwegian Home',
    'Norwegian Travel',
    'Danish Apartment',
    'Danish Accident',
    'Danish Home',
    'Danish Travel'
]

let ClaimType = [
    'Accidental Damage',
    'Assault',
    'Injury',
    'Death',
    'Theft',
    'Fire Damage',
    'Water Damage',
    'Luggage Delay',
    'Machinery Breakdown',

]

let PaymentType = [
    'Policy Holder',
    'Other Insurance Company',
    'Third Party'
]

let ClaimStatus = [
    'Open',
    'Closed'
]

let FileType = [
    'Proof of Ownership',
    'Policy Report',
    'Receipt',
    'Other',
]

let ClaimOutcome = [
    'Paid Out',
    'Not Cover by Terms',
    'Invalid Date of Occurance',
    'Covered by Other Company',
    'Compensation Below Deductible'
]

export function getFormDefaultData() {
    return {PaymentType, ClaimStatus, FileType, ClaimType, ClaimContract, ClaimOutcome}
  }