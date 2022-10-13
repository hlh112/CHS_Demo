let claims = [
    {
        claimId: '56387298901',
        market: '🇸🇪',
        currency: 'SEK',
        memberName: 'Linus Falk',
        memberId: '563872989',
        dateRegistered: '2022-09-17',
        timeRegistered: '13:11',
        dateOccurance: null,
        contractType: null,
        claimType: null,
        claimOutcome: null,
        claimCause: null,
        state: 'Open',
        payments: null,
        reserve: null,
        employee: false,
        coInsured: false,
        files: [],
        tags: [],
        claimNotes: []
    },
    {
        claimId: '52345276501',
        market: '🇩🇰',
        currency: 'DKK',
        memberName: 'Elvin Granat',
        memberId: '523452765',
        dateRegistered: '2022-08-20',
        timeRegistered: '08:20',
        dateOccurance: '2022-08-16',
        contractType: 'Swedish Apartment',
        claimType: 'Accidental Damage',
        claimOutcome: 'Paid Out',
        claimCause: 'Phone dropped out from pocket while biking',
        state: 'Closed',
        payments: 800,
        paymentType: 'Policy Holder',
        paymentDate: '2022-08-23',
        reserve: 1500,
        employee: false,
        coInsured: false,
        tags: ['Complex', 'Suspect Fraud', 'Investigation' ],
        files: [],
        claimNotes: [
            {
                note: 'low service needs, payment looks fine, all green',
                signature: 'johndoe@demo.com',
                timestamp: '2022-08-09 12:23'
            }
        ]
    },
]

export function getClaims() {
    return claims;
  }