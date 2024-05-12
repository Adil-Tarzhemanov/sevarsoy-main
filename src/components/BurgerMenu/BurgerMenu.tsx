import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

const BurgerMenu: FC = () => {
  const [menuActive, setMenuActive] = useState(false);

  const items: any = [
    {
      to: "aboutUs",
      value: "О нас",
    },
    {
      to: "classes",
      value: "Чем заняться",
    },
    {
      to: "numbers",
      value: "Номера",
    },
    {
      to: "news",
      value: "Новости",
    },
    {
      to: "Новости",
      value: "Контакты",
    },
  ];

  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);
  // menuActive ? styles.active : ""
  return (
    <div className={styles.mobileHeader}>
      <nav
        className={classNames({
          [styles.location]: location.pathname !== "/",
          [styles.scrolling]: scrolling,
          [styles.active]: menuActive,
        })}
      >
        <img
          src="/assets/home/main/logo.png"
          className={styles.logo}
          alt="logo"
        />
        <div className={styles.btnWrapper}>
          <div
            className={styles.burgerBtn}
            onClick={() => setMenuActive(!menuActive)}
          >
            <span className={styles.span1} />
            <span className={styles.span2} />
            <span className={styles.span3} />
          </div>
        </div>
      </nav>
      <Menu
        items={items}
        menuActive={menuActive}
        setMenuActive={setMenuActive}
      />
    </div>
  );
};
export default BurgerMenu;
