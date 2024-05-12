import styles from "./styles.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import { useWindowSize } from "../../hooks/windowSize";
import { Link as NavLink } from "react-router-dom";

interface MenuProps {
  menuActive: boolean;
  items: any;
  setMenuActive: any;
}

const Menu: FC<MenuProps> = ({ items, menuActive, setMenuActive }) => {
  const windowSize = useWindowSize();

  const onProject = () => {
    setMenuActive(false);
    // setActiveModal(true);
  };

  // const [isLanguages, setIsLanguages] = useState(false);
  // const [language, setLanguage] = useState("RU");

  const dropdownRef = useRef(null);

  // const { t, i18n } = useTranslation();

  // const changeLanguage = (language, l) => {
  //   i18n.changeLanguage(language);
  //   setLanguage(l);
  //   setIsLanguages(false);
  // };

  // useEffect(() => {
  //   const handleClick = (event: any) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsLanguages(false);
  //     }
  //   };
  //
  //   document.addEventListener("click", handleClick);
  //
  //   return () => {
  //     document.removeEventListener("click", handleClick);
  //   };
  // }, [dropdownRef]);

  return (
    <div
      className={`${styles.menu} ${menuActive && styles.active}`}
      onClick={() => windowSize > 750 && setMenuActive(false)}
    >
      <div className={styles.blur} />
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.listAndLanguages}>
          <ul className={styles.routerList}>
            {items.map((item: any) => (
              <Link
                to={item.to}
                smooth={true}
                offset={-100}
                duration={500}
                key={item.value}
              >
                <NavLink to="/">
                  <li onClick={() => setMenuActive(false)}>{item.value}</li>
                </NavLink>
              </Link>
            ))}
          </ul>
          {/*<div className={styles.languagesWrapper}>*/}
          {/*  <svg*/}
          {/*    // className={isLanguages ? styles.rotationR : styles.rotationL}*/}
          {/*    focusable="false"*/}
          {/*    aria-hidden="true"*/}
          {/*    viewBox="0 0 24 24"*/}
          {/*    data-testid="LanguageIcon"*/}
          {/*  >*/}
          {/*    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"></path>*/}
          {/*  </svg>*/}

          {/*  <div className={styles.dropdown} ref={dropdownRef}>*/}
          {/*<button*/}
          {/*  className={styles.languages}*/}
          {/*  onClick={() => setIsLanguages((prev) => !prev)}*/}
          {/*>*/}
          {/*  {language}*/}
          {/*</button>*/}
          {/*{isLanguages && <div className={styles.triangle}></div>}*/}
          {/*{isLanguages && (*/}
          {/*  <ul className={styles.languagesList}>*/}
          {/*    {language !== "RU" && (*/}
          {/*      <li*/}
          {/*        className={styles.languageItem}*/}
          {/*        onClick={() => changeLanguage("ru", "RU")}*/}
          {/*      >*/}
          {/*        RU*/}
          {/*      </li>*/}
          {/*    )}*/}
          {/*    {language !== "EN" && (*/}
          {/*      <li*/}
          {/*        className={styles.languageItem}*/}
          {/*        onClick={() => changeLanguage("en", "EN")}*/}
          {/*      >*/}
          {/*        EN*/}
          {/*      </li>*/}
          {/*    )}*/}
          {/*  </ul>*/}
          {/*)}*/}
          {/*</div>*/}
          {/*</div>*/}
        </div>
        {/*<button onClick={onProject} className={styles.order}>*/}
        {/*  zzzzzzz*/}
        {/*  /!*{t("orderProject")}*!/*/}
        {/*</button>*/}
      </div>
    </div>
  );
};
export default Menu;
