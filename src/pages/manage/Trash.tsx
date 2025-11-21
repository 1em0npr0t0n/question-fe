import React, { FC, useState } from 'react';
import { Typography, Empty, Table, Tag, Button, Space, Modal } from 'antd';
import styles from './Manage.module.scss';
import '@ant-design/v5-patch-for-react-19';
import { DeleteOutlined } from '@ant-design/icons';
const rawQuestionList = [
  {
    _id: '1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '2015年08月04日',
  },
  {
    _id: '2',
    title: '问卷2',
    isPublished: false,
    isStar: false,
    answerCount: 3,
    createAt: '2015年08月03日',
  },
  {
    _id: '3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 12,
    createAt: '2005年01月02日',
  },
];
const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  const [questionList] = useState(rawQuestionList);
  // 记录选中的id集
  const [selectedIds, setSelectedIds] = useState(Array<string>);
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>;
      },
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
    },
    {
      title: '创建日期',
      dataIndex: 'createAt',
    },
  ];
  //删除按钮
  function del() {
    confirm({
      title: '确认删除该问卷？',
      content: '删除后不可找回',
      icon: <DeleteOutlined />,
      onOk: () => {
        alert(`删除 ${JSON.stringify(selectedIds)}`);
      },
    });
  }
  // jsx片段提取为一个变量
  const TableElement = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            console.log('sel', selectedRowKeys);
            setSelectedIds(selectedRowKeys as Array<string>);
          },
        }}
      />
    </>
  );
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>(搜索框)</div>
      </header>
      <nav className={styles.content}>
        {/* {问卷列表} */}
        {questionList.length === 0 && <Empty description="没有数据呀" />}
        {questionList.length > 0 && TableElement}
      </nav>
      <footer className={styles.footer}>分页</footer>
    </>
  );
};
export default Trash;
