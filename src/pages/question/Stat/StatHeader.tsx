import { FC } from 'react';
import styles from './StatHeader.module.scss';
import { Button, Space, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { Title } = Typography;
  const { title } = useGetPageInfo();
  const { id } = useParams();
  return (
    <div className={styles['header-wrapper']}>
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
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.middle}>middle</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`);
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StatHeader;
