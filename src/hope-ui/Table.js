import { TextColors, BackgroundColors, StateColors, ThemeColors } from "../hope-ui/Color";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    text-align: left;
`
const TableBody = styled.tbody`
    tr {
        cursor: pointer;
        background: ${ThemeColors.dullBlueLighter};
        
        &.focus {
            background: ${ThemeColors.dullBlueLight};
        }
    }
    tr:not(:last-child) {
        border-bottom: solid 1px ${ThemeColors.dullBlueLight};
    }

    tr:hover {
        td {
            background: ${ThemeColors.dullBlueLight};
        }
    }
    &.focus {
        background ${ThemeColors.lavenderLight};
    }
`
const TableRow = styled.tr` 
    border-collapse: collapse;

    &:last-child td:last-child {
        border-radius: 0px 0px 4px 0px;
    }

    &:last-child td:first-child {
        border-radius: 0px 0px 0px 4px;
    }
`
const TableHeadCell = styled.th`
    font-size: 12px;
    font-weight: normal;    
    border-collapse: collapse;
    color: ${TextColors.SecondaryDark};
    background: ${ThemeColors.dullBlueLight};
    padding: 10px 20px;

    &:first-child {
        border-radius: 4px 0px 0px 0px;
    }

    &:last-child {
        border-radius: 0px 4px 0px 0px;
    }
`

//background: ${ThemeColors.dullBlueLighter};
const TableDataCell = styled.td`
    font-size: 13px;
    font-weight: normal;    
    border-collapse: collapse;
    padding: 15px 20px;
    transition: all 250ms ease 0s;
    color: ${props => props.specified === 'Not Specified'? TextColors.DisabledDark : TextColors.PrimaryDark};
`
const TableDataSubCell = styled.div`
    font-size: 12px;
    margin-top: 3px;
    color: ${props => props.specified === 'Not Specified'? TextColors.DisabledDark : TextColors.SecondaryDark};

    a {
        text-decoration: none;
        color: ${ThemeColors.linkBlue};
        display: block;
    }
`
const StatusBadge = styled.div`
    text-align: center;
    max-width: 50px;
    border-radius: 4px;
    padding: 5px 10px;

    ${props => {
        if(props.state === 'Open') {
            return `background: ${StateColors.greenLight}; color: ${StateColors.green};`
        } return `background: ${StateColors.redLight}; color: ${StateColors.red};`
    }}
`

export default function TableUI(props) {

    const navigate = useNavigate()
    const handleTableClick = (event) => {
        const path = event.target.closest('tr').getAttribute('href')
        navigate(path);
    }

    const [data, setData] = useState(props.data)
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    //implementing keyboard navigation on table listing
    useEffect(() => {

        const tableRow = document.querySelectorAll('tbody tr')
        const tableList = Array.from(tableRow)
        tableList.forEach(list => list.classList.remove('focus'))
        tableList[0]?.classList.add('focus')

        function arrowDown(event) {
            const tableRow = document.querySelectorAll('tbody tr')
            const tableList = Array.from(tableRow)
            
            if (event.code === 'ArrowDown' && tableList.length > 1) {
                event.stopPropagation()
                const currentItem = document.querySelector('tr.focus')

                if (currentItem.nextSibling) {
                    currentItem.nextSibling.classList.add('focus')
                    currentItem.classList.remove('focus')
                } else if (!currentItem.nextSibling) {
                    tableList[0].classList.add('focus')
                    currentItem.classList.remove('focus')
                }
            }
        }

        function arrowUp(event) {
            const tableRow = document.querySelectorAll('tbody tr')
            const tableList = Array.from(tableRow)

            if (event.code === 'ArrowUp' && tableList.length > 1) {
                event.stopPropagation()
                const currentItem = document.querySelector('tr.focus')

                if (currentItem.previousSibling) {
                    currentItem.previousSibling.classList.add('focus')
                    currentItem.classList.remove('focus')
                } else if (!currentItem.previousSibling) {
                    tableList[tableList.length-1].classList.add('focus')
                    currentItem.classList.remove('focus')
                }
            }
        }

        function selectListing(event) {
            
            if (event.code === 'Enter') {
                const currentItem = document.querySelector('tr.focus')
                currentItem.click()
            }
        }

        function allHotkeyFunc(event) {
            arrowDown(event)
            arrowUp(event) 
            selectListing(event)
        }

        document.addEventListener('keydown', 
            allHotkeyFunc
        )

        return () => {
            document.removeEventListener('keydown', allHotkeyFunc);
        }

    }, [data])

    return (
        <Table>
            <thead>
                <TableRow>
                    {props.headers.map((header, index) => {
                        return <TableHeadCell key={index}>{header}</TableHeadCell>
                    })}
                </TableRow>
            </thead>
            <TableBody>
                {data.map((dataSets, index) => {

                    const pathURL = dataSets[1].path
                    
                    return <TableRow key={index} href={pathURL} onClick={handleTableClick}>
                        {dataSets[0].map((datum, index) => {
                            
                            const subCell = datum.secondary? <TableDataSubCell specified={datum.secondary}>{datum.secondary}</TableDataSubCell> : null
                            const subCellLink = datum.link? <TableDataSubCell><a href={datum.href} target='blank'>{datum.link}</a></TableDataSubCell> : null
                            const badges = datum.status? <StatusBadge state={datum.status}>{datum.status}</StatusBadge> : null

                            return <TableDataCell key={index} specified={datum.primary}>
                                    {datum.primary}
                                    {subCell}
                                    {subCellLink}
                                    {badges}
                                </TableDataCell>
                        })}
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}