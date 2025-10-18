"use client";

import { useState, useEffect } from "react";
import styles from "./LanguageSwitcher.module.css";

export type Language = "CN" | "EN";

interface LanguageSwitcherProps {
  onLanguageChange: (language: Language) => void;
  currentLanguage: Language;
}

export function LanguageSwitcher({ onLanguageChange, currentLanguage }: LanguageSwitcherProps) {
  const toggleLanguage = () => {
    const newLanguage: Language = currentLanguage === "CN" ? "EN" : "CN";
    onLanguageChange(newLanguage);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.switcher}
        onClick={toggleLanguage}
        aria-label={`Switch to ${currentLanguage === "CN" ? "English" : "Chinese"}`}
      >
        <span className={`${styles.option} ${currentLanguage === "CN" ? styles.active : ""}`}>
          中文
        </span>
        <span className={styles.separator}>/</span>
        <span className={`${styles.option} ${currentLanguage === "EN" ? styles.active : ""}`}>
          EN
        </span>
      </button>
    </div>
  );
}

export default LanguageSwitcher;