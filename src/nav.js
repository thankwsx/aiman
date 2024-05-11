import React, { useState } from 'react';
import { TabBar } from '@arco-design/mobile-react';
import { IconHome, IconSetting, IconShopping, IconFile } from '@arco-design/mobile-react/esm/icon';

const menuMap = new Map([
    [0, 'home'],
    [1, 'diary'],
    [2, 'account'],
    [3, 'settings'],
]);

export default function Nav(props) {
    const onChange = props.onChange || (() => { });
    const defaultMenu = props.defaultMenu || 'home';
    const [activeIndex, setActiveIndex] = useState([...menuMap.values()].indexOf(defaultMenu));

    const handleChange = (index) => {
        setActiveIndex(index);
        onChange(menuMap.get(index));
    };

    const tabs = [
        {
            title: '首页',
            icon: <IconHome />,
        },
        {
            title: '日记',
            icon: <IconFile />,
        },
        {
            title: '记账',
            icon: <IconShopping />,
        },
        // {
        //     title: '设置',
        //     icon: <IconSetting />,
        // },
    ];
    return (
        <TabBar fixed={true} activeIndex={activeIndex} onChange={handleChange}>
            {tabs.map((tab, index) => (
                <TabBar.Item title={tab.title} icon={tab.icon} key={index} />
            ))}
        </TabBar>
    );
}