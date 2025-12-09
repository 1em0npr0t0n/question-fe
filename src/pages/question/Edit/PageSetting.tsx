import { Form, Input } from 'antd';
import { FC, useEffect } from 'react';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { resetPageInfo } from '../../../store/pageInfoReducer';

const { TextArea } = Input;
const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo, form]);
  function handleValuesChange() {
    //console.log('newProps', form.getFieldsValue());
    dispatch(resetPageInfo(form.getFieldsValue()));
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label="问卷标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入标题..." />
      </Form.Item>
      <Form.Item label="问卷描述" name="desc">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item label="css" name="cssCode">
        <TextArea placeholder="输入css样式代码..." />
      </Form.Item>
      <Form.Item label="js" name="jsCode">
        <TextArea placeholder="输入js脚本代码..." />
      </Form.Item>
    </Form>
  );
};
export default PageSetting;
