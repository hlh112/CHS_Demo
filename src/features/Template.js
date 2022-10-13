//import utilities
import styled from "styled-components";
import callToaster from "../helper/callToaster";
//import styles
import { TextColors, DropShadow, ThemeColors, BackgroundColors, BorderColors } from "../hope-ui/Color";
import { TextArea } from "../hope-ui/Forms";
//import data
import { getTemplates } from "../data/template-data";

//component styles
const ModalContainer = styled.div`
    background: ${BackgroundColors.grey};
    width: 300px;
    height: 100%;
    top: 0;
    position: absolute;
    right: -500px;
    visibility: hidden;
    z-index: 1000;
    box-shadow: ${DropShadow.darker};
    transition: all 350ms ease 0s;

    &.show {
        right: 0px;
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
    gap: 10px;
    height: calc(100% - 88px);
    padding: 15px;
`

const DataWrapper = styled.div`
    height: 100%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const DataEach = styled.div`
    width: 100%;
    background: ${BackgroundColors.white};
    border: 1px solid ${BorderColors.normal};
    border-radius: 3px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 10px; 
    transition: all 300ms ease 0s;
    cursor: pointer;

    &:hover {
        padding: 17px;
        border: 1px solid ${ThemeColors.linkBlue};
    }
`
const TemplateName = styled.div`
    font-size: 13px;
    margin-bottom: 7px;
    color: ${ThemeColors.linkBlue};
` 
const TemplateMsg = styled.div`
    font-size: 13px;
    margin-bottom: 7px;
    line-height: 1.4;
` 

export default function TemplateBrowser(props) {

    const templates = getTemplates()

    function closeModal(event) { 
        const elem = event.target.closest('.show')
        elem.classList.remove('show') 
        callToaster('blue', `Double Click / Esc to dismiss modals :)`)
    }

    const selectTemplate = (event) => {
        const textField = document.querySelector('#chatRoom')?.getElementsByTagName('textarea')[0]
        textField.value = event.currentTarget.querySelector('.templateMsg').innerText
        document.querySelector('#templateBrowser').classList.remove('show')
        setTimeout(() => textField.focus(), 100)
    }

    return <ModalContainer id='templateBrowser' className={props.class}>
            <ModalHeader>Templates
                <CloseButton onClick={closeModal}></CloseButton>
              </ModalHeader>
               <ModalContentWrapper>
                  <DataWrapper>
                        {
                            templates.map((template, index) => {
                                return <DataEach key={index} onClick={selectTemplate}>
                                        <TemplateName>{template.templateName}</TemplateName>
                                        <TemplateMsg className='templateMsg'>{template.templateMsg}</TemplateMsg>
                                    </DataEach>
                            })
                        }
                 </DataWrapper>
            </ModalContentWrapper>
            </ModalContainer>
}