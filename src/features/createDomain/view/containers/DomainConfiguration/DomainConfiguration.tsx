import * as React from 'react';
import { FORM_ERROR } from 'final-form';
import { connect } from 'react-redux';
import { block } from 'bem-cn';
import { bind } from 'decko';

import {
  TextInputField, SelectField, TextAreaField, NumberInputField,
  SliderField, DatePickerField, CheckboxField,
} from 'shared/view/form';
import { isRequired, validateEmail } from 'shared/helpers/forms/validations';
import { DomainServerError } from 'shared/helpers/error/types';
import { IAppReduxState, ICommunication } from 'shared/types/redux';
import { Spinner, Message } from 'shared/view/elements';
import { DriveType } from 'shared/types/models/domain';

import { ConfigurationForm, Overview } from '../../components';
import { IFormData, IOption } from '../../../namespace';
import {
  postfixOptions, driveOptions, osOptions, formNames,
  initialValues, cpuFrequencyLimitation, ramLimitation,
  driverSpaceLimitations, leasePeriodLimitation,
} from '../../../constants';
import { normalizePhone, leasePeriodFormatter } from '../../../helpers';
import { selectors, actions } from '../../../redux';

import './DomainConfiguration.scss';

const b = block('domain-configuration');

const serverErrors: Record<DomainServerError, Partial<IFormData>> = {
  domain_already_exists: { domain: 'The specified domain name already exists' },
};

function validateFields(values: IFormData): { [key in keyof IFormData]?: string } {
  return {
    [formNames.domain]: isRequired(values.domain),
    [formNames.phone]: isRequired(values.phone),
    [formNames.email]: isRequired(values.email) || validateEmail(values.email),
    [formNames.activeAt]: isRequired(values.activeAt),
  };
}

const unknownError = { [FORM_ERROR]: 'Unknown error' };

interface IStateProps {
  countryOptions: IOption[];
  loadingCountries: ICommunication;
  creatingDomain: ICommunication;
}

type IActionsDispatch = typeof actionsDispatch;

type IProps = IActionsDispatch & IStateProps;
class DomainConfiguration extends React.PureComponent<IProps> {
  private completeSubmission: ((errors?: Partial<IFormData>) => void) | null = null;

  public componentDidMount() {
    this.props.loadCountriesOptions();
  }

  public componentDidUpdate(prevProps: IProps) {
    const nextProps = this.props;

    if (this.completeSubmission && prevProps.creatingDomain.isRequesting && !nextProps.creatingDomain.isRequesting) {

      if (!nextProps.creatingDomain.error) {
        this.completeSubmission();
        Message.success('Domain has registered!', 5);

        return;
      }
      const error = serverErrors[nextProps.creatingDomain.error as DomainServerError];
      this.completeSubmission(error || unknownError);
      Message.error('There are some error ...', 5);
    }
  }
  public render() {

    const { loadingCountries, countryOptions } = this.props;

    const isLoading = loadingCountries.isRequesting;

    return (
      <Spinner spinning={isLoading} size="large" tip="Loading ..." delay={600}>
        <div className={b()}>
          <ConfigurationForm<IFormData>
            initialValues={initialValues}
            validateFields={validateFields}
            onSubmit={this.onSubmit}
          >
            <ConfigurationForm.Result<IFormData>>
              {(values, isInvalidValues, currentStep, error) => (
                <Overview
                  values={values}
                  isInvalidValues={isInvalidValues}
                  currentStep={currentStep}
                  error={error}
                />)}
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
                  autoComplete="new-password" // need for disabling chrome autocomplete
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
      </Spinner>
    );
  }

  @bind
  private onSubmit(values: IFormData) {
    const { agreement, activeAt, ...rest } = values;

    if (activeAt === null) {
      return;
    }
    this.props.createDomain({ ...rest, activeAt });

    return new Promise((res) => {
      this.completeSubmission = res;
    });
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    countryOptions: selectors.selectCountryOptions(state),
    loadingCountries: selectors.selectCommunication(state, 'loadingCountries'),
    creatingDomain: selectors.selectCommunication(state, 'creatingDomain'),
  };
}

const actionsDispatch = {
  createDomain: actions.createDomain,
  loadCountriesOptions: actions.loadCountriesOptions,
};

// TODO: with redux-thunk cannot use object as actionsDispatch
export default connect(mapState, actionsDispatch as any)(DomainConfiguration);
