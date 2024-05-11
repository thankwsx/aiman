import { TabBar } from '@arco-design/mobile-react';
import { IconHome, IconSetting, IconShopping, IconFile } from '@arco-design/mobile-react/esm/icon';
export default function Nav() {
    const tabs = [
        {
            title: 'Home',
            icon: <IconHome />,
        },
        {
            title: 'Diary',
            icon: <IconFile />,
        },
        {
            title: 'Account',
            icon: <IconShopping />,
        },
        {
            title: 'Settings',
            icon: <IconSetting />,
        },
    ];
    return (
        <TabBar fixed={false}>
            {tabs.map((tab, index) => (
                <TabBar.Item title={tab.title} icon={tab.icon} key={index} />
            ))}
        </TabBar>
    );
}