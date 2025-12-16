import Component from '../../components/questionComponents/questionInfo/Component';
import { StoryObj, Meta } from '@storybook/react-webpack5';
const meta = {
  title: 'Question/QuestionInfo',
  component: Component,
  // 可以在这里添加参数、装饰器等
  //   parameters: {
  //     layout: 'centered', // 例如，设置布局
  //   },
  //   tags: ['autodocs'], // 可选，用于自动生成文档
} satisfies Meta<typeof Component>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    // 这里填入你的组件需要的实际 props
    title: '示例标题',
    desc: '问卷描述',
  },
};
