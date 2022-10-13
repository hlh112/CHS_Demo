import styled from "styled-components";
import { BackgroundColors, TextColors, ThemeColors } from './Color';
import { HoverHint } from "./hotkeyHint";

const BtnWrapper = styled.span`
    position: relative;
    height: fit-content;
    display: inline-block;

    ${props => props.width === 'fullWidth'? 'width: 100%;' : null}
`

const ButtonUI = styled.button`
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
    transition: all 300ms ease 0s;

    &:hover {
        opacity: 0.7;
        font-size: 11px;
    }

    ${props => props.width === 'fullWidth'? 'width: 100%;' : null}

    ${props => {
        if(props.primary === true) {
            return `color: ${ThemeColors.dullBlueLighter};
                    background: ${ThemeColors.dullBlue};`
        } else if (props.secondary === true) {
            return `color: ${ThemeColors.linkBlue};
                    background: ${ThemeColors.linkBlueLight};`
        } else if (props.lavender === true) {
            return `color: ${ThemeColors.lavender};
                    background: ${ThemeColors.lavenderLight}`
        } else if (props.lavenderReverted === true) {
            return `color: ${ThemeColors.lavenderLight};
                    background: ${ThemeColors.lavender}`
        }
    }}
`

const SmallBtn = styled.button`
    background: ${BackgroundColors.grey};
    color: ${TextColors.SecondaryDark};
    font-size: 12px;
    font-family: sans-serif;
    width: fit-content;
    border: none;
    border-radius: 3px;
    position: absolute;
    right: 7px;
    bottom: 7px;
    padding: 5px 10px;
    transition: all 300ms ease 0s;
    cursor: pointer;

    &:hover {
        background: ${BackgroundColors.greyDarker};
        padding: 4px 9px;
    }
`

const showHint = (e) => {
    e.currentTarget.parentElement.firstChild.classList.add('show')
}

const hideHint = (e) => {
    e.currentTarget.parentElement.firstChild.classList.remove('show')
}

export function PrimaryButton(props){
    return <BtnWrapper width={props.width? props.width : null}>
                {props.hint? <HoverHint right={props.right} top={props.top} left={props.left} bottom={props.bottom} desc={props.hintDesc} keys={props.hintKeys}/> : null}
                <ButtonUI id={props.id} type={props.type? props.type : null} width={props.width? props.width : null} primary onClick={props.onClick} onMouseEnter={showHint} onMouseLeave={hideHint}>{props.text}</ButtonUI>
            </BtnWrapper>
}

export function SecondaryButton(props){
    return <BtnWrapper width={props.width? props.width : null}>
                {props.hint? <HoverHint right={props.right} top={props.top} left={props.left} bottom={props.bottom} desc={props.hintDesc} keys={props.hintKeys}/> : null}
                <ButtonUI id={props.id} type={props.type? props.type : null} width={props.width? props.width : null} secondary onClick={props.onClick} onMouseEnter={showHint} onMouseLeave={hideHint}>{props.text}</ButtonUI>
            </BtnWrapper>
}

export function LavenderButton(props){
    return <BtnWrapper width={props.width? props.width : null}>
                {props.hint? <HoverHint right={props.right} top={props.top} left={props.left} bottom={props.bottom} desc={props.hintDesc} keys={props.hintKeys}/> : null}
                <ButtonUI id={props.id} type={props.type? props.type : null} width={props.width? props.width : null} lavender onClick={props.onClick} onMouseEnter={showHint} onMouseLeave={hideHint}>{props.text}</ButtonUI>
            </BtnWrapper>
}

export function LavenderRevertButton(props){
    return <BtnWrapper width={props.width? props.width : null}>
                {props.hint? <HoverHint right={props.right} top={props.top} left={props.left} bottom={props.bottom} desc={props.hintDesc} keys={props.hintKeys}/> : null}
                <ButtonUI id={props.id} type={props.type? props.type : null} width={props.width? props.width : null} lavenderReverted onClick={props.onClick} onMouseEnter={showHint} onMouseLeave={hideHint}>{props.text}</ButtonUI>
            </BtnWrapper>
}

export function SmallButtton(props) {
    return <SmallBtn id={props.id} type={props.type? props.type : null} width={props.width? props.width : null} lavenderReverted onClick={props.onClick} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>{props.text}</SmallBtn>
}