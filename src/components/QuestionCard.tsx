import React, { FC, useState } from 'react';
import styles from './QuestionCard.module.scss';
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd';
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';
import { useRequest } from 'ahooks';
import { updateQuestionService } from '../services/question';
type PropsType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
};

const { confirm } = Modal;
const QuestionCard: FC<PropsType> = (Props: PropsType) => {
  const { _id, title, isPublished, isStar, answerCount, createdAt } = Props;
  const nav = useNavigate();
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState });
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState); //更新 star state
        message.success('更新star');
      },
    },
  );
  function copy() {
    message.success('执行复制');
  }
  const delInfo = () => {
    confirm({
      title: '确定删除该问卷吗？',
      content: '删除了就再也找不到了',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        message.success('执行删除');
      },
    });
    //alert('删除')
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.left}>
            <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
              {isStarState ? <StarOutlined style={{ color: 'red' }} /> : ''}
              {title}
            </Link>
          </div>
          <div className={styles.right}>
            <Space>
              {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
              <span>答卷:{answerCount}</span>
              <span>{createdAt}</span>
            </Space>
          </div>
        </div>
        <Divider style={{ margin: '12px' }}></Divider>
        <div className={styles['button-c']}>
          <div className={styles['left']}>
            <Space>
              <Button
                icon={<EditOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/edit/${_id}`)}
              >
                编辑问卷
              </Button>
              <Button
                icon={<LineChartOutlined />}
                type="text"
                size="small"
                onClick={() => nav(`/question/stat/${_id}`)}
                disabled={isPublished}
              >
                数据统计
              </Button>
            </Space>
          </div>
          <div className={styles['right']}>
            <Space>
              <Button
                type="text"
                size="small"
                icon={<StarOutlined />}
                onClick={changeStar}
                disabled={changeStarLoading}
              >
                {isStarState ? '取消星标' : '星标'}
              </Button>
              <Popconfirm
                title="是否复制当前问卷？"
                okText="确定"
                cancelText="取消"
                onConfirm={copy}
              >
                <Button type="text" size="small" icon={<CopyOutlined />}>
                  复制
                </Button>
              </Popconfirm>

              <Button type="text" size="small" icon={<DeleteOutlined />} onClick={delInfo}>
                删除
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};
export default QuestionCard;
