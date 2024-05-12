import styles from "./styles.module.scss";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import PaymentBlock from "./chapters/PaymentBlock/PaymentBlock";

const Payment: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.head}>Введите данные гостей</h1>
      <button className={styles.backToNumbers} onClick={() => navigate(-1)}>
        К номерам
      </button>
      <PaymentBlock />
    </div>
  );
};
export default Payment;
