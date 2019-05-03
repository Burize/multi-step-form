import * as React from 'react';
import { block } from 'bem-cn';

import { isRequired, validateEmail } from 'shared/helpers/forms/validations';
import { makePhoneNormalizer } from 'shared/helpers/forms/normalizes';
import {
  TextInputField, SelectField, TextAreaField, NumberInputField, SliderField, DatePickerField, CheckboxField,
} from 'shared/view/form';

import { ConfigurationForm, Overview } from '../../components';
import { IFormData, DriveType } from '../../../namespace';
import { postfixOptions, countryOptions, driveOptions, osOptions, phonePattern } from '../../../constants';

import './DomainConfiguration.scss';

const normalizePhone = makePhoneNormalizer(phonePattern);

const ramLimitation = {
  min: 1,
  max: 10,
};

const cpuFrequencyLimitation = {
  step: 0.1,
  min: 1.6,
  max: 4.2,
};

function driverSpaceLimitations(driveType: DriveType) {
  return {
    step: driveType === 'hdd' ? 64 : 32,
    min: driveType === 'hdd' ? 256 : 64,
    max: driveType === 'hdd' ? 2048 : 512,
  };
}

const leasePeriodLimitation = {
  min: 1,
  max: 12,
};
const leasePeriodFormatter = (value?: number) => `${value} month${value && value > 1 ? 's' : ''}`;

const initialValues: IFormData = {
  domain: '',
  postfix: 'com',
  country: 'ru',
  additionalInfo: '',
  cpuCores: 3,
  cpuFrequency: 2.4,
  ram: 4,
  driveType: 'hdd',
  driveSpace: 512,
  os: 'linux',
  email: '',
  phone: '',
  leasePeriod: 3,
  activeAt: null,
  agreement: false,
};

const formNames: { [key in keyof IFormData]: key } = {
  domain: 'domain',
  postfix: 'postfix',
  country: 'country',
  additionalInfo: 'additionalInfo',
  cpuCores: 'cpuCores',
  cpuFrequency: 'cpuFrequency',
  ram: 'ram',
  driveType: 'driveType',
  driveSpace: 'driveSpace',
  os: 'os',
  email: 'email',
  phone: 'phone',
  leasePeriod: 'leasePeriod',
  activeAt: 'activeAt',
  agreement: 'agreement',
};

const b = block('domain-configuration');

function validateFields(values: IFormData): { [key in keyof IFormData]?: string } {
  return {
    [formNames.domain]: isRequired(values.domain),
    [formNames.phone]: isRequired(values.phone),
    [formNames.email]: isRequired(values.email) || validateEmail(values.email),
    [formNames.activeAt]: isRequired(values.activeAt),
  };
}

class DomainConfiguration extends React.PureComponent {
  public render() {
    return (
      <div className={b()}>
        <ConfigurationForm<IFormData>
          initialValues={initialValues}
          validateFields={validateFields}
        >
          <ConfigurationForm.Result<IFormData>>
            {(values: IFormData, isInvalidValues: boolean, currentStep: number) => (
              <Overview values={values} isInvalidValues={isInvalidValues} currentStep={currentStep} />)}
          </ConfigurationForm.Result>
          <ConfigurationForm.Step>
            <div className={b('field')}>
              <TextInputField
                placeholder="domain@com"
                name={formNames.domain}
                addonAfter={<SelectField name={formNames.postfix} options={postfixOptions} />}
              />
            </div>
            <ConfigurationForm.Fields fields={[formNames.postfix]}>
              {({ postfix }: IFormData) => (
                <div className={b('field', { visibility: postfix === 'national' ? 'visible' : 'hidden' })}>
                  <SelectField
                    disabled={postfix !== 'national'}
                    placeholder="placeholder"
                    name={formNames.country}
                    options={countryOptions}
                  />
                </div>)}
            </ConfigurationForm.Fields>
            <TextAreaField
              name={formNames.additionalInfo}
              placeholder="some description here"
              autosize={{ minRows: 8, maxRows: 8 }}
              label="Purpose of use"
            />
          </ConfigurationForm.Step>
          <ConfigurationForm.Step>
            <div className={b('group')}>
              <div className={b('row')}>
                <NumberInputField
                  className={b('field', { with: 'label' }).toString()}
                  name={formNames.cpuCores}
                  min={1}
                  max={10}
                  label="CPU"
                />
                <NumberInputField
                  className={b('field', { with: 'label' }).toString()}
                  name={formNames.cpuFrequency}
                  {...cpuFrequencyLimitation}
                  labelCol={{ order: 1 }}
                  label="Ghz"
                  colon={false}
                />
              </div>
              <SliderField name={formNames.cpuFrequency} {...cpuFrequencyLimitation} wrapperCol={{ span: 14 }} />
            </div>
            <div className={b('group')}>
              <div className={b('row')}>
                <NumberInputField
                  className={b('field', { with: 'label' }).toString()}
                  name={formNames.ram}
                  {...ramLimitation}
                  label="RAM"
                />
              </div>
              <SliderField name={formNames.ram} {...ramLimitation} wrapperCol={{ span: 14 }} />
            </div>
            <ConfigurationForm.Fields<IFormData, 'driveType'>
              fields={[formNames.driveType]}
            >
              {({ driveType }) => (
                <div className={b('group')}>
                  <div className={b('row')}>
                    <SelectField
                      className={b('field').toString()}
                      name={formNames.driveType}
                      options={driveOptions}
                    />
                    <NumberInputField
                      className={b('field', { with: 'label' }).toString()}
                      name={formNames.driveSpace}
                      labelCol={{ order: 1 }}
                      label="GB"
                      colon={false}
                      {...driverSpaceLimitations(driveType as DriveType)}
                    />
                  </div>
                  <SliderField
                    name={formNames.driveSpace}
                    wrapperCol={{ span: 14 }}
                    {...driverSpaceLimitations(driveType as DriveType)}
                  />
                </div>
              )}
            </ConfigurationForm.Fields>
            <div className={b('group')}>
              <SelectField
                className={b('field').toString()}
                name={formNames.os}
                options={osOptions}
              />
            </div>
          </ConfigurationForm.Step>
          <ConfigurationForm.Step>
            <TextInputField
              className={b('field', { with: 'label' }).toString()}
              name={formNames.email}
              placeholder="your@email.com"
              label="Email"
            />
            <TextInputField
              className={b('field', { with: 'label' }).toString()}
              name={formNames.phone}
              parse={normalizePhone}
              label="Phone"
            />
            <div className={b('group')}>
              <NumberInputField
                className={b('field', { with: 'label' }).toString()}
                name={formNames.leasePeriod}
                label="Lease period"
                formatter={leasePeriodFormatter}
                colon={false}
                {...leasePeriodLimitation}
              />
              <SliderField
                name={formNames.leasePeriod}
                wrapperCol={{ span: 14 }}
                {...leasePeriodLimitation}
              />
            </div>
            <DatePickerField
              className={b('field', { with: 'label' }).toString()}
              name={formNames.activeAt}
              label="Activate at"
            />
            <CheckboxField
              className={b('field', { with: 'label' }).toString()}
              name={formNames.agreement}
              label="Accept all conditions"
            />
          </ConfigurationForm.Step>
        </ConfigurationForm>
      </div>
    );
  }
}

export default DomainConfiguration;
