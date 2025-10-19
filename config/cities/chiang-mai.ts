import type { CityData } from '../types';

/**
 * 城市数据配置文件模板 - 清迈
 * 
 * AI生成指南：
 * 请基于此模板为其他城市生成配置。需要根据目标城市的实际情况调整以下内容：
 * 
 * 1. name: 城市名称，中英文对照，格式为"国家 · 城市"
 * 
 * 2. incomePercentiles: 收入分位数数据（单位：USD年收入）
 *    - single: 单身人士的年收入分位数（10%到99%）
 *    - dink: 丁克夫妻的年收入分位数（双收入无子女）
 *    - two_children: 二孩家庭的年收入分位数（考虑教育和养育成本）
 *    请根据目标城市的工资水平、生活成本进行调整
 * 
 * 3. wealthMapping: 财富等级描述（4个层级）
 *    - "99%+": 富人层级，描述豪华生活方式
 *    - "90%+": 上层中产，描述舒适优质生活
 *    - "70%+": 中产阶层，描述稳定的中等生活
 *    - "default": 工薪阶层，描述基础生活水平
 *    描述需要结合当地住房、交通、教育、医疗等实际情况
 * 
 * 数据来源建议：世界银行数据、当地统计局、工资调查网站、生活成本数据库
 */
export const chiangMaiData: CityData = {
  name: { CN: "泰国 · 清迈", EN: "Thailand · Chiang Mai" },
  incomePercentiles: {
    // 基于清迈实际人均收入3,200美元和数字游民预算调整
    single: { p10: 1800, p20: 2800, p30: 3800, p40: 4800, p50: 6000, p60: 7500, p70: 9500, p80: 12000, p90: 16000, p99: 28000 },
    dink: { p10: 4500, p20: 7000, p30: 9500, p40: 12000, p50: 15000, p60: 18500, p70: 23000, p80: 29000, p90: 38000, p99: 65000 },
    two_children: { p10: 8000, p20: 12000, p30: 16000, p40: 20000, p50: 25000, p60: 30000, p70: 37000, p80: 46000, p90: 60000, p99: 100000 }
  },
  wealthMapping: {
    single: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "清迈山区别墅，私人泳池，俯瞰古城全景。享受顶级泰式按摩，米其林餐厅，私人司机。雨季避暑，旱季出国度假，真正的数字游民贵族生活", 
          EN: "Mountain villa with private pool overlooking ancient city. Premium Thai massage, Michelin dining, private driver. Rainy season retreat, dry season international travel, true digital nomad aristocracy" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "宁曼路精装公寓，摩托车代步，每周夜市美食。国际学校附近，咖啡文化浓厚，经常周末去素贴山或茵他侬国家公园徒步", 
          EN: "Nimman Road luxury condo, motorbike transport, weekly night market feasts. Near international schools, rich coffee culture, weekend hiking at Doi Suthep or Doi Inthanon" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "古城内或周边现代公寓，双条车出行，每月几次泰式按摩。有储蓄能力，偶尔去清莱或拜县短途旅行，享受清迈慢生活", 
          EN: "Modern apartment in or near old city, songthaew transport, monthly Thai massage. Good savings, occasional trips to Chiang Rai or Pai, enjoying Chiang Mai's slow pace" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "合租或小户型，步行+摩托车出行，街头美食为主。精打细算，偶尔去免费寺庙和公园，体验清迈的佛教文化和自然风光", 
          EN: "Shared housing or small unit, walking + motorbike transport, street food focused. Budget-conscious, occasional free temple and park visits, experiencing Buddhist culture and nature" 
        } 
      }
    },
    dink: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "杭东区豪华别墅，双车库，私人花园。两辆进口车，私人厨师，定期去曼谷购物。孩子上顶级国际学校，享受清迈最优质的教育资源", 
          EN: "Hang Dong luxury villa, double garage, private garden. Two imported cars, private chef, regular Bangkok shopping. Children in top international schools, best education in Chiang Mai" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "山甘烹高档联排别墅，一辆车一辆摩托车，经常去清迈周边度假村。孩子上优质国际学校，夫妻都有稳定收入，生活品质很高", 
          EN: "San Kamphaeng upscale townhouse, one car one motorbike, frequent resort trips around Chiang Mai. Children in quality international schools, both partners with stable income, high quality life" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "现代公寓或联排别墅，有车代步，每月几次外出就餐。孩子上私立学校，夫妻工作稳定，偶尔去泰国其他城市旅游", 
          EN: "Modern condo or townhouse, car transport, monthly dining out. Children in private schools, stable jobs, occasional trips to other Thai cities" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "小户型或联排别墅，摩托车出行，以家庭烹饪为主。孩子上公立学校，夫妻收入一般，主要享受清迈的低生活成本优势", 
          EN: "Small unit or townhouse, motorbike transport, mainly home cooking. Children in public schools, modest income, enjoying Chiang Mai's low cost of living advantage" 
        } 
      }
    },
    two_children: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "清迈最豪华的别墅区，私人泳池和花园，保姆和管家。孩子上顶级国际学校（如清迈国际学校），私人司机接送。定期去曼谷或国外度假，享受最奢华的家庭生活", 
          EN: "Chiang Mai's most luxurious villa district, private pool and garden, nanny and housekeeper. Children in top international schools (like CMIS), private driver. Regular Bangkok or international vacations, most luxurious family life" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "大户型别墅或豪华公寓，两辆车，孩子上优质国际学校。家庭月收入稳定，经常去清迈周边的度假村和自然景点，享受高品质的家庭时光", 
          EN: "Large villa or luxury condo, two cars, children in quality international schools. Stable family income, frequent resort and nature trips around Chiang Mai, enjoying high-quality family time" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "三房公寓或联排别墅，有车，孩子上私立学校。家庭收入稳定，偶尔去清迈周边旅游，主要享受清迈的教育资源和相对较低的生活成本", 
          EN: "3-bedroom condo or townhouse, car ownership, children in private schools. Stable family income, occasional trips around Chiang Mai, enjoying educational resources and relatively low living costs" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "两房改三房或小户型，摩托车出行，孩子上公立学校。精打细算，主要依靠清迈的低生活成本优势，偶尔去免费景点和公园，体验清迈的文化和自然魅力", 
          EN: "2-bedroom converted or small unit, motorbike transport, children in public schools. Budget-conscious, relying on Chiang Mai's low cost advantage, occasional free attractions and parks, experiencing cultural and natural charm" 
        } 
      }
    }
  },
  descriptions: [
    {
      author: "项目维护者",
      date: "2024-12-19",
      content: {
        CN: "清迈是数字游民和FIRE人士的热门目的地，拥有宜人的气候、低廉的生活成本和丰富的文化。这里有活跃的外籍人士社区，完善的咖啡文化，以及便利的医疗设施。不过需要注意旱季的空气质量问题。",
        EN: "Chiang Mai is a popular destination for digital nomads and FIRE enthusiasts, featuring pleasant climate, low cost of living, and rich culture. It has an active expat community, thriving coffee culture, and convenient medical facilities. However, air quality during dry season can be concerning."
      }
    }
  ]
};