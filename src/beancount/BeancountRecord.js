import { useState, useRef } from "react";
// import { Form, Button, Textarea, Tag, Input } from "@arco-design/mobile-react";
import { Form, Button, TextArea as Textarea, Tag, Input } from 'antd-mobile';
// import { useForm } from "@arco-design/mobile-react/esm/form";
import styled from "styled-components";
import request from '../utils/request';
import notify from '../utils/notify';

import AccountItem from "./AccountItem";
import ExpenseItem from "./ExpenseItem";

const StyledForm = styled(Form)`
    .arco-form-label-item {
        display: none;
    }
    .arco-form-item-control {
        padding: 0;
    }
    .arco-cell-inner {
        height: 1rem;
    }
    .inputmoney {
        .arco-input-wrap {
            height: 1rem;
        }
    }
`;

export default function BeancountRecord() {
    // 来源
    // const [fromAccount, setFromAccount] = useState([]);
    // 去向
    // const [toAccount, setToAccount] = useState([]);

    const formRef = useRef(null);
    // const [form] = Form.useForm();

    const initRecord = {
        'date': new Date().toISOString().substring(0, 10),
        // 'account': ['Assets:Wechat', '钱包'],
        // 'expense': ['Expenses:Family', 'Father'],
        'payee': '商111', //商户
        'money': '0',
        'desc': '-',
    };

    const handleSubmit = () => {
        const values = formRef.current.getFieldsValue();
        console.log(values);
        request.post('/beancount/create', values).then(res => {
            console.log(res, res.code === 0);
            if (res.code === 0) {
                formRef.current.resetFields();
                notify('success', { content: '记录成功' });
            } else {
                notify('error', { content: '记录失败' });
            }
        })
    };

    const onSubmit = (values, result) => {
        console.log(values, result);
    };

    // useEffect(() => {
    //     setRecord(initRecord);
    //     console.log('setfieldsvalue');
    //     form.setFieldsValue(initRecord);
    // }, []);

    return (<>
        <span>记一笔</span>
        <div>
            <div>快捷录入模版</div>
            <Tag filleted type="solid" onClick={() => {
                formRef.current.setFieldsValue({
                    'account': ['Assets:Wechat', '钱包'],
                    'payee': '亲属卡',
                });
            }}>亲属卡</Tag>
            <Tag filleted type="solid">工作餐</Tag>
        </div>
        <StyledForm
            initialValues={initRecord}
            ref={formRef}
            onSubmit={onSubmit}
            layout="vertical"
        // onValuesChange={(cv, v) => {
        // }}
        >
            <Form.Item name="date" label="">
                <Input type="text" disabled />
            </Form.Item>
            <Form.Item name="account" label="" displayType="Picker">
                <AccountItem />
            </Form.Item>
            <Form.Item name="expense" label="" displayType="Picker">
                <ExpenseItem />
            </Form.Item>
            <Form.Item name="money" label="" required>
                <Input
                    className="inputmoney"
                    prefix={<div className="demo-input-money">¥</div>}
                    placeholder="0.00"
                    type="number"
                    border="none"
                />
            </Form.Item>
            <Form.Item name="payee" label="">
                <Textarea placeholder="商户" rows={1}></Textarea>
            </Form.Item>
            <Form.Item name="desc" label="">
                <Textarea placeholder="消费/交易 描述"></Textarea>
            </Form.Item>
            <Button onClick={() => {
                handleSubmit();
            }}>记一笔</Button>
        </StyledForm >
        <Textarea
            rows={5}
        //         value={
        //             `${record['date']} * "${record['payee']?.trim()}" "${record['desc']?.trim()}"
        // ${record['account']?.join(':')} -${Number(record['money'])?.toFixed(2)} CNY;
        // ${record['expense']?.join(':')} 
        //         `
        //         } 
        />
    </>
    );
}
