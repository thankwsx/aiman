import React, { useMemo, useRef, useState } from 'react';
import { Form, Picker, Cell, PickerView } from "@arco-design/mobile-react";
import { IconAdd } from '@arco-design/mobile-react/esm/icon';

export default function AccountItem() {
    const pickerRef = useRef(null);
    const currencyList = useMemo(() => {
        return [[{
            label: '微信',
            value: 'Assets:Wechat:钱包'
        }, {
            label: '支付宝',
            value: 'Assets:AliPay:零钱'
        }], [{
            label: 'RMB',
            value: 'rmb'
        }, {
            label: 'USD',
            value: 'usd'
        }, {
            label: 'HKD',
            value: 'hkd',
        }]]
    }, []);

    const accountList = [[{
        label: '微信',
        value: 'Assets:Wechat:钱包'
    }]];

    const [currencyValue, setCurrencyValue] = useState(['Assets:AliPay:零钱', 'rmb']);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            {JSON.stringify(currencyValue)}
            <IconAdd />
            <Form.Item field="account" label="">
                <Picker cascade={false} data={accountList} renderLinkedContainer={(_, data) => (
                    <Cell label="扣费账户" showArrow bordered={false} >{data[0]?.label}</Cell>
                )}></Picker>
            </Form.Item>
            {/* <Form.Item field="currency" label=""> */}
            <PickerView
                ref={pickerRef}
                value={currencyValue}
                data={currencyList}
                onPickerChange={(val, index, data) => {
                    console.log(val, index, data);
                    setCurrencyValue(val)
                }}
                cascade={false}
            />
            {/* <Picker
                    ref={pickerRef}
                    cascade={false}
                    data={currencyList}
                    mountOnEnter={false}
                    unmountOnExit={false}
                    value={[]}
                    onOk={(val, index, data) => {
                        console.log(pickerRef.current.getAllColumnValues());
                        console.log(pickerRef.current.getColumnValue(0));
                        console.log(val, index, data);
                        // setCurrencyValue(val);
                    }}
                    onPickerChange={(val, index, data) => {
                        console.log(val, index, data);
                        // setCurrencyValue(val);
                    }}
                    renderLinkedContainer={(_, data) => {
                        console.log(_, data);
                        return (<Cell
                            label="货币单位"
                            showArrow
                            bordered={false}
                        >{data[0]?.label}</Cell>);
                    }}
                >
                </Picker> */}
            {/* </Form.Item> */}
        </div>
    );
}