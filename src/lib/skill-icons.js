import {
  TbArrowsShuffle,
  TbAutomation,
  TbBrandAws,
  TbBrandGit,
  TbBrandJavascript,
  TbBrandJira,
  TbBrandPython,
  TbBrandReact,
  TbBrandSnowflake,
  TbChartHistogram,
  TbChartPie,
  TbDatabase,
  TbFileExcel,
  TbNotebook,
  TbReportAnalytics,
  TbSquareLetterC,
  TbSquareLetterR,
  TbSql,
  TbTerminal2,
} from 'react-icons/tb'

// Tabler's outline set, not brand-colour logos: every skill reads as the
// same weight and stroke as the rest of the site's iconography (lucide is
// drawn the same way), so the grid doesn't turn into a wall of clashing
// logo marks. A handful of these (R, SQL, ETL) have no real brand mark to
// begin with, so a generic icon is the honest choice there anyway.
export const skillIcons = {
  Python: TbBrandPython,
  SQL: TbSql,
  R: TbSquareLetterR,
  JavaScript: TbBrandJavascript,
  C: TbSquareLetterC,

  React: TbBrandReact,
  QuickSight: TbReportAnalytics,
  Tableau: TbChartHistogram,
  'Power BI': TbChartPie,
  Excel: TbFileExcel,

  AWS: TbBrandAws,
  Snowflake: TbBrandSnowflake,
  PostgreSQL: TbDatabase,
  'ETL Pipelines': TbArrowsShuffle,

  Git: TbBrandGit,
  Jira: TbBrandJira,
  Confluence: TbNotebook,
  'Power Automate': TbAutomation,
  'Claude Code': TbTerminal2,
}
