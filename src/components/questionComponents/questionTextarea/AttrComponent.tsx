import { Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import { QuestionTextareaPropsType } from './Interface';

const AttrComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    //及时修改选中的form 信息
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder, form]);
  //通过onChange 函数 更新from内的value
  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ title, placeholder }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
