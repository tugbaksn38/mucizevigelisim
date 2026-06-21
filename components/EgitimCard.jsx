//src\components\EgitimCard.jsx

"use client";
import Link from "next/link";
import styles from "./EgitimCard.module.css";

export default function EgitimCard({ title, description, href }) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.cardInfo}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </Link>
  );
}