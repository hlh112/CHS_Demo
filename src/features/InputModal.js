//import utilities
import { useEffect } from "react";
import styled from "styled-components";
//import styles
import { TextColors, DropShadow, ThemeColors } from "../hope-ui/Color";

//compoenent styles
const Backdrop = styled.div`
    height: 100%;
    width: 100%;
    background: transparent;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 999;
    display: none;

    &.show {
        display: block;
    }
`

const InputWrapper = styled.div`
    background: transparent;
    width: 600px;
    height: 60px;
    position: fixed;
    left: calc(50% - 300px);
    top: calc(30% - 30px);

    input {
        border: none;    
        border-radius: 4px;
        width: 100%;
        height: 100%;
        box-shadow: ${DropShadow.normal};
        padding: 20px;
        font-size: 18px;
        color: ${TextColors.SecondaryDark};
        box-sizing: border-box;
        outline: none;
        border: 1px solid transparent;
        transition: all 300ms ease 0s;

        &:focus {
            border: 1px solid ${ThemeColors.linkBlue};
            box-shadow: ${DropShadow.darker};
          }

        ::placeholder {
            color: ${TextColors.DisabledDark};
        }  
    }

`

//component composition
export default function InputModal(props) {

    function closeModal(event) {
        const elem = document.querySelector('.show')
        if (event.target === elem) {
            elem.classList.remove('show')
            elem.getElementsByTagName('input')[0].value=''
        }
    }

    useEffect(() => {
        document.querySelector('#inputModal')?.getElementsByTagName('input')[0]?.addEventListener('keyup', (event) => {
            if(event.code === 'Enter') {
                    event.preventDefault();
                    props.onSubmit(event.target.value)
                    document.querySelector('.show')?.classList.remove('show')
                    event.target.value=''
            }
        })
    }, [])

    return <Backdrop id='inputModal' onClick={closeModal} className={props.class}><InputWrapper><input type={props.type} placeholder={props.placeholder} onChange={props.onChange}></input></InputWrapper></ Backdrop>
}