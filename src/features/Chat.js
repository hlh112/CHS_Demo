//import utilities
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
//import styles
import { SecondaryButton, SmallButtton } from "../hope-ui/Buttons";
import { Dropdown } from "../hope-ui/Dropdown";
import { TextArea } from "../hope-ui/Forms";
import { TextColors, ThemeColors, BackgroundColors, DropShadow } from '../hope-ui/Color';
import { StaticHint } from "../hope-ui/hotkeyHint";
//import helper
import { getDate, getTime } from "../helper/getDate";
import getUser from "../helper/getUser";
import callToaster from "../helper/callToaster";
//import data
import { getChats } from "../data/chat-data";
import { getTemplates } from "../data/template-data";

const ChatWrapper = styled.div`
    width: 100%; 
    background: ${BackgroundColors.grey};
    padding: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 10px;
`
const TextDisplayArea = styled.div`
    height: 85%;
    overflow-y: scroll;
    padding-top: 75px;
    ::-webkit-scrollbar {
        display: none;
    }
`
const ChatHeader = styled.div`
    padding: 15px;
    border-radius: 4px;
    background: ${BackgroundColors.white};
    box-shadow: ${DropShadow.normal};
    position: absolute;
    width: calc(100% - 60px);
    z-index: 99;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
        color: ${ThemeColors.linkBlue};
        transition: all 300ms ease 0s;

        &:hover {
            opacity: 0.5;
        }
    }
`
const TaskActionsWrapper = styled.span`
    display: flex;
    flex-direction: row;
    gap: 5px;

    span {
        position: relative;
    }
` 
const MemberHref = styled.div`
    color: ${ThemeColors.linkBlue};
    cursor: pointer;
    padding-top: ${props => props.inbox? '7px' : '0px'};
`
const FieldWrapper = styled.div`
    height: 25%;
    position: relative;
    overflow: hidden;
`
const EachChatWrapperFrom = styled.div`
    margin-bottom: 15px;
`
const EachChatWrapperTo = styled.div`
    margin-bottom: 15px;
    text-align: right;
`
const ChatBubbleFrom = styled.div`
    background: ${ThemeColors.purpleSharp};
    color: ${ThemeColors.purpleSharper};
    font-size: 13px;
    padding: 10px 15px;
    border-radius: 5px;
    width: fit-content;
    margin-bottom: 6px;
    line-height: 1.3;
`
const ChatBubbleTo = styled.div`
    background: ${ThemeColors.lavenderLight};
    color: ${TextColors.SecondaryDark};
    font-size: 13px;
    padding: 10px 15px;
    border-radius: 5px;
    width: fit-content;
    margin-bottom: 6px;
    float: right;
    line-height: 1.3;
`
const Stamp = styled.div`
    color: ${TextColors.SecondaryDark};
    font-size: 12px;
    clear: both;
    &:not(:last-child) {
        margin-bottom: 3px;
    }
`

