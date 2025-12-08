import { FC } from 'react';
import { QuestionCheckboxDefaultProps, QuestionCheckboxPropsType } from './interface';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';

const AttrComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    title,
    isVertical,
    list = [],
    onChange,
    disabled,
  } = { ...QuestionCheckboxDefaultProps, ...props };
  const [form] = Form.useForm();
  function handleValuesChange() {
    if (onChange) {
      const newValues = form.getFieldsValue() as QuestionCheckboxPropsType;
      const { list = [] } = newValues;
      //如何选中值为空则为他赋值
      for (const l of list) {
        if (l.value) {
          continue;
        } else {
          l.value = nanoid(5);
        }
      }
      onChange(newValues);
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      disabled={disabled}
      form={form}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请填写标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ name, key }, index) => {
                  return (
                    <Space align="baseline" key={key}>
                      {/* checkbox是否选中 */}
                      <Form.Item name={[name, 'checked']} valuePropName="checked">
                        <Checkbox />
                      </Form.Item>
                      <Form.Item
                        name={[name, 'label']}
                        rules={[
                          { required: true, message: '请输入内容' },
                          {
                            // 验证所有选项是否有重复
                            validator: (_, text) => {
                              let num = 0;
                              const { list = [] } = form.getFieldsValue();
                              for (const l of list) {
                                if (text === l.label) {
                                  //重复计数
                                  num++;
                                }
                              }
                              if (num === 1) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(new Error('存在重复选项'));
                              }
                            },
                          },
                        ]}
                      >
                        <Input placeholder="请输入选项" />
                      </Form.Item>
                      {index > 0 && (
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
                      add({ value: '', label: '', checked: false });
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
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  );
};
export default AttrComponent;
