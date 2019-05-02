import Input, { TextAreaProps } from 'antd/lib/Input';
import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export default withAntdFormItem<TextAreaProps>(Input.TextArea);
