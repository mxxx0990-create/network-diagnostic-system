export interface Device {
  id: number;
  name: string;
  description: string;
}

export interface Symptom {
  id: number;
  device_id: number;
  description: string;
}

export interface Solution {
  id: number;
  symptom_id: number;
  root_cause: string;
  resolution_steps: string[];
}

export const devices: Device[] = [
  { id: 1, name: "Роутер", description: "Таҷҳизоти сатҳи шабакавӣ барои масирёбӣ" },
  { id: 2, name: "Коммутатор", description: "Таҷҳизоти сатҳи каналӣ барои шабакаҳои локалӣ" }
];

export const symptoms: Symptom[] = [
  { id: 1, device_id: 2, description: "Индикатори порт зард мегирад ва мижа мезанад" },
  { id: 2, device_id: 2, description: "Тамоми шабака суст кор мекунад (Broadcast storm)" },
  { id: 3, device_id: 1, description: "Талафоти пакетҳо ҳангоми Ping ба интернети беруна" },
  { id: 4, device_id: 1, description: "Протсессор (CPU) 100% сарборӣ дорад" }
];


export const solutions: Solution[] = [
  {
    id: 1,
    symptom_id: 1,
    root_cause: "Мушкилоти Spanning Tree Protocol (STP) - Пайдоиши ҳалқаи мантиқӣ ё ҳолати басташавии порт.",
    resolution_steps: [
      "Ба консоли коммутатор ворид шавед.",
      "Фармони 'show spanning-tree' -ро иҷро кунед.",
      "Портҳои дар ҳолати BLK (Blocked) қарордоштаро пайдо кунед.",
      "Барои портҳои корбарон 'spanning-tree portfast' -ро фаъол кунед."
    ]
  },
  {
    id: 2,
    symptom_id: 2,
    root_cause: "Ҳалқаи физикӣ (Loop) дар шабака ё набудани ҳимояи STP.",
    resolution_steps: [
      "Кабелҳои нодуруст пайвастшударо аз коммутатор ҷудо кунед.",
      "Функсияи 'storm-control' -ро дар портҳо фаъол кунед."
    ]
  },
  {
    id: 3,
    symptom_id: 3,
    root_cause: "Мушкилот дар провайдер (ISP) ё хатогӣ дар танзими NAT.",
    resolution_steps: [
      "Фармони 'traceroute 8.8.8.8' -ро иҷро кунед.",
      "Танзимоти рӯйхати дастрасиро (ACL) барои NAT тафтиш кунед."
    ]
  },
  {
    id: 4,
    symptom_id: 4,
    root_cause: "Сарбории аз ҳад зиёди протсессор бинобар ҳамлаи шабакавӣ (DDoS) ё хатогӣ дар масирёбӣ.",
    resolution_steps: [
      "Ба консоли роутер ворид шавед.",
      "Фармони 'show processes cpu sorted' -ро иҷро карда, раванди аз ҳама зиёд сарборӣ эҷодкунандаро ёбед.",
      "Трафики шубҳанокро тавассути ACL (Access Control List) маҳдуд кунед.",
      "Агар мушкилот барномавӣ бошад, нармафзорро (Firmware) навсозӣ намоед."
    ]
  }
];