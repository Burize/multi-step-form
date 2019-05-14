import * as React from 'react';
import { block } from 'bem-cn';

import { Button } from 'shared/view/elements';

import { IFormData } from '../../../namespace';
import { osTypes } from '../../..//constants';

import './Overview.scss';

interface IProps {
  values: IFormData;
  isInvalidValues: boolean;
  currentStep: number;
  error?: string;
}

const b = block('overview');

type ICostArgs = Pick<IFormData, 'cpuCores' | 'cpuFrequency' | 'ram' | 'driveType' | 'driveSpace' | 'leasePeriod'>;

function getTotalCost({ cpuCores, cpuFrequency, ram, driveType, driveSpace, leasePeriod }: ICostArgs) {
  const driveConst = (driveType === 'ssd' ? 1.2 : 0.3) * driveSpace;
  const ramCost = 0.1 * ram * 1024;
  const cpuCost = 20 * cpuCores * cpuFrequency;
  return Math.round(leasePeriod * (driveConst + ramCost + cpuCost));
}

class Overview extends React.PureComponent<IProps, {}> {
  public render() {
    const {
      values: {
        domain, postfix, country, cpuCores, cpuFrequency, ram,
        driveType, driveSpace, os, leasePeriod, activeAt, agreement,
      },
      isInvalidValues, error,
    } = this.props;
    const totalCost = getTotalCost({ cpuCores, cpuFrequency, ram, driveType, driveSpace, leasePeriod });
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
          <div className={b('value')}>
            {`${driveType === 'hdd' ? 'HDD' : 'SSD'} ${driveSpace}GB`}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('value')}>
            {`Server OS: ${osTypes[os]}`}
          </div>
        </div>
        <div className={b('row')}>
          <div className={b('value')}>
            {`Lease period: ${leasePeriod}`}
          </div>
          <div className={b('value')}>
            {activeAt && `Activate at: ${activeAt.format('MMMM Do YYYY')}`}
          </div>
        </div>
        <div>
          <div className={b('total-price')}>
            {`Total cost: ${totalCost}`}&#8381;
          </div>
        </div>
        <Button htmlType="submit" block disabled={!agreement || isInvalidValues}>accept</Button>
        {error && <div className={b('error')}>{error}</div>}
      </div>
    );
  }
}

export default Overview;
