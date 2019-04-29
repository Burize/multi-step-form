import * as React from 'react';

import Input, { InputProps } from 'antd/lib/Input';
import Form, { FormItemProps } from 'antd/lib/Form';

type IProps = InputProps & FormItemProps & React.InputHTMLAttributes<any>;

class TextInput extends React.PureComponent<IProps, {}> {
  public render() {
    const { validateStatus, ...rest } = this.props;
    return (
      <Form.Item validateStatus={validateStatus}>
        <Input {...rest} />
      </Form.Item>
    );
  }
}

export default TextInput;
