import { useRequest } from 'ahooks';
import { FC, useState } from 'react';
import { getQuestionStatListService } from '../../../services/stat';
import { useParams } from 'react-router-dom';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  selectedComponentType: string;
  setSelectedComponentType: (type: string) => void;
};
const { Title } = Typography;
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page: 1, pageSize: 10 });
      return res;
    },
    {
      onSuccess(res) {
        const { total, list } = res;
        setList(list);
        setTotal(total);
      },
    },
  );

  return (
    <div>
      <Title level={3}>答卷总数{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
    </div>
  );
};
export default PageStat;
