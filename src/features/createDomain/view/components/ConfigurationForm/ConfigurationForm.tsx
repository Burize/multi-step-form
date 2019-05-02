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
  children: (values: P, currentStep: number) => React.ReactNode;
}
const b = block('configuration-form');

class Step extends React.Component<IStepProps> { }
class Fields<T, F extends keyof T> extends React.Component<IFieldsProps<T, F>> { }
class Result<T> extends React.Component<IResultProps<T>> { }

class ConfigurationForm<T extends object> extends React.PureComponent<IProps<T>, IState> {
  public static Step = Step;
  public static Fields = Fields;

  public static Result = Result;

  public state: IState = { currentStep: 0 };

  public render() {
    const { children, initialValues } = this.props;

    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const steps: Array<React.ReactElement<IStepProps>> = childrenArray.
      filter(_children => _children.type === Step);
    if (!steps) {
      return null;
    }

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
          onSubmit={this.handleSubmit}
          subscription={{ submitting: true, pristine: true, values: true }}
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
                  <FormSpy subscription={{ values: true }}>
                    {({ values }: { values: T }) => (
                      resultView.props.children(values, this.state.currentStep)
                    )}
                  </FormSpy>
                </div>}
            </form>
          )}
        </Form>
        <div className={b('step-toggles')}>
          <Button.Group>
            <Button onClick={this.togglePrevStep}>prev</Button>
            <Button onClick={this.toggleNextStep}>next</Button>
          </Button.Group>
        </div>
      </div>
    );
  }

  @bind
  private togglePrevStep() {
    this.setState(prevState => ({ currentStep: prevState.currentStep - 1 }));
  }

  @bind
  private toggleNextStep() {
    this.setState(prevState => ({ currentStep: prevState.currentStep + 1 }));
  }

  private renderStep(currentStep: React.ReactElement<IStepProps>) {
    const { props: { children } } = currentStep;

    const stepChildren = Array.isArray(children) ? children : [children];

    return stepChildren.map(child => child.type !== Fields ? child :
      <FormSpyFieldsValues fieldNames={child.props.fields} component={child.props.children} />);
  }

  @bind
  private handleSubmit() {
    console.log('handleSubmit');
  }
}

export default ConfigurationForm;
