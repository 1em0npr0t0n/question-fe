import { FC, useRef } from 'react';
import styles from './StatHeader.module.scss';
import {
  Button,
  Input,
  InputRef,
  message,
  Popover,
  QRCode,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons';
import useGetPageInfo from '../../../hooks/useGetPageInfo';
const StatHeader: FC = () => {
  const nav = useNavigate();
  const { Title } = Typography;
  const { title, isPublished } = useGetPageInfo();
  const { id } = useParams();
  const urlElemRef = useRef<InputRef>(null);
  /**
   * Clipboard API 复制url
   */
  async function handleCopy() {
    //const elem = urlElemRef.current;
    const textToCopy = urlElemRef.current?.input?.value; // 获取要复制的文本
    if (!textToCopy) {
      return;
    }
    try {
      // 关键：调用 Clipboard API 需要https and localhost环境
      await navigator.clipboard.writeText(textToCopy);
      message.success('复制成功');
    } catch (err) {
      message.error('自动复制失败，请手动复制！');
      // 这里可以提示用户失败原因，如权限不足或非安全上下文
    }
  }
  function genMiddleElement() {
    if (!isPublished) return null;
    const url = `http://localhost:8000/question/${id}`;
    const QRcodeElement = (
      <Space align="center" direction="vertical">
        <QRCode value={url} />
      </Space>
    );
    return (
      <Space>
        <Input value={url} style={{ width: '300px' }} ref={urlElemRef}></Input>
        <Tooltip title="点击复制">
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>
        <Popover placement="bottom" content={QRcodeElement}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    );
  }
  return (
    <div className={styles['header-wrapper']}>
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
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.middle}>{genMiddleElement()}</div>
        <div className={styles.right}>
          <Button
            type="primary"
            onClick={() => {
              nav(`/question/edit/${id}`);
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};
export default StatHeader;