const TemplateMode  = styled.span`
    color: ${ThemeColors.lavender};
    font-size: 13px;
    padding: 3px 5px;
    border-radius: 2px;
    background: ${ThemeColors.lavenderLight};
    position: absolute;
    left: 3px;
    top: 5px;
    display: none;
    max-width: 100%;
    opacity: 0.5;
    font-family: sans-serif;
    
    &.active {
        display: block;
    }
`
const HintsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export default function ChatRoom(props) {
    
    //get template data
    const templates = getTemplates()
    //get selected member's chat history
    const chats = getChats()
    const thisChat = chats.filter(chat => chat.memberId === props.memberId)[0]
    const thisChatHist = thisChat.chatHistory
    //set hook to render component
    const [chatHistory, setChatHistory] = useState(thisChatHist)

    const chatHistRef = useRef({})
    chatHistRef.current = chatHistory

    //actions on mount
    useEffect(() => {
        //bind hotkey
        const resolveBtn = document.querySelector('#resolveBtn')
        
        document.querySelector('#chatRoom')?.getElementsByTagName('textarea')[0]?.addEventListener('keydown', (event) => {
            if (event.code === 'Enter' && event.metaKey && !event.shiftKey) {
                    
                    pushChat()
                    event.preventDefault();
                    event.stopImmediatePropagation();
    
            } else if (event.code === 'Slash') {

                const templateChip = document.querySelector('#templateChip')
                templateChip.classList.add('active')
            }
        })
    }, [])

    document.addEventListener('keydown', (event) => {

        const textInput = document.querySelector('#chatRoom')?.getElementsByTagName('textarea')[0]

        if(textInput && event.code === 'KeyW' && event.altKey) {
            setTimeout(e => textInput.focus(), 50)
            event.preventDefault()
            event.stopPropagation()
        }

    })

    //set chat onchange of member
    useEffect(() => {
        setChatHistory(thisChatHist)
    }, [props.memberId, chatHistRef.current])

    //create new chat handling
    const pushChat = () => {
        const textarea = document.querySelector('#chatRoom').getElementsByTagName('textarea')[0]

        const date = getDate()
        const time = getTime()

        if (textarea.value.trim().length === 0) {
            return ;
        } else {
            const newChatObj = {
                claimTo: textarea.value,
                signature: `${getUser().trim().replaceAll(/\s/g,'').toLowerCase()}@demo.com`,
                date: date,
                time: time
            }

            const newArray = [...chatHistRef.current, newChatObj]
            setChatHistory(newArray)
            //thisChatHist.push(newChatObj)
            chatHistRef.current.push(newChatObj)
        }

        textarea.value=''
        setTimeout(e => document.querySelector('#chatDisplay')?document.querySelector('#chatDisplay').scrollTop = document.querySelector('#chatDisplay').scrollHeight : console.log(), 100)
    }

    //inline '/' template handling
    function logInputValue(event) {
        const templateChip = document.querySelector('#templateChip.active')
        if (templateChip){

            const inputValue = event.target.value

            let MatchingName = '/' + templates.filter(template => template.templateName.includes(inputValue.slice(1)))[0]?.templateName
            templateChip.innerText = MatchingName
            templateChip.innerText === '/undefined'? templateChip.innerText = inputValue : templateChip.innerText  = MatchingName
            inputValue === ''? templateChip.classList.remove('active') : console.log();

            document.querySelector('#chatRoom')?.getElementsByTagName('textarea')[0]?.addEventListener('keydown', (event) => {

                const templateNames = templates.map(template => template.templateName)
                let currentIndex = templateNames.indexOf(templateChip.innerText.slice(1))

                if(event.code === 'Enter') {
                    templateChip.classList.remove('active')
                    MatchingName = templateChip.innerText
                    currentIndex = 0;
                    event.stopImmediatePropagation()

                        if (event.target.value === templateChip.innerText && event.target.value !== MatchingName) {

                            event.target.value = templateChip.innerText.slice(1)
                            templateChip.innerText = ''
                            
                        } else if (event.target.value !== templateChip.innerText || event.target.value === templateChip.innerText && event.target.value === MatchingName) {
                            event.target.value = templates.filter(template => '/' + template.templateName === templateChip.innerText)[0].templateMsg
                            templateChip.innerText = ''
                        }

                    } else if(event.code === 'ArrowRight') {
                        if (templateChip.innerText !== ''){
                            event.target.value = templateChip.innerText
                        }

                    } else if(event.code === 'ArrowDown') {
                        
                        if (templateNames.filter(template => template === templateChip.innerText.slice(1)).length !== 0) {
                            const matchTemplates = templateNames.filter(templateName => templateName.includes(event.target.value.slice(1)))
                            currentIndex = matchTemplates.indexOf(templateChip.innerText.slice(1))
                            const nextIndex = currentIndex+1 === matchTemplates.length? 0 : currentIndex + 1
                            templateChip.innerText = '/' + matchTemplates.filter(template => template.includes(inputValue.slice(1)))[nextIndex]
                            event.stopImmediatePropagation()
                        }

                    } else if(event.code === 'ArrowUp') {
                        if (templateNames.filter(template => template === templateChip.innerText.slice(1)).length !== 0) {
                            const matchTemplates = templateNames.filter(templateName => templateName.includes(event.target.value.slice(1)))
                            currentIndex = matchTemplates.indexOf(templateChip.innerText.slice(1))
                            const prevIndex = currentIndex-1 < 0? matchTemplates.length -1 : currentIndex - 1
                            templateChip.innerText = '/' + matchTemplates.filter(template => template.includes(inputValue.slice(1)))[prevIndex]
                            event.stopImmediatePropagation()
                        }
                    }
                })
        }
    }

    //Template Browser
    const openTemplateBrowser = () => {
        const otherModals = document.querySelectorAll('.show')
        otherModals.forEach(modal => modal.classList.remove('show'))
        const elem = document.querySelector('#templateBrowser')
        elem.classList.add('show')
    }

    const navigate = useNavigate()

    const toProfile = (event) => {
        const path = event.target.getAttribute('href')
        navigate('../' + path)
    }

    const toggleDropdown = () => {
        const elem = document.querySelector('#reassign-func')
        if (elem.classList.contains('active')){
            setTimeout(e => document.querySelector('#reassign-func').classList.remove('active'), 100)
        } else {
            setTimeout(e => document.querySelector('#reassign-func').classList.add('active'), 100)
        }
    }

    //component composition
    return <ChatWrapper id='chatRoom'>
            <ChatHeader>
                <span>
                    <MemberHref inbox={props.inbox} href={'Search/' + props.memberId} onClick={toProfile}>{props.memberName}</MemberHref>
                </span>
                {props.inbox? <TaskActionsWrapper>
                                <span><SecondaryButton id='assignBtn' text='Assign to' onClick={toggleDropdown} hint={true} hintKeys='Opt + A' hintDesc='Assign Menu' right={[63, 73]} bottom={[-1, -1]} /><Dropdown id='reassign-func' onClick={props.onAssign} optionData={props.checkedInUsers} /></span>
                                <SecondaryButton id='resolveBtn' text='Resolve' onClick={props.onResolve} hint={true} hintKeys='Cmd + Shift + Enter' hintDesc='Resolve Task' right={[0, 0]} top={[30, 35]} />
                            </TaskActionsWrapper> : null
                }
            </ChatHeader>
            <TextDisplayArea id='chatDisplay'>
                {chatHistRef.current.map((history, index) => {
                    if (history.claimFrom) {
                        return <EachChatWrapperFrom key={index}>
                            <ChatBubbleFrom>{history.claimFrom}</ChatBubbleFrom>
                            <Stamp>{history.date} {history.time}</Stamp>
                        </EachChatWrapperFrom>
                    } else if (history.claimTo) {
                        return <EachChatWrapperTo key={index}>
                                <ChatBubbleTo>{history.claimTo}</ChatBubbleTo>
                                <Stamp>{history.signature}</Stamp>
                                <Stamp>{history.date} {history.time}</Stamp>
                            </EachChatWrapperTo>   
                    }
                    })}
            </TextDisplayArea>
            <FieldWrapper>
                <TemplateMode id='templateChip'></TemplateMode>
                <SmallButtton text='templates' onClick={openTemplateBrowser}/>
                <TextArea placeholder="Type message or ' / ' for templates..." onChange={logInputValue} />
            </FieldWrapper>
            <HintsWrapper>
                <StaticHint firstKey='Opt' secondKey='W' desc='to focus' />
                <StaticHint firstKey='Cmd' secondKey='Enter' desc='to send' />
            </HintsWrapper>
        </ChatWrapper>
}