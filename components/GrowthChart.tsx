"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { baseCurrency } from "../config";
import { getTranslation, type Language } from "../lib/translations";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface GrowthChartProps {
  labels: string[];
  nominal: number[];
  real: number[];
  netWorth: number[];
  language: Language;
}

const tooltipFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: baseCurrency,
  maximumFractionDigits: 0
});

export function GrowthChart({ labels, nominal, real, netWorth, language }: GrowthChartProps) {
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: getTranslation(language, 'nominalAssets'),
          data: nominal,
          tension: 0.4,
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 2.5,
          borderDash: [5, 5],
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgba(79, 70, 229, 1)",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          fill: {
            target: "origin",
            above: "rgba(79, 70, 229, 0.2)"
          }
        },
        {
          label: getTranslation(language, 'inflationAdjusted'),
          data: real,
          tension: 0.4,
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgba(16, 185, 129, 1)",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2
        },
        {
          label: getTranslation(language, 'netWorthAfterExpenses'),
          data: netWorth,
          tension: 0.4,
          borderColor: "rgba(239, 68, 68, 1)",
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointBackgroundColor: "rgba(239, 68, 68, 1)",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2
        }
      ]
    };
  }, [labels, nominal, real, netWorth, language]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          labels: {
            color: "rgba(244, 246, 251, 0.8)",
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: "rgba(12, 18, 33, 0.95)",
          borderColor: "rgba(79, 70, 229, 0.6)",
          borderWidth: 1.5,
          titleColor: "#f4f6fb",
          bodyColor: "#f4f6fb",
          displayColors: true,
          cornerRadius: 8,
          titleMarginBottom: 8,
          bodySpacing: 4,
          padding: 12,
          callbacks: {
            title: (context: any) => {
              return `${getTranslation(language, 'time')}${context[0].label}年`;
            },
            label: (context: any) => {
              const value = context.parsed.y;
              return `${context.dataset.label}: ${tooltipFormatter.format(value)}`;
            },
            afterBody: (context: any) => {
              if (context.length >= 2) {
                const nominalValue = context.find((ctx: any) => ctx.dataset.label === getTranslation(language, 'nominalAssets'))?.parsed.y || 0;
                const realValue = context.find((ctx: any) => ctx.dataset.label === getTranslation(language, 'inflationAdjusted'))?.parsed.y || 0;
                const diff = nominalValue - realValue;
                return [``, `${getTranslation(language, 'inflationImpact')}${tooltipFormatter.format(diff)}`];
              }
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: "rgba(244, 246, 251, 0.6)"
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)"
          }
        },
        y: {
          ticks: {
            color: "rgba(244, 246, 251, 0.6)",
            callback: (value: string | number) => {
              if (typeof value === "number") {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                }
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
              }
              return value;
            }
          },
          grid: {
            color: "rgba(255, 255, 255, 0.05)"
          }
        }
      },
      elements: {
        point: {
          hoverRadius: 6,
          hoverBorderWidth: 3
        }
      }
    };
  }, [language]);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GrowthChart;
