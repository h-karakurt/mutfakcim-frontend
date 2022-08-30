import styled from 'styled-components'

export default function authLayout({children}){
    
    const Layout = styled.div`
        opacity: 1;
        background-image:  radial-gradient(#FCFFE7 1.1500000000000001px, transparent 1.1500000000000001px), radial-gradient(#FCFFE7 1.1500000000000001px, #b1d793 1.1500000000000001px);
        background-size: 46px 46px;
        background-position: 0 0,23px 23px;
        min-height: calc(100vh - 56px);
        padding: 30px;
        .text-light{
            color: #fff;
        }
        .cream-bg{
            background-color: #FCFFE7 !important;
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