let chats = [
    {
        memberId: '563872989',
        chatHistory : [
            {   
                claimFrom: 'I lost my phone',
                signature: 'member',
                date: '2022-08-19',
                time: '22:09'
            }, 
            {   
                claimFrom: 'Need help',
                signature: 'member',
                date: '2022-08-19',
                time: '22:09'
            }, 
            {   
                claimTo: 'I am sorry for your lost', 
                signature: 'elvin@demo.com',
                date: '2022-08-19',
                time: '22:09'
            }
        ]
    },
    {
        memberId: '523452765',
        chatHistory : [
            {   
                claimFrom: 'My luggage is delayed',
                date: '2022-08-19',
                time: '22:09'
            },
            {   
                claimFrom: 'Do I need to change address if I moved to a new country?',
                date: '2022-08-19',
                time: '22:09'
            }
        ]
    },
    {
        memberId: '588872765',
        chatHistory : [
            {   
                claimFrom: 'Can I add a co-insure to my current insurace?',
                date: '2022-08-19',
                time: '22:09'
            }
        ]
    },
    {
        memberId: '523455487',
        chatHistory : [
            {   
                claimFrom: 'is there any referral discount?',
                date: '2022-08-19',
                time: '22:09'
            }
        ]
    },
    {
        memberId: '511252785',
        chatHistory : [
            {   
                claimFrom: 'how can I terminated the insurance?',
                date: '2022-08-19',
                time: '22:09'
            }
        ]
    },
    ]

export function getChats() {
    return chats;
  }