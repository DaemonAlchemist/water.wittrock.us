import { useLocalStorage } from 'unstateless';
import styles from "./App.module.scss";
import { range } from 'ts-functional';
import clsx from 'clsx';

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
      <h2>{count * cup} oz</h2>
      <p>of {goal} oz</p>
      <p>{count} cups</p>
    </div>

    <div className={styles.buttons}>
      <button onClick={() => setCount(count + 1)}>Add cup</button>
      <button onClick={() => setCount(count - 1)}>Remove cup</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>

    <div className={styles.setting}>
      <input
        type="number"
        value={goal}
        onChange={(e) => setGoal(Number(e.target.value))}
      />
      <label>Goal (oz)</label>
    </div>
    <div className={styles.setting}>
      <input
        type="number"
        value={cup}
        onChange={(e) => setCup(Number(e.target.value))}
      />
      <label>Cup Size (oz)</label>
    </div>
  </div>;
  
}

export default App
