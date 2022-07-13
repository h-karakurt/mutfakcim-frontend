import styled from 'styled-components'

export default function authLayout({children}){
    
    const Layout = styled.div`
        min-height : 100vh;
        position: relative;
    `
    
    return(
        <Layout className='background-pattern2'>
            {children}
        </Layout>
    )
}