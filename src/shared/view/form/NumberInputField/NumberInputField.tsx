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
  const { input, meta: { invalid }, ...rest } = props;
  return (
    <NumberInput validateStatus={invalid ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(NumberInputField);
