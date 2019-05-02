import Slider, { SliderProps } from 'antd/lib/Slider';
import withAntdFormItem from 'shared/helpers/forms/antdFormItem';

export { SliderProps };
export default withAntdFormItem<SliderProps>(Slider);
