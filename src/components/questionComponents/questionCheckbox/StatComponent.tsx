import { FC } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { QuestionCheckStatPropsType } from './interface';
/**
 * 柱状图
 * @param param0 统计数据
 * @returns
 */
const StatComponent: FC<QuestionCheckStatPropsType> = ({ stat = [] }) => {
  //const chartPieColor = ['#ff2', '#fea', '#8df', '#db7134ff', '#288', '#4dcc77ff', '#ca80c6ff'];
  //   function getRandomInt(min: number, max: number) {
  //     return Math.floor(Math.random() * (max - min + 1)) + min;
  //   }
  return (
    <>
      <BarChart
        style={{ width: '100%', maxWidth: '300px', maxHeight: '70vh', aspectRatio: 1.618 }}
        layout="vertical"
        responsive
        data={stat}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="category" dataKey="name" width={1} tick={false} />
        <XAxis type="number" />

        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="count"
          fill="#0ba7f0ff"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </>
  );
};
export default StatComponent;
