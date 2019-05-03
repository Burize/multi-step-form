import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import NumberInput, { InputNumberProps } from 'shared/view/elements/NumberInput/NumberInput';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof NumberInput> & {
  meta: FieldRenderProps<HTMLInputElement>['meta'],
  input: FieldRenderProps<HTMLInputElement>['input'] & Pick<InputNumberProps, 'onChange'>,
};

function NumberInputField(props: IProps) {
  const { input, meta: { touched, error }, ...rest } = props;
  return (
    <NumberInput help={touched && error} validateStatus={error && touched ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(NumberInputField);
