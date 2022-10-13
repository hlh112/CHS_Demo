//import utilities
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
//import styles
import { TextColors, BackgroundColors } from '../hope-ui/Color';
import { HoverHint } from "../hope-ui/hotkeyHint"
//import helper
import { showHint, hideHint } from '../helper/toggleHotKeyHint';
import closeOtherModals from '../helper/closeOtherModals';
//component styles
const NavbarWrapper = styled.aside`
    background: ${BackgroundColors.black};
    height: 100vh;
    width: 280px;
    min-width: 280px;
    padding: 40px 30px;
    box-sizing: border-box;
    position: relative;
    transition: 300ms ease 0s;
    z-index: 999;

    .navbar_trigger {
        position: absolute;
        top: 14px;
        right: -18px;
        cursor: pointer;
    }

    .navbar_logo {
        position: absolute;
        left: calc(50% - 42px);
        bottom: 25px;
    }

    &.collapse {
        width: 20px;
        min-width: 20px;
        padding: 0;

        .inner-wrapper {
            display: none;
        }
    }
`

const NavbarSection = styled.div`
    margin-bottom: 50px;
    min-width: 90px;
`

const NavbarButton = styled.div`
    opacity: 0.5;
    margin-bottom: 20px;
    transition: 500ms ease 0s;
    position: relative;
    font-size: 15px;

    &:hover {
        opacity: 1;
    }

    &.active {
        opacity: 1;
    }

    a {
        width: calc(100% - 30px);
        text-decoration: none;
        color: ${TextColors.PrimaryLight};
        display: inline-block;
        white-space: nowrap;
        vertical-align: middle;
    }

    img {
        width: 15px;
        margin-right: 13px;
        vertical-align: middle;
    }
`

//component composition
export default function NavBar() {

    const [toggleState, setToggleState] = useState('')
    const [triggerImg, setTriggerImg] = useState('trigger_expanded.svg')

    const imgCommonPath = '../navbar_icons/'
    const imgExternalLinkPath = `${imgCommonPath}external_link.svg`

    const menuReadItems = [
        {
            title: 'Dasboard',
            href: './Dashboard',
            iconPath: `${imgCommonPath}dashboard.svg`,
            hint: true,
            hintKeys: 'Opt + D',
            hintDesc: 'to Dashboard'
        },
        {
            title: 'Member Search',
            href: './Search',
            iconPath: `${imgCommonPath}search.svg`,
            hint: true,
            hintKeys: 'Opt + M',
            hintDesc: 'to Member Search'
        }
    ]

    const menuTaskItems = [
        {
            title: 'Inbox',
            href: './Inbox',
            iconPath: `${imgCommonPath}inbox.svg`,
            hint: true,
            hintKeys: 'Opt + I',
            hintDesc: 'to Inbox'
        },
        {
            title: 'Claims',
            href: './ClaimList',
            iconPath: `${imgCommonPath}claims.svg`,
            hint: true,
            hintKeys: 'Opt + C',
            hintDesc: 'to Claims'
        }
    ]

    const menuExternalItems = [
        {
            title: 'Trustly',
            href: 'https://hlh112.github.io/portfo/',
            iconPath: `${imgExternalLinkPath}`,
            target: 'blank'
        },
        {
            title: 'GSR',
            href: 'https://hlh112.github.io/portfo/',
            iconPath: `${imgExternalLinkPath}`,
            target: 'blank'
        },
        {
            title: 'Ayden',
            href: 'https://hlh112.github.io/portfo/',
            iconPath: `${imgExternalLinkPath}`,
            target: 'blank'
        },
        {
            title: 'FOSS',
            href: 'https://hlh112.github.io/portfo/',
            iconPath: `${imgExternalLinkPath}`,
            target: 'blank'
        }
    ]

    const menuItems = [menuReadItems, menuTaskItems, menuExternalItems]

    //handel NavBar little arrow
    const toggleNavbar = () => {
        toggleState === '' ? setToggleState('collapse') : setToggleState('')
        triggerImg === 'trigger_expanded.svg' ? setTriggerImg('trigger_collapsed.svg') : setTriggerImg('trigger_expanded.svg')
    }

    const navigate = useNavigate()

    //navbar hotkey implementation
    useEffect(() => {
        function AllHotkeyHandling(event) {
            if(event.code === 'KeyS' && event.altKey) {
                document.querySelector('#toggleNav').click()
                event.preventDefault()
                event.stopPropagation()
            }
            if(event.code === 'KeyD' && event.altKey) {
                event.preventDefault()
                event.stopPropagation()
                navigate('./Dashboard');
            }
     
            if(event.code === 'KeyM' && event.altKey) {
                event.preventDefault()
                event.stopPropagation()
                navigate('./Search');
            }
     
            if(event.code === 'KeyI' && event.altKey) {
                event.preventDefault()
                event.stopPropagation()
                navigate('./Inbox');
            }
     
            if(event.code === 'KeyC' && event.altKey) {
                event.preventDefault()
                event.stopPropagation()
                navigate('./ClaimList');
            }

            if(event.code === 'Escape') {
                closeOtherModals()
                event.preventDefault()
                event.stopPropagation()
            }
        }

        document.addEventListener('keydown', AllHotkeyHandling)

        return () => document.removeEventListener('keydown', AllHotkeyHandling)

    }, [])
    
    //ui composition
    return <>
        <NavbarWrapper id='navbar' className={toggleState}>
            <HoverHint hintFor='toggleNav' right={[-200, -170]} top={[14, 14]} desc='Toggle Navbar' keys='Opt + S' />
            <img id='toggleNav' src={`${imgCommonPath}${triggerImg}`} className='navbar_trigger' onClick={toggleNavbar} onMouseEnter={showHint} onMouseLeave={hideHint}/>
            <div className="inner-wrapper">
            {menuItems.map((menuItem, index) => {
                return <NavbarSection key={index}>
                    {menuItem.map((itemEach, index) => {
                        return <NavbarButton key={index} id={itemEach.title} className='sidebar_btn' onMouseEnter={showHint} onMouseLeave={hideHint}>
                                    {itemEach.hint? <HoverHint hintFor={itemEach.title} left={[130, 140]} top={[-7, -7]} desc={itemEach.hintDesc} keys={itemEach.hintKeys} /> : null}
                                    <img src={itemEach.iconPath} alt={itemEach.title} />
                                    {!itemEach.target? <Link to={itemEach.href}>{itemEach.title}</Link> : <a target='blank' href={itemEach.href}>{itemEach.title}</a>}
                                </NavbarButton>
                    })}
                </NavbarSection>
            })}
            </div>
        </NavbarWrapper>
    </>

}