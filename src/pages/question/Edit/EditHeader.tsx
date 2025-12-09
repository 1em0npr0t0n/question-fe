import { ChangeEvent, FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changePageTitle } from '../../../store/pageInfoReducer';
const { Title } = Typography;
const TitleElement: FC = () => {
  const dispatch = useDispatch();
  const { title } = useGetPageInfo();
  const [editTitle, setEditTitle] = useState(false);
  function handleValuesChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim();
    if (newTitle) {
      dispatch(changePageTitle({ title: newTitle }));
    }
  }

  if (editTitle) {
    return (
      <Input
        value={title}
        onChange={handleValuesChange}
        onBlur={() => {
          setEditTitle(false);
        }}
        onPressEnter={() => {
          setEditTitle(false);
        }}
      />
    );
  }
  return (
    <Space>
      <Title level={1}>{title}</Title>
      <Button
        icon={<EditOutlined />}
        type="text"
        onClick={() => {
          setEditTitle(true);
        }}
      ></Button>
    </Space>
  );
};
//编辑页面上部
const EditHeader: FC = () => {
  const nav = useNavigate();

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

            <TitleElement />
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
