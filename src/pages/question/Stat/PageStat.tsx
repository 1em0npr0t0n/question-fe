import { useRequest } from 'ahooks';
import { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Pagination, Space, Table, Typography } from 'antd';

import LoadAnim from '../../../components/LoadAnim';
import useGetComponentInfo from '../../../hooks/useGetComponentInfo';
import { STAT_PAGE_SIZE_DEFAULT } from '../../../constant';
type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  selectedComponentType: string;
  setSelectedComponentType: (type: string) => void;
};
const { Title } = Typography;
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE_DEFAULT);
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(res) {
        const { total, list } = res;
        setList(list);
        setTotal(total);
      },
    },
  );
  const { componentList } = useGetComponentInfo();
  const tableColumns = [];
  //const columns = componentList
  const banTypeColumns = ['questionTitle', 'questionInfo', 'questionParagraph'];
  //构建联动表头
  for (const c of componentList) {
    if (banTypeColumns.findIndex(type => type === c.type) >= 0) continue;
    tableColumns.push({
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(c.fe_id);
            setSelectedComponentType(c.type);
          }}
        >
          <span style={{ color: c.fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {c.props.title || c.title}
          </span>
        </div>
      ),
      dataIndex: c.fe_id,
    });
  }

  const dataSource = list.map((v: any) => ({ ...v, key: v._id }));

  return (
    <div>
      <Title level={3}>
        <Space>
          <span>答卷总数</span>
          <span>{!loading && total}</span>
        </Space>
      </Title>
      {loading && <LoadAnim />}
      {!loading && (
        <Table dataSource={dataSource} columns={tableColumns} pagination={false}></Table>
      )}
      {!loading && (
        <Pagination
          align="end"
          total={total}
          current={page}
          pageSize={pageSize}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      )}
    </div>
  );
};
export default PageStat;
