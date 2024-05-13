import { useRef } from 'react';
import { Form, Button, Textarea } from '@arco-design/mobile-react';
import request from '../utils/request';
import notify from '../utils/notify';

export default function DiaryRecord() {
    const formRef = useRef(null);
    const handleSubmit = () => {
        console.log('submit');
        formRef.current.form.submit();
    };
    const onSubmit = (values, result) => {
        console.log(values);
        request.post('/diary/create', values).then(res => {
            console.log(res, res.code === 0);
            if (res.code === 0) {
                formRef.current.form.resetFields();
                notify('success', { content: '记录成功' });
            }
        });
    }
    return (<>
        <Form ref={formRef}
            initialValues={{ content: '' }}
            onSubmit={onSubmit}
            layout='vertical'>
            <span>记录今天的生活</span>
            <Form.Item field="content" label="">
                <Textarea
                    // prefix="记录你的生活"
                    statisticsMaxlength={200}
                    autosize
                    placeholder="随时记录你的生活"
                    border="all"
                    rows={5}
                    renderStatistics={(cur, max) => `${cur}/${max}`}
                /></Form.Item>
            <Button onClick={handleSubmit}>记一笔</Button>
        </Form>
    </>);
}