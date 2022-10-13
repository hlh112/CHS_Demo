import styled from "styled-components";
import { TextColors, ThemeColors, BackgroundColors } from './Color';

const FilterWrapper = styled.div`
    margin-bottom: 10px;
`
const Chip = styled.button`
    color: ${TextColors.PrimaryDark};
    border: none;
    border-radius: 4px;
    padding: 5px 10px; 
    margin-right: 7px;
    background: ${BackgroundColors.greyDarker};
    cursor: pointer;
    transition: all 300ms ease 0s;

    &:hover, &.active{
        background: ${ThemeColors.linkBlueLight};
        color: ${ThemeColors.linkBlue};
    }
`
const ChipCount = styled.div`
    padding: 2px 5px 1px;
    background: ${BackgroundColors.white}8;
    display: inline-block;
    border-radius: 3px;
    margin-left: 8px;
    pointer-events: none;
`

export default function FilterChip(props) {

    const getCount = (label, tag) => {
        return props.data.filter(datum => datum[tag] === label).length
    }

    return <>
    {props.attrs.map((attr, index) => {
        return <FilterWrapper key={index}>
            {attr.map((attrEach, index) => {

                return <Chip key={index} data-label={attrEach.label} data-tag={attrEach.tag} onClick={props.onToggleFilter}>
                        {attrEach.label}
                        <ChipCount>{getCount(attrEach.label, attrEach.tag)}</ChipCount>
                    </Chip>
            })}
        </FilterWrapper>
    })}
    </>
}