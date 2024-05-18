import React, { useMemo, useRef } from 'react';
import { Form, Picker, Cell } from "@arco-design/mobile-react";
// import { IconAdd } from '@arco-design/mobile-react/esm/icon';

export default function AccountItem() {
    const pickerRef = useRef(null);
    const currencyList = useMemo(() => {
        return [{
            label: '微信',
            value: 'Assets:Wechat',
            children: [{
                label: '微信-零钱通',
                value: '零钱通'
            }, {
                label: '微信-钱包',
                value: '钱包'
            }]
        }, {
            label: '支付宝',
            value: 'Assets:AliPay',
            children: [{
                label: '支付宝-钱包',
                value: '钱包'
            }, {
                label: '支付宝-余额宝',
                value: '余额宝'

            }]
        }]
    }, []);

    // const [currencyValue, setCurrencyValue] = useState(['Assets:AliPay', '钱包']);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {/* <IconAdd /> */}
            <Form.Item field="account" label="">
                <Picker ref={pickerRef}
                    // value={currencyValue}
                    data={currencyList}
                    cols={2}
                    // onPickerChange={(val, index, data) => {
                    //     console.log(val, index, data);
                    // }}
                    cascade={true} renderLinkedContainer={(_, data) => (
                        <Cell label="扣费账户" showArrow bordered={false} >{data[1]?.label}</Cell>
                    )}></Picker>
            </Form.Item>
        </div>
    );
}