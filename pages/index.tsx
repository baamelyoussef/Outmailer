'use client';

import Head from 'next/head'
import { CheckCircleFilled, CloseCircleFilled, DeleteOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import VirtualList from 'rc-virtual-list';
import { db } from "../firebase-config"
import { collection, addDoc, getDocs, setDoc, deleteDoc, query, where, doc, serverTimestamp } from "firebase/firestore";
import axios from 'axios'
import { Button, Form, List, Avatar, Empty, Card, Modal, PageHeader, Badge, Input, message, Row, Col, InputNumber, Spin, Layout, Tooltip, Popconfirm } from 'antd';
import Logo from "../assets/img/logo.png"
import Image from 'next/image'
import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false)
  const [leads, setLeads] = useState([])
  const [nameLead, setNameLead] = useState('')
  const [isWl, setIsWl] = useState(false)
  const [domain, setDomain] = useState('')
  const [leadRemoved, setLeadRemoved] = useState(false)
  const [valueEmail, setValueEmail] = useState("")
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setShowRes(false)
  };

  useEffect(() => {
    let leadsList: any = []
    let lsLL: any = ''
    let key: any = localStorage.getItem("id")
    setIsLoading(true)
    const q = query(collection(db, "leads"), where("uid", "==", key));
    const docRef = getDocs(q)
      .then((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.docs.map((doc: any) => {
          leadsList.push({
            key:{
              "stringValue":doc.id
            },
            ...doc._document.data.value.mapValue.fields
          }
            )
        })
        setLeads(leadsList)
        localStorage.setItem('leadsList', JSON.stringify(leadsList))
        setIsLoading(false)
      })
    console.log(docRef)
    lsLL = localStorage.getItem('leadsList')
    JSON.parse(lsLL)
  }, [])
  useEffect(() => {
    let leadsList: any = []
    let lsLL: any = ''
    let key: any = localStorage.getItem("id")
    setIsLoading(true)
    const q = query(collection(db, "leads"), where("uid", "==", key));
    const docRef = getDocs(q)
      .then((querySnapshot) => {
        console.log(querySnapshot)
        querySnapshot.docs.map((doc: any) => {
          leadsList.push({
            key:{
              "stringValue":doc.id
            },
            ...doc._document.data.value.mapValue.fields
          }
            )
        })

        setLeads(leadsList)
        localStorage.setItem('leadsList', JSON.stringify(leadsList))
        setIsLoading(false)
      })
    console.log(docRef)
    lsLL = localStorage.getItem('leadsList')
    JSON.parse(lsLL)
  }, [isModalOpen,leadRemoved])

  useEffect(() => {
    localStorage.getItem('accessToken') ? setShowLogin(false) : setShowLogin(true)
  }, [showLogin])

  const removeLead= async (key:any)=>{
    await deleteDoc(doc(db, "leads", key));
    setLeadRemoved(!leadRemoved)
  }

  const searchEmail = (values: any) => {
    setIsSearchLoading(true)

    axios.get('https://www.disify.com/api/email/' + valueEmail)
      .then((res) => {
        console.log(res)
        if (!res.data.format) {
          message.warning('Wrong Format')
        }
        res.data.disposable ? setisDisposable(true) : setisDisposable(false)
        res.data.dns ? setIsDNS(true) : setIsDNS(false)
        res.data.whitelist ? setIsWl(true) : setIsWl(false)
        if (res.data.domain) {
          setDomain(res.data.domain)
        }
        setIsSearchLoading(false)
        setShowRes(true)
      })
      .catch((err) => {
        console.log(err)
        message.error(err.message)
      })
  }
  const addLead = async () => {
    setIsLoading(true)
    let lead: any = {
      uid: localStorage.getItem("id"),
      email: valueEmail,
      name: nameLead
    }
    await addDoc(collection(db, "leads"), lead)
      .then((res) => {
        console.log(res)
        setIsLoading(false)
      })
      .catch((err) => {
        message.error(err)

      })
    handleCancel()
  }
  const logOut = () => {
    localStorage.setItem("accessToken", '')
    message.success('You are loged out')
    router.push('/home')
  }
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem('accessToken') || localStorage.getItem('accessToken') == '') {
      router.push('/home')
    }
  })

  const ContainerHeight = 400;


  return (
    <>
    <Layout
        style={isLoading?{filter:"blur(4px)"}:{}}
    >
      <Header
        style={{
          background:'transparent'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',

          }}
        >
          <div style={{
            width: "150px !important"
          }}>

          </div>
          <div>
            <Image
              alt='logo'
              src={Logo}
              width={150}
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button icon={<LogoutOutlined />} onClick={logOut}> Log out</Button>
          </div>

        </div>
      </Header>
      <Content>
        <Row align="middle"
          style={{ textAlign: "center", }}>
          <Col span={24} style={{

            verticalAlign: 'middle',
            marginTop: '2rem',
            marginBottom: '.5rem'
          }}>
            <p>Validate and verify email addresses.<br></br> Check if email address is disposable, temporary, has invalid MX records, detect if its mistyped, inactive or non-existent.</p>
            <Form name="dynamic_rule" onFinish={searchEmail}
              style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
              <Form.Item
                name="email"
                style={{ width: '70%' }}
                getValueFromEvent={(e) => {
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
            {showRes && <Card title={valueEmail} style={{ margin: "0 30px" }}
              extra={
                <Button icon={<UserAddOutlined />} onClick={showModal}>Add Lead</Button>
              }>
              <Card.Grid style={gridStyle}>
                <p>Disposable</p>
                <Badge count={isDisposable ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: '#f5222d' }} />} />
              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <p>DNS</p>
                <Badge count={isDNS ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: '#f5222d' }} />} />

              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <p>Whitelist</p>
                <Badge count={isWl ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: '#f5222d' }} />} />

              </Card.Grid>
              <Card.Grid style={gridStyle}>
                <p>Domain</p>
                <p>{domain}</p>

              </Card.Grid>

            </Card>}
          </Col>
        </Row>
        <PageHeader
          className="site-page-header head-mob"
          title="My Leads"
          // subTitle="Leads that you have saved from previous searchs."
          style={{
            margin: "0 150px",

          }}
        >
          <Row align="middle"
            style={{ textAlign: "center", display: 'flex', justifyContent: 'center' }}>
            <Col span={24} style={{

              verticalAlign: 'middle',
              marginBottom: '5rem',
            }}>
              {leads.length < 1 && <Empty />}
              {leads && <List
              className="list-mob"
                style={{
                  margin: "0 50px ",

                }}>
                <VirtualList
                  data={leads}
                  height={ContainerHeight}
                  itemHeight={47}
                  itemKey="email"
                >
                  {(item:any) => (
                    <>
                      <List.Item >
                        <List.Item.Meta
                          avatar={<UserOutlined />}
                          title={<p>{item.name.stringValue}</p>}
                          description={item.email.stringValue}
                        />
                        <div>
                          <Tooltip title="Remove lead" placement='top'>
                            <Popconfirm placement='bottom' title="Are you sure ?" onConfirm={()=>removeLead(item.key.stringValue)} okText="Yes" cancelText="No">
                              <DeleteOutlined style={{ cursor: 'pointer' }} />
                            </Popconfirm>
                          </Tooltip>
                        </div>
                      </List.Item>
                      {console.log(item)}</>
                  )}
                </VirtualList>
              </List>}
            </Col>
          </Row></PageHeader>
      </Content>
      <Modal 
      style={isLoading?{filter:"blur(4px)",zIndex:"1"}:{}}
      title="Add New Lead" open={isModalOpen} onOk={addLead} onCancel={handleCancel}>
        <Form name="dynamic_rule" onFinish={searchEmail}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <Form.Item
            name="text"
            style={{ width: '70%' }}
            getValueFromEvent={(e) => {
              setNameLead(e.target.value)
            }}
            rules={[
              {
                required: true,
                message: 'Please enter a valid name',
              },
            ]}
            label="Lead Name"
          >
            <Input placeholder="Jeff Steward" type='text' />
          </Form.Item>
        </Form>
    <>{isLoading&&<Spin style={{
      position: "absolute",
      left: "50%",
      transform: "translate(-50%, -40%)",
      zIndex:"7",
      filter:"blur(0) !important"
  }}
  size="large"/>}</>
      </Modal>
    </Layout>
</>
  )
}
