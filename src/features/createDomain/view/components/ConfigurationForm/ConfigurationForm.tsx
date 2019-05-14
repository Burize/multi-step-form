// tslint:disable:max-classes-per-file
import * as React from 'react';
import { block } from 'bem-cn';
import { bind } from 'decko';
import { Form, FormSpy } from 'react-final-form';

import FormSpyFieldsValues from 'shared/helpers/forms/FormSpyFieldsValues';
import { Steps, Button } from 'shared/view/elements';

import './ConfigurationForm.scss';

interface IProps<T> {
  initialValues: T;
  validateFields?(values: T): { [key in keyof T]?: string };
  onSubmit(values: T): void;
}

interface IState {
  currentStep: number;
}

interface IStepProps {
  children: React.ReactElement[] | React.ReactElement;
}

interface IFieldsProps<T, F extends keyof T> {
  fields: F[];
  children: (values: Record<F, number | string>) => React.ReactElement;
}

interface IResultProps<P> {
  children: (values: P, isInvalidValues: boolean, currentStep: number, error?: string) => React.ReactNode;
}

interface IResultSpyProps<T> {
  values: T;
  hasValidationErrors: boolean;
  hasSubmitErrors: boolean;
  submitting: boolean;
  submitFailed: boolean;
  dirtySinceLastSubmit: boolean;
  submitError?: string;
}

const IResultSpySubscription = {
  values: true,
  hasValidationErrors: true,
  hasSubmitErrors: true,
  submitting: true,
  submitFailed: true,
  dirtySinceLastSubmit: true,
  submitError: true,
};

const b = block('configuration-form');

class Step extends React.Component<IStepProps> { }
class Fields<T, F extends keyof T> extends React.Component<IFieldsProps<T, F>> { }
class Result<T> extends React.Component<IResultProps<T>> { }

class ConfigurationForm<T extends object> extends React.PureComponent<IProps<T>, IState> {
  public static Step = Step;
  public static Fields = Fields;

  public static Result = Result;

  public state: IState = { currentStep: 0 };
  private isFirstStep: boolean = false;
  private isLastStep: boolean = false;

  public render() {
    const { children, initialValues, validateFields: validateForm } = this.props;

    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const steps: Array<React.ReactElement<IStepProps>> = childrenArray.
      filter(_children => _children.type === Step);
    if (!steps) {
      return null;
    }

    this.isFirstStep = this.state.currentStep === 0;
    this.isLastStep = this.state.currentStep === steps.length - 1;

    const resultView: React.ReactElement<IResultProps<T>> | undefined =
      childrenArray.find(_children => _children.type === Result);

    return (
      <div className={b()}>
        <div className={b('steps')}>
          <Steps current={this.state.currentStep}>
            <Steps.Step title={'first'} />
            <Steps.Step title={'second'} />
            <Steps.Step title={'third'} />
          </Steps>
        </div>
        <Form
          initialValues={initialValues}
          validate={validateForm}
          onSubmit={this.props.onSubmit}
          subscription={{}}
        >
          {({ handleSubmit }) => (
            <form className={b('form')} onSubmit={handleSubmit}>
              <div className={b('form-fields')}>
                {steps.map((step, i) => (
                  <div key={i} className={b('fields-group', { step: this.state.currentStep })}>
                    {this.renderStep(step)}
                  </div>))}
              </div>
              {resultView &&
                <div className={b('result-view')}>
                  <FormSpy subscription={IResultSpySubscription}>
                    {(props: IResultSpyProps<T>) => (
                    resultView.props.children(
                        props.values,
                        props.hasValidationErrors || (props.hasSubmitErrors && !props.dirtySinceLastSubmit),
                        this.state.currentStep,
                        props.submitError,
                      ))}
                  </FormSpy>
                </div>}
            </form>
          )}
        </Form>
        <div className={b('step-toggles')}>
          <Button.Group>
            <Button onClick={this.togglePrevStep} disabled={this.isFirstStep}>prev</Button>
            <Button onClick={this.toggleNextStep} disabled={this.isLastStep}>next</Button>
          </Button.Group>
        </div>
      </div>
    );
  }

  @bind
  private togglePrevStep() {
    !this.isFirstStep && this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
  }

  @bind
  private toggleNextStep() {
    !this.isLastStep && this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  }

  private renderStep(currentStep: React.ReactElement<IStepProps>) {
    const { props: { children } } = currentStep;

    const stepChildren = Array.isArray(children) ? children : [children];

    return stepChildren.map((child, i) => child.type !== Fields ? child :
      <FormSpyFieldsValues key={i} fieldNames={child.props.fields} component={child.props.children} />);
  }
}

export default ConfigurationForm;
