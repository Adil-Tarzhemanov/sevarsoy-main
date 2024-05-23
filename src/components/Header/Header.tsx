import styles from "./styles.module.scss";
import { FC, useEffect, useState } from "react";
import { headerList } from "../../constants/home/headerList";
import classNames from "classnames";
import Logo from "./components/Logo/Logo.tsx";
import { Link } from "react-scroll";
import { useLocation } from "react-router-dom";
import {useTranslation} from "react-i18next";

const Header: FC = () => {
  const [scrolling, setScrolling] = useState(false);
  const [languageAcive, setLanguageActive] = useState("RU")
  const location = useLocation();

    const { t, i18n } = useTranslation();

    const headerList = [
        {
            title: t("about"),
            to: "aboutUs",
        },
        {
            title: "Чем заняться",
            to: "classes",
        },
        {
            title: "Номера",
            to: "numbers",
        },
        {
            title: "Новости",
            to: "news",
        },
        {
            title: "Контакты",
            to: "contacts",
        },
    ];

    const changeLanguage = (language: any, l: any) => {
        i18n.changeLanguage(language);
        setLanguageActive(l);
    };

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
  return (
    <header
      className={classNames(styles.header, {
        [styles.scrolling]: scrolling,
        [styles.secondHeader]: location.pathname !== "/",
      })}
    >
      <Logo
        color={location.pathname !== "/" && !scrolling ? "#032E5C" : "white"}
        width={135}
      />
      <ul className={styles.list}>
        {headerList.map((element) => (
          <Link
            to={element.to}
            smooth
            offset={-100}
            duration={500}
            key={element.to}
          >
            <li className={styles.listElement}>{element.title}</li>
          </Link>
        ))}
      </ul>
      <div className={styles.languages}>
        <button className={classNames(styles.language, {[styles.active]: languageAcive === "RU"})}
                onClick={() => changeLanguage("RU", "RU")}>
          RU
        </button>
        <button className={classNames(styles.language, {[styles.active]: languageAcive === "UZ"})}
                onClick={() => changeLanguage("UZ", "UZ")}>
          UZ
        </button>
          <button className={classNames(styles.language, {[styles.active]: languageAcive === "EN"})}
                  onClick={() => changeLanguage("EN", "EN")}>
              EN
          </button>
      </div>
    </header>
  );
};
export default Header;
