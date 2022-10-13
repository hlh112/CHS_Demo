//import utilities
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import callToaster from "../helper/callToaster";
//import styles
import { TextColors, DropShadow, ThemeColors, BackgroundColors, BorderColors, StateColors } from "../hope-ui/Color";
//import data
import { getMembers } from "../data/members-data";
import { getClaims } from "../data/claims-data";

//component styles
const ModalContainer = styled.div`
    background: ${BackgroundColors.grey};
    width: 600px;
    height: 100%;
    position: absolute;
    left: -500px;
    visibility: hidden;
    z-index: 1000;
    box-shadow: ${DropShadow.darker};
    transition: all 350ms ease 0s;

    &.show {
        left: 0px;
        visibility: visible;
    }
`

const ModalHeader = styled.div`
    background: ${BackgroundColors.white};
    padding: 15px;
    font-size: 13px;
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

const ModalContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: calc(100% - 88px);
    padding: 15px;
`
const SectionFlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
`
const SectionWrapper = styled.div`
    width: ${props => props.fullWidth? '100%' : '50%' };
`
const SectionHead = styled.div`
    background: ${ThemeColors.lavenderLight};
    color: ${ThemeColors.lavender};
    border-radius: 3px;;
    font-size: 12px;
    padding: 5px;
    margin-bottom: 10px;
`
const DataRow = styled.div`
    border: 1px solid ${BorderColors.normal};
    display: flex;
    flex-direction: column;
    gap: 0px;
    margin-bottom: -1px;
    background: #f9f9f9;
    padding: 10px;
`
const ClaimCard = styled.div`
    border: 1px solid ${BorderColors.normal};
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: #f9f9f9;
    cursor: pointer;
    transition: all 300ms ease 0s;
    border-radius: 2px;
    padding: 10px;
    margin-bottom: 10px;
    &:hover {
        border: 1px solid ${ThemeColors.linkBlue};
        padding: 11px;
    }
`
const DataFlexWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    &:not(:last-child) { margin-bottom: 5px; }
`
const MainData = styled.div`
    font-size: 12px;
    color: ${TextColors.PrimaryDark};
`
const SubData = styled.div`
    font-size: 10px;
    color: ${TextColors.SecondaryDark};
`

const DataPair = styled.div`
    width: 50%;
    font-size: 12px;
    display: flex;
    flex-direction: row;

`
const DataKey = styled.span`
    color: ${TextColors.SecondaryDark};
    min-width: 50%;
`
const DataValue = styled.span`
    color: ${props => () => {
        if (props.green) {
            return `${StateColors.green}`
        } if (props.red) {
            return `${StateColors.red}`
        } else {
            return `${TextColors.PrimaryDark}`
        }
    }};
`

