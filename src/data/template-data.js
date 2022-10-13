let templates = [
    {
        templateName: 'termination',
        templateMsg : `We are sorry to hear you leave, in that case we need the following info:
                    1. preferred termination date
                    2. reason of termination?
                    3. is there anything we can do better next time?`
    },
    {
        templateName: 'pause subscription',
        templateMsg : 'Yes, we can arrange a pause for your plan for up to three months! Please be reminded that payment will be charged again by the end of the pausing period. For how long you need to pause it?'
    },
    {
        templateName: 'change company',
        templateMsg : `We can help you with the switch, please kindly provide us:
        1. what insurance is that?
        2. switching date?
        3. you are the main policy holder?`
    },
    {
        templateName: 'change address',
        templateMsg : 'Hope you are doing well in the new place, can you kindly give us the new address? We will do the rest for you!'
    },
    {
        templateName: 'change co-insured',
        templateMsg : `Thanks for letting us know! Please kindly provide us:
        1. his/her first and last name
        2. your relationship with the co-insured person
        3. his/her personal number
        4. his/her gender
        5. his/her birth date`
        
    }
    ]

export function getTemplates() {
    return templates;
  }