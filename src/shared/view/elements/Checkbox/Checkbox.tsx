import Checkbox, { CheckboxProps } from 'antd/lib/checkbox';
import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export { CheckboxProps };
export default withAntdFormItem<CheckboxProps>(Checkbox);
