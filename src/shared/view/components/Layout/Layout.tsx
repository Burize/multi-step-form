import * as React from 'react';
import { block } from 'bem-cn';
import ALayout from 'antd/lib/layout';

const { Header, Footer, Content } = ALayout;

import './Layout.scss';

const b = block('layout');
class Layout extends React.PureComponent {
  public render() {
    const { children } = this.props;
    return (
      <ALayout>
        <Header />
        <Content className={b('content').toString()}>{children}</Content>
        <Footer />
      </ALayout>
    );
  }
}

export default Layout;
