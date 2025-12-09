import { ChangeEvent, FC, useState } from 'react';
import styles from './EditHeader.module.scss';
import { Button, Input, message, Space, Typography } from 'antd';
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import EditToolbar from './EditToolbar';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
import { useDispatch } from 'react-redux';
import { changePageTitle } from '../../../store/pageInfoReducer';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { updateQuestionService } from '../../../services/question';
import { useDebounceEffect, useKeyPress, useRequest } from 'ahooks';
import { wait } from '@testing-library/user-event/dist/utils';
const { Title } = Typography;
//左上侧标题 修改功能
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
/**
 * 保存按钮 与 自动保存
 * @returns
 */
const SaveButton: FC = () => {
  //保存 pageInfo+componentList 的全部信息
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, { ...pageInfo, componentList });
    },
    { manual: true },
  );
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    event.preventDefault();
    if (!loading) save();
  });
  //自动保存 (非定期，使用useDebounceEffect 可以防抖)
  useDebounceEffect(
    () => {
      if (!loading) save();
    },
    [componentList, pageInfo],
    { wait: 1000 },
  );
  return (
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  );
};
/**
 * 发布按钮
 * @returns
 */
const PublishButton: FC = () => {
  const nav = useNavigate();
  const { componentList } = useGetComponentInfo();
  const pageInfo = useGetPageInfo();
  const { id } = useParams();
  const { loading, run: publish } = useRequest(
    async () => {
      if (!id) return;
      await updateQuestionService(id, {
        ...pageInfo,
        componentList,
        isPublished: true, //问卷发布项
      });
    },
    {
      manual: true,
      onSuccess() {
        message.success('发布成功');
        nav('/question/stat/' + id); //发布成功跳转到统计页面
      },
    },
  );
  return (
    <Button
      type="primary"
      onClick={publish}
      disabled={loading}
      icon={loading ? <LoadingOutlined /> : null}
    >
      fds
    </Button>
  );
};
/**
 * 编辑页面上部
 * @returns
 */
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
            <SaveButton />
            <PublishButton />
          </Space>
        </div>
      </div>
    </header>
  );
};
export default EditHeader;
