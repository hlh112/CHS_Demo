//import utilities
import styled from "styled-components";
import { DropShadow, TextColors, ThemeColors } from "./Color";

const Static = styled.div`
    font-size: 11px;
    color: ${TextColors.DisabledDark};

    span {
        background: ${ThemeColors.linkBlueLight};
        color: ${ThemeColors.linkBlue};
        padding: 3px 5px;
        border-radius: 2px;
    }
`

const Dynamic = styled.div`
    font-size: 11px !important;
    color: ${TextColors.SecondaryLight} !important;
    background: #595959;
    border-radius: 4px;
    padding: 10px 4px 10px 8px !important;
    z-index: 1000;
    position: absolute;
    white-space: nowrap;
    right: ${props => props.right? `${props.right[0]}px` : ''};
    left: ${props => props.left? `${props.left[0]}px` : ''};
    top: ${props => props.top? `${props.top[0]}px` : ''};
    bottom: ${props => props.bottom? `${props.bottom[0]}px` : ''};
    visibility: hidden;
    opacity: 0;
    transition: all 200ms ease 0s;

    span {
        background: #777;
        font-size: 11px !important;
        color: ${TextColors.SecondaryLight} !important;
        padding: 6px 8px !important;
        border-radius: 2px;
        margin-left: 8px !important;
        margin-right: 0px !important;
        white-space: nowrap;
    }

    &.show {
        visibility: visible;
        opacity: 1;
        right: ${props => props.right? `${props.right[1]}px` : ''};
        left: ${props => props.left? `${props.left[1]}px` : ''};
        top: ${props => props.top? `${props.top[1]}px` : ''};
        bottom: ${props => props.bottom? `${props.bottom[1]}px` : ''};
    }
`

export function StaticHint(props) {
    return <Static><span>{props.firstKey}</span> {props.secondKey? '+' : null} {props.secondKey? <span>{props.secondKey}</span> : null} {props.thirdKey? '+' : null} {props.thirdKey? <span>{props.thirdKey}</span> : null} {props.desc}</Static>
}

export function HoverHint(props) {
    return <Dynamic data-hint={props.hintFor} right={props.right} top={props.top} left={props.left} bottom={props.bottom}>{props.desc}<span>{props.keys}</span></Dynamic>
}