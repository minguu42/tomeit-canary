import styles from "./styles.module.scss";

type Props = {
  date: Date;
};

export const ReportsHeading = ({ date }: Props): JSX.Element => (
  <div className={styles.container}>
    <h2>今日のレポート</h2>
    <p>
      {date.toLocaleDateString("ja-JP", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}
    </p>
  </div>
);

const ReportsHeadingContainer = (): JSX.Element => {
  const today = new Date();
  return <ReportsHeading date={today} />;
};

export default ReportsHeadingContainer;
