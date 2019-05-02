import * as React from 'react';
import { block } from 'bem-cn';

import { Button } from 'shared/view/elements';

import { IFormData } from '../../../namespace';
import { osTypes } from '../../..//constants';

import './Overview.scss';

interface IProps {
  values: IFormData;
}

const b = block('overview');

class Overview extends React.PureComponent<IProps, {}> {
  public render() {
    const { values: {
      domain, postfix, country, cpuCores, cpuFrequency, ram,
      driveType, driveSpace, os, leasePeriod, activeAt },
    } = this.props;

    console.log('activeAt', activeAt);
    return (
      <div className={b()}>
        <h1 className={b('domain')}>{`${domain}.${postfix === 'national' ? country : postfix}`}</h1>
        <div className={b('row')}>
          <div className={b('value')}>
            {`CPU ${cpuCores} ${cpuFrequency}Ghz`}
          </div>
          <div className={b('value')}>
            {`RAM ${ram}GB`}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('value')}>
            {`${driveType === 'hdd' ? 'HDD' : 'SSD'} ${driveSpace}GB`}
          </div>
          <div className={b('value')}>
            {osTypes[os]}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('value')}>
            {leasePeriod}
          </div>
          <div className={b('value')}>
            {activeAt && activeAt.format('MMMM Do YYYY')}
          </div>
        </div>
        <Button htmlType="submit" size="large">accept</Button>
      </div>
    );
  }
}

export default Overview;
