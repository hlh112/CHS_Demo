//import utilities
import { useState, useEffect } from "react";
import styled from "styled-components";
//import helper
import setDocumentTitle from '../helper/document-title'
//import styles
import { PageHead } from "../hope-ui/Text";
import { TextInput } from "../hope-ui/Forms";
import { EmptyState } from "../hope-ui/EmptyState";
import TableUI from "../hope-ui/Table";
//import data
import { getClaims } from "../data/claims-data";
import { getMembers } from "../data/members-data";

//set page specific styles
const PageContentWrapper = styled.div`
  padding: 40px 30px 75px 45px;
`

const SearchFieldWrapper = styled.div`
    width: 45%;
    margin-bottom: 15px;
    position: relative;

    ::after {
        content: '';
        position: absolute;
        right: 4px;
        top: 8px;
        background: url(../common_icons/search.svg) no-repeat;
        width: 20px;
        height: 20px;
    }

`

export default function MemberSearch() {

    setDocumentTitle('Search')
    
    //create data instance
    const members = getMembers()
    const claims = getClaims()

    //create react hook to monitor member list
    const [memberList, setMemberList] = useState(members)

    //update member list via updating react hook with matching user input
    const queryMemberList = (event) => {
        const searchValue = event.target.value.toLowerCase()
        if (searchValue.trim().length === 0) {
            setMemberList(members)
        } else {
            setMemberList(members.filter(member => member.memberId.includes(searchValue) || member.memberName.toLowerCase().includes(searchValue)))
        }
    }

    //pass updated member list into hope-ui-table's compatible data structure
    const newMembersData = memberList.map(member => {

        return [
            [{
                primary: member.market + ' ' + member.memberName
            },
            {
                primary: member.memberId
            },
            {
                primary: member.dateSigned
            },
            {
                primary: member.contracts.length
            },
            {
                primary: claims.filter(claim => claim.memberId === member.memberId && claim.state === 'Open').length
            }],
            {
                path: member.memberId
            }
        ]
    })

    //declare table head
    const tableHeads = ['Member', 'Member ID', 'Signed on', 'Active Contracts', 'Ongoing Claims']

    //handle table empty state
    useEffect(() => {
        const emptyState = document.querySelector('.empty-state')
        if (memberList.length === 0) {
            emptyState.style.display = 'block'
        } else {
            emptyState.style.display = 'none'
        }
    }, [memberList])

    //handle keyboard navigation
    

    //page composition
    return <>
        <PageContentWrapper>
            <PageHead text='Member Search' />
                <SearchFieldWrapper>
                    <TextInput placeholder='Search by Member Name or ID' onChange={queryMemberList} autoFocus={true}/>
                </SearchFieldWrapper>
                <TableUI headers={tableHeads} data={newMembersData} />
                <EmptyState class="empty-state" text="There's no matching result" />
        </PageContentWrapper>
    </>    
}