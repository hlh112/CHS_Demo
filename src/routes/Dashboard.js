//import utilities
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//import helper
import setDocumentTitle from '../helper/document-title'
//import styles
import { PageHead } from "../hope-ui/Text";
import { TextColors, BackgroundColors, BorderColors, ThemeColors } from "../hope-ui/Color";
//import data
import { getClaims } from "../data/claims-data";
import { getQuestions } from "../data/questions";

//page specific styles
const PageContentWrapper = styled.div`
  padding: 40px 30px 75px 45px;
  position: relative;
`

const GraphicWrapper = styled.div`
    position: absolute;
    z-index: -1;
    top: calc(50% - 115px);
    left: calc(50% - 320px);
    filter: blur(40px);
    animation: motion 20s infinite;

    @keyframes motion {
        40% {filter: blur(60px);}
        100% {transform: rotate(360deg);}
        80% {filter: blur(17px);}
    }
`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row; 
`

const Card = styled.div`
  width: 280px;
  height: 160px;
  background: #ffffff3d;
  border: 1px solid #ebebeb;
  border-radius: 6px;
  z-index: 1;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 15px #0000000a;
  cursor: pointer;
  transition: all 300ms ease 0s;

  &:hover {
    background: transparent;
    box-shadow: none;

    h1 {font-size: 28px;}
    p {font-size: 14px;}

  }

  :not(:last-child) {
    margin-right: 15px;
  }

  h1, p {
    color: ${TextColors.PrimaryDark};
    font-weight: normal;
    transition: all 300ms ease 0s; 
    pointer-events: none;
  }
`

export default function Dashboard() {

    setDocumentTitle('Dashboard')
  
    //handle window location
    const navigate = useNavigate()

    const handlePageChange = (event) => {
        const path = event.target.getAttribute('href')
        navigate(path);
    }
    //create data instance
    const claims = getClaims()
    const questions = getQuestions()

    //get number of open claims
    const openClaims = claims.filter(claim => claim.state === 'Open').length
    //get number of tasks in inbox
    const tasks = openClaims + questions.length
    //page composition
    return <>
        <PageContentWrapper>
            <PageHead text='Dashboard' />
            <GraphicWrapper><img src='../fancy/donut.svg' /></GraphicWrapper>
            <CardWrapper>
                <Card onClick={handlePageChange} href='../Inbox'><h1>{tasks}</h1><p>{tasks > 1? 'Incoming Inquiries': 'Incoming Inquiry'}</p></Card>
                <Card onClick={handlePageChange} href='../ClaimList'><h1>{openClaims}</h1><p>{openClaims > 1? 'Open Claims': 'Open Claim'}</p></Card>
            </CardWrapper>
        </PageContentWrapper>
    </>    
}