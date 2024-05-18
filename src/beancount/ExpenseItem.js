import React, { useMemo, useRef } from 'react';
import { Form, Picker, Cell } from "@arco-design/mobile-react";
// import { IconAdd } from '@arco-design/mobile-react/esm/icon';

export default function AccountItem() {
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
                label: '工作餐',
                value: 'Work'
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
            <Form.Item field="expense" label="">
                <Picker ref={pickerRef}
                    // value={currencyValue}
                    data={expenseList}
                    cols={2}
                    // onPickerChange={(val, index, data) => {
                    //     console.log(val, index, data);
                    // }}
                    cascade={true} renderLinkedContainer={(_, data) => (
                        <Cell label="花费类目" showArrow bordered={false} >{data[1]?.label}</Cell>
                    )}></Picker>
            </Form.Item>
        </div>
    );
}