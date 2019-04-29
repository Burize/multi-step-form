import * as React from 'react';

import Input, { TextAreaProps } from 'antd/lib/Input';
import Form, { FormItemProps } from 'antd/lib/Form';

type IProps = TextAreaProps & FormItemProps & React.InputHTMLAttributes<any>;

class TextArea extends React.PureComponent<IProps, {}> {
  public render() {
    const { validateStatus, ...rest } = this.props;
    return (
      <Form.Item validateStatus={validateStatus}>
        <Input.TextArea {...rest} />
      </Form.Item>
    );
  }
}

export default TextArea;
