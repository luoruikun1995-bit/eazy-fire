import type { CityData } from './types';

export const baseCurrency = "USD";

export { globalPensionData } from './pension';
export type { LifeStyle, CityData, IncomePercentile, WealthStatus } from './types';

// 动态扫描并导入所有城市配置
// 贡献者只需要在 cities/ 目录下添加新文件，系统会自动发现
function importAllCities(): Record<string, CityData> {
  const cities: Record<string, CityData> = {};
  
  try {
    // 使用 webpack 的 require.context 动态导入所有城市文件
    // @ts-ignore - require.context 是webpack提供的功能，TypeScript无法识别
    const cityModules = require.context('./cities', false, /\.ts$/);
    
    cityModules.keys().forEach((fileName: string) => {
      try {
        // 从文件名生成城市key: './chiang-mai.ts' -> 'chiang_mai'
        const cityKey = fileName
          .replace('./', '')
          .replace('.ts', '')
          .replace(/-/g, '_');
        
        const cityModule = cityModules(fileName);
        
        // 自动检测导出的CityData对象（通常命名为 xxxData）
        const exportedData = Object.values(cityModule).find(
          (value: any): value is CityData => 
            value && 
            typeof value === 'object' && 
            'name' in value && 
            'incomePercentiles' in value &&
            'wealthMapping' in value &&
            'descriptions' in value
        );
        
        if (exportedData) {
          cities[cityKey] = exportedData;
          if (typeof window === 'undefined') { // 只在服务端打印
            console.log(`✅ Loaded city: ${cityKey} (${exportedData.name.EN})`);
          }
        } else {
          console.warn(`⚠️ No valid CityData found in ${fileName}`);
        }
      } catch (error) {
        console.error(`❌ Error loading city from ${fileName}:`, error);
      }
    });
  } catch (error) {
    console.error('❌ Error scanning cities directory:', error);
  }
  
  return cities;
}

export const cities = importAllCities();