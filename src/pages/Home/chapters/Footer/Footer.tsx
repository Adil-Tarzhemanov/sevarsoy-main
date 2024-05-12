import styles from "./styles.module.scss";
import { FC } from "react";
import Logo from "../../../../components/Header/components/Logo/Logo.tsx";
import { Link } from "react-scroll";
import classNames from "classnames";
import { useWindowSize } from "../../../../hooks/windowSize";

interface FooterTypeProps {
  marginTop?: boolean;
}

const Footer: FC<FooterTypeProps> = ({ marginTop }) => {
  const windowSize = useWindowSize();

  return (
    <div
      className={classNames(styles.container, {
        [styles.marginTop]: marginTop,
      })}
      id="contacts"
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.connection}>
            <div className={styles.logo}>
              <Logo color="white" width={215} />
            </div>
            <div className={styles.socialMedias}>
              <img
                alt="sm"
                src="/assets/home/footer/telegram.png"
                className={styles.socialMedia}
              />
              <img
                alt="sm"
                src="/assets/home/footer/instagram.png"
                className={styles.socialMedia}
              />
              <img
                alt="sm"
                src="/assets/home/footer/facebook.png"
                className={styles.socialMedia}
              />
            </div>
            <div className={styles.numbers}>
              <p className={styles.number}>+99895 001 11 44</p>
            </div>
          </div>
          {windowSize > 870 && (
            <div className={styles.navigation}>
              <h3 className={styles.head}>Чем заняться?</h3>
              <ul className={styles.list}>
                <li className={styles.listElement}>Гидроаэро-ионотерапия</li>
                <li className={styles.listElement}>Соляная пещера</li>
                <li className={styles.listElement}>Массаж</li>
                <li className={styles.listElement}>Бассейн</li>
              </ul>
            </div>
          )}
          <div className={styles.navigation}>
            <h3 className={styles.head}>О курорте</h3>
            <ul className={styles.list}>
              <Link to="aboutUs" smooth offset={-100} duration={500}>
                <li className={styles.listElement}>О нас</li>
              </Link>
              <Link to="numbers" smooth offset={-100} duration={500}>
                <li className={styles.listElement}>Номера</li>
              </Link>
              <Link to="news" smooth offset={-100} duration={500}>
                <li className={styles.listElement}>Новости</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