export default function MemberInfo(props) {

    const members = getMembers()
    const claims = getClaims()
    const thisMember = props.memberId? members.filter(member => member.memberId === props.memberId)[0] : null
    const thisMemberClaims = props.memberId? claims.filter(claim => claim.memberId === props.memberId) : null

    function closeModal(event) { 
        const elem = event.target.closest('.show')
        elem.classList.remove('show') 
        callToaster('blue', `Double Click / Esc to dismiss modals :)`)
    }

    document.addEventListener('dblclick', (event) => {
        const elem = document.querySelector('#memberInfoModal' && '.show')
        return elem? elem.classList.remove('show') : ''
    })

    const navigate = useNavigate()

    const handleClaimClick = (event) => {
        const path = 'ClaimList/' + event.currentTarget.getAttribute('href')
        navigate('../' + path);
        const elem = document.querySelector('#memberInfoModal' && '.show')
        return elem? elem.classList.remove('show') : ''
    }

    return <ModalContainer id='memberInfoModal' className={props.class}>
                    <ModalHeader>
                        {props.modalName}
                        <CloseButton onClick={closeModal}></CloseButton>
                    </ModalHeader>
                    <ModalContentWrapper>
                        <SectionWrapper fullWidth>
                            <SectionHead>General Info</SectionHead>
                            <DataRow>
                                <DataFlexWrapper>
                                    <DataPair>
                                        <DataKey>Member Name</DataKey>
                                        <DataValue>{thisMember? thisMember.memberName : null}</DataValue>
                                    </DataPair>
                                    <DataPair>
                                        <DataKey>Member ID</DataKey>
                                        <DataValue>{thisMember? thisMember.memberId : null}</DataValue>
                                    </DataPair>
                                </DataFlexWrapper>
                            </DataRow>
                            <DataRow>
                                <DataPair>
                                    <DataKey>Signed on</DataKey>
                                    <DataValue>{thisMember? thisMember.dateSigned : null}</DataValue>
                                </DataPair>
                            </DataRow>
                            <DataRow>
                                <DataFlexWrapper>
                                    <DataPair>
                                        <DataKey>Street</DataKey>
                                        <DataValue>{thisMember? thisMember.street : null}</DataValue>
                                    </DataPair>
                                    <DataPair>
                                        <DataKey>City</DataKey>
                                        <DataValue>{thisMember? thisMember.city : null}</DataValue>
                                    </DataPair>
                                </DataFlexWrapper>
                                <DataFlexWrapper>
                                    <DataPair>
                                        <DataKey>Postal Code</DataKey>
                                        <DataValue>{thisMember? thisMember.postalCode : null}</DataValue>
                                    </DataPair>
                                </DataFlexWrapper>
                            </DataRow>
                            <DataRow>
                                <DataFlexWrapper>
                                    <DataPair>
                                        <DataKey>Fradulent Status</DataKey>
                                        { thisMember.fraud === 'Not Fraud'? <DataValue green>{thisMember.fraud}</DataValue> : <DataValue red>{thisMember.fraud}</DataValue> }
                                    </DataPair>
                                    <DataPair>
                                        <DataKey>Direct Debit</DataKey>
                                        { thisMember.directDebit === 'Connected'? <DataValue green>{thisMember.directDebit}</DataValue> : <DataValue red>{thisMember.directDebit}</DataValue> }
                                    </DataPair>
                                </DataFlexWrapper>
                                <DataFlexWrapper>
                                    <DataPair>
                                        <DataKey>Sanction Status</DataKey>
                                        { thisMember.sanction === 'No Hit'? <DataValue green>{thisMember.sanction}</DataValue> : <DataValue red>{thisMember.sanction}</DataValue> }
                                    </DataPair>
                                    <DataPair>
                                        <DataKey>Debt Status</DataKey>
                                        { thisMember.debt === 'No Debt'? <DataValue green>{thisMember.debt}</DataValue> : <DataValue red>{thisMember.debt}</DataValue> }
                                    </DataPair>
                                </DataFlexWrapper>
                            </DataRow>
                        </SectionWrapper>
                        
                        <SectionFlexWrapper>
                            <SectionWrapper>
                                <SectionHead>Open Claims {thisMemberClaims.filter(claim => claim.state === 'Open').length > 0? '(' + thisMemberClaims.filter(claim => claim.state === 'Open').length + ')' : '(0)' }</SectionHead>
                                    {thisMemberClaims.map((claim, index) => {
                                        if (claim.state === 'Open') {
                                            return  <ClaimCard key={index} href={claim.claimId} onClick={handleClaimClick}>
                                                        <DataFlexWrapper>
                                                            <MainData>{claim.claimId}</MainData>
                                                            <MainData>{claim.claimType? claim.claimType : 'Type Not Specified'}</MainData>
                                                        </DataFlexWrapper>
                                                        <DataFlexWrapper>
                                                            <SubData>Reg on: {claim.dateRegistered}</SubData>
                                                            <SubData>{claim.claimOutcome? claim.claimOutcome : 'Outcome Not Specified'}</SubData>
                                                        </DataFlexWrapper>
                                                    </ClaimCard>
                                        }
                                    })}
                            </SectionWrapper> 

                            <SectionWrapper>
                                <SectionHead>Closed Claims {thisMemberClaims.filter(claim => claim.state === 'Closed').length > 0? '(' + thisMemberClaims.filter(claim => claim.state === 'Closed').length + ')' : '(0)' }</SectionHead>
                                    {thisMemberClaims.map((claim, index) => {
                                            if (claim.state === 'Closed') {
                                                return  <ClaimCard key={index} href={claim.claimId} onClick={handleClaimClick}>
                                                            <DataFlexWrapper>
                                                                <MainData>{claim.claimId}</MainData>
                                                                <MainData>{claim.claimType? claim.claimType : 'Type Not Specified'}</MainData>
                                                            </DataFlexWrapper>
                                                            <DataFlexWrapper>
                                                                <SubData>Reg on: {claim.dateRegistered}</SubData>
                                                                <SubData>{claim.claimOutcome? claim.claimOutcome : 'Outcome Not Specified'}</SubData>
                                                            </DataFlexWrapper>
                                                        </ClaimCard>
                                            }
                                        })}
                            </SectionWrapper>
                        </SectionFlexWrapper>

                    </ModalContentWrapper>
            </ModalContainer>
}