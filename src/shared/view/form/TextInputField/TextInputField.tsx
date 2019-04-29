import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import { TextInput } from 'shared/view/elements';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof TextInput> & FieldRenderProps<HTMLInputElement>;

function TextInputField(props: IProps) {
  const { input, meta: { invalid }, ...rest } = props;
  return (
    <TextInput validateStatus={invalid ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(TextInputField);
