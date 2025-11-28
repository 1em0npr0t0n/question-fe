import React, { FC, useState } from 'react';
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin } from 'antd';
import styles from './Manage.module.scss';
import '@ant-design/v5-patch-for-react-19';
import ListSearch from '../../components/ListSearch';
import ListPage from '../../components/ListPage';
import { DeleteOutlined } from '@ant-design/icons';
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData';
import { useTitle } from 'ahooks';

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle('回收站');
  //const [questionList] = useState(rawQuestionList);
  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;
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
      dataIndex: 'createdAt',
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
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q: any) => q._id}
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
        <div className={styles.right}>
          {/* 搜索框 */}
          <ListSearch />
        </div>
      </header>
      <nav className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {/* {问卷列表} */}
        {!loading && list.length === 0 && <Empty description="没有数据呀" />}
        {!loading && list.length > 0 && TableElement}
      </nav>
      <footer className={styles.footer}>
        <ListPage total={total} />
      </footer>
    </>
  );
};
export default Trash;
