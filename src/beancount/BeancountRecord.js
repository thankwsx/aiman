import { useState, useRef } from "react";
import { Form, Button, Textarea, Tag, Input } from "@arco-design/mobile-react";
import { useForm } from "@arco-design/mobile-react/esm/form";

import AccountItem from "./AccountItem";
import ExpenseItem from "./ExpenseItem";

export default function BeancountRecord() {
    // 来源
    // const [fromAccount, setFromAccount] = useState([]);
    // 去向
    // const [toAccount, setToAccount] = useState([]);

    const formRef = useRef(null);
    const [form] = useForm();
    const [record, setRecord] = useState({
        'date': new Date().toISOString().substring(0, 10),
    });

    const handleSubmit = () => {
        console.log('submit');
        formRef.current.form.submit();
    };

    const onSubmit = (values, result) => {
        console.log(values);
    };
    return (<>
        <Form ref={formRef} onSubmit={onSubmit} layout="vertical" onValuesChange={(cv, v) => {
            console.log('change', cv, v);
            setRecord({
                ...record,
                ...cv,
            })
        }}>
            <span>记一笔</span>
            <div>
                <div>快捷录入模版</div>
                <Tag filleted type="solid">亲属卡</Tag>
                <Tag filleted type="solid">工作餐</Tag>
            </div>
            <AccountItem />
            <ExpenseItem />
            <Form.Item field="money" label="">
                <Input
                    prefix={<div className="demo-input-money">¥</div>}
                    placeholder="0.00"
                    type="number"
                    border="none"
                />
            </Form.Item>
            <Form.Item field="desc" label="">
                <Textarea placeholder="消费/交易 描述"></Textarea>
            </Form.Item>
            <Button onClick={handleSubmit}>记一笔</Button>
        </Form>
        <Textarea value={
            `${record['date']} * 
    ${record['account']?.join(':')} -${Number(record['money'])?.toFixed(2)} CNY;
    ${record['expense']?.join(':')} 
            `
        } />
    </>
    );
}
