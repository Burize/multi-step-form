import * as React from 'react';
import { block } from 'bem-cn';

import { isRequired } from 'shared/helpers/forms/validations';

import { ConfigurationForm, Overview } from '../../components';

import { TextInputField, SelectField, TextAreaField } from 'shared/view/form';
import { IFormData, Postfix } from '../../../namespace';

import './DomainConfiguration.scss';

const initialValues: IFormData = {
  domain: 'domain@com',
  postfix: 'com',
  country: 'ru',
  additionalInfo: '',
};

const formNames: { [key in keyof IFormData]: key } = {
  domain: 'domain',
  postfix: 'postfix',
  country: 'country',
  additionalInfo: 'additionalInfo',

};

const postfixOptions: Array<{ value: Postfix, label: string }> = [
  { value: 'com', label: 'com' },
  { value: 'io', label: 'io' },
  { value: 'national', label: 'national' },
];

const countryOptions: Array<{ value: string, label: string }> = [
  { value: 'ru', label: 'Russia' },
  { value: 'us', label: 'Amerika' },
  { value: 'uk', label: 'United Kingdom' },
];
const b = block('domain-configuration');

class DomainConfiguration extends React.PureComponent {
  public render() {
    const { } = this.props;
    return (
      <div className={b()}>
        <ConfigurationForm
          initialValues={initialValues}
        >
          <ConfigurationForm.Result>
            {(values: IFormData, currentStep: number) => <Overview values={values} />}
          </ConfigurationForm.Result>
          <ConfigurationForm.Step>
            <div className={b('field')}>
              <TextInputField
                placeholder="placeholder"
                validate={isRequired}
                name={formNames.domain}
                addonAfter={<SelectField name={formNames.postfix} options={postfixOptions} />}
              />
            </div>
            {(values: IFormData) => (
              <div className={b('field', { hidden: values.postfix !== 'national' })}>
                <SelectField
                  disabled={values.postfix !== 'national'}
                  placeholder="placeholder"
                  validate={isRequired}
                  name={formNames.country}
                  options={countryOptions}
                />
              </div>)}
            <TextAreaField placeholder="some description here" name={formNames.additionalInfo} />
          </ConfigurationForm.Step>
        </ConfigurationForm>
      </div>
    );
  }
}

export default DomainConfiguration;
