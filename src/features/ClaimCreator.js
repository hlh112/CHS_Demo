//import utilities
import styled from "styled-components";
import { useState, useEffect } from "react";
//import styles
import { TextColors, DropShadow, ThemeColors, BackgroundColors, BorderColors } from "../hope-ui/Color";
import { TextInput, Select } from "../hope-ui/Forms";
//import data
import { getMembers } from "../data/members-data";
import { getClaims } from "../data/claims-data";

//compoenent styles
const ModalWrapper = styled.div`
    width: 500px;
    height: fit-content;
    background: ${BackgroundColors.grey};
    border: 1px solid ${BorderColors.normal}};
    border-radius: 3px;
    box-shadow: ${DropShadow.normal};
    position: absolute;
    top: calc(50% - 250px);
    left: calc(50% - 250px);
    z-index: 1000;
    padding: 15px;
    overflow: hidden;

    display: none;
    transition: all 350ms ease 0s;

    &.show {
        display: block;
    }
`
const ModalHead = styled.div`
    margin-bottom: 15px;
    font-size: 16px;
    color: ${TextColors.PrimaryDark};
`
const SearchFieldWrapper = styled.div`
    margin-bottom: 15px;
    position: relative;

    ::after {
        content: '';
        position: absolute;
        right: 4px;
        top: 8px;
        background: url(../common_icons/search.svg) no-repeat;
        width: 20px;
        height: 20px;
    }
`
const Desc = styled.p`
    font-size: 13px;
    color: ${TextColors.DisabledDark};
    margin-bottom: 7px;
`
const MemberWrapper = styled.div`
    overflow-y: scroll;
    height: 350px;
`
const MemberCard = styled.div`
    background: ${ThemeColors.dullBlueLighter};
    border: 1px solid ${BorderColors.normal};
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;
    transition: all 300ms ease 0s;

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    &:hover {
        background: ${ThemeColors.dullBlueLight};
    }
`
const MemberName = styled.div`
    color: ${ThemeColors.PrimaryDark};
    font-size: 14px;
    margin-bottom: 4px;
`
const MemberInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const MemberID = styled.div`
    color: ${ThemeColors.linkBlue};
    font-size: 13px;
`
const DateSigned = styled.div`
color: ${TextColors.SecondaryDark};
    font-size: 13px;
`
const EmptyState = styled.div`
    background: ${BackgroundColors.greyDarker};
    border-radius: 3px;
    text-align: center;
    padding: 15px;
    font-size: 13px;
    color: ${TextColors.SecondaryDark};
`

const CloseButton = styled.div`
    background: url('../common_icons/close.svg') no-repeat;
    width: 20px;
    height: 20px;
    cursor: pointer; 
    opacity: 1;
    transition: all 300ms ease 0s;
    position: absolute;
    right: 15px;
    top: 15px;

    &:hover {
        opacity: 0.3;
    }
`

//component composition
export default function ClaimCreator(props) {

    function closeModal(event) { 
        const elem = event.target.closest('.show')
        elem.classList.remove('show') 
        elem.getElementsByTagName('input')[0].value=''
        setMemberList(members)
    }

    const claims = getClaims()
    const members = getMembers()
    const [memberList, setMemberList] = useState(members)

    const queryMemberList = (event) => {
        const searchValue = event.target.value.toLowerCase()
        if (searchValue.trim().length === 0) {
            setMemberList(members)
        } else {
            setMemberList(members.filter(member => member.memberId.includes(searchValue) || member.memberName.toLowerCase().includes(searchValue)))
        }
    }

    useEffect(() => {
        const emptyState = document.querySelector('.modalEmptyState')
        if (memberList.length === 0) {
            emptyState.style.display = 'block'
        } else {
            emptyState.style.display = 'none'
        }
    }, [memberList])

    function translateCurrency(market) {
        if (market === '🇸🇪') { return 'SEK' } 
        else if (market === '🇩🇰') { return 'DKK' } 
        else if (market === '🇳🇴') { return 'NOK' }
    }

    function createDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return today = yyyy + '-' + mm + '-' + dd
    }

    function createTime() {
        let today = new Date();
        const timestamp = today.getHours() + ":" + today.getMinutes();

        return timestamp
    }

    function generateClaimId(memberId) {
       const targetClaims = claims.filter(claim => claim.memberId === memberId) 
       const targetClaimsId = targetClaims.map(claim => {
            return parseInt(claim.claimId.slice(9), 10)
       })
       const newClaimNum = Math.max(...targetClaimsId) + 1
       const claimModifier = newClaimNum < 10? '0' + newClaimNum.toString() : newClaimNum.toString()
       const newId = memberId + claimModifier
       return newId
    }  

    const createClaimObj = (event) => {

        const selected = event.currentTarget
        const selectedName = selected.getAttribute(['data-name'])
        const selectedId = selected.getAttribute(['data-id'])
        const selectedMarket = selected.getAttribute(['data-market'])
        const currency = translateCurrency(selectedMarket)
        const dateReg = createDate();
        const timeReg = createTime();
        const newClaimId = generateClaimId(selectedId);
        
        const newObj = {
            claimId: newClaimId,
            market: selectedMarket,
            currency: currency,
            memberName: selectedName,
            memberId: selectedId,
            dateRegistered: dateReg,
            timeRegistered: timeReg,
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
        }

        props.onCreatClaim(newObj)
        event.currentTarget.closest('.show').getElementsByTagName('input')[0].value=''
        event.currentTarget.closest('.show').classList.remove('show') 
        setMemberList(members)
    }

    //closing modal
    document.querySelector('body').addEventListener('click', e => {

        const elem = document.querySelector(`#claimCreator`)
        const trigger = document.querySelector(`${props.trigger}`)
        const checkActive = elem?.classList.contains('show')

        if (checkActive) {
            if (e.target.parentElement.closest('#claimCreator') !== elem && e.target !== trigger) {
                elem?.classList.remove('show')
                elem.getElementsByTagName('input')[0].value=''
                setMemberList(members)
            }
        }
    })

    return  <ModalWrapper id='claimCreator' className={props.class}>
                <CloseButton onClick={closeModal}></CloseButton>
                <ModalHead>Create Claim</ModalHead>
                    <SearchFieldWrapper>
                        <TextInput placeholder='Search by Member Name or ID' onChange={queryMemberList} autoFocus={true} />
                    </SearchFieldWrapper>
                    <Desc>Select the member who reported the claim</Desc>
                    <MemberWrapper>
                        {memberList.map(member => {
                            return <MemberCard key={member.memberId} data-name={member.memberName} data-id={member.memberId} data-market={member.market} onClick={createClaimObj}>
                                    <MemberName>{member.memberName} {member.market}</MemberName>
                                    <MemberInfo><MemberID>{member.memberId}</MemberID><DateSigned>Signed on: {member.dateSigned}</DateSigned></MemberInfo>
                                </MemberCard>
                        })}        
                    <EmptyState className="modalEmptyState">There's no matching result</EmptyState>
                    </MemberWrapper>
            </ModalWrapper>
}