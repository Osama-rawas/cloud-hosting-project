import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";
import cloudeHosting from "../../../public/cloud-hosting.png";
import styles from "./hero.module.css";
const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroleft}>
        <h1 className={styles.title}>Cloude Hosting</h1>
        <p className={styles.desc}>
          The best web hosting soultion for your online success
        </p>
        <div className={styles.services}>
          <div className={styles.servicesItem}>
            <TiTick /> Easy to use Control panel
          </div>
          <div className={styles.servicesItem}>
            <TiTick /> Secure Hosting
          </div>
          <div className={styles.servicesItem}>
            <TiTick /> Website Maintenance
          </div>
        </div>
      </div>
      <div>
        <Image src={cloudeHosting} alt="hosting" height={500} width={500} />
      </div>
    </div>
  );
};

export default Hero;
