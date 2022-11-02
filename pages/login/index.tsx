import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input,message,Row,Col, InputNumber,Spin,Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import HomeBg from "../../assets/svg/homebg.svg"
import Logo from "../../assets/img/logo.png"
import { useState } from 'react';
import{UserAddOutlined,KeyOutlined } from '@ant-design/icons'
import { signInWithEmailAndPassword, getAuth, User } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
const { Header, Footer, Sider, Content } = Layout;
import { app } from '../../firebase-config';

import React from 'react';
import Image from 'next/image';

const index: React.FC = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

  const onFinish = (values: any) => {
    setIsLoading(true)
    const authentication = getAuth(app);
    signInWithEmailAndPassword(authentication, values.email, values.password)
        .then((response) => {
          localStorage.setItem('accessToken', response.user.accessToken) 
          message.success('You are loged in')
          setIsLoading(false)
          router.push('/')
      }).catch((err)=>{
        setIsLoading(false)
        console.log(err.code)
        if(err.code=="auth/user-not-found"){
            message.error('User not found 🔎, please check your email or password');
        }
        else if(err.code =="auth/wrong-password"){
            message.error('Wrong password 🔑'); 
        }else{
            message.error('Wrong credentials 😬, please try again');
        }
      })
  };

  return (
    <>
    <Layout
    style={isLoading?{filter:"blur(4px)"}:{}}>
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
    <Content >
    <Row align="middle" style={{textAlign: "center",
  backgroundImage:`url(${HomeBg.src})`,
  backgroundSize:'contain',
  backgroundPosition:'center',
  backgroundRepeat:'no-repeat',
  height:'325px'}}>
    <Col span={24} style={{
        verticalAlign: 'middle',
        display:'flex',
        justifyContent:'center',
        marginTop:'2rem'
        }}>
    <Form
      name="normal_login"
      className="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" type='email' />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your Password' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" icon={<KeyOutlined/>}>
          Log in
        </Button>
        
        <br></br><br></br>Don't have an account? <Link href='/register'>register here</Link>
      </Form.Item>
    </Form></Col>
    </Row>
    </Content>
    </Layout>
    <>{isLoading&&<Spin style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -40%)",
            filter:"blur(0)"
        }}
        size="large"/>}</>
    </>
    
  );
};

export default index ;