import { useRef } from "react";
import { Form, Button, Textarea, Picker, Cell } from "@arco-design/mobile-react";

import AccountItem from "./AccountItem";

const payeeList = [[{
    label: '亲属卡',
    value: 'parents'
}]];


export default function BeancountRecord() {
    // 来源
    // const [fromAccount, setFromAccount] = useState([]);
    // 去向
    // const [toAccount, setToAccount] = useState([]);

    const formRef = useRef(null);
    const handleSubmit = () => {
        console.log('submit');
        formRef.current.form.submit();
    };

    const onSubmit = (values, result) => {
        console.log(values);
        // request.post('/diary/create', values).then(res => {
        //     console.log(res, res.code === 0);
        //     if (res.code === 0) {
        //         formRef.current.form.resetFields();
        //         notify('success', { content: '记录成功' });
        //     }
        // });
    };
    return (<>
        <Form ref={formRef} onSubmit={onSubmit} layout="vertical" onValuesChange={(cv, v) => {
            console.log('change', cv, v);
        }}>
            <span>记一笔</span>
            <Form.Item field="payee" label="" required>
                <Picker cascade={false} data={payeeList} renderLinkedContainer={(_, data) => (
                    <Cell label="付款方" showArrow bordered={false} >{data[0]?.label}</Cell>
                )}></Picker>
            </Form.Item>
            <Form.Item field="desc" label="描述">
                <Textarea></Textarea>
            </Form.Item>
            <AccountItem />
            <Button onClick={handleSubmit}>记一笔</Button>
        </Form>
    </>
    );
}
