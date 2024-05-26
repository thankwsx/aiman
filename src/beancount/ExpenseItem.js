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
            }, {
                label: '外婆',
                value: 'Waipo'
            }, {
                label: '老大',
                value: 'Laoda'
            }, {
                label: '老二',
                value: 'Laoer'
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
        }, {
            label: '交通',
            value: 'Expenses:Traffic',
            children: [{
                label: '公共交通',
                value: 'Public'
            }, {
                label: '打车',
                value: 'Car'
            }, {
                label: '停车费',
                value: 'Parking'
            }, {
                label: '洗车费',
                value: 'Carwash'
            }]
        },{
            label: '生活',
            value: 'Expenses:Life',
            children: [{
                label: '日用品',
                value: 'Daily'
            },{
                label: '装修',
                value: 'Zhuangxiu',
            }, {
                label: '宠物',
                value: 'Dog',
            }, {
                label: '休闲',
                value: 'Xiuxian',
            }]
        }, {
            label: '重复性支出',
            value: 'Expenses:Repeat',
            children: [{
                label: '通讯费用',
                value: 'Communication',
            }, {
                label: '公共事业支出',
                value: 'PublicBusiness'
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