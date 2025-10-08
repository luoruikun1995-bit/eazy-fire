"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
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

  const handleNumberChange = (setter: (value: number) => void) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value.replace(/[^\d.\-]/g, ""));
      setter(Number.isNaN(value) ? 0 : value);
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

  const horizonLabel = projection[Math.min(projection.length - 1, 40)]?.label ?? "第40年";

  return (
    <main className={styles.main}>
      <motion.section
        className={styles.panel}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.panelContent}>
          <div>
            <p className={styles.sectionTitle}>FIRE 目标设定</p>
            <div className={styles.inputGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="target">
                  目标存款规模（{baseCurrency}）
                </label>
                <input
                  id="target"
                  className={styles.input}
                  type="number"
                  value={target}
                  onChange={handleNumberChange(setTarget)}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "1.75rem" }}>
            <p className={styles.sectionTitle}>现金流与收益假设</p>
            <div className={styles.inputGridAuto}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="current">
                  现有存款（{baseCurrency}）
                </label>
                <input
                  id="current"
                  className={styles.input}
                  type="number"
                  value={current}
                  onChange={handleNumberChange(setCurrent)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="monthly">
                  每月定存（{baseCurrency}）
                </label>
                <input
                  id="monthly"
                  className={styles.input}
                  type="number"
                  value={monthlyContribution}
                  onChange={handleNumberChange(setMonthlyContribution)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="bonus">
                  年终奖定存（{baseCurrency}）
                </label>
                <input
                  id="bonus"
                  className={styles.input}
                  type="number"
                  value={annualBonus}
                  onChange={handleNumberChange(setAnnualBonus)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="return">
                  预期年回报率（%）
                </label>
                <input
                  id="return"
                  className={styles.input}
                  type="number"
                  step="0.1"
                  value={annualReturn}
                  onChange={handleNumberChange(setAnnualReturn)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="fireRatio">
                  FIRE 生活支出占比（%）
                </label>
                <input
                  id="fireRatio"
                  className={styles.input}
                  type="number"
                  step="0.1"
                  value={fireRatio}
                  onChange={handleNumberChange(setFireRatio)}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <div className={styles.highlight}>
              <span className={styles.highlightTitle}>预计达成时间</span>
              <span className={styles.highlightValue}>{formatDuration(monthsToTarget)}</span>
              <span className={styles.highlightSub}>
                假设年化收益 {annualReturn.toFixed(1)}%，通胀 {(
                  DEFAULT_INFLATION_RATE * 100
                ).toFixed(1)}%
              </span>
            </div>

            <div className={styles.chartCard}>
              <h3 style={{ margin: "0 0 1rem", fontSize: "1.1rem" }}>
                本金增值轨迹（至 {horizonLabel}）
              </h3>
              <GrowthChart labels={labels} nominal={nominal} real={real} />
              <div className={styles.tagRow}>
                <span className={styles.tag}>名义金额（{baseCurrency}）</span>
                <span className={styles.tag}>真实购买力（{baseCurrency}）</span>
                <span className={styles.tag}>通胀假设 3%</span>
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
            <span className={styles.highlightTitle}>FIRE 生活预算</span>
            <span className={styles.highlightValue}>{formatterCurrency.format(annualSpending)}</span>
            <span className={styles.highlightSub}>
              月度支出 {formatterCurrency.format(monthlySpending)}
            </span>
          </div>

          <p className={styles.meta}>数据更新时间：{dataLastUpdated}</p>

          <div className={styles.referenceGrid}>
            <motion.div
              className={styles.referenceCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3>欧洲主要国家退休金中位数</h3>
              <div className={styles.referenceList}>
                {europeanPensionMedians.map((item) => (
                  <div key={item.country} className={styles.referenceItem}>
                    <span>{item.country}</span>
                    <span>
                      {formatterCurrency.format(item.monthlyPension)} / 月
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
              <h3>热门 FIRE 城市中级公务员收入</h3>
              <div className={styles.referenceList}>
                {fireCityCivilServiceIncome.map((item) => (
                  <div key={item.city} className={styles.referenceItem}>
                    <span>{item.city}</span>
                    <span>
                      {formatterCurrency.format(item.annualIncome)} / 年
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.aside>
    </main>
  );
}
