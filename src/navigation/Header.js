import styled, { css } from "styled-components";
import { TextColors, BackgroundColors, DropShadow } from "../hope-ui/Color";
import { SecondaryButton, LavenderButton } from "../hope-ui/Buttons";

const AppHeader = styled.header`
    padding: 15px 30px 15px 45px;
    width: 100%;
    background: ${BackgroundColors.white};
    height: 60px;
    box-sizing: border-box;
    box-shadow: ${DropShadow.normal};
    z-index: 998;
`

const AppHeaderIconWrapper = styled.div`
    float: right;

    &:after {
        clear: both;
    }
`
const AppHeaderIcon = styled.img`
    margin-left: 13px;
    cursor: pointer;
    transition: 300ms ease 0s;
    vertical-align: middle;
    
    &:hover {
        opacity: 0.5;
    }
`
const AppHeaderUser = styled.span`
    color: ${TextColors.SecondaryDark};
    font-size: 14px;
    vertical-align: middle;
    margin-right: 20px;
`

export default function Header(props) {

    const imgCommonPath = '../header_icons/'

    const appHeaderFuncs = [
        {
            name: 'share'
        },
        {
            name: 'member'
        },
        {
            name: 'notification'
        },
        {
            name: 'settings'
        }
    ]

    return <>
        <AppHeader>
            <AppHeaderIconWrapper>
                <AppHeaderUser id='headerUserName'>{props.userName}</AppHeaderUser>
                <LavenderButton text='Logout' onClick={props.onLogout} />
            </AppHeaderIconWrapper>
        </AppHeader>
    </>
}

/*                {appHeaderFuncs.map((appHeaderFunc, index) => {
                    return <AppHeaderIcon key={index} src={`${imgCommonPath + appHeaderFunc.name}.svg`} alt="hi"></AppHeaderIcon>
                })}*/