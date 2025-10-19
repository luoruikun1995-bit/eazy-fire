export const DEFAULT_INFLATION_RATE = 0.03;

export interface FireInput {
  target: number;
  current: number;
  monthlyContribution: number;
  annualBonus: number;
  annualReturnRate: number;
  fireRatio: number;
}

export interface ProjectionPoint {
  label: string;
  nominal: number;
  real: number;
  netWorth: number;
  year: number;
}

export interface FireProjectionResult {
  monthsToTarget: number | null;
  projection: ProjectionPoint[];
}

export function calculateFireProjection(inputs: FireInput): FireProjectionResult {
  const { target, current, monthlyContribution, annualBonus, annualReturnRate, fireRatio } = inputs;

  const monthlyRate = Math.pow(1 + annualReturnRate, 1 / 12) - 1;
  const maxYears = 50;
  const totalMonths = maxYears * 12;

  let balance = current;
  let monthsToTarget: number | null = null;

  // 首先计算达到FIRE目标需要多少时间
  for (let month = 1; month <= totalMonths; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;

    if (month % 12 === 0) {
      balance += annualBonus;
    }

    if (monthsToTarget === null && balance >= target) {
      monthsToTarget = month;
      break;
    }
  }

  // 如果无法在50年内达到目标，返回空投影
  if (monthsToTarget === null) {
    return { monthsToTarget, projection: [] };
  }

  // 从FIRE达成时间点开始计算后续增长
  const fireYears = monthsToTarget / 12;
  const fireInflationFactor = Math.pow(1 + DEFAULT_INFLATION_RATE, fireYears);
  const annualSpending = target * (fireRatio / 100);
  
  const projection: ProjectionPoint[] = [
    {
      label: "0",
      nominal: target,
      real: target / fireInflationFactor,
      netWorth: target / fireInflationFactor,
      year: 0
    }
  ];

  // 从FIRE达成后开始，两种计算：
  // 1. 只有投资回报，不扣除开销（经通胀调整）
  // 2. 投资回报 - 生活开销（扣除开销后净值）
  let postFireBalanceNoExpenses = target; // 不扣开销
  let postFireBalanceWithExpenses = target; // 扣开销
  const projectionYears = 40; // 显示FIRE后40年的增长

  for (let year = 1; year <= projectionYears; year++) {
    // 不扣开销：只有投资回报
    postFireBalanceNoExpenses = postFireBalanceNoExpenses * (1 + annualReturnRate);
    
    // 扣开销：投资回报 - 生活开销
    postFireBalanceWithExpenses = postFireBalanceWithExpenses * (1 + annualReturnRate) - annualSpending;
    
    const totalYearsFromStart = fireYears + year;
    const inflationFactor = Math.pow(1 + DEFAULT_INFLATION_RATE, totalYearsFromStart);
    
    // 如果扣除开销后资产为负，则停止计算该线
    if (postFireBalanceWithExpenses <= 0) {
      postFireBalanceWithExpenses = 0;
    }
    
    projection.push({
      label: year.toString(),
      nominal: postFireBalanceNoExpenses, // 名义资产（不扣开销）
      real: postFireBalanceNoExpenses / inflationFactor, // 经通胀调整（不扣开销）
      netWorth: postFireBalanceWithExpenses / inflationFactor, // 扣除开销后净值
      year
    });
  }

  return { monthsToTarget, projection };
}

export function formatDuration(months: number | null, language: 'CN' | 'EN' = 'CN'): string {
  if (months === null) {
    return language === 'CN' ? "超过 50 年" : "Over 50 years";
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (language === 'CN') {
    if (years === 0) {
      return `${remainingMonths} 个月`;
    }
    if (remainingMonths === 0) {
      return `${years} 年`;
    }
    return `${years} 年 ${remainingMonths} 个月`;
  } else {
    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
}

export function calculateIncomePercentile(
  income: number, 
  percentiles: { p10: number; p20: number; p30: number; p40: number; p50: number; p60: number; p70: number; p80: number; p90: number; p99: number; },
  wealthMapping: Record<string, any>
): string {
  // 优先检查wealthMapping中定义的百分位段
  const availablePercentiles = Object.keys(wealthMapping).filter(key => key !== 'default').sort((a, b) => {
    const aNum = parseInt(a.replace('%+', ''));
    const bNum = parseInt(b.replace('%+', ''));
    return bNum - aNum; // 从高到低排序
  });

  for (const percentile of availablePercentiles) {
    const percentileNum = parseInt(percentile.replace('%+', ''));
    const percentileKey = `p${percentileNum}` as keyof typeof percentiles;
    
    if (percentiles[percentileKey] !== undefined && income >= percentiles[percentileKey]) {
      return percentile;
    }
  }

  return "default";
}
