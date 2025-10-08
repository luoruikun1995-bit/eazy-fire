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
import { baseCurrency } from "../config/referenceData";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

interface GrowthChartProps {
  labels: string[];
  nominal: number[];
  real: number[];
}

const tooltipFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: baseCurrency,
  maximumFractionDigits: 0
});

export function GrowthChart({ labels, nominal, real }: GrowthChartProps) {
  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: "名义资产",
          data: nominal,
          tension: 0.4,
          borderColor: "rgba(79, 70, 229, 1)",
          borderWidth: 2.5,
          pointRadius: 0,
          fill: {
            target: "origin",
            above: "rgba(79, 70, 229, 0.2)"
          }
        },
        {
          label: "经通胀调整",
          data: real,
          tension: 0.4,
          borderColor: "rgba(16, 185, 129, 1)",
          borderWidth: 2,
          pointRadius: 0,
          borderDash: [6, 6]
        }
      ]
    };
  }, [labels, nominal, real]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: "rgba(244, 246, 251, 0.8)",
            usePointStyle: true,
            padding: 16
          }
        },
        tooltip: {
          backgroundColor: "rgba(12, 18, 33, 0.9)",
          borderColor: "rgba(79, 70, 229, 0.45)",
          borderWidth: 1,
          titleColor: "#f4f6fb",
          bodyColor: "#f4f6fb",
          displayColors: false,
          callbacks: {
            label: (context: any) => {
              const value = context.parsed.y;
              return `${context.dataset.label}: ${tooltipFormatter.format(value)}`;
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
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: 320 }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default GrowthChart;
