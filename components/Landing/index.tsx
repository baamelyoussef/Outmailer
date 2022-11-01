import { Button, Layout,Row,Col,Input } from 'antd';
import{UserAddOutlined,KeyOutlined } from '@ant-design/icons'
import HomeBg from '../../assets/svg/homebg.svg'
import React from 'react';
import Arrow from '../../assets/img/arrow.png' 
import Link from 'next/link';
import EmailDeliv from '../../assets/svg/email_deliverability.svg'
import SpamCheck from '../../assets/svg/email_spam_checker.svg'
import { url } from 'inspector';
import Spam from '../../assets/img/SPAM.png'
import Image from 'next/image';
import Logo from '../../assets/img/logo.png'
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

function index() {
  return (<><Layout>
      <Header
      style={{
        background:'transparent'
      }}
      >
        <div
        style={{
            display:'flex',
            justifyContent:'space-between'
        }}
        >
            <div>
                <Image
                    alt='logo'
                    src={Logo}
                    width={150}
                />
            </div>
            <div
            style={{
                margin:'10px'
            }}>
            <Link href='/login'><Button icon={<KeyOutlined />}> Log In</Button></Link>
            <Link href='/register'><Button type='primary' icon={<UserAddOutlined/>}> Register</Button></Link>
            </div>
        </div>
      </Header>
      <Content >
      <Row align="middle" style={{textAlign: "center",
    backgroundImage:`url(${HomeBg.src})`,
    backgroundSize:'contain',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    height:'325px'}}>
        <Col span={24} style={{
        verticalAlign: 'middle',
        }}>
            <div style={{marginInline:"30px"}}>
            <h1 style={{fontSize:'2rem'}}><b>Avoid being in spam & Fake emails</b></h1>
            <h1 style={{fontSize:'1.25rem'}}>Reach out to real emails & save leads</h1>
            </div>
        </Col>
        </Row>
        <Row align="middle"
        style={{textAlign: "center",}}>
        <Col span={24} style={{
        verticalAlign: 'middle',
        marginTop:'2rem', 
        marginBottom:'5rem'
        }}>
                       <Image
                        alt='arrow'
                        src={Arrow}
                        width={100}
                      /> <h1 style={{fontSize:'2rem'}}>Try it out </h1>
                      <p>Validate and verify email addresses.<br></br> Check if email address is disposable, temporary, has invalid MX records, detect if its mistyped, inactive or non-existent.</p>

            <Search style={{width:"70%"}} placeholder="jeff@nasa.com" enterButton="Search" size="large" />
        </Col>
        </Row>
        <Row align="middle"
        style={{textAlign: "center",}}>
        <Col span={24} style={{
        verticalAlign: 'middle',
        marginTop:'1rem', 
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap'
        }}>
            <div><h1 style={{fontSize:'1.5rem'}}>Detect Spammy & Disposable<br/> Email Addresses </h1> 
            <p style={{width:"350px"}}>Disposable email addresses are one-time use addresses. Sometimes they are forwarded to a real address to track sites that send other unsolicited mail. Othertimes they are used once and ignored completely.

For business services and newsletter signups, disposable emails addresses are low quality emails to collect.</p> 
                </div>
                                  <Image
                        alt='arrow'
                        src={Spam}
                        width={400}
                      /> 
                      

            
        </Col>
        <Col span={24} style={{
        verticalAlign: 'middle',
        marginTop:'1rem', 
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap'

        }}>
            
                                  <Image
                        alt='arrow'
                        src={SpamCheck}
                        width={400}
                      /> 
                     <div><h1 style={{fontSize:'1.5rem'}}>Detect Spammy & Disposable<br/> Email Addresses </h1> 
            <p style={{width:"350px"}}>Disposable email addresses are one-time use addresses. Sometimes they are forwarded to a real address to track sites that send other unsolicited mail. Othertimes they are used once and ignored completely.

For business services and newsletter signups, disposable emails addresses are low quality emails to collect.</p> 
                </div> 

            
        </Col>
        <Col span={24} style={{
        verticalAlign: 'middle',
        marginTop:'1rem', 
        marginBottom:'5rem',
        display:'flex',
        justifyContent:'center',
        flexWrap:'wrap'

        }}>
            <div><h1 style={{fontSize:'1.5rem'}}>Detect Spammy & Disposable<br/> Email Addresses </h1> 
            <p style={{width:"350px"}}>Disposable email addresses are one-time use addresses. Sometimes they are forwarded to a real address to track sites that send other unsolicited mail. Othertimes they are used once and ignored completely.

For business services and newsletter signups, disposable emails addresses are low quality emails to collect.</p> 
                </div> 
                                  <Image
                        alt='arrow'
                        src={EmailDeliv}
                        width={400}
                      /> 
                     

            
        </Col>
        </Row>
      </Content>
      <Footer style={{
        bottom:0,
        width:"100%",
        textAlign:'center'
      }}>Outmailer ©2022 Crafted by Baamel Youssef</Footer>
    </Layout>
  </>

  )
}

export default index