//import utilities
import { useEffect, useState } from "react";
import styled from "styled-components";
//import helper
import setDocumentTitle from '../helper/document-title'
import callToaster from "../helper/callToaster";
//import styles
import TableUI from "../hope-ui/Table";
import FilterChip from "../hope-ui/FilterChip"
import { PageHead } from "../hope-ui/Text";
import { PrimaryButton } from "../hope-ui/Buttons";
import { EmptyState } from "../hope-ui/EmptyState";
import ClaimCreator from "../features/ClaimCreator";
import { Toaster } from "../hope-ui/Toaster";
import { HoverHint } from "../hope-ui/hotkeyHint";
//import data
import { getClaims } from "../data/claims-data"
import { getMembers } from "../data/members-data"

//page specific styles
const PageContentWrapper = styled.div`
  padding: 40px 30px 75px 45px;
  overflow-y: scroll;
  position: relative;
`

const MainButtonWrapper = styled.div`
    position: absolute;
    top: 40px;
    right: 30px;
`

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

export default function ClaimList() {

    setDocumentTitle('Claims')
    //create data instance
    const claims = getClaims()
    const members = getMembers()

    //create react hooks for filter handling
    const [claimArray, setClaimArray] = useState(claims)
    const [statusFilter, setStatusFilter] = useState('All')
    const [marketFilter, setMarketFilter] = useState('All')
    const [claimsNumber, setClaimsNumber] = useState(claims.length)

    //get filtered claim list based on selected filters
    const filteredClaims = claims.filter(claim => (statusFilter === 'All' || statusFilter === claim.state) && (marketFilter === 'All' || marketFilter === claim.market))

    //pass updated claim list into hope-ui-table's compatible data structure
    const newClaimsData = filteredClaims.map(claim => {
            return [
                [{
                    primary: claim.market
                },
                {
                    primary: claim.memberName,
                    link: claim.memberId,
                    href: 'Search/' + claim.memberId
                },
                {
                    primary: claim.dateRegistered,
                    secondary: claim.timeRegistered
                },
                {
                    primary: claim.claimType? claim.claimType : 'Not Specified',
                    secondary: claim.claimOutcome? claim.claimOutcome : 'Not Specified'
                },
                {
                    primary: claim.payments? claim.payments + ' ' + claim.currency : 'Not Specified',
                },
                {
                    primary: claim.reserve? claim.reserve + ' ' + claim.currency : 'Not Specified',
                },
                {
                    status: claim.state
                }],
                {
                    path: claim.claimId
                }
            ]
        })
    
    //declare table head
    const tableHeads = ['', 'Member', 'Register Date', 'Type & Outcome', 'Payment', 'Reserve', 'Status']

    //declare page's filters
    const filterAttrs = [
        [ {'label': 'Open', 'tag': 'state'}, {'label': 'Closed', 'tag': 'state'} ],
        [ {'label': '🇸🇪', 'tag': 'market'}, {'label': '🇳🇴', 'tag': 'market'}, {'label': '🇩🇰', 'tag': 'market'} ]
    ]

    //update react hooked filter state
    const toggleFilter = (event) => {
        const tag = event.target.getAttribute('data-tag')
        const newFilter = event.target.getAttribute('data-label')

        if (tag === 'state') {  
            statusFilter === newFilter? setStatusFilter('All') : setStatusFilter(newFilter)  
        } else if (tag === 'market') {
            marketFilter === newFilter? setMarketFilter('All') : setMarketFilter(newFilter) 
        }
    }

    //handle filters active class
    useEffect(() => {
        const elems = document.querySelectorAll('[data-label]')
        const listings = document.querySelectorAll('tbody tr')

        setClaimsNumber(listings.length)
        
        elems.forEach(elem => {
            const tagValue = elem.getAttribute('data-tag')
            if (tagValue === 'state') {
                statusFilter === elem.getAttribute('data-label')? elem.classList.add('active') : elem.classList.remove('active')
            } else if (tagValue === 'market') {
                marketFilter === elem.getAttribute('data-label')? elem.classList.add('active') : elem.classList.remove('active')
            } else {
                elem.classList.remove('active')
            }
        })
    }, [statusFilter, marketFilter])

    //handle table empty state
    useEffect(() => {
        const emptyState = document.querySelector('.empty-state')
        if (claimsNumber === 0) {
            emptyState.style.display = 'block'
        } else {
            emptyState.style.display = 'none'
        }
    }, [claimsNumber])
    
    //Claim Creator Handling
    const openClaimCreator = () => {
        const elem = document.querySelector('.claimCreator')
        setTimeout(e => elem.classList.add('show'), 40)
        setTimeout(e => document.querySelector('.claimCreator').getElementsByTagName('input')[0].focus(), 50)
    }

    const createClaim = (newObj) => {
        const newArray = [claims.unshift(newObj)]
        setClaimArray(newArray)
        callToaster('green', 'Claim created')
    }

    document.addEventListener('keydown', (event) => {

        const claimCreatorBtn = document.querySelector('#claimCreatorBtn')

        if(claimCreatorBtn && event.code === 'KeyA' && event.altKey) {
            setTimeout(e => claimCreatorBtn.click(), 50)
            event.preventDefault()
            event.stopPropagation()
        }

    })

    //page composition
    return <>
        <PageContentWrapper>
            <PageHead text='Claims'/>
            <MainButtonWrapper>
                <PrimaryButton id='claimCreatorBtn' text='Create New Claim' onClick={openClaimCreator} hint={true} hintKeys='Opt + A' hintDesc='Open Modal' left={[-120, -140]} top={[-2, -2]}/>
            </MainButtonWrapper>
            <FlexWrapper>
                <FilterChip attrs={filterAttrs} data={claims} onToggleFilter={toggleFilter} />
            </FlexWrapper>
            <TableUI headers={tableHeads} data={newClaimsData} />
            <EmptyState class="empty-state" text="There's no matching result" />
        </PageContentWrapper>
        <ClaimCreator class='claimCreator' onCreatClaim={createClaim} trigger='#claimCreatorTrigger' />
        <Toaster />
    </>
}