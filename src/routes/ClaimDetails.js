//import utilities
import { useParams } from "react-router-dom";
import styled from "styled-components";
//import helper
import setDocumentTitle from '../helper/document-title';
import closeOtherModals from "../helper/closeOtherModals";
import callToaster from "../helper/callToaster";
//import styles
import { BackgroundColors } from "../hope-ui/Color";
import { Toaster } from "../hope-ui/Toaster";
//import features
import ChatRoom from "../features/Chat";
import ClaimNote from "../features/ClaimNote";
import MemberInfo from "../features/MemberInfo";
import TemplateBrowser from "../features/Template";
//import data
import { getClaims } from "../data/claims-data"
//import pages
import ClaimForms from "../pages/ClaimForm";
//page specific styles
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: ${BackgroundColors.white}
`
const InnerContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 65px);
    width: ${props => props.width? `${props.width}%` : '100%'};
`

//page composition
export default function ClaimDetails(props) {

    //get selected claim's content
    let params = useParams();
    const claims = getClaims();
    const searchClaim = claims.filter(claim => claim.claimId === params.claimId)[0];
    const thisClaim = searchClaim;

    /* ----------------------------------------------------------------- */

    //set page title
    setDocumentTitle(`Claim #${params.claimId}`)

    /* ----------------------------------------------------------------- */

    //Open Modals Handling
    function openMemberInfoModal(event) {
        const elem = document.querySelector('.memberInfoModal')
        closeOtherModals()
        elem.classList.add('show')
    }

    function openClaimNote() {
        const elem = document.querySelector('.claimModal')
        closeOtherModals()
        elem.classList.add('show')
        setTimeout(e => document.querySelector('.claimModal').getElementsByTagName('textarea')[0].focus(), 50)
    }

    /* ----------------------------------------------------------------- */

    //page composition
    return <>
        <MemberInfo class='memberInfoModal' modalName='Member Info' memberId={thisClaim.memberId}/>
        <TemplateBrowser />
        <ClaimNote class='claimModal' modalName='Claim Note' claimData={thisClaim} />
        <ContentWrapper>
            <ClaimForms claimData={thisClaim} memberInfo={openMemberInfoModal} claimNote={openClaimNote} />
            <InnerContentWrapper width='33'>
                <ChatRoom memberName={thisClaim.memberName} memberId={thisClaim.memberId} />
            </InnerContentWrapper>
        </ContentWrapper>
        <Toaster />
    </>    
}