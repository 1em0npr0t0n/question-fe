import { FC, useEffect } from 'react';
import { QuestionRadioPropsType } from './interface';
import { Button, Checkbox, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const AttrComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
  const { title, isVertical, value, options = [], onChange, disabled } = props;
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
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select value={value} options={options}></Select>
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name }, index) => {
                  return (
                    <Space key={key} align="baseline">
                      <Form.Item
                        name={[name, 'label']}
                        rules={[{ required: true, message: '请输入选项' }]}
                      >
                        <Input placeholder="请输入文字" />
                      </Form.Item>
                      {index > 1 && (
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(name);
                          }}
                        />
                      )}
                    </Space>
                  );
                })}
                <Form.Item>
                  <Button
                    type="link"
                    onClick={() => {
                      add({ value: '', label: '' });
                    }}
                    icon={<PlusOutlined />}
                    block
                  >
                    添加选项
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form.Item>
      <Form.Item name="isVertical" valuePropName="checked">
        <Checkbox> 竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
