//import utilities
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRef } from "react";
import moment from 'moment';
//import helper
import setDocumentTitle from '../helper/document-title';
import closeOtherModals from "../helper/closeOtherModals";
import { getDate, getTime } from "../helper/getDate";
import getUser from "../helper/getUser";
import callToaster from "../helper/callToaster";
import { showHint, hideHint} from "../helper/toggleHotKeyHint";

//import styles
import { BackgroundColors, BorderColors, DropShadow, TextColors, ThemeColors } from "../hope-ui/Color";
import { PrimaryButton, SecondaryButton } from "../hope-ui/Buttons";
import { HoverHint, StaticHint } from "../hope-ui/hotkeyHint";
//import features
import ChatRoom from "../features/Chat";
import TemplateBrowser from "../features/Template";
import ClaimNote from "../features/ClaimNote";
import MemberInfo from "../features/MemberInfo";
import { Toaster } from "../hope-ui/Toaster";
//import data
import { getMembers } from "../data/members-data";
import { getChats } from "../data/chat-data";
import { getClaims } from "../data/claims-data";
import { getQuestions } from "../data/questions";
import { getCheckInUsers } from "../data/check-ins-data";
//import pages
import MemberDetails from "./MemberDetails";
import ClaimForms from "../pages/ClaimForm";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    background: ${BackgroundColors.white};
`
const InnerContentWrapper = styled.div`
    display: flex;
    flex-direction: ${props => props.row? 'row' : 'column'};
    height: calc(100vh - 60px);
    width: ${props => props.width? `${props.width}%` : '100%'};

    &:first-child {
        z-index: 10;
        box-shadow: ${DropShadow.normal};
    }
`
const InboxHeadWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    background: ${BackgroundColors.white};
    border-bottom: 1px solid ${BorderColors.normal};
`
const InboxTabsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
`
const InboxHeadBtnWrapper = styled.div`
    padding: 14px 10px 0 0;
    position: relative;

    span {
        font-size: 12px;
        color: ${TextColors.SecondaryDark};
        margin-right: 10px;
    }
`
const InboxTab = styled.div`
    padding: 22px 25px 18px;
    font-size: 14px;
    color: ${TextColors.DisabledDark};
    border-right: 1px solid ${BorderColors.normal};
    background: ${BackgroundColors.white};
    cursor: pointer;
    transition: all 300ms ease 0s;

    &:hover{
        opacity: .5;
    }

    &.active {
        color: ${TextColors.PrimaryDark};
    }

    span {
        color: ${ThemeColors.linkBlue};
        margin-left: 7px;
    }
`
const TaskList = styled.ul`
    padding: 0px;
    overflow-y: scroll;
    height: 100%;
`
const TaskEach = styled.li`
    display: flex;
    flex-direction: row;
    gap: 15px;
    justify-content: space-between;
    font-size: 13px;
    padding: 15px 20px;
    list-style: none;
    background: transparent;
    box-sizing: border-box;
    transition: all 300ms ease 0s;
    align-items: center;
    cursor: pointer;
    
    &:not(:last-child) {
        border-bottom: 1px solid ${BorderColors.normal};
    }

    &:hover {
        background: ${BackgroundColors.grey};
        padding: 15px 17px;
    }

    &.active {
        background: ${BackgroundColors.grey};
    }
    &.focus {
        background: ${ThemeColors.lavenderLight};
    }
`
const TaskMarket = styled.span`
    padding-top: 5px;
`
const TaskMemberName = styled.span`
    color: ${ThemeColors.linkBlue};
    width: 15%;
    padding-top: 5px;
    transition: all 300ms ease 0s;
    position: relative;

    &:hover {
        color: ${ThemeColors.linkBlueLight};
    }
`
const TaskDesc = styled.span`
    color: ${TextColors.DisabledDark};
    width: 55%;
    padding-top: 5px;
`
const TaskType = styled.span`
    border-radius: 3px;
    background: ${ThemeColors.lavenderLight};
    color: ${ThemeColors.lavender};
    padding: 5px 7px;
    text-align: center;
    width: 90px;
    height: fit-content;
