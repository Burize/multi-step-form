// tslint:disable:max-classes-per-file
import * as React from 'react';
import { block } from 'bem-cn';
import { bind } from 'decko';
import { Form } from 'react-final-form';

import { IFormData } from '../../../namespace';

import './ConfigurationForm.scss';
interface IProps {
  initialValues: IFormData;
}

interface IState {
  currentStep: number;
}

type IStepChildren = React.ReactElement<any> | ((values: any) => React.ReactNode);
interface IStepProps {
  children: IStepChildren[] | IStepChildren;
}

interface IResultProps {
  children: (values: any, currentStep: number) => React.ReactNode;
}
const b = block('configuration-form');

class Step extends React.Component<IStepProps> { }
class Result extends React.Component<IResultProps> { }

class ConfigurationForm extends React.PureComponent<IProps, {}> {
  public static Step: React.ComponentType<IStepProps> = Step;
  public static Result: React.ComponentType<IResultProps> = Result;

  public state: IState = { currentStep: 0 };
  public render() {
    const { children, initialValues } = this.props;

    const childrenArray = React.Children.toArray(children) as React.ReactElement[];
    const currentStep: React.ReactElement<IStepProps> = childrenArray.
      filter(_children => _children.type === Step)[this.state.currentStep];
    if (!currentStep) {
      return null;
    }

    const resultView: React.ReactElement<IResultProps> | undefined =
      childrenArray.find(_children => _children.type === Result);

    return (
      <Form
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, values }) => (
          <div className={b()}>
            <div className={b('form')}>
              <form onSubmit={handleSubmit}>
                {this.renderStep(currentStep, values as IFormData)}
              </form>
            </div>
            {resultView &&
              <div className={b('result-view')}>
                {resultView.props.children(values, this.state.currentStep)}
              </div>}
          </div>
        )}
      </Form>
    );
  }

  private renderStep(currentStep: React.ReactElement<IStepProps>, values: IFormData) {
    const { props: { children: stepChildren } } = currentStep;
    if (Array.isArray(stepChildren)) {
      return stepChildren.map(child => typeof child === 'function' ? child(values) : child);
    }
    return typeof stepChildren === 'function' ? stepChildren(values) : stepChildren;
  }

  @bind
  private handleSubmit() {
    console.log('handleSubmit');
  }
}

export default ConfigurationForm;
