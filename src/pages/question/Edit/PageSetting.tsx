import { Form } from 'antd';
import { FC } from 'react';
import useGetPageInfo from '../../../hooks/useGetPageInfo';

const PageSetting: FC = () => {
  const pageInfo = useGetPageInfo();
  const [form] = Form.useForm();
  function handleValuesChange() {
    console.log('newProps', form.getFieldsValue());
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
    ></Form>
  );
};
export default PageSetting;
