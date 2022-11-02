'use client';

import Head from 'next/head'
import { CheckCircleFilled,CloseCircleFilled, UserAddOutlined  } from '@ant-design/icons';

import axios from 'axios'
import { Button, Form,Card,Badge, Input,message,Row,Col, InputNumber,Spin,Layout } from 'antd';
import Logo from "../assets/img/logo.png"
import Image from 'next/image'
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
const { Header, Footer, Sider, Content } = Layout;
const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

export default function Home() {
  const [showLogin, setShowLogin] = useState(true)
const [isSearchLoading, setIsSearchLoading] = useState(false)
const [isDisposable, setisDisposable] = useState(false)
const [isDNS, setIsDNS] = useState(false)
const [isWl, setIsWl] = useState(false)
const [domain, setDomain] = useState('')
const [valueEmail, setValueEmail] = useState("")
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
    res.data.disposable?setisDisposable(true):setisDisposable(false)
    res.data.dns?setIsDNS(true):setIsDNS(false)
    res.data.whitelist?setIsWl(true):setIsWl(false)
    if(res.data.domain){ 
      setDomain(res.data.domain)
    }
    setIsSearchLoading(false)
  })
  .catch((err)=>{
    console.log(err)
    message.error(err.message)
  })
}
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('accessToken') ||localStorage.getItem('accessToken')== ''){
      router.push('/landing')
    }
  })
  

  return (
    <Layout>
    <Header
    style={{
      background:'transparent'
    }}
    >
      <div
      style={{
          display:'flex',
          justifyContent:'center'
      }}
      >
          <div>
              <Image
                  alt='logo'
                  src={Logo}
                  width={150}
              />
          </div>
          
      </div>
    </Header>
    <Content>
    <Row align="middle"
        style={{textAlign: "center",}}>
        <Col span={24} style={{
        
        verticalAlign: 'middle',
        marginTop:'2rem', 
        marginBottom:'5rem'
        }}>
    <p>Validate and verify email addresses.<br></br> Check if email address is disposable, temporary, has invalid MX records, detect if its mistyped, inactive or non-existent.</p>
                      <Form  name="dynamic_rule" onFinish={searchEmail} 
                      style={{
                        display:'flex',
                        justifyContent:'center'
                      }}>
      <Form.Item
        name="email"
        style={{width:'70%'}}
        getValueFromEvent={(e)=>{
          setValueEmail(e.target.value)
        }}
        rules={[
          {
            required: true,
            message: 'please enter an email address',
          },
        ]}
      >
        <Input placeholder="jeff@google.com" type='email' />
      </Form.Item>
      <Form.Item >
        <Button type="primary" onClick={searchEmail} loading={isSearchLoading}>
          Check
        </Button>
      </Form.Item>
      </Form>
      <Card title={valueEmail} style={{margin:"0 30px"}}
      extra={
        <Button icon={<UserAddOutlined />}>Add Lead</Button>
      }>
    <Card.Grid style={gridStyle}>
      <p>Disposable</p>
    <Badge count={isDisposable ? <CheckCircleFilled style={{ color:'green' }} /> : <CloseCircleFilled style={{ color:'#f5222d' }} />} />
</Card.Grid>
    <Card.Grid  style={gridStyle}>
      <p>DNS</p>
      <Badge count={isDNS ? <CheckCircleFilled style={{ color:'green' }} /> : <CloseCircleFilled style={{ color:'#f5222d' }} />} />

    </Card.Grid>
    <Card.Grid  style={gridStyle}>
      <p>Whitelist</p>
      <Badge count={isWl ? <CheckCircleFilled style={{ color:'green' }} /> : <CloseCircleFilled style={{ color:'#f5222d' }} />} />

    </Card.Grid>
    <Card.Grid  style={gridStyle}>
      <p>Domain</p>
      <p>{domain}</p>

    </Card.Grid>
    
  </Card>
      </Col></Row>
    </Content>
    </Layout>
  )
}
