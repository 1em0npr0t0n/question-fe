import { FC } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';
const EditHeader: FC = () => {
  const nav = useNavigate();
  const { Title } = Typography;
  return (
    <header className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                nav(-1);
              }}
            >
              返回
            </Button>
            <Title level={1}>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.middle}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </header>
  );
};
export default EditHeader;
