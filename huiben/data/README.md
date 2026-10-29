# 绘本数据格式

每个地区一个文件：`data/books/<地区>.json`，内容是一个 JSON 数组，每本书一个对象。
分类取值（年龄段、作用、国家、奖项）全部定义在 `data/taxonomy.mjs`，构建时会逐条校验，
不合法的记录会让构建失败并指出是哪一条。

```json
{
  "id": "very-hungry-caterpillar",
  "titleZh": "好饿的毛毛虫",
  "titleOriginal": "The Very Hungry Caterpillar",
  "zhEdition": true,
  "authors": [{ "name": "Eric Carle", "nameZh": "艾瑞·卡尔", "role": "文/图" }],
  "country": "US",
  "language": "en",
  "year": 1969,
  "ageMin": 1,
  "ageMax": 5,
  "functions": ["cognition", "nature"],
  "keywords": ["数数", "星期", "毛毛虫变蝴蝶"],
  "summary": "一条小毛毛虫从星期一吃到星期天……",
  "tip": "读到每一天时和孩子一起数水果，再用手指穿过书页上的小洞。",
  "awards": [],
  "classic": true
}
```

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | 是 | 全站唯一，小写字母、数字和连字符。英文书用原书名，日文/中文书用罗马字/拼音，例如 `guri-to-gura`、`tuan-yuan`。 |
| `titleZh` | 是 | 中文书名。有中文版时用最通行的简体中文版书名；没有中文版时写忠实的意译，并把 `zhEdition` 设为 `false`。 |
| `titleOriginal` | 是 | 原版书名，用原文书写（日文写日文，中文原创写原书名）。 |
| `zhEdition` | 是 | 是否出版过中文版（简体或繁体）。 |
| `authors` | 是 | 作者数组。`name` 用原文名，`nameZh` 用中文版通行译名，`role` 只能是 `文/图`、`文`、`图`。 |
| `country` | 是 | 主要创作者（文图作者或文字作者）的国家，ISO 3166-1 两位代码，必须在 `COUNTRIES` 里。 |
| `language` | 是 | 原版语言，ISO 639-1 代码，例如 `en`、`ja`、`zh`、`fr`、`de`。 |
| `year` | 是 | 原版首次出版年份。 |
| `ageMin` / `ageMax` | 是 | 适读年龄（整岁，0–12）。`ageMax` 为 12 表示“N 岁以上”。书会出现在它覆盖到的每个年龄段。 |
| `functions` | 是 | 1–3 个作用，最主要的放第一个，取值见 `FUNCTIONS`。 |
| `keywords` | 是 | 2–5 个中文主题词，用于搜索，例如“分离焦虑”“二胎”“恐龙”。 |
| `summary` | 是 | 中文简介，50–100 字：讲了什么，以及对孩子有什么帮助。不照抄出版社文案，不剧透反转结局。 |
| `tip` | 是 | 一句亲子共读建议，20–60 字。 |
| `awards` | 否 | 本书获得的奖项，`[{ "name": "凯迪克金奖", "year": 1964 }]`。`name` 优先用 `AWARDS` 里的标准名称；只写确定获得的书目级奖项，不写作者终身奖。 |
| `classic` | 否 | 是否为广受公认的经典/必读书。 |
