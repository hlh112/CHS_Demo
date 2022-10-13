import styled from "styled-components";
import { TextColors, ThemeColors, BackgroundColors } from './Color';

const Tags = styled.div`
    background: ${ThemeColors.lavenderLight};
    color: ${ThemeColors.lavender};
    font-size: 13px;
    border-radius: 3px;
    padding: 4px 8px;
    width: fit-content;
    cursor: pointer;
    transition: all 300ms ease 0s;
    display: inline-block;
    margin-bottom: 6px;

    :hover {
        opacity: 0.7;
    }

    &:not(:last-child) {
        margin-right: 6px;
    }
`

export function Tag(props) {
    
    const showRemove = (event) => {
        event.target.innerText = 'X Remove Tag'
    }

    const hideRemove = (event) => {
        event.target.innerText = props.text
    }

    return <Tags onMouseOver={showRemove} onMouseLeave={hideRemove} onClick={props.onClick}>{props.text}</Tags>

}