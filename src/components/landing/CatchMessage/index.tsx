import s from "./styles.module.scss";

export const CatchMessage = (): JSX.Element => (
  <div className={s.container}>
    <h1 className={s.catch}>やるべきことのみをやる</h1>
    <p className={s.description}>
      tomeit は必要なことだけに集中するためのタスク管理アプリです。
      <br />
      今やるべきことのみに集中し, 淡々とタスクをこなしましょう！
    </p>
  </div>
);

export default CatchMessage;
