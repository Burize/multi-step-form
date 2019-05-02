import Input, { InputNumberProps } from 'antd/lib/input-number';
import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export { InputNumberProps };
export default withAntdFormItem<InputNumberProps>(Input);
