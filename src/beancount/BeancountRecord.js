import { useState, useRef } from "react";
// import { Form, Button, Textarea, Tag, Input } from "@arco-design/mobile-react";
import { CalendarPicker, Form, Button, TextArea as Textarea, Tag, Input, Space } from 'antd-mobile';
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
    const dateFormatOption = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    const [dayDate, setDayDate] = useState(new Date().toLocaleString(undefined, dateFormatOption).replace(/\//g, '-'));
    const [dateVisible, setDateVisible] = useState(false);
    const initRecord = {
        'date': dayDate,
        // 'account': ['Assets:Wechat', '钱包'],
        // 'expense': ['Expenses:Family', 'Father'],
        'payee': '', //商户
        'money': '0',
        'desc': '-',
    };

    const handleSubmit = () => {
        const values = formRef.current.getFieldsValue();
        request.post('/beancount/create', {
            ...values,
            date: dayDate
        }).then(res => {
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
        <h2 style={{ paddingLeft: '16px', }}>记一笔</h2>
        <div>
            <h3 style={{ paddingLeft: '16px', }}>快捷录入模版</h3>
            <Space style={{
                paddingLeft: '16px',
                marginBottom: '16px',
                fontSize: ''
            }}>
                <Tag color="primary" filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Wechat', '钱包'],
                        'payee': '亲属卡',
                        'expense': ['Expenses:Family', 'Father'],
                        'money': '0.00',
                        'desc': '亲属卡',
                    });
                }}>亲属卡</Tag>
                <Tag color="primary" filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Wechat', '钱包'],
                        'expense': ['Expenses:Food', 'Work'],
                        'payee': '美团',
                        'money': '0.00',
                        'desc': '',
                    });
                }}>工作餐</Tag>
                <Tag color="primary" filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Liabilities:Bank', '中国银行:信用卡9435'],
                        'expense': ['Expenses:Life', 'Daily'],
                        'payee': '京东',
                        'money': '0.00',
                        'desc': '',
                    });
                }}>京东</Tag>
                <Tag filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Alipay', '余额宝'],
                        'expense': ['Expenses:Food', 'Drink'],
                        'payee': '喜士多',
                        'money': '0.00',
                        'desc': '买水'
                    });
                }}>喜士多</Tag>
                <Tag filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Wechat', '钱包'],
                        'expense': ['Expenses:Repeat', 'Communication'],
                        'payee': '中国联通',
                        'money': '29.55',
                        'desc': '联通定期自动充值'
                    });
                }}>充值</Tag>
                <Tag filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Alipay', '余额宝'],
                        'expense': [],
                        'payee': '龙哥',
                        'money': '20.00',
                        'desc': '理发',
                    });
                }}>理发</Tag>
                <Tag filleted type="solid" onClick={() => {
                    formRef.current.setFieldsValue({
                        'account': ['Assets:Bank', '招商银行:借记卡8109'],
                        'expense': ['Liabilities:Bank', '中国银行:信用卡9435'],
                        'payee': '中国银行',
                        'money': '0.00',
                        'desc': '信用卡还贷',
                    });
                }}>中国银行信用卡</Tag>
            </Space>
        </div>
        <StyledForm
            initialValues={initRecord}
            ref={formRef}
            onSubmit={onSubmit}
            layout="vertical"
        // onValuesChange={(cv, v) => {
        // }}
        >
            <Form.Item label="">
                <Input
                    value={dayDate}
                    onClick={() => setDateVisible(true)} />
                <CalendarPicker visible={dateVisible} selectionMode='single' value={dayDate} onClose={() => setDateVisible(false)}
                    onMaskClick={() => setDateVisible(false)} onChange={(val) => {
                        setDayDate(new Date(val).toLocaleString(undefined, dateFormatOption).replace(/\//g, '-'));
                    }} />
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
