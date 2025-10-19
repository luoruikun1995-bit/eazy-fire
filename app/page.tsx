"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import styles from "./page.module.css";
import {
  calculateFireProjection,
  formatDuration,
  calculateIncomePercentile,
  DEFAULT_INFLATION_RATE
} from "../lib/finance";
import {
  baseCurrency,
  globalPensionData,
  cities,
  type LifeStyle
} from "../config";
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
  const [selectedCity, setSelectedCity] = useState<string>('chiang_mai');
  const [selectedLifestyle, setSelectedLifestyle] = useState<LifeStyle>('single');

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

  // 根据收入状态获取颜色
  const getStatusColor = (statusText: string): string => {
    const lowerStatus = statusText.toLowerCase();
    
    if (lowerStatus.includes('富人') || lowerStatus.includes('wealthy')) {
      return 'rgb(34, 197, 94)'; // 绿色 - 富裕
    }
    if (lowerStatus.includes('准富人') || lowerStatus.includes('affluent')) {
      return 'rgb(59, 130, 246)'; // 蓝色 - 准富裕
    }
    if (lowerStatus.includes('上层中产') || lowerStatus.includes('upper middle') || lowerStatus.includes('well-off')) {
      return 'rgb(139, 92, 246)'; // 紫色 - 上层中产
    }
    if (lowerStatus.includes('中产') || lowerStatus.includes('middle class')) {
      return 'rgb(245, 158, 11)'; // 橙色 - 中产
    }
    if (lowerStatus.includes('中等收入') || lowerStatus.includes('average income')) {
      return 'rgb(250, 204, 21)'; // 黄色 - 中等收入
    }
    if (lowerStatus.includes('工薪') || lowerStatus.includes('working')) {
      return 'rgb(156, 163, 175)'; // 灰色 - 工薪阶层
    }
    if (lowerStatus.includes('困难') || lowerStatus.includes('struggling') || lowerStatus.includes('低收入') || lowerStatus.includes('low income')) {
      return 'rgb(239, 68, 68)'; // 红色 - 困难/低收入
    }
    
    return 'rgb(156, 163, 175)'; // 默认灰色
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
        annualReturnRate: annualReturn / 100,
        fireRatio
      }),
    [annualBonus, annualReturn, current, monthlyContribution, target, fireRatio]
  );

  const annualSpending = useMemo(
    () => target * (fireRatio / 100),
    [target, fireRatio]
  );
  const monthlySpending = annualSpending / 12;

  // 收入分析计算
  const incomeAnalysis = useMemo(() => {
    const cityData = cities[selectedCity];
    if (!cityData) return null;

    const percentiles = cityData.incomePercentiles[selectedLifestyle];
    const wealthMapping = cityData.wealthMapping[selectedLifestyle];
    const percentile = calculateIncomePercentile(annualSpending, percentiles, wealthMapping);
    const wealthStatus = wealthMapping[percentile] || wealthMapping['default'];

    return {
      cityName: cityData.name[language],
      percentile,
      wealthStatus
    };
  }, [selectedCity, selectedLifestyle, annualSpending, language]);

  // 计算与生活预算最接近的退休金数据，按金额从高到低排序，取前3名
  const closestPensions = useMemo(() => {
    const sortedByCloseness = globalPensionData
      .map(pension => ({
        ...pension,
        difference: Math.abs(pension.annualPension - annualSpending)
      }))
      .sort((a, b) => a.difference - b.difference)
      .slice(0, 3)
      .sort((a, b) => b.annualPension - a.annualPension); // 按金额从高到低排序
    
    return sortedByCloseness;
  }, [annualSpending]);

  const labels = projection.map((point) => point.label);
  const nominal = projection.map((point) => Math.round(point.nominal));
  const real = projection.map((point) => Math.round(point.real));
  const netWorth = projection.map((point) => Math.round(point.netWorth));

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
              <span className={styles.highlightValue}>{formatDuration(monthsToTarget, language)}</span>
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
              <GrowthChart labels={labels} nominal={nominal} real={real} netWorth={netWorth} language={language} />
              <div className={styles.tagRow}>
                <span className={styles.tag}>{getTranslation(language, 'nominalAmount')} ({baseCurrency})</span>
                <span className={styles.tag}>{getTranslation(language, 'realPurchasingPower')} ({baseCurrency})</span>
                <span className={styles.tag}>{getTranslation(language, 'netWorthAfterExpenses')} ({baseCurrency})</span>
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
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div className={styles.highlight}>
              <span className={styles.highlightTitle}>{getTranslation(language, 'fireBudget')}</span>
              <span className={styles.highlightValue}>{formatterCurrency.format(annualSpending)}</span>
              <span className={styles.highlightSub}>
                {getTranslation(language, 'monthlyExpenses')} {formatterCurrency.format(monthlySpending)}
              </span>
            </div>

            <div style={{ minWidth: '200px', flex: 1 }}>
              <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem', color: 'rgba(244, 246, 251, 0.8)' }}>
                {getTranslation(language, 'closestPensionLevels')}
              </h4>
              <div style={{ fontSize: '0.8rem' }}>
                {closestPensions.map((item) => (
                  <div key={item.pensionType.CN} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', color: 'rgba(244, 246, 251, 0.7)' }}>
                    <span>{item.pensionType[language]}</span>
                    <span>{formatterCurrency.format(item.annualPension)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            className={styles.referenceCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3>{getTranslation(language, 'incomeAnalysis')}</h3>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(244, 246, 251, 0.6)', marginBottom: '0.25rem' }}>
                  {getTranslation(language, 'selectCity')}
                </label>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '0.4rem', 
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    color: '#f4f6fb'
                  }}
                >
                  {Object.entries(cities).map(([key, city]) => (
                    <option key={key} value={key}>{city.name[language]}</option>
                  ))}
                </select>
              </div>
              
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(244, 246, 251, 0.6)', marginBottom: '0.25rem' }}>
                  {getTranslation(language, 'selectLifestyle')}
                </label>
                <select 
                  value={selectedLifestyle} 
                  onChange={(e) => setSelectedLifestyle(e.target.value as LifeStyle)}
                  style={{ 
                    width: '100%', 
                    padding: '0.4rem', 
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    color: '#f4f6fb'
                  }}
                >
                  <option value="single">{getTranslation(language, 'single')}</option>
                  <option value="dink">{getTranslation(language, 'dinkCouple')}</option>
                  <option value="two_children">{getTranslation(language, 'twoChildren')}</option>
                </select>
              </div>
            </div>

            {incomeAnalysis && (
              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(244, 246, 251, 0.6)' }}>
                    {getTranslation(language, 'yourIncomeLevel')}：
                  </span>
                  <span style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: getStatusColor(incomeAnalysis.wealthStatus.level[language]), 
                    marginLeft: '0.25rem' 
                  }}>
                    {incomeAnalysis.wealthStatus.level[language]}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(79, 70, 229, 1)', marginLeft: '0.5rem' }}>
                    {incomeAnalysis.percentile}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'rgba(244, 246, 251, 0.7)', lineHeight: '1.4' }}>
                  {incomeAnalysis.wealthStatus.description[language]}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            className={styles.referenceCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: '1rem' }}
          >
            <h3>{getTranslation(language, 'cityDescriptions')}</h3>
            
            {cities[selectedCity]?.descriptions?.map((desc, index) => (
              <div key={index} style={{ 
                background: 'rgba(255, 255, 255, 0.05)', 
                padding: '0.75rem', 
                borderRadius: '6px',
                marginBottom: index < cities[selectedCity].descriptions.length - 1 ? '0.75rem' : '0'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'rgba(244, 246, 251, 0.6)',
                    fontWeight: '500'
                  }}>
                    {desc.author}
                  </span>
                  <span style={{ 
                    fontSize: '0.7rem', 
                    color: 'rgba(244, 246, 251, 0.5)'
                  }}>
                    {desc.date}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: 'rgba(244, 246, 251, 0.8)', 
                  lineHeight: '1.5'
                }}>
                  {desc.content[language]}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.aside>
    </main>
    </>
  );
}