`
const TaskTime = styled.span`
    color: ${TextColors.DisabledDark};
    text-align: right;
    width: 13%;
    padding-top: 5px;
`
const ListEmpty = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 25px;
    font-size: 14px;
    color: ${TextColors.DisabledDark};
`
const HintsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: right;
    gap: 20px;
    padding: 15px 20px;
`

export default function Inbox() {
    //fetch data
    const users = getCheckInUsers()
    const members = getMembers()
    const questions = getQuestions()
    const claims = getClaims()
    const openClaims = claims.filter(claim => claim.state === 'Open')
    //
    const [member, setMember] = useState([])
    const [checkedInUsers, setCheckedInUsers] = useState(users)
    //
    const thisUserName = getUser()
    const usersButMe = checkedInUsers.filter(user => user.userName !== thisUserName)

    const [checkedIn, setCheckedIn] = useState(false)
    const [currentTab, setCurrentTab] = useState('All Tasks')
    const [thisUserQueue, setThisUserQueue] = useState([])
    const [currentTask, setCurrentTask] = useState()

    const [innerTab, setInnerTab] = useState(false)
    const [innerMemberTab, setInnerMemberTab] = useState(false)
    const [innerClaimTab, setInnerClaimTab] = useState(false)

    const FuckMember = useRef({})
    FuckMember.current = member

    /* ------------------------------- on page mount ---------------------------------- */

    //default chosen first li on page load
    useEffect(() => {
        setDocumentTitle('Inbox')
        document.querySelector('#taskList')? document.querySelector('#taskList').firstChild.click() : console.log()
    }, [])

    /* ------------------------- check in and out handling ---------------------------- */

    //check in handling
    const checkIn = () => {
        const newUserObj = {userName: thisUserName, tasks: []}
        const newArray = [newUserObj, ...checkedInUsers]
        setCheckedInUsers(newArray)
        setCheckedIn(true)
        callToaster('green', 'You are now Checked-in')
    }

    //change tab to 'Your Queue' when checking in
    useEffect(() => {
        const elem = document.querySelectorAll('[data-label="Your Queue"]')[0]
        setTimeout(e => elem? elem.click() : console.log(), 100)
        //const func = () => document.querySelector('#taskList')?.firstChild? document.querySelector('#taskList').firstChild.click() : console.log()
        //setTimeout(func ,200)
    }, [checkedIn])

    //check out handling
    const checkOut = () => {
        const newArray = checkedInUsers.filter(user => user.userName !== thisUserName)
        setCheckedInUsers(newArray)
        setCheckedIn(false)
        callToaster('blue', 'You are now Checked-out')
        document.querySelector('[data-label]').click()
    }

    /* ------------------------- start of creating tasks array ------------------------- */

    //convert timestamp into relative time, using moment js
    const timeConverter = (date, time) => {
        const relativeTime = moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm').fromNow();
        return relativeTime
    }

    //convert timestamp into ms from NOW, using moment js
    const timeSort = (date, time) => {
        const thisTime = moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm');
        const nowTime = moment(getDate() + ' ' + getTime(), 'YYYY-MM-DD hh:mm');
        const timeDiff = nowTime.diff(thisTime)

        return timeDiff
    }

    //convert question data object into task data object
    const questionObj = questions.map(question => {
        return {
            memberName: members.filter(member => member.memberId === question.memberId)[0].memberName,
            memberID: members.filter(member => member.memberId === question.memberId)[0].memberId,
            memberMarket: members.filter(member => member.memberId === question.memberId)[0].market,
            taskDesc: question.question,
            taskType: 'Question',
            timeStamp: timeConverter(question.date, question.time),
            timeString: question.date + ' ' + question.time,
            timeDiff: timeSort(question.date, question.time)
        }
    })

    //convert claim data object into task data object
    const claimObj = openClaims.map(claim => {
        return {
            memberName: members.filter(member => member.memberId === claim.memberId)[0].memberName,
            memberID: members.filter(member => member.memberId === claim.memberId)[0].memberId,
            memberMarket: members.filter(member => member.memberId === claim.memberId)[0].market,
            taskDesc: 'This member reported a new claim request',
            taskType: 'Claim',
            timeStamp: timeConverter(claim.dateRegistered, claim.timeRegistered),
            timeString: claim.dateRegistered + ' ' + claim.timeRegistered,
            timeDiff: timeSort(claim.dateRegistered, claim.timeRegistered)
        }
    })

    //create array of task object
    let taskList = [...questionObj, ...claimObj]

    //sort task array by time created
    taskList.sort((a,b) => a.timeDiff - b.timeDiff)

    //assign task id accordingly
    taskList.map((task, index) => {
        task.taskId = 'task#' + index
    })

    //create hook to track tasks
    const [allTasks, setAllTasks] = useState(taskList)

    /* ------------------------- end of creating tasks array ------------------------- */

    //run distributing task function when new user check-in or out
    useEffect(() => {
        loadBalancing()
        const getMyTasks = checkedInUsers.filter(user => user.userName === thisUserName)[0]?.tasks
        setThisUserQueue(getMyTasks? getMyTasks : [])
    }, [checkedInUsers])

    //declare function distributing tasks to all users checked-in
    const loadBalancing = () => {
        const arrayLength = allTasks.length
        const chunckSize = Math.ceil(allTasks.length / checkedInUsers.length)
        const tempArray = []

        for (let i=0 ; i < arrayLength ; i += chunckSize) {
            const newChunck = allTasks.slice(i, i + chunckSize)
            tempArray.push(newChunck)
        }
        
        for (let i=0 ; i < checkedInUsers.length ; i += 1) {
            checkedInUsers[i].tasks = tempArray[i]
        }
    }

    //resolving tasks
    const resolveTask = (event) => {
        const newArray = allTasks.filter(task => task.taskId !== currentTask)
        const newThisUserArray = thisUserQueue.filter(task => task.taskId !== currentTask)
        setAllTasks(newArray)
        setThisUserQueue(newThisUserArray)
        callToaster('green', 'Task Resolved')
        const listing = Array.from(document.querySelectorAll('#taskList li'))
        listing[0]?.click()
    }

    //re-assign tasks
    const assignTask = (event) => {
        //push to selected user's queue
        //const thisTask = document.querySelector('#taskList .active')? document.querySelector('#taskList .active').getAttribute('data-taskid') : null
        const taskContent = allTasks.filter(task => task.taskId === currentTask)

        const selectedUserName = event.currentTarget.innerText
        const cleanUpUserName = selectedUserName.substring(0, selectedUserName.indexOf('\n'))

        const selectedUser = checkedInUsers.filter(user => user.userName === cleanUpUserName)
        const selectedUserTasks = selectedUser[0].tasks

        selectedUserTasks.push(taskContent[0])
        //remove from this user's queue
        const updatedQueue = thisUserQueue.filter(task => task.taskId !== currentTask)
        setThisUserQueue(updatedQueue? updatedQueue : [])
        //call toaster
        callToaster('green', 'Task Re-assigned')
        //close dropdown
        event.currentTarget.parentElement.classList.remove('active')
        //focus another task
        const listing = Array.from(document.querySelectorAll('#taskList li'))
        listing[0]?.click()
    }

    /* ----------------------------------------------------------------- */

    //change tab handling
    const selectTab = (event) => {
        const tabValue = event.currentTarget.getAttribute('data-label')
        setCurrentTab(tabValue)
        const parentElem = event.currentTarget.parentElement
        Array.from(parentElem.children).forEach(tab => tab.classList.remove('active'))
        event.currentTarget.classList.add('active')
        document.querySelector('#taskList')?.firstChild? document.querySelector('#taskList').firstChild.click() : console.log()
    }

    //declare function that handles listing active class
    const handleAcitveClass = (event) => {
        const parentElem = document.querySelector('#taskList')
        Array.from(parentElem.children).forEach(listing => listing.classList.remove('active', 'focus'))
        event.currentTarget.classList.add('active')
        clearInput()
    }

    //get current task target
    const getMemberName = (event) => {
        const memberid = event.currentTarget.getAttribute('data-memberid').length > 0? event.currentTarget.getAttribute('data-memberid') : null;
        const membername = event.currentTarget.getAttribute('data-membername').length > 0? event.currentTarget.getAttribute('data-membername') : null;
        setMember([memberid, membername])
        handleAcitveClass(event)
        document.querySelector('#chatRoom')? document.querySelector('#chatRoom').getElementsByTagName('textarea')[0].focus() : console.log()
        const thisTask = event.currentTarget.getAttribute('data-taskid')
        setCurrentTask(thisTask)
    }

    //clear chat input
    const clearInput = () => {
        document.querySelector('#chatRoom')? document.querySelector('#chatRoom').getElementsByTagName('textarea')[0].value = '' : console.log()
    }
    
    //open inner tabs according to task type
    const openInnerTab = (e) => {
        setInnerTab(true)
        setInnerMemberTab(true)
        setTimeout(e => document.querySelector('[data-label="memberTab"]').click(), 100)

        const claimType = e.currentTarget.parentElement.getAttribute('data-tasktype')

        if (claimType === 'Claim') { 
            setInnerClaimTab(true) 
            setTimeout(e => document.querySelector('[data-label="claimTab"]').click(), 100)
        }
    }
    //
    const closeInnerTab = () => {
        setInnerTab(false)
        setInnerMemberTab(false)
        setInnerClaimTab(false)
        if (checkedIn === true) {
            setCurrentTab('Your Queue')
            setTimeout(e => document.querySelector('[data-label="Your Queue"]').click(), 100)
        } else if (checkedIn === false) {
            setCurrentTab('All Tasks')
            setTimeout(e => document.querySelector('[data-label="All Tasks"]').click(), 100)
        }
    }
    //
    const getThisClaim = () => {
        const claim = openClaims.filter(claim => claim.memberId === FuckMember.current[0])[0]
        return claim
    }
    //
    const setInnerClaimTabTitle = () => {
        const claim = getThisClaim()
        const title = claim? claim.claimId : null
        return title
    }

    /* ----------------------------------------------------------------- */

    //Open Modals Handling
    function openMemberInfoModal(event) {
        const elem = document.querySelector('.memberInfoModal')
        closeOtherModals()
        elem.classList.add('show')
    }

    function openClaimNote() {
        const elem = document.querySelector('.claimModal')
        closeOtherModals()
        elem.classList.add('show')
        setTimeout(e => document.querySelector('.claimModal').getElementsByTagName('textarea')[0].focus(), 50)
    }

    /* ----------------------------------------------------------------- */

    useEffect(() => {

        function hotkeyHandling(event) {
            const checkInBtn = document.querySelector('#checkInBtn')
            const checkOutBtn = document.querySelector('#checkOutBtn')
            const assignBtn = document.querySelector('#assignBtn')
            const resolveBtn = document.querySelector('#resolveBtn')
            const goBackBtn = document.querySelector('#goBack')
    
            if(checkInBtn && event.code === 'Enter' && event.altKey) {
                setTimeout(e => checkInBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(checkOutBtn && event.code === 'Enter' && event.altKey) {
                setTimeout(e => checkOutBtn.click(), 50)
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(assignBtn && event.code === 'KeyA' && event.altKey) {
                assignBtn.click()
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(resolveBtn && event.code === 'Enter' && event.shiftKey && event.metaKey) {
                resolveBtn.click()
                event.preventDefault()
                event.stopPropagation()
            }
    
            if(goBackBtn && event.code === 'ArrowLeft' && event.altKey) {
                goBackBtn.click()
                event.preventDefault()
                event.stopPropagation()
            }
        }

        document.addEventListener('keydown', hotkeyHandling)

        return () => {document.removeEventListener('keydown', hotkeyHandling)}

    }, [])

    /* ----------------------------------------------------------------- */
    //implementing keyboard navigation on table listing

    useEffect(() => {
    
        const listingNode = document.querySelectorAll('#taskList li')
        const listing = Array.from(listingNode)
        listing.forEach(each => each.classList.remove('focus'))
        listing[0]?.classList.add('focus')

        function arrowDown(event) {
            const listingNode = document.querySelectorAll('#taskList li')
            const listing = Array.from(listingNode)

            if (event.code === 'ArrowDown' && listing.length > 1) {
                event.stopPropagation()
                const currentItem = document.querySelector('#taskList li.focus')

                if (currentItem.nextSibling) {
                    currentItem.nextSibling.classList.add('focus')
                    currentItem.classList.remove('focus')
                } else if (!currentItem.nextSibling) {
                    listing[0].classList.add('focus')
                    currentItem.classList.remove('focus')
                }
            }
        }
    
        function arrowUp(event) {
            const listingNode = document.querySelectorAll('#taskList li')
            const listing = Array.from(listingNode)
    
            if (event.code === 'ArrowUp' && listing.length > 1) {
                event.stopPropagation()
                const currentItem = document.querySelector('#taskList li.focus')

                if (currentItem.previousSibling) {
                    currentItem.previousSibling.classList.add('focus')
                    currentItem.classList.remove('focus')
                } else if (!currentItem.previousSibling) {
                    listing[listing.length-1].classList.add('focus')
                    currentItem.classList.remove('focus')
                }
            }
        }
    
        function selectListing(event) {
            
            if (event.code === 'ArrowRight' && currentTab === 'Your Queue') {
                const currentItem = document.querySelector('#taskList li.focus')
                if (currentItem) {
                    currentItem.click()
                    currentItem.classList.remove('focus')
                }
            }
        }

        function backToListing(event) {
            const textArea = document.querySelector('#chatRoom')? document.querySelector('#chatRoom').getElementsByTagName('textarea')[0] : console.log()
            if (event.code === 'ArrowLeft' && !textArea.value) {
                textArea.blur()
                if (!document.querySelector('#taskList li.focus')) {
                    const currentItem = document.querySelector('#taskList li.active')
                    currentItem.classList.add('focus')
                }
            }
        }

        function selectInnerListing(event) {

            if (event.code === 'Enter' && event.shiftKey && !event.metaKey) {
                const currentItem = document.querySelector('#taskList li.focus')
                currentItem.children[1].click()
            }
        }

        function allHotkeys(event) {
            arrowDown(event)
            arrowUp(event)
            selectListing(event)
            backToListing(event)
            selectInnerListing(event)
        }

        document.addEventListener('keydown', allHotkeys)

        return () => document.removeEventListener('keydown', allHotkeys)

    }, [currentTab])

    /* ----------------------------------------------------------------- */

    return <>
            {checkedIn && member.length > 0? <MemberInfo class='memberInfoModal' modalName='Member Info' memberId={FuckMember.current[0]}/> : null}
            {checkedIn? <TemplateBrowser /> : null}
            {checkedIn && getThisClaim()? <ClaimNote class='claimModal' modalName='Claim Note' claimData={getThisClaim()} /> : null}
            
            <ContentWrapper>
                {!innerMemberTab?
                <InnerContentWrapper>
                    <InboxHeadWrapper>
                        <InboxTabsWrapper>
                            <InboxTab className='active' data-label='All Tasks' onClick={selectTab}>All Tasks <span>{allTasks.length}</span></InboxTab>
                            {checkedIn === false? null : <InboxTab data-label='Your Queue' onClick={selectTab}>Your Queue <span>{thisUserQueue? thisUserQueue.length : '0'}</span></InboxTab>}
                        </InboxTabsWrapper>
                        <InboxHeadBtnWrapper>
                            {checkedIn === false? <><span>Check-In to start helping members</span><PrimaryButton id='checkInBtn' text='Check-In' onClick={checkIn} hint={true} hintKeys='Opt + Enter' hintDesc='Check In' right={[0, 0]} top={[30, 35]} /></> : 
                            <>
                                <span>{`${checkedInUsers.length - 1 === 0? 'no other user is checking in' : checkedInUsers.length - 1 + ' ' + 'others are checking in'}`}</span>
                                <SecondaryButton id='checkOutBtn' text='Check-Out' onClick={checkOut} hint={true} hintKeys='Opt + Enter' hintDesc='Check Out' right={[0, 0]} top={[30, 35]} />
                            </>
                            }
                        </InboxHeadBtnWrapper>
                    </InboxHeadWrapper>
                        {currentTab === 'All Tasks'?  
                            <>
                                <TaskList id='taskList'>
                                {allTasks? allTasks.map((task, index) => {
                                    return  <TaskEach key={index} data-taskid={task.taskId} data-membername={task.memberName} data-memberid={task.memberID} onClick={getMemberName}>
                                                <TaskMarket>{task.memberMarket}</TaskMarket>
                                                <TaskMemberName id={task.taskId} onClick={openInnerTab} onMouseEnter={showHint} onMouseLeave={hideHint}>
                                                    <HoverHint hintFor={task.taskId} keys='Shift + Enter' desc='Member Details' left={[70, 75]} top={[-4, -4]}/>
                                                    {task.memberName}
                                                </TaskMemberName>
                                                <TaskDesc>{task.taskDesc}</TaskDesc>
                                                <TaskType>{task.taskType}</TaskType>
                                                <TaskTime>{task.timeStamp}</TaskTime>
                                            </TaskEach>
                                }) : null}
                                </TaskList>
                                {allTasks && allTasks.length === 0? <ListEmpty>There is currently no incoming task</ListEmpty> : null}
                            </> : 
                            <>
                            <TaskList id='taskList'>
                                {thisUserQueue? thisUserQueue.map((task, index) => {
                                    return <TaskEach key={index} data-taskid={task.taskId} data-tasktype={task.taskType} data-membername={task.memberName} data-memberid={task.memberID} onClick={getMemberName}>
                                                <TaskMarket>{task.memberMarket}</TaskMarket>
                                                <TaskMemberName id={task.taskId} onClick={openInnerTab} onMouseEnter={showHint} onMouseLeave={hideHint}>
                                                    <HoverHint hintFor={task.taskId} keys='Shift + Enter' desc='Member Details' left={[70, 75]} top={[-4, -4]}/>
                                                    {task.memberName}
                                                </TaskMemberName>
                                                <TaskDesc>{task.taskDesc}</TaskDesc>
                                                <TaskType>{task.taskType}</TaskType>
                                                <TaskTime>{task.timeStamp}</TaskTime>
                                            </TaskEach>
                                }) : null}
                                {thisUserQueue.length === 0? <ListEmpty>Your queue is emptied!</ListEmpty> : null}
                            </TaskList>
                            <HintsWrapper>
                                <StaticHint firstKey='Arrow Right' desc='to select task' />
                                <StaticHint firstKey='Arrow Left' desc='back to listing' />
                            </HintsWrapper>
                            </> }
                </InnerContentWrapper> : null
                }
                {innerTab?
                <InnerContentWrapper>
                    <InboxHeadWrapper>
                        <InboxTabsWrapper>
                            <HoverHint hintFor='goBack' keys='Opt + Left' desc='Back to Inbox' left={[95, 105]} top={[13, 13]}/>
                            <InboxTab id='goBack' onClick={closeInnerTab} onMouseEnter={showHint} onMouseLeave={hideHint}><span>Go Back</span></InboxTab>
                            <InboxTab data-label='memberTab' className='active' onClick={selectTab}>{FuckMember.current[1]}</InboxTab>
                            {innerClaimTab? <InboxTab data-label='claimTab' onClick={selectTab}>{`Claim #${setInnerClaimTabTitle()}`}</InboxTab> : null}
                        </InboxTabsWrapper>
                    </InboxHeadWrapper>
                    {currentTab === 'memberTab'? <MemberDetails memberId={FuckMember.current[0]}/> : null}
                    {currentTab === 'claimTab'? <ClaimForms claimData={getThisClaim()} memberInfo={openMemberInfoModal} claimNote={openClaimNote} /> : null}
                </InnerContentWrapper> : null
                }
                {currentTab !== 'All Tasks' && thisUserQueue.length > 0? 
                <InnerContentWrapper width='50' row>
                    <ChatRoom memberName={FuckMember.current[1]} memberId={FuckMember.current[0]} onResolve={resolveTask} onAssign={assignTask} checkedInUsers={usersButMe} inbox />
                </InnerContentWrapper> : null
                }
            </ContentWrapper>
            <Toaster />
    </>    
}