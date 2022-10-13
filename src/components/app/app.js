import './app.css';
import 'antd/dist/antd.css';
import { Layout, Tabs } from 'antd';

import SearchWindow from '../search-window';

const { Header, Footer, Content } = Layout;

function App() {
  const itemsTabs = [
    {
      label: 'Search',
      key: 'item-1',
      children: <SearchWindow />,
    },
    { label: 'Rated', key: 'item-2', children: 'Content 2' },
  ];
  return (
    <Layout>
      <Header>Header</Header>
      <Content style={{ padding: '0 36px' }}>
        <div className="tabs-panel">
          <Tabs items={itemsTabs} />
        </div>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
