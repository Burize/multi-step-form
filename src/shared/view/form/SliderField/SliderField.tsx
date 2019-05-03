import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import Slider, { SliderProps } from 'shared/view/elements/Slider/Slider';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof Slider> & {
  meta: FieldRenderProps<HTMLInputElement>['meta'],
  input: FieldRenderProps<HTMLInputElement>['input'] & Pick<SliderProps, 'onChange'>,
};

function SliderField(props: IProps) {
  const { input, meta: { touched, error }, ...rest } = props;
  return (
    <Slider help={touched && error} validateStatus={error && touched ? 'error' : ''}{...rest} {...input} />
  );
}

export default withFormField(SliderField);
