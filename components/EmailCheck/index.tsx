import { Button, Form, Input,message, InputNumber,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import React,{use, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

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
    
  const onFinish = (values: any) => {
    console.log(values)
   
  };
  
  return (
    <><Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      
      <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email'}]}>
        <Input />
      </Form.Item>
      
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    <Spin indicator={antIcon} />;
    </>
    
  );
};

export default index;