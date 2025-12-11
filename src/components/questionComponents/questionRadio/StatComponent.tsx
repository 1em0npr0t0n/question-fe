import { FC } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { QuestionRadioStatPropsType } from './interface';
const StatComponent: FC<QuestionRadioStatPropsType> = (props: QuestionRadioStatPropsType) => {
  const { stat } = props;

  const chartPieColor = [
    '#a8a800ff',
    '#c74747ff',
    '#8df',
    '#db7134ff',
    '#288',
    '#4dcc77ff',
    '#ca80c6ff',
    '#8884d8',
  ];
  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //(i.count / sum) * 100
  return (
    <>
      <PieChart
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '300px',
          maxHeight: '300px',
          aspectRatio: 1,
        }}
        responsive
      >
        <Pie
          data={stat}
          dataKey="count"
          cx="50%" //x偏移
          cy="50%" //y偏移
          outerRadius="33%" //大饼直径
          fill="#8884d8"
          isAnimationActive={true}
          //label { name, value, percent }
          label={({ name, percent = 0 }) => `${name}(${(percent * 100).toFixed(1)}%)`}
        >
          {stat.map((d, index) => {
            return (
              <Cell key={index} fill={chartPieColor[getRandomInt(0, chartPieColor.length - 1)]} />
            );
          })}
        </Pie>
        <Tooltip />
      </PieChart>
    </>
  );
};
export default StatComponent;
