import styled from 'styled-components'

export default function authLayout({children}){
    
    const Layout = styled.div`
        background-color: #efefef;
        min-height: calc(100vh - 56px);
        padding: 30px;
        .text-light{
            color: #fff;
        }
        .cream-bg{
            background-color: #ffffff !important;
        }
        
        @media screen and (max-width: 992px) {
            padding: 10px;
            padding-top: 20px;
        }
    `
    
    return(
        <Layout>
            {children}
        </Layout>
    )
}