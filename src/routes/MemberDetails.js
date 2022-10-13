//import utilities
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
//import helper
import setDocumentTitle from '../helper/document-title'
//import styles
import { TextColors, DropShadow, ThemeColors, BackgroundColors, BorderColors, StateColors } from "../hope-ui/Color";
//import data
import { getClaims } from "../data/claims-data"
import { getMembers } from "../data/members-data";

//component styles
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: calc(100% - 88px);
    padding: 35px 25px;
`
const PageHead = styled.div`
    font-size: 16px;
    margin-bottom: 15px;
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

export default function MemberDetails(props) {

    let params = useParams();

    const navigate = useNavigate()

    setDocumentTitle(`Member #${params.memberId}`)
    
    const members = getMembers();
    const claims = getClaims();
    const searchMember = members.filter(member => member.memberId === params.memberId)[0]
    const inboxSelectedMember = members.filter(member => member.memberId === props.memberId)[0]
    const thisMember = searchMember? searchMember : inboxSelectedMember
    const thisMemberClaims = claims.filter(claim => claim.memberId === thisMember.memberId)

    const handleClaimClick = (event) => {
        const path = 'ClaimList/' + event.currentTarget.getAttribute('href')
        navigate('../' + path);
        const elem = document.querySelector('#memberInfoModal' && '.show')
        return elem? elem.classList.remove('show') : ''
    }

    return <ContentWrapper>
        <SectionWrapper fullWidth>
        <PageHead>{thisMember.memberName} {thisMember.market}</PageHead>
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
    </ContentWrapper>    
}