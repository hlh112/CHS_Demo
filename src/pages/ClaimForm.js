//import utilities
import styled from "styled-components";
import { useEffect, useState } from "react";
//import helper
import callToaster from "../helper/callToaster";
import { getDate } from "../helper/getDate";
import closeOtherModals from "../helper/closeOtherModals";
import { showHint, hideHint} from "../helper/toggleHotKeyHint";
//import styles
import { TextColors, BackgroundColors, BorderColors, ThemeColors } from "../hope-ui/Color";
import { ClaimHead, TextButton, ClaimSectionSubHead } from "../hope-ui/Text";
import { SecondaryButton, LavenderRevertButton } from "../hope-ui/Buttons";
import { Label, TextArea, Select, CurrencyInput, DateInput, BooleanSelector, CheckBox } from "../hope-ui/Forms";
import { Tag } from '../hope-ui/Tags'
//import features
import InputModal from "../features/InputModal";
import { HoverHint, StaticHint } from "../hope-ui/hotkeyHint";
//import data
import { getFormDefaultData } from "../data/form-data";
//page specific styles
const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh - 65px);
    width: ${props => props.width? `${props.width}%` : '100%'};
`
const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.width? `${props.width}%` : '100%'};
    padding: ${props => props.position === 'right'? '25px 15px 75px 7px' : '25px 7px 75px 25px'};
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
      }
`
const SectionHeadWrapper = styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 5px;
`

const ClaimHeader = styled.div`
    border-bottom: 1px solid ${BorderColors.normal};
    padding: 0px 0px 15px 0px;
    margin-bottom: 20px;
    position: relative;
`
const ClaimContent = styled.div`

`
const ClaimSection = styled.div`
    padding-bottom: 25px;
    &:not(:last-child) {
        border-bottom: 1px solid ${BorderColors.normal};
        margin-bottom: 25px;
    }
`
const CardBackdrop = styled.div`
    background: ${BackgroundColors.grey};
    border: 1px solid ${BorderColors.normal};
    padding: 12px;
    border-radius: 3px;
    margin-bottom: 12px;
`
const FormFieldWrapper = styled.div`
    &:not(:last-child) {margin-bottom: 14px;}
`
const FormFieldFlexWrapper = styled.div`
    &:not(:last-child) {margin-bottom: 14px;}
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 4px;
`
const InfoWrapper = styled.div`
    margin-bottom: 10px;
`
const ReserveBadge = styled.div`
    font-size: 12px;
    font-weight: 700;
    color: ${ThemeColors.purpleSharper};
    background: ${ThemeColors.purpleSharp};
    padding: 5px 7px;
    border-radius: 3px;
    width: fit-content;

    span {
        font-weight: normal;
        margin-left: 7px;
    }
`
const PaymentRecordWrapper  = styled.div`
    background: ${ThemeColors.dullBlueLighter};
    padding: 25px;
    border-radius: 3px;
    text-align: center;
    margin-bottom: 20px;
    color: ${ThemeColors.dullBlue}; 
    font-size: 14px;
    }
    span {
        margin-left: 15px;
    }

`
const PaymentAlert = styled.div`
    text-align: center;
    font-size: 12px;
    color: ${TextColors.SecondaryDark};
    
