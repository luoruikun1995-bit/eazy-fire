export type Language = "CN" | "EN";

export interface Translations {
  // 页面标题和主要内容
  fireGoalSetting: string;
  targetSavingsAmount: string;
  currentSavings: string;
  monthlyContribution: string;
  annualBonusContribution: string;
  expectedAnnualReturn: string;
  fireLifestyleRatio: string;
  
  // 现金流与收益
  cashflowAndReturn: string;
  
  // 预计达成时间
  estimatedTimeToTarget: string;
  assumingAnnualReturn: string;
  inflation: string;
  
  // 图表相关
  assetGrowthTrajectory: string;
  toYear: string;
  postFireGrowth: string;
  nominalAmount: string;
  realPurchasingPower: string;
  inflationAssumption: string;
  
  // 预算相关
  fireBudget: string;
  monthlyExpenses: string;
  
  // 参考数据
  closestPensionLevels: string;
  perYear: string;
  
  // 收入分析
  incomeAnalysis: string;
  selectCity: string;
  selectLifestyle: string;
  yourIncomeLevel: string;
  incomePercentile: string;
  lifestyleDescription: string;
  
  // 生活状态
  single: string;
  dinkCouple: string;
  twoChildren: string;
  
  // 图表标签
  nominalAssets: string;
  inflationAdjusted: string;
  netWorthAfterExpenses: string;
  time: string;
  inflationImpact: string;
  
  // 单位
  currency: string;
  percentage: string;
  
  // 时间单位
  years: string;
  months: string;
  year: string;
  month: string;
  overYears: string;
  
  // 城市描述
  cityDescriptions: string;
}

export const translations: Record<Language, Translations> = {
  CN: {
    fireGoalSetting: "FIRE 目标设定",
    targetSavingsAmount: "目标存款规模",
    currentSavings: "现有存款",
    monthlyContribution: "每月定存",
    annualBonusContribution: "年终奖定存",
    expectedAnnualReturn: "预期年回报率（%）",
    fireLifestyleRatio: "FIRE 生活支出占比（%）",
    
    cashflowAndReturn: "现金流与收益假设",
    
    estimatedTimeToTarget: "预计达成时间",
    assumingAnnualReturn: "假设年化收益",
    inflation: "通胀",
    
    assetGrowthTrajectory: "FIRE后资产增长轨迹（至",
    toYear: "）",
    postFireGrowth: "FIRE后资产增长",
    nominalAmount: "名义金额",
    realPurchasingPower: "真实购买力",
    inflationAssumption: "通胀假设 3%",
    
    fireBudget: "FIRE 生活预算",
    monthlyExpenses: "月度支出",
    
    closestPensionLevels: "相近收入水平",
    perYear: " / 年",
    
    incomeAnalysis: "收入水平分析",
    selectCity: "选择城市",
    selectLifestyle: "生活状态",
    yourIncomeLevel: "您的收入水平",
    incomePercentile: "收入分位数",
    lifestyleDescription: "生活描述",
    
    single: "单身",
    dinkCouple: "丁克夫妻",
    twoChildren: "二孩家庭",
    
    nominalAssets: "名义资产",
    inflationAdjusted: "经通胀调整",
    netWorthAfterExpenses: "扣除开销后净值",
    time: "时间: ",
    inflationImpact: "通胀影响: ",
    
    currency: "",
    percentage: "%",
    
    years: "年",
    months: "个月", 
    year: "年",
    month: "个月",
    overYears: "超过 50 年",
    
    cityDescriptions: "城市描述"
  },
  
  EN: {
    fireGoalSetting: "FIRE Goal Setting",
    targetSavingsAmount: "Target Savings Amount",
    currentSavings: "Current Savings",
    monthlyContribution: "Monthly Contribution",
    annualBonusContribution: "Annual Bonus Contribution",
    expectedAnnualReturn: "Expected Annual Return (%)",
    fireLifestyleRatio: "FIRE Lifestyle Ratio (%)",
    
    cashflowAndReturn: "Cashflow & Return Assumptions",
    
    estimatedTimeToTarget: "Estimated Time to Target",
    assumingAnnualReturn: "Assuming annual return",
    inflation: "inflation",
    
    assetGrowthTrajectory: "Post-FIRE Asset Growth (to",
    toYear: ")",
    postFireGrowth: "Post-FIRE Asset Growth",
    nominalAmount: "Nominal Amount",
    realPurchasingPower: "Real Purchasing Power",
    inflationAssumption: "3% Inflation Assumed",
    
    fireBudget: "FIRE Budget",
    monthlyExpenses: "Monthly expenses",
    
    closestPensionLevels: "Similar Income Levels",
    perYear: " / year",
    
    incomeAnalysis: "Income Level Analysis",
    selectCity: "Select City",
    selectLifestyle: "Lifestyle",
    yourIncomeLevel: "Your Income Level",
    incomePercentile: "Income Percentile",
    lifestyleDescription: "Lifestyle Description",
    
    single: "Single",
    dinkCouple: "DINK Couple",
    twoChildren: "Two Children Family",
    
    nominalAssets: "Nominal Assets",
    inflationAdjusted: "Inflation Adjusted",
    netWorthAfterExpenses: "Net Worth After Expenses",
    time: "Time: ",
    inflationImpact: "Inflation Impact: ",
    
    currency: "",
    percentage: "%",
    
    years: "years",
    months: "months",
    year: "year", 
    month: "month",
    overYears: "Over 50 years",
    
    cityDescriptions: "City Descriptions"
  }
};

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key];
}