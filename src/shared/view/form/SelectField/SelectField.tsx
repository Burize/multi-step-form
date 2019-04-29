import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import withFormField from 'shared/helpers/forms/withFormField';
import { Select } from 'shared/view/elements';
import { GetProps } from 'shared/types/utils';

type IProps = GetProps<typeof Select> & FieldRenderProps<HTMLSelectElement>;

function SelectField(props: IProps) {
  const { input, meta: { invalid }, ...rest } = props;
  return (
    <Select validateStatus={invalid ? 'error' : ''} {...rest} {...input} />
  );
}

export default withFormField(SelectField);
