import React, { useMemo, useRef, useState } from 'react';
// import { Picker, Cell } from "@arco-design/mobile-react";
import { CascadePicker as Picker, Button } from "antd-mobile";
// import { IconAdd } from '@arco-design/mobile-react/esm/icon';

export default function AccountItem({
    value = [],
    onChange
}) {
    const [visible, setVisible] = useState(false);

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
            value: 'Assets:Alipay',
            children: [{
                label: '支付宝-钱包',
                value: '钱包'
            }, {
                label: '支付宝-余额宝',
                value: '余额宝'

            }]
        }, {
            label: '信用卡',
            value: 'Liabilities:Bank',
            children:[{
                label: '中国银行9435',
                value: '中国银行:信用卡9435'
            }, {
                label: '招商银行7441',
                value: '中国银行:信用卡7441'
            }]
        }, {
            label: '银行卡',
            value: 'Assets:Bank',
            children: [{
                label: '招商银行0222',
                value: '招商银行:借记卡0222'
            }, {
                label: '招商银行8109',
                value: '招商银行:借记卡8109'
            }]
        }]
    }, []);

    // const [currencyValue, setCurrencyValue] = useState(['Assets:AliPay', '钱包']);
    return (<>
        <Button onClick={() => setVisible(true)}>选择账户</Button>{value.join(':')}
        <Picker ref={pickerRef}
            // value={currencyValue}
            value={value}
            options={currencyList}
            visible={visible}
            onClose={() => setVisible(false)}
            onConfirm={(val, extend) => {
                console.log(val, extend);
                onChange(val);
            }}
        ></Picker >
    </>
    );
}