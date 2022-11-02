'use client';

import Head from 'next/head'
import { CheckCircleFilled,CloseCircleFilled,DeleteOutlined, UserAddOutlined,UserOutlined  } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';

import axios from 'axios'
import { Button, Form,List,Avatar,Card,PageHeader,Badge, Input,message,Row,Col, InputNumber,Spin,Layout } from 'antd';
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
const [showRes, setShowRes] = useState(false)
const [isDNS, setIsDNS] = useState(false)
const [isWl, setIsWl] = useState(false)
const [domain, setDomain] = useState('')
const [valueEmail, setValueEmail] = useState("")
const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e:any) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
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
    setShowRes(true)
  })
  .catch((err)=>{
    console.log(err)
    message.error(err.message)
  })
}
  const router = useRouter();
  useEffect(() => {
    if(!localStorage.getItem('accessToken') ||localStorage.getItem('accessToken')== ''){
      router.push('/home')
    }
  })
  const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const ContainerHeight = 400;


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
        marginBottom:'.5rem'
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
      {showRes&& <Card title={valueEmail} style={{margin:"0 30px"}}
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
    
  </Card>}
      </Col>
      </Row>
      <PageHeader
    className="site-page-header"
    title="My Leads"
    subTitle="Leads that you have saved from previous searchs."
    style={{
      margin:"0 140px !important",

    }}
  >
      <Row align="middle"
        style={{textAlign: "center", display:'flex',justifyContent:'center'}}>
        <Col span={24} style={{
        
        verticalAlign: 'middle',
        marginBottom:'5rem',
        }}>
          <List
          style={{
            margin:"0 140px !important",

          }}>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item >
            <List.Item.Meta
              avatar={<UserOutlined />}
              title={<a href="https://ant.design">Lead Name</a>}
              description={"Lead@gmail.com"}
            />
            <div><DeleteOutlined /></div>
          </List.Item>
        )}
      </VirtualList>
    </List>
          </Col>
          </Row></PageHeader>
    </Content>
    </Layout>
  )
}
