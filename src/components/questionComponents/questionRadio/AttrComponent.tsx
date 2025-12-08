import { FC, useEffect } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Form, Input } from 'antd';

const AttrComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, isVertical, value, options });
  }, [title, isVertical, value, options, form]);
  function handleValuesChange() {
    if (onChange) {
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ title, isVertical, value, options }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name={title} rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
