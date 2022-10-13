import styled from "styled-components";

import { BackgroundColors, ThemeColors, TextColors, DropShadow, BorderColors, StateColors } from "./Color";

const ToasterWrapper = styled.div`
    padding: 15px;
    width: fit-content;
    min-width: 200px;
    background: ${BackgroundColors.white};
    box-shadow: ${DropShadow.darker};
    text-align: left;
    border-radius: 3px;
    position: absolute;
    top: 35px;
    right: -400px;
    z-index: 1000;
    font-size: 14px;
    transition: all 500ms ease 0s;
    opacity: 0;
    visibility: hidden;

    &.green{ 
        color: ${StateColors.green};
        border-left: 3px solid ${StateColors.green};
    }
    &.red{ 
        color: ${StateColors.red};
        border-left: 3px solid ${StateColors.red};
    }
    &.blue{ 
        color: ${ThemeColors.linkBlue};
        border-left: 3px solid ${ThemeColors.linkBlue};
    }
    &.show{
        right: 35px;   
        opacity: 1;
        visibility: visible;
    }
`

export function Toaster(props) {
    return <ToasterWrapper id='toasterBox'></ToasterWrapper>
}