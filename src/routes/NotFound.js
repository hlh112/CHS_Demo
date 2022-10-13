import { PageHead } from "../hope-ui/Text";
import styled from "styled-components";
//import helper
import setDocumentTitle from '../helper/document-title'

const PageContentWrapper = styled.div`
  padding: 40px 30px 75px 45px;
`

export default function NotFound() {

    setDocumentTitle('Not Found')

    return <>
        <PageContentWrapper>
            <PageHead text='Nothing Here' />
        </PageContentWrapper>
    </>    
}