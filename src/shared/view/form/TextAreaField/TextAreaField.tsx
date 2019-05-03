import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import { TextArea } from 'shared/view/elements';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof TextArea> & FieldRenderProps<HTMLTextAreaElement>;

function TextAreaField(props: IProps) {
  const { input, meta: { touched, error }, ...rest } = props;
  return (
    <TextArea help={touched && error} validateStatus={error && touched ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(TextAreaField);
