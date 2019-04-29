import * as React from 'react';
import { block } from 'bem-cn';

import { IFormData } from '../../../namespace';

interface IProps {
  values: IFormData;
}

const b = block('block-name');

class Overview extends React.PureComponent<IProps, {}> {
  public render() {
    const { values: { domain, postfix, country } } = this.props;
    return (
      <div className={b()}>
        <h1>{`${domain}.${postfix === 'national' ? country : postfix}`}</h1>
      </div>
    );
  }
}

export default Overview;
