import { FC, useEffect } from 'react';
import { QuestionInfoPropsType } from './interface';
import { Form, Input } from 'antd';
const { TextArea } = Input;
const AttrComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc, form]);
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      layout="vertical"
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc">
        <TextArea />
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
