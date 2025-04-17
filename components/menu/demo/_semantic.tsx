import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Menu, MenuProps, Segmented } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

type MenuItem = Required<MenuProps>['items'][number];

const locales = {
  cn: {
    root: '根元素',
    item: '条目元素',
    itemContent: '条目内容元素',
    itemIcon: '图标元素',
    'popup.root': '弹出菜单元素(inline 模式不生效)',
    'popup.list': '弹出菜单列表元素(inline 模式不生效)',
    'popup.listItem': '弹出菜单单项元素(inline 模式不生效)',
    'popup.listItemIcon': '弹出菜单条目图标元素(inline 模式不生效)',
    'popup.listItemContent': '弹出菜单条目内容元素(inline 模式不生效)',
    'popup.listTitle': '弹出菜单标题元素(inline 模式不生效)',
    subMenuListTitle: '子菜单标题元素(仅在inline 模式下生效)',
    subMenuList: '子菜单列表元素(仅在inline 模式下生效)',
    subMenuListItem: '子菜单单项元素(仅在inline 模式下生效)',
    subMenuListItemIcon: '子菜单条目图标元素(仅在inline 模式下生效)',
    subMenuListItemContent: '子菜单条目内容元素(仅在inline 模式下生效)',
  },
  en: {
    root: 'Root element',
    item: 'Item element',
    itemContent: 'Item content element',
    itemIcon: 'Icon element',
    'popup.root': 'Popup element(Inline mode has no effect)',
    'popup.list': 'Popup list element(Inline mode has no effect)',
    'popup.listItem': 'Popup item element(Inline mode has no effect)',
    'popup.listItemIcon': 'Popup item icon element(Inline mode has no effect)',
    'popup.listItemContent': 'Popup item content element(Inline mode has no effect)',
    'popup.listTitle': 'Popup title element(Inline mode has no effect)',
    subMenuListTitle: 'Submenu title element(Only effect in inline mode)',
    subMenuList: 'Submenu list element(Only effect in inline mode)',
    subMenuListItem: 'Submenu item element(Only effect in inline mode)',
    subMenuListItemIcon: 'Submenu item icon element(Only effect in inline mode)',
    subMenuListItemContent: 'Submenu item content element(Only effect in inline mode)',
  },
};
const items: MenuItem[] = [
  {
    label: 'Navigation One',
    key: 'mail',
    icon: <MailOutlined />,
  },
  {
    key: 'SubMenu',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1', icon: <MailOutlined /> },
          { key: '2', label: 'Option 2' },
        ],
      },
    ],
  },
];

type ModeType = 'horizontal' | 'vertical' | 'inline';

const Block = (props: any) => {
  const { mode, setMode } = props;
  const divRef = React.useRef<HTMLDivElement>(null);
  const [current, setCurrent] = React.useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div ref={divRef}>
      <Segmented<ModeType>
        options={['horizontal', 'vertical', 'inline']}
        onChange={(value) => setMode(value)}
      />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode={mode}
        items={items}
        styles={{
          popup: {
            root: {
              zIndex: 1,
            },
          },
        }}
        {...props}
        openKeys={['SubMenu']}
        getPopupContainer={() => divRef.current}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  const [mode, setMode] = React.useState<ModeType>('horizontal');

  const semantics = React.useMemo(() => {
    const popupLocale = [
      { name: 'popup.root', desc: locale['popup.root'] },
      { name: 'popup.listTitle', desc: locale['popup.listTitle'] },
      { name: 'popup.list', desc: locale['popup.list'] },
      { name: 'popup.listItem', desc: locale['popup.listItem'] },
      { name: 'popup.listItemIcon', desc: locale['popup.listItemIcon'] },
      { name: 'popup.listItemContent', desc: locale['popup.listItemContent'] },
    ];

    const subMenuLocale = [
      { name: 'subMenuListTitle', desc: locale.subMenuListTitle },
      { name: 'subMenuList', desc: locale.subMenuList },
      { name: 'subMenuListItem', desc: locale.subMenuListItem },
      { name: 'subMenuListItemIcon', desc: locale.subMenuListItemIcon },
      { name: 'subMenuListItemContent', desc: locale.subMenuListItemContent },
    ];

    const baseLocale = [
      { name: 'root', desc: locale.root },
      { name: 'item', desc: locale.item },
      { name: 'itemIcon', desc: locale.itemIcon },
      { name: 'itemContent', desc: locale.itemContent },
    ];

    return [...baseLocale, ...(mode === 'inline' ? subMenuLocale : popupLocale)];
  }, [mode]);

  return (
    <SemanticPreview componentName="Menu" semantics={semantics}>
      <Block mode={mode} setMode={setMode} />
    </SemanticPreview>
  );
};

export default App;
