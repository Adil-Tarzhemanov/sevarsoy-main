import styles from "./styles.module.scss";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useWindowSize } from "../../hooks/windowSize";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

const MainLayout: FC = () => {
  const windowSize = useWindowSize();

  return (
    <div className={styles.container}>
      {windowSize > 950 ? <Header /> : <BurgerMenu />}
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
export default MainLayout;
