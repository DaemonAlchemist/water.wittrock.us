import { MinusOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import clsx from 'clsx';
import { range } from 'ts-functional';
import { useLocalStorage } from 'unstateless';
import styles from "./App.module.scss";

function App() {
  const [count, setCount] = useLocalStorage.number("count", 0)();
  const [goal, setGoal] = useLocalStorage.number("goal", 100)();
  const [cup, setCup] = useLocalStorage.number("cup", 8)();

  const cupsNeeded = Math.ceil(goal / cup);

  return <div className={styles.waterTracker}>
    <h1>Water Tracker</h1>

  <div className={styles.cupList}>
    {range(0, cupsNeeded).map((i) => (
      <div key={i} className={clsx([styles.cup, i >= count && styles.empty])}>
        <img src="/plastic-cup.png" alt="water" />
      </div>
    ))}
  </div>

    <div className={styles.count}>
      <p><b>{count * cup} oz</b> of {goal} oz</p>
      <p>{count} cups</p>
    </div>

    <div className={styles.buttons}>
      <Button type="primary" size='large' onClick={() => setCount(count + 1)}><PlusOutlined /> Add cup</Button>
      <Button size='large' onClick={() => setCount(count - 1)}><MinusOutlined /> Remove cup</Button>
      <Button danger size='large' onClick={() => setCount(0)}><UndoOutlined /> Reset</Button>
    </div>

    <div className={styles.setting}>
      <Input size='large' addonBefore="Goal (oz)" value={goal} onChange={(e) => setGoal(Number(e.target.value))} />
    </div>
    <div className={styles.setting}>
      <Input size='large' addonBefore="Cup (oz)" value={cup} onChange={(e) => setCup(Number(e.target.value))} />
    </div>
  </div>;
  
}

export default App
