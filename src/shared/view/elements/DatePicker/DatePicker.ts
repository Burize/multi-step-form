import DatePicker from 'antd/lib/date-picker';
import { DatePickerProps } from 'antd/lib/date-picker/interface';

import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export { DatePickerProps };
export default withAntdFormItem<DatePickerProps>(DatePicker);
