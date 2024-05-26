import React, { useMemo, useRef, useState } from 'react';
// import { Form, Picker, Cell } from "@arco-design/mobile-react";
import { CascadePicker as Picker, Button } from "antd-mobile";

// import { IconAdd } from '@arco-design/mobile-react/esm/icon';

export default function ExpenseItem({
    value = [],
    onChange,
}) {
    const [visible, setVisible] = useState(false);

    const pickerRef = useRef(null);
    const expenseList = useMemo(() => {
        return [{
            label: '家庭成员',
            value: 'Expenses:Family',
            children: [{
                label: '父亲',
                value: 'Father'
            }, {
                label: '母亲',
                value: 'Mother'
            }]
        }, {
            label: '食物',
            value: 'Expenses:Food',
            children: [{
                label: '饮料',
                value: 'Drink'
            }, {
                label: '生活食物',
                value: 'Life'
            }, {
                label: '工作餐',
                value: 'Work'
            }]
        }]
    }, []);

    // const [currencyValue, setCurrencyValue] = useState(['Assets:AliPay', '钱包']);

    return (
        <>
            <Button onClick={() => setVisible(true)}>选择花费</Button>{value.join(':')}
            <Picker ref={pickerRef}
                value={value}
                options={expenseList}
                visible={visible}
                onClose={() => setVisible(false)}
                onConfirm={(val, extend) => {
                    onChange(val);
                }}
            ></Picker >
        </>
    );
}