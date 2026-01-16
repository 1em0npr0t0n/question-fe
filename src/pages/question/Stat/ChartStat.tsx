import { FC, useEffect, useState } from 'react';
import { getQuestionComponentStatService } from '../../../services/stat';
import { useRequest } from 'ahooks';
import { STATISTICS_GEN_CHART_LIST } from '../../../constant';
import { getComponentConfByType } from '../../../components/questionComponents';
import LoadAnim from '../../../components/LoadAnim';
import { Typography } from 'antd';
type PropsType = {
  questionId: string;
  selectedComponentId: string;
  selectedComponentType: string;
};
const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { questionId, selectedComponentId, selectedComponentType } = props;
  const [componentStat, setComponentStat] = useState([]);
  const { Title } = Typography;
  const { loading, run } = useRequest(
    async (questionId, componentId) => {
      const res = await getQuestionComponentStatService(questionId, componentId);
      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        if (!res.stat) return;
        setComponentStat(res.stat);
      },
    },
  );
  //监听 questionId, selectedComponentId, selectedComponentType
  useEffect(() => {
    if (STATISTICS_GEN_CHART_LIST.find(c => c === selectedComponentType)) {
      run(questionId, selectedComponentId);
    }
  }, [questionId, selectedComponentId, selectedComponentType, run]);
  //生成图表
  function genStatChartElement() {
    if (!selectedComponentId) return;
    const { StatComponent } = getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) return <div></div>;
    return <StatComponent stat={componentStat} />;
  }
  return (
    <>
      <Title level={3} style={{ textAlign: 'center' }}>
        统计相关
      </Title>
      {loading ? <LoadAnim /> : genStatChartElement()}
    </>
  );
};
export default ChartStat;
