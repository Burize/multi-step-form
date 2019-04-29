import * as React from 'react';
import ASelect, { SelectProps } from 'antd/lib/select';
import Form, { FormItemProps } from 'antd/lib/Form';

const Option = ASelect.Option;

interface IOption {
  value: string;
  label: string;
}

interface IOwnProps {
  options: IOption[];
}

type IProps = IOwnProps
  & SelectProps<any>
  & FormItemProps
  & React.InputHTMLAttributes<any>;

class Select extends React.PureComponent<IProps> {
  public render() {
    const { options, ...rest } = this.props;
    return (
      <Form.Item>
        <ASelect {...rest}>
          {options.map(({ value, label }) => <Option key={value} value={value}>{label}</Option>)}
        </ASelect>
      </Form.Item>
    );
  }
}

export default Select;
