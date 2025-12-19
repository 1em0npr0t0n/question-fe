import React, { FC } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button, Space, Divider, message } from 'antd';
import styles from './ManageLayout.module.scss';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { createQusetionService } from '../services/question';
import { useRequest } from 'ahooks';
const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  // const [loading, setLoading] = useState(false);
  // async function handelCreateQuestion() {
  //   setLoading(true);
  //   const data = await createQusetionService();
  //   const { id } = data || {};
  //   if (id) {
  //     nav(`/question/edit/${id}`);
  //     message.success('创建成功');
  //   }
  //   setLoading(false);
  // }

  const {
    loading,
    //error,
    run: handelCreateQuestion,
  } = useRequest(createQusetionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id || result._id}`);
      message.success('创建成功');
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout</p>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handelCreateQuestion}
            disabled={loading}
          >
            创建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => {
              nav('/manage/list');
            }}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => {
              nav('/manage/star');
            }}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => {
              nav('/manage/trash');
            }}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};
export default ManageLayout;
