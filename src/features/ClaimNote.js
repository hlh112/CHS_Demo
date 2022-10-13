//import utilities
import styled from "styled-components";
import { getClaims } from "../data/claims-data";
import { useEffect, useState } from "react";
//import helper
import { getDate, getTime } from "../helper/getDate";
import getUser from "../helper/getUser";
import callToaster from "../helper/callToaster";
//import styles
import { TextColors, DropShadow, ThemeColors, BackgroundColors, BorderColors } from "../hope-ui/Color";
import { TextArea } from "../hope-ui/Forms";
import { StaticHint } from "../hope-ui/hotkeyHint";

//component styles
const ModalContainer = styled.div`
    background: ${BackgroundColors.grey};
    width: 500px;
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
    gap: 10px;
    height: calc(100% - 88px);
    padding: 15px;
`

const DataWrapper = styled.div`
    height: 83%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`

const DataEach = styled.div`
    width: 100%;
    padding: 20px 0 15px;
    &:first-child {
        padding: 0px 0px 15px 0;
    }
    &:not(:last-child) {
        border-bottom: 1px solid ${BorderColors.normal};
    }
`

const NoteContent = styled.div`
    font-size: 13px;
    color: ${TextColors.PrimaryDark};
    margin-bottom: 5px;
`

const Stamp = styled.div`
    font-size: 11px;
    color: ${TextColors.SecondaryDark};
    margin-bottom: 3px;
`

const InputWrapper = styled.div`
    background: ${BackgroundColors.white};
    height: 15%;
`

export default function ClaimNote(props) {

    /* ------------ general handling ------------ */

    function closeModal(event) { 
        const elem = event.target.closest('.show')
        elem.classList.remove('show') 
        elem.getElementsByTagName('textarea')[0].value=''
        callToaster('blue', `Double Click / Esc to dismiss modals :)`)
    }

    document.addEventListener('dblclick', (event) => {
        const elem = document.querySelector('#leftSideModal' && '.show')
        return elem? elem.classList.remove('show') : ''
    })

    /* ------------------------------------------ */

    //get claim's note records
    const thisClaim = props.claimData
    const noteRecord = thisClaim.claimNotes
    //set hook to render component
    const [claimNotes, setClaimNotes] = useState(noteRecord)

    //bind hotkey on mount 
    useEffect(() => {
        document.querySelector('#leftSideModal')?.getElementsByTagName('textarea')[0]?.addEventListener('keydown', (event) => {
            if(event.code === 'Enter' && event.metaKey) {
                    event.preventDefault();
                    pushNote(event.path[0].value)
                    event.path[0].value=''
    
            } else if (event.code === 'Enter' && !event.shiftKey){}
        })
    })
    
    //create new note handling
    const pushNote = (inputValue) => {
        const timestamp = getDate() +  ' ' + getTime()

        if (inputValue.trim().length === 0) {
            return ;
        } else {
            const newNoteObj = {
                note: inputValue,
                signature: `${getUser().trim().replaceAll(/\s/g,'').toLowerCase()}@demo.com`,
                timestamp: timestamp
            }
    
            const newArray = [newNoteObj, ...claimNotes]
            setClaimNotes(newArray? newArray : claimNotes)
            noteRecord.unshift(newNoteObj)

            callToaster('green', 'Note Added')
        }

    }

    //component composition
    return <ModalContainer id='leftSideModal' className={props.class}>
                    <ModalHeader>
                        {props.modalName}
                        <CloseButton onClick={closeModal}></CloseButton>
                    </ModalHeader>
                    <ModalContentWrapper>
                        <DataWrapper>
                            {claimNotes.map((datum, index) => {
                                return <DataEach key={index}>
                                    <NoteContent>{datum.note}</NoteContent>
                                    <Stamp>{datum.signature}</Stamp>
                                    <Stamp>{datum.timestamp}</Stamp>
                                </DataEach>
                            })}
                        </DataWrapper>
                        <InputWrapper><TextArea placeholder='Note goes here...' /></InputWrapper>
                        <StaticHint firstKey='Cmd' secondKey='Enter' desc='to add' />
                    </ModalContentWrapper>
            </ModalContainer>
}