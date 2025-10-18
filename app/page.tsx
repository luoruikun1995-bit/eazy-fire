"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import styles from "./page.module.css";
import {
  calculateFireProjection,
  formatDuration,
  DEFAULT_INFLATION_RATE
} from "../lib/finance";
import {
  baseCurrency,
  dataLastUpdated,
  europeanPensionMedians,
  fireCityCivilServiceIncome
} from "../config/referenceData";
import { saveInputsToStorage, loadInputsFromStorage, saveLanguageToStorage, loadLanguageFromStorage, type FireInputs } from "../lib/storage";
import { getTranslation, type Language } from "../lib/translations";
import LanguageSwitcher from "../components/LanguageSwitcher";

const GrowthChart = dynamic(() => import("../components/GrowthChart"), {
  ssr: false
});

const formatterCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: baseCurrency,
  maximumFractionDigits: 0
});

export default function HomePage() {
  const [target, setTarget] = useState(420000);
  const [current, setCurrent] = useState(72800);
  const [monthlyContribution, setMonthlyContribution] = useState(2240);
  const [annualBonus, setAnnualBonus] = useState(11200);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [fireRatio, setFireRatio] = useState(3.6);
  const [language, setLanguage] = useState<Language>('CN');

  // 从存储加载数据
  useEffect(() => {
    const saved = loadInputsFromStorage();
    if (saved) {
      if (saved.target !== undefined) setTarget(saved.target);
      if (saved.current !== undefined) setCurrent(saved.current);
      if (saved.monthlyContribution !== undefined) setMonthlyContribution(saved.monthlyContribution);
      if (saved.annualBonus !== undefined) setAnnualBonus(saved.annualBonus);
      if (saved.annualReturn !== undefined) setAnnualReturn(saved.annualReturn);
      if (saved.fireRatio !== undefined) setFireRatio(saved.fireRatio);
    }
    
    // 加载语言设置
    const savedLanguage = loadLanguageFromStorage();
    setLanguage(savedLanguage);
  }, []);

  // 保存数据到存储
  useEffect(() => {
    const inputs: FireInputs = {
      target,
      current,
      monthlyContribution,
      annualBonus,
      annualReturn,
      fireRatio
    };
    saveInputsToStorage(inputs);
  }, [target, current, monthlyContribution, annualBonus, annualReturn, fireRatio]);

  // 保存语言设置
  useEffect(() => {
    saveLanguageToStorage(language);
  }, [language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercentage = (value: number): string => {
    return value.toString();
  };

  const handleNumberChange = (setter: (value: number) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const cleanValue = event.target.value.replace(/[^\d.\-]/g, "");
      const numValue = Number(cleanValue);
      setter(Number.isNaN(numValue) ? 0 : numValue);
    };

  const { monthsToTarget, projection } = useMemo(
    () =>
      calculateFireProjection({
        target,
        current,
        monthlyContribution,
        annualBonus,
        annualReturnRate: annualReturn / 100
      }),
    [annualBonus, annualReturn, current, monthlyContribution, target]
  );

  const annualSpending = useMemo(
    () => target * (fireRatio / 100),
    [target, fireRatio]
  );
  const monthlySpending = annualSpending / 12;

  const labels = projection.map((point) => point.label);
  const nominal = projection.map((point) => Math.round(point.nominal));
  const real = projection.map((point) => Math.round(point.real));

  const horizonLabel = projection.length > 0 ? projection[projection.length - 1]?.label ?? "40" : "40";

  return (
    <>
      <LanguageSwitcher 
        currentLanguage={language} 
        onLanguageChange={handleLanguageChange} 
      />
      <main className={styles.main}>
      <motion.section
        className={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.panelContent}>
          <div>
            <p className={styles.sectionTitle}>{getTranslation(language, 'fireGoalSetting')}</p>
            <div className={styles.inputGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="target">
                  {getTranslation(language, 'targetSavingsAmount')} ({baseCurrency})
                </label>
                <input
                  id="target"
                  className={styles.input}
                  type="text"
                  value={formatNumber(target)}
                  onChange={handleNumberChange(setTarget)}
                  placeholder="420,000"
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.75rem" }}>
            <p className={styles.sectionTitle}>{getTranslation(language, 'cashflowAndReturn')}</p>
            <div className={styles.inputGridAuto}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="current">
                  {getTranslation(language, 'currentSavings')} ({baseCurrency})
                </label>
                <input
                  id="current"
                  className={styles.input}
                  type="text"
                  value={formatNumber(current)}
                  onChange={handleNumberChange(setCurrent)}
                  placeholder="72,800"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="monthly">
                  {getTranslation(language, 'monthlyContribution')} ({baseCurrency})
                </label>
                <input
                  id="monthly"
                  className={styles.input}
                  type="text"
                  value={formatNumber(monthlyContribution)}
                  onChange={handleNumberChange(setMonthlyContribution)}
                  placeholder="2,240"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="bonus">
                  {getTranslation(language, 'annualBonusContribution')} ({baseCurrency})
                </label>
                <input
                  id="bonus"
                  className={styles.input}
                  type="text"
                  value={formatNumber(annualBonus)}
                  onChange={handleNumberChange(setAnnualBonus)}
                  placeholder="11,200"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="return">
                  {getTranslation(language, 'expectedAnnualReturn')}
                </label>
                <input
                  id="return"
                  className={styles.input}
                  type="text"
                  value={formatPercentage(annualReturn)}
                  onChange={handleNumberChange(setAnnualReturn)}
                  placeholder="7"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fireRatio">
                  {getTranslation(language, 'fireLifestyleRatio')}
                </label>
                <input
                  id="fireRatio"
                  className={styles.input}
                  type="text"
                  value={formatPercentage(fireRatio)}
                  onChange={handleNumberChange(setFireRatio)}
                  placeholder="3.6"
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <div className={styles.highlight}>
              <span className={styles.highlightTitle}>{getTranslation(language, 'estimatedTimeToTarget')}</span>
              <span className={styles.highlightValue}>{formatDuration(monthsToTarget)}</span>
              <span className={styles.highlightSub}>
                {getTranslation(language, 'assumingAnnualReturn')} {annualReturn.toFixed(1)}%, {getTranslation(language, 'inflation')} {(
                  DEFAULT_INFLATION_RATE * 100
                ).toFixed(1)}%
              </span>
            </div>

            <div className={styles.chartCard}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "1.1rem" }}>
                {getTranslation(language, 'assetGrowthTrajectory')} {horizonLabel}{getTranslation(language, 'toYear')}
              </h3>
              <GrowthChart labels={labels} nominal={nominal} real={real} language={language} />
              <div className={styles.tagRow}>
                <span className={styles.tag}>{getTranslation(language, 'nominalAmount')} ({baseCurrency})</span>
                <span className={styles.tag}>{getTranslation(language, 'realPurchasingPower')} ({baseCurrency})</span>
                <span className={styles.tag}>{getTranslation(language, 'inflationAssumption')}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.aside
        className={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={styles.panelContent}>
          <div className={styles.highlight}>
            <span className={styles.highlightTitle}>{getTranslation(language, 'fireBudget')}</span>
            <span className={styles.highlightValue}>{formatterCurrency.format(annualSpending)}</span>
            <span className={styles.highlightSub}>
              {getTranslation(language, 'monthlyExpenses')} {formatterCurrency.format(monthlySpending)}
            </span>
          </div>

          <p className={styles.meta}>{getTranslation(language, 'dataLastUpdated')}{dataLastUpdated}</p>

          <div className={styles.referenceGrid}>
            <motion.div
              className={styles.referenceCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>{getTranslation(language, 'europeanPensionMedians')}</h3>
              <div className={styles.referenceList}>
                {europeanPensionMedians.map((item) => (
                  <div key={item.country} className={styles.referenceItem}>
                    <span>{item.country}</span>
                    <span>
                      {formatterCurrency.format(item.annualPension)}{getTranslation(language, 'perYear')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.referenceCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3>{getTranslation(language, 'popularFireCitiesCivilServiceIncome')}</h3>
              <div className={styles.referenceList}>
                {fireCityCivilServiceIncome.map((item) => (
                  <div key={item.city} className={styles.referenceItem}>
                    <span>{item.city}</span>
                    <span>
                      {formatterCurrency.format(item.annualIncome)}{getTranslation(language, 'perYear')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </main>
    </>
  );
}
