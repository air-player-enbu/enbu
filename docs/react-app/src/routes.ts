export const SITE_TITLE = '戦国炎舞の備忘録';  // ← サイト名だけここで管理

export const routes = [
  { path: '/',               title: 'TOP',           file: 'src/App.tsx' },
  { path: '/skillroot',      title: 'スキル玉合成',  file: 'src/pages/skillroot.tsx' },
  { path: '/sgfree',         title: 'SGの使い道',    file: 'src/pages/sgfree.tsx' },
  { path: '/serialcode',     title: 'シリアルコード', file: 'src/pages/serialcode.tsx' },
  { path: '/reviewtensho',   title: '武将-天将',     file: 'src/pages/reviewtensho.tsx' },
  { path: '/reviewshinsho',  title: '武将-神将',     file: 'src/pages/reviewshinsho.tsx' },
  { path: '/reviewhaou',     title: '武将-覇王',     file: 'src/pages/reviewhaou.tsx' },
  { path: '/reviewraid',     title: '大将-レイド',   file: 'src/pages/reviewraid.tsx' },
  { path: '/reviewkassen',   title: '大将-合戦',     file: 'src/pages/reviewkassen.tsx' },
  { path: '/dataskill',      title: 'データ-スキル', file: 'src/pages/dataskill.tsx' },
  { path: '/dataougi',       title: 'データ-奥義',   file: 'src/pages/dataougi.tsx' },
  { path: '/dataother',      title: 'データ-その他', file: 'src/pages/dataother.tsx' },
  { path: '/raidstatistics', title: '討伐デッキ統計', file: 'src/pages/raidstatistics.tsx' },
  { path: '/tipsraid',       title: 'デッキ-レイド', file: 'src/pages/tipsraid.tsx' },
  { path: '/collab',           title: '進撃の巨人コラボ', file: 'src/pages/collab.tsx' },
];