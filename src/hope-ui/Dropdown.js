import styled from "styled-components"
import { BackgroundColors, BorderColors, DropShadow, TextColors } from "./Color"

const DropdownWrapper = styled.div`
    z-index: 100;
    background: ${BackgroundColors.white};
    box-shadow: ${DropShadow.normal};
    position: absolute;
    display: block;
    border-radius: 3px;
    right: 0;
    top: 35px;
    display: none;

    &.active {
        display: block;
    }
`
const Option = styled.div`
    padding: 12px 10px;
    width: 180px;
    font-size: 13px;
    color: ${TextColors.PrimaryDark};
    cursor: pointer;
    transition: all 300ms ease 0s;

    &:hover {
        background: ${BackgroundColors.grey};
    }

    div {
        font-size: 12px;
        color: ${TextColors.DisabledDark};
        margin-top: 3px;
    }
`

export const Dropdown = (props) => {
    //closing dropdown
    document.querySelector('body').addEventListener('click', e => {

        const elem = document.querySelector(`#${props.id}`)
        const trigger = elem?.previousSibling
        const checkActive = elem?.classList.contains('active')

        if (checkActive) {
            if (e.target !== elem && e.target !== trigger) {
                elem.classList.remove('active')
            }
        }
    })

    return <>
            <DropdownWrapper id={props.id}>
                {props.optionData.map((datum, index) => {
                    return <Option key={index} onClick={props.onClick}>{datum.userName}<div>handling {datum.tasks? datum.tasks.length : '0'} tasks</div></Option>
                })}
            </DropdownWrapper>
    </>
}