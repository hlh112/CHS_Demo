import styled, { css } from "styled-components";
import { TextStyles } from "./Text";
import { TextColors, ThemeColors, StateColors, BackgroundColors } from './Color'

const State = styled.div`
    text-align: center;
    width: 100%;
    color: ${TextColors.SecondaryDark};
    font-weight: normal;
    font-size: 16px;
    padding: 30px 0px;
    border-radius: 0px 0px 4px 4px;
    background: ${ThemeColors.dullBlueLighter};
`

export function EmptyState(props) {
    return <>
        <State className={props.class}>{props.text}</State>
    </>
}