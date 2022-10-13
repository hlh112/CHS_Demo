import { TextColors, ThemeColors } from "./Color"
import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"

const PageHeadTitle = styled.h1`
        font-size: 24px;
        font-weight: normal;
        color: ${TextColors.PrimaryDark};
        margin-bottom: 25px;
`

const ClaimHeadTitle = styled.h1`
        font-size: 18px;
        font-weight: 500;
        color: ${TextColors.PrimaryDark};
`

const LinkButton = styled.div`
        font-size: 14px;
        font-weight: normal;
        color: ${ThemeColors.linkBlue};
        cursor: pointer;
        width: fit-content;
`

const ClaimSectionHeadTitle = styled.h1`
        font-size: 15px;
        font-weight: 500;
        color: ${TextColors.PrimaryDark};
`

const ClaimSectionSubHeadTitle = styled.h1`
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 12px;
        color: ${TextColors.PrimaryDark};
`

export function PageHead(props) {
    return <PageHeadTitle>{props.text}</PageHeadTitle>
}

export function ClaimHead(props) {
    return <ClaimHeadTitle>{props.text}</ClaimHeadTitle>
}

export function TextButton(props) {

    const navigate = useNavigate()

    const triggerAction = (event) => {
        console.log('hi')
        navigate('../' + event.target.getAttribute('href'));
    }

    return <LinkButton href={props.href} onClick={triggerAction}>{props.text}</LinkButton>
}

export function ClaimSectionHead(props) {
    return <ClaimSectionHeadTitle>{props.text}</ClaimSectionHeadTitle>
}

export function ClaimSectionSubHead(props) {
    return <ClaimSectionSubHeadTitle>{props.text}</ClaimSectionSubHeadTitle>
}