`

//page composition
export default function ClaimForms(props) {

    //get selected claim's content
    const thisClaim = props.claimData
    //get form's <select>'s <options>
    let selectOptions = getFormDefaultData();
    //Hooks for Form Main Fields
    const [claimStatus, setClaimStatus] = useState(thisClaim.state);
    const [occuranceDate, setOccuranceDate] = useState(thisClaim.dateOccurance);
    const [contractType, setContractType] = useState(thisClaim.contractType);
    const [claimType, setClaimType] = useState(thisClaim.claimType);
    const [claimOutcome, setClaimOutcome] = useState(thisClaim.claimOutcome);
    const [claimCause, setClaimCause] = useState(thisClaim.claimCause);
    const [reserve, setReserve] = useState('');
    const [paymentType, setPaymentType] = useState(thisClaim.paymentType);
    const [paymentDate, setPaymentDate] = useState(thisClaim.paymentDate);
    const [valuatedAmount, setValuatedAmount] = useState('');
    const [deductibleAmount, setDeductibleAmount] = useState('');
    const [payment, setPayment] = useState('');
    const [employee, setEmployee] = useState(thisClaim.employee);
    const [coInsured, setCoInsured] = useState(thisClaim.coInsured);
    //for re-rendering page
    const [claimData, setClaimData] = useState([])
    //Hooks for claim tags
    const [claimTags, setClaimTags] = useState(thisClaim.tags)

    /* ----------------------------------------------------------------------------- */

    //Claim Basic Info Handling
    useEffect(() => {
        const newClaimData = [...claimData, claimStatus, occuranceDate]

                thisClaim.state = claimStatus
                thisClaim.dateOccurance = occuranceDate

                setClaimData(newClaimData)
                
    }, [claimStatus, occuranceDate])

    const updateClaimStatus = (e) => {
        setClaimStatus(e.target.value)
        e.target.value === 'Open'? callToaster('blue', 'Claim Reopened') : callToaster('green', 'Claim Closed')
    }

    const updateOccuranceDate = (e) => {
        setOccuranceDate(e.target.value)
        callToaster('green', 'Date Occurance Updated')

    }

    /* ----------------------------------------------------------------------------- */

    //Employee & Co-insured Claims Handling
    useEffect(() => {
        const elems = document.querySelectorAll('[data-label]');

        elems.forEach(elem => {
            const getButtonValue = elem.innerText === 'True'? true : false
            if (elem.getAttribute('data-label') === 'employee') {
                employee === getButtonValue? elem.classList.add('active') : elem.classList.remove('active')

                const newClaimData = [...claimData, employee]
                thisClaim.employee = employee
                setClaimData(newClaimData)

            } else if (elem.getAttribute('data-label') === 'co-insured') {
                coInsured === getButtonValue? elem.classList.add('active') : elem.classList.remove('active')

                const newClaimData = [...claimData, coInsured]
                thisClaim.coInsured = coInsured
                setClaimData(newClaimData)
            }
        })
    }, [employee, coInsured])

    /* ----------------------------------------------------------------------------- */

    //Claim Info Section Handling
    const updateBasicInfo = (event) => {
        event.preventDefault();

        const newClaimData = [...claimData, contractType, claimType, claimOutcome, claimCause]

        thisClaim.contractType = contractType
        thisClaim.claimType = claimType
        thisClaim.claimOutcome = claimOutcome
        thisClaim.claimCause = claimCause

        setClaimData(newClaimData)
        callToaster('green', 'Info Updated')
    }

    /* ----------------------------------------------------------------------------- */

    //Reserve Section Handling
    const updateReserve = (event) => {
        event.preventDefault();

        const cleanUp = parseInt(reserve, 10)
        if (cleanUp < 0) { callToaster('red', 'Reserve cannot be negative') } 
        else if (isNaN(cleanUp)) { callToaster('red', 'Invalid Entry') } 
        else {
            const newClaimData = [...claimData, cleanUp]
            thisClaim.reserve = cleanUp;
            setClaimData(newClaimData)
            callToaster('green', 'Reserves Updated')
        }
    }

    /* ----------------------------------------------------------------------------- */

    //Payment Section Handling
    const updatePayment = (event) => {
        event.preventDefault();
        const cleanUp = parseInt(payment, 10)
        const checkbox = document.querySelector('#paymentConfirm')
        console.log(checkbox.checked)

        if (cleanUp <= 0) { callToaster('red', 'Payment needs to be positive') } 
        else if (!paymentType) { callToaster('red', 'Payment Type is required') } 
        else if (isNaN(cleanUp)) { callToaster('red', 'Invalid Entry') } 
        else if (!checkbox.checked) { callToaster('red', 'Confirm payment amount by checking the box') } 
        else {
            const newClaimData = [...claimData, cleanUp, paymentDate, paymentType]
            thisClaim.payments = cleanUp;
            thisClaim.paymentDate = getDate()
            thisClaim.paymentType = paymentType;
            setClaimData(newClaimData)
            callToaster('green', 'Payment Created')
        }
    }

    //Payment Calculation
    useEffect(() => {
        setPayment(valuatedAmount && deductibleAmount? valuatedAmount - deductibleAmount : payment)
    }, [valuatedAmount, deductibleAmount])

    /* ----------------------------------------------------------------- */

    //claim tags handling
    const openTagCreator = () => {
        closeOtherModals()
        const elem = document.querySelector('.tagCreator')
        elem.classList.add('show')
        setTimeout(e => document.querySelector('.tagCreator').getElementsByTagName('input')[0].focus(), 50)
    }

    const updateTags = (inputValue) => {
        inputValue.trim().length === 0 ? console.log('empty string') : claimTags.push(inputValue)
        const newArray = [...claimTags, inputValue]
        setClaimTags(newArray)
        callToaster('green', 'Tag Added')

    }

    function removeTag(event) {
        const newArray = claimTags.filter(claimTag => claimTag !== event.target.innerText)
        event.target.remove()
        setClaimTags(newArray)
        callToaster('blue', 'Tag Removed')
    }

    /* ----------------------------------------------------------------- */

    useEffect(() => {
        document.addEventListener('keydown', (event) => {

            const memberInfoBtn = document.querySelector('#memberInfoBtn')
            const addNoteBtn = document.querySelector('#addNoteBtn')
            const addTagBtn = document.querySelector('#addTagBtn')
            const addFileBtn = document.querySelector('#addFileBtn')
            const playAudioBtn = document.querySelector('#playAudioBtn')
            const claimContractField = document.querySelector('#claimContract')
            const dateOccuranceField = document.querySelector('#dateOccurance')
            const reserveField = document.querySelector('#reserve')
            const paymentTypeField = document.querySelector('#paymentType')
            

            if(memberInfoBtn && event.code === 'KeyO' && event.altKey) {
                setTimeout(e => memberInfoBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(addNoteBtn && event.code === 'KeyQ' && event.altKey) {
                setTimeout(e => addNoteBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(addTagBtn && event.code === 'KeyT' && event.altKey) {
                setTimeout(e => addTagBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(addFileBtn && event.code === 'KeyF' && event.altKey) {
                setTimeout(e => addFileBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(playAudioBtn && event.code === 'KeyP' && event.altKey) {
                setTimeout(e => playAudioBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(dateOccuranceField && event.code === 'Digit1' && event.altKey) {
                setTimeout(e => dateOccuranceField.focus(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(claimContractField && event.code === 'Digit2' && event.altKey) {
                setTimeout(e => claimContractField.focus(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(reserveField && event.code === 'Digit3' && event.altKey) {
                setTimeout(e => reserveField.focus(), 50)
                event.preventDefault()
                event.stopPropagation()
            }

            if(paymentTypeField && event.code === 'Digit4' && event.altKey) {
                setTimeout(e => paymentTypeField.focus(), 50)
                event.preventDefault()
                event.stopPropagation()
            }
    
        })
    }, [])

    /* ----------------------------------------------------------------- */

    //page composition
    return <>
            <ContentWrapper width='100' padding>
                <ColumnWrapper width='67' position='left'>
                    <ClaimHeader>
                        <div>
                            <ClaimHead text={`${thisClaim.memberName} ${thisClaim.market}`} />
                            <div><TextButton href={'Search/' + thisClaim.memberId} text={thisClaim.memberId} /></div>
                        <div style={{ position: 'absolute', right : 0, top: 0 }}>
                            <SecondaryButton id='memberInfoBtn' text='Member Info' onClick={props.memberInfo} hint={true} hintKeys='Opt + O' hintDesc='See Member Info' right={[0, 0]} top={[30, 35]} />
                        </div></div>
                    </ClaimHeader>
                    <ClaimContent>
                        <br />
                        <CardBackdrop>
                            <ClaimSection>
                                <SectionHeadWrapper>
                                <ClaimSectionSubHead text='Claim Info' />
                                <StaticHint firstKey='Opt' secondKey='2' desc='to focus' />
                                </SectionHeadWrapper>
                                <form>
                                    <FormFieldWrapper>
                                        <Label for='claimContract' text='Contract for Claim' />
                                        <Select id='claimContract' allOptions={selectOptions.ClaimContract} value={contractType} onChange={e => setContractType(e.target.value)} />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='claimType' text='Claim Type' />
                                        <Select id='claimType' allOptions={selectOptions.ClaimType} value={claimType} onChange={e => setClaimType(e.target.value)}/>
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='claimOutcome' text='Outcome' />
                                        <Select id='claimOutome' allOptions={selectOptions.ClaimOutcome} value={claimOutcome} onChange={e => setClaimOutcome(e.target.value)} />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='claimCause' text='Claim Cause' />
                                        <TextArea id='claimCause' height='100px' placeholder='What happened?' value={claimCause} onChange={e => setClaimCause(e.target.value)}/>
                                    </FormFieldWrapper>
                                    <SecondaryButton type='submit' text='Update Info' onClick={updateBasicInfo}/>
                                </form>
                            </ClaimSection>
                            <ClaimSection>
                                <SectionHeadWrapper>
                                    <ClaimSectionSubHead text='Reserve' />
                                    <StaticHint firstKey='Opt' secondKey='3' desc='to focus' />
                                </SectionHeadWrapper>
                                <InfoWrapper><ReserveBadge>{thisClaim.reserve? thisClaim.reserve + ' ' : '0'} {thisClaim.currency}<span>reserved</span></ReserveBadge></InfoWrapper>
                                <form>
                                    <FormFieldWrapper>
                                        <CurrencyInput id='reserve' currencySymbol={thisClaim.currency} placeholder='Reserve Amount' value={reserve} onChange={e => setReserve(e.target.value)}/>
                                    </FormFieldWrapper>
                                    <SecondaryButton type='submit' text='Update Reserve' onClick={updateReserve}/>
                                </form>
                            </ClaimSection>
                            <ClaimSection>
                                <SectionHeadWrapper>
                                    <ClaimSectionSubHead text='Payment' />
                                    <StaticHint firstKey='Opt' secondKey='4' desc='to focus' />
                                </SectionHeadWrapper>
                                <PaymentRecordWrapper><span>{thisClaim.payments? thisClaim.payments + ' ' + thisClaim.currency : 'No Payment has been made'}</span><span>{thisClaim.paymentType? 'to ' + thisClaim.paymentType : null}</span><span>{thisClaim.paymentDate? 'on ' + thisClaim.paymentDate : null}</span></PaymentRecordWrapper>
                                {!thisClaim.payments? 
                                <form>
                                    <FormFieldWrapper>
                                        <Label for='paymentType' text='Payment Type' />
                                        <Select id='paymentType' required={true} allOptions={selectOptions.PaymentType} value={paymentType} onChange={e => setPaymentType(e.target.value)} />
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='valuedAmount' text='Valuated Amount' />
                                        <CurrencyInput id='valuatedAmount' currencySymbol={thisClaim.currency} placeholder='Claim Valuation' value={valuatedAmount} onChange={e =>  setValuatedAmount(e.target.value)}/>
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='deductible' text='Deductible' />
                                        <CurrencyInput id='deductible' currencySymbol={thisClaim.currency} placeholder='Deductible Amount' value={deductibleAmount} onChange={e =>  setDeductibleAmount(e.target.value)}/>
                                    </FormFieldWrapper>
                                    <FormFieldWrapper>
                                        <Label for='paymentAmount' text='Payment Amount' />
                                        <CurrencyInput id='paymentAmount' currencySymbol={thisClaim.currency} placeholder='Amount to be Paid' value={payment} onChange={e =>  setPayment(e.target.value)} required={true}/>
                                        {parseInt(payment, 10) > 0? <CheckBox id='paymentConfirm' label={`I confirm to proceed the payout with a total of ${parseInt(payment)} ${thisClaim.currency}`} required={true} /> : null}
                                    </FormFieldWrapper>
                                    <SecondaryButton type='submit' text='Create Payment' onClick={updatePayment}/>
                                </form> 
                                : <PaymentAlert>No further payment can be created</PaymentAlert>}
                            </ClaimSection>
                        </CardBackdrop>
                    </ClaimContent>
                </ColumnWrapper>
                <ColumnWrapper width='33' position='right'>
                    <CardBackdrop>
                        <ClaimSectionSubHead text={`Claim #${thisClaim.claimId}`} />
                            <FormFieldWrapper>
                                <Label text={`registered at ${thisClaim.dateRegistered}, ${thisClaim.timeRegistered}`} />
                                <FormFieldFlexWrapper>
                                    <LavenderRevertButton id='addNoteBtn' text='Add Note' width='fullWidth' onClick={props.claimNote} hint={true} hintKeys='Opt + Q' hintDesc='Toggle Note' left={[0, 0]} top={[30, 35]} />
                                    <LavenderRevertButton id='playAudioBtn' text='Play Audio' width='fullWidth' hint={true} hintKeys='Opt + P' hintDesc='Play Audio' right={[0, 0]} top={[30, 35]} onClick={e => callToaster('red', 'Function not implemented :(')} />
                                </FormFieldFlexWrapper>
                            </FormFieldWrapper>
                            <FormFieldWrapper>
                                <Label for='claimStatus' text='Claim Status' />
                                <Select id='claimStatus' allOptions={selectOptions.ClaimStatus} value={claimStatus} onChange={updateClaimStatus} />
                            </FormFieldWrapper>
                            <FormFieldWrapper>
                                <Label for='dateOccurance' text='Date of Occurance / opt + 1 to focus' />
                                <DateInput id='dateOccurance' placeholder='Select' value={occuranceDate} onChange={updateOccuranceDate} />
                            </FormFieldWrapper>
                            <FormFieldWrapper>
                                <Label for='employee' text='Employess Claim' />
                                <BooleanSelector id='employee' label='employee' value={employee} onClick={e => setEmployee(e.target.innerText === 'True'? true : false)} />
                            </FormFieldWrapper>
                            <FormFieldWrapper
                            >
                                <Label for='coInsured' text='Co-insured Claim' />
                                <BooleanSelector id='coInsured' label='co-insured' value={coInsured} onClick={e => setCoInsured(e.target.innerText === 'True'? true : false)} />
                            </FormFieldWrapper>
                    </CardBackdrop>
                    <CardBackdrop>
                        <ClaimSectionSubHead text='Tags' />
                        <FormFieldWrapper>
                            {thisClaim.tags.map((tag, index) => {
                                return <Tag key={index} onClick={removeTag} text={tag} />
                            })}
                        </FormFieldWrapper>
                        <SecondaryButton id='addTagBtn' type='submit' text='Add Tag' width='fullWidth' onClick={openTagCreator} hint={true} hintKeys='Opt + T' hintDesc='Add Tag' right={[0, 0]} top={[-32, -37]} />
                    </CardBackdrop>
                    <CardBackdrop>
                        <ClaimSectionSubHead text='Files' />
                        <SecondaryButton id='addFileBtn' text='Upload File' width='fullWidth' hint={true} hintKeys='Opt + F' hintDesc='Add File' right={[0, 0]} top={[-32, -37]} onClick={e => callToaster('red', 'Function not implemented :(')} />
                    </CardBackdrop>
                </ColumnWrapper>
            </ContentWrapper>
            <InputModal class='tagCreator' type='text' placeholder='Type and press Enter to add tag' onSubmit={updateTags} />
    </>    
}