import styled from "styled-components";
import { TextColors, ThemeColors, BackgroundColors, BorderColors } from './Color';
import { useState, useEffect } from "react";

const FormLabel = styled.label`
    font-size: 11px;
    display: block;
    margin-bottom: 5px;
    color: ${TextColors.SecondaryDark};
`

const InputText = styled.span`

    position: relative;

    ::after {
        ${props => props.currency? `content: '${props.currency}';` : null}
        font-size: 12px;
        background: ${BackgroundColors.grey};
        padding: 3px 5px;
        border-radius: 3px;
        border: 1px solid ${BorderColors.normal};
        position: absolute;
        right: 5px;
        top: 0;
    }

    input {
        border: 1px solid ${BorderColors.normal};
        border-radius: 3px;
        padding: 7px;
        box-sizing: border-box;
        font-size: 13px;
        font-family: sans-serif;
        color: ${TextColors.PrimaryDark};
        width: 100%;
        transition: all 300ms ease 0s;

        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0; 
        }

        ::placeholder {
            color: ${TextColors.DisabledDark};
        }

        :focus {
            outline: none;
            border: 1px solid ${ThemeColors.linkBlue};
    }
`

const InputTextArea = styled.textarea`
    border: 1px solid ${BorderColors.normal};
    border-radius: 3px;
    padding: 7px;
    box-sizing: border-box;
    font-size: 13px;
    font-family: sans-serif;
    color: ${TextColors.PrimaryDark};
    width: 100%;
    height: ${props => props.height? props.height : '100%'};
    resize: none;
    width: 100%;
    transition: all 300ms ease 0s;
    ::-webkit-scrollbar {
        display: none;
      }

    ::placeholder {
        color: ${TextColors.DisabledDark};
    }

    :focus {
        outline: none;
        border: 1px solid ${ThemeColors.linkBlue};
    }
`

const InputSelect = styled.span`

    position: relative;

    ::after {
        content: '';
        position: absolute;
        background-image: url('../form_icons/selectArrow.svg');
        background-repeat: no-repeat;
        width: 13px;
        height: 10px;
        right: 10px;
        top: calc(50% - 2px);
        z-index: 100;
        display: inline-block;
    }

    select{
        border: 1px solid ${BorderColors.normal};
        border-radius: 3px;
        padding: 7px;
        box-sizing: border-box;
        font-size: 13px;
        font-family: sans-serif;
        color: ${TextColors.PrimaryyDark};
        width: 100%;
        height: 100%;
        appearance: none;

        transition: all 300ms ease 0s;

            &:invalid {
                color: ${TextColors.DisabledDark};
            }

            :focus {
                outline: none;
                border: 1px solid ${ThemeColors.linkBlue};
    }
    
`

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 12px;
    color: ${TextColors.PrimaryDark};
    margin-top: 10px;
    position: relative;

    input {
        cursor: pointer;
    }
`

const BooleanButton = styled.button`
    font-size: 12px;
    border: 1px solid ${BorderColors.normal};
    padding: 7px 12px;
    background: ${BackgroundColors.white};
    color: ${TextColors.DisabledDark};
    cursor: pointer;
    transition: all 300ms ease 0s;
    width: 50%;

    :hover {
        background: ${BackgroundColors.grey};
    }

    &.active {
        background: ${ThemeColors.linkBlueLight};
        color: ${TextColors.PrimaryDark};
    }

    :first-child {
        border-radius: 3px 0px 0px 3px;
        border-right: none;
    }

    :last-child {
        border-radius: 0px 3px 3px 0px;
    }
`

export function Label(props){
    return <FormLabel htmlFor={props.for}>{props.text}</FormLabel>
}

export function TextInput(props){
    return <InputText><input id={props.id} type='text' placeholder={props.placeholder} value={props.value? props.value : undefined} onChange={props.onChange} autoFocus={props.autoFocus} required={props.required}/></InputText>
}

export function TextArea(props){
    return <InputTextArea disabled={props.disabled} id={props.id} placeholder={props.placeholder} height={props.height} value={props.value? props.value : undefined} onChange={props.onChange} required={props.required}/>
}

export function CurrencyInput(props){
    return <InputText currency={props.currencySymbol}><input id={props.id} type='number' placeholder={props.placeholder} value={props.value? props.value : undefined} onChange={props.onChange} required={props.required}/></InputText>
}

export function DateInput(props){
    return <InputText><input id={props.id} type='date' placeholder={props.placeholder} value={props.value? props.value : undefined} onChange={props.onChange} required={props.required}/></InputText>
}

export function Select(props){
    
    return <InputSelect>
        <select id={props.id} value={props.value? props.value : ''} onChange={props.onChange} required={props.required}>
            <option value='' disabled>{props.placeholder? props.placeholder : 'Select'}</option>
            {props.allOptions? props.allOptions.map(optionEach => {
                return <option key={optionEach} value={optionEach}>{optionEach}</option>
            }) : null}
        </select>
    </InputSelect>
}

export function BooleanSelector(props) {
    return <div><BooleanButton id={props.id} data-label={props.label} onClick={props.onClick}>True</BooleanButton ><BooleanButton data-label={props.label}  onClick={props.onClick}>False</BooleanButton></div>
}

export function CheckBox(props){
    return <CheckboxWrapper><input id={props.id} type='checkbox' placeholder={props.placeholder} required={props.required} /><label>{props.label}</label></CheckboxWrapper>
}

export function AudioPlayer(){

}