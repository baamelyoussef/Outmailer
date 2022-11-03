'use client';

import { Button, Layout,Row,Col,Input,Form, message } from 'antd';
import{UserAddOutlined,KeyOutlined,LogoutOutlined,SendOutlined } from '@ant-design/icons'
import HomeBg from '../../assets/svg/homebg.svg'
import React from 'react';
import Arrow from '../../assets/img/arrow.png' 
import Link from 'next/link';
import EmailDeliv from '../../assets/svg/email_deliverability.svg'
import SpamCheck from '../../assets/svg/email_spam_checker.svg'
import { url } from 'inspector';
import { useState,useEffect } from 'react';
import Spam from '../../assets/img/SPAM.png'
import Image from 'next/image';
import Logo from '../../assets/img/logo.png'
import axios from 'axios';
import { useRouter } from 'next/router';
  
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;


function index() {
const [showLogin, setShowLogin] = useState(true)
const [isSearchLoading, setIsSearchLoading] = useState(false)
const [valueEmail, setValueEmail] = useState("")
const router = useRouter();

useEffect(() => {
  localStorage.getItem('accessToken')?setShowLogin(false):setShowLogin(true)
}, [showLogin])



const searchEmail =(values:any)=>{
  setIsSearchLoading(true)
  axios.get('https://www.disify.com/api/email/'+valueEmail)
  .then((res)=>{
    console.log(res)
    if(!res.data.format){
      message.warning('Wrong Format')
    }
    setIsSearchLoading(false)
  })
  .catch((err)=>{
    console.log(err)
    message.error(err.message)
  })
}
  const logOut =()=>{
    localStorage.setItem("accessToken",'')
    window.location.reload()
    setTimeout(() => {
      message.success('You are loged out')
    }, 3000);
  }
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
                margin:'10px',
                display:'flex' 
            }}>
            {showLogin &&<Link href='/login'><Button icon={<KeyOutlined />}> Log In</Button></Link>}
            {!showLogin &&<Button  icon={<LogoutOutlined />} onClick={logOut}> Log out</Button>}
            {/* <Link href='/register'><Button type='primary' icon={<UserAddOutlined/>}> Register</Button></Link> */}
            </div>
        </div>
      </Header>
      <Content >
      <Row align="middle" style={{textAlign: "center",
    backgroundImage:`url(${HomeBg.src})`,
    backgroundSize:'contain',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat',
    height:'325px'}} className="mediaMobile">
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
                      /> 
                      <h1 style={{fontSize:'2rem'}}>Try it out </h1>
                      <p>Validate and verify email addresses.<br></br> Check if email address is disposable, temporary, has invalid MX records, detect if its mistyped, inactive or non-existent.</p>
                      <Button icon={<SendOutlined />} style={{ padding:'0 50px'}} onClick={()=>{router.push('/login')}}> Get started</Button>
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
                        width={350}
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
                        width={350}
                      /> 
                     <div><h1 style={{fontSize:'1.5rem'}}>Never waste a Lead again</h1> 
            <p style={{width:"350px"}}>Instead of writing down every single lead or potential client/customer on paper you can now save leads on your account that you reach out to at any time, so you can never waste a single lead again</p> 
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
            <div><h1 style={{fontSize:'1.5rem'}}>Boost your Response Rate &<br></br> Open rates</h1> 
            <p style={{width:"350px"}}>Dodging spammy and disposable emails and checking the deliverability of the emails you reach out to will help you significantly increase your response rate & open rate & ultimately make your outreach a success</p> 
                </div> 
                                  <Image
                        alt='arrow'
                        src={EmailDeliv}
                        width={350}
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