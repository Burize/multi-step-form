import * as React from 'react';
import { block } from 'bem-cn';

interface IProps {

}

const b = block('block-name');

class OrderForm extends React.PureComponent<IProps, {}> {
  public render() {
    const { } = this.props;
    return (
      <div className={b()}>OrderForm</div>
    );
  }
}

export default OrderForm;
