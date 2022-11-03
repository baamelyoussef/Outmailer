import { Button, Form, Input,message,Row,Col, InputNumber,Spin,Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import HomeBg from "../../assets/svg/homebg.svg"
import Logo from "../../assets/img/logo.png"
import{UserAddOutlined,KeyOutlined } from '@ant-design/icons'
import React,{use, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { app } from '../../firebase-config';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Header, Footer, Sider, Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const index: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

  const onFinish = (values: any) => {
    console.log(values);
    const authentication = getAuth(app);
    
      createUserWithEmailAndPassword(authentication, values.user.email, values.user.password)
        .then((response:any) => {
          localStorage.setItem('accessToken', response.user.accessToken)
          localStorage.setItem('id', response.user.uid)
          console.log("res",response)
          message.success('Account created successfully')
          setIsLoading(false)
          router.push('/')

      }).catch((err)=>{
        console.log(err.code)
        setIsLoading(false)

        if(err.code=='auth/email-already-in-use'){
            message.error('Email exists already, please try a different one 🙏');
        }else if(err.code=="auth/weak-password"){
            message.error('Weak password 😩');
        }
        else{
            message.error('There seems to be a technical problem 🤔, please try again later');
        }
      })
   
  };
  
  return (
    <>
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
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
      
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email',required:true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'password']} label="Password" rules={[{required:true }]}>
        <Input type="password" />
      </Form.Item>
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" icon={<UserAddOutlined/>}>
          Register
        </Button>
      </Form.Item>
    </Form>
    </Col>
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

export default index;