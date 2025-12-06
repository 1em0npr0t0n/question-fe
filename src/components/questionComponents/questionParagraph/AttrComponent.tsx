import { FC, useEffect } from 'react';
import { QuestionParagraphPropsType } from './interface';
import { Form, Input, Checkbox } from 'antd';
const { TextArea } = Input;
const AttrComponent: FC<QuestionParagraphPropsType> = (props: QuestionParagraphPropsType) => {
  const { text, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter, form]);
  function handleValuesChange() {
    //使用 onChaneg
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  return (
    <Form
      form={form}
      onValuesChange={handleValuesChange}
      layout="vertical"
      initialValues={{ text, isCenter }}
      disabled={disabled}
    >
      <Form.Item label="段落内容" name="text" rules={[{ required: true, message: '请输入内容' }]}>
        <TextArea />
      </Form.Item>
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
