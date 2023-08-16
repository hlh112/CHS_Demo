//import utilities
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
//import helper
import setDocumentTitle from '../helper/document-title'
import callToaster from "../helper/callToaster";
//import styles
import { TextInput } from "../hope-ui/Forms";
import { Toaster } from "../hope-ui/Toaster";
import { TextColors } from "../hope-ui/Color";
import { StaticHint } from "../hope-ui/hotkeyHint";

//set page specific styles
const PageContentWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 40px 30px 75px 45px;
  position: relative;
`
const Container = styled.div`
  position: absolute;
  width: 500px;
  top: calc(50% - 125px);
  left: calc(50% - 250px);
  text-align: center;
`
const GraphicWrapper = styled.div`
    position: absolute;
    z-index: -1;
    margin: auo;
    left: calc(50% - 330px);
    top: calc(50% - 330px);
    filter: blur(40px);
    animation: motion 60s infinite;

    @keyframes motion {
        0% {filter: blur(100px);}
        50% {transform: rotate(360deg);}
        50% {filter: blur(20px);}
        100% {filter: blur(100px);}
    }
`
const Title = styled.div`
    font-size: 35px;
    font-weight: 100;
    color: ${TextColors.SecondaryDark};
    margin-bottom: 7px;
`
const Description = styled.div`
    font-size: 16px;
    color: ${TextColors.DisabledDark};
    margin-bottom: 30px;
`
const FieldWrapper = styled.div`
    width: 100%;
    `

export default function Login(props) {

    setDocumentTitle('Login')

    const navigate = useNavigate()

    useEffect(() => {
        const elem = document.querySelector('#loginPage')
        elem?elem.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                    console.log(event.composedPath())
                    const pathArray ＝ composedPath()
                    console.log(pathArray[0])
                    console.log(composedPath()[0])
                    //props.onSubmit(event.path[0].value)
                    //event.path[0].value=''
                    navigate('../' + 'Dashboard')
                    event.stopPropagation()
    
            }
        }) : console.log('no elem');
    }, [])
    
    //page composition
    return <>
        <PageContentWrapper>
            <GraphicWrapper><img src='../fancy/donut.svg' /></GraphicWrapper>
            <Container>
              <Title>Claims Handling Solution Demo</Title>
              <Description>Enter your name and pretend like logging-in</Description>
              <FieldWrapper><TextInput id='loginPage' autoFocus={true}/></FieldWrapper>
              <br />
              <StaticHint firstKey='Enter' desc='to Proceed' />
            </Container>
        </PageContentWrapper>
        <Toaster />
    </>    
}
