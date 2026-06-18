import React, { useState } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// 交換所アイテム1件分の型
type ExchangeItem = {
  icon: string;
  rank: 'ss' | 's' | 'a' | 'b' | 'c';
  reason: React.ReactNode;
};

// 交換所モーダル共通コンポーネント
// ※優先度基準（希少性・有用性・レート）は本文側に1回だけ表示し、
//   モーダル内には押された素材ごとの優先度表のみを表示する
const ExchangeModal: React.FC<{
  title: string;
  items: ExchangeItem[];
  onClose: () => void;
}> = ({ title, items, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <button className="modal-close" onClick={onClose}>×</button>
      <h4>{title}</h4>

      <table>
        <thead>
          <tr>
            <th className="col1" colSpan={2} style={{ width: '30%' }}>優先度</th>
            <th className="col3">理由</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="col1">
                <img src={item.icon} alt="" className="excel-table-img" />
              </td>
              <td className={`col2 rank-${item.rank}`}>{item.rank.toUpperCase()}</td>
              <td className="col3" style={{ textAlign: 'left' }}>{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// 報酬アイコン（クリックでモーダルを開く）
const RewardIcon: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => (
  <button className="reward-icon-button" onClick={onClick}>
    <img src={icon} alt={label} className="excel-table-img" />
    <span>{label}</span>
  </button>
);

const collab: React.FC = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  // ▼ 3種類の交換所データ
  const exchangeData: Record<string, { title: string; items: ExchangeItem[] }> = {
    // 討伐報告書（未定：後で実データに差し替え）
    houkokusho: {
      title: '【討伐報告書】交換所優先度',
      items: [
        { icon: '/img/item/IA001.png', rank: 'ss', reason: '説明不要とりあえず最優先' },
        { icon: '/img/item/IA017.png', rank: 'ss', reason: 'レイドでそのまま使える' },
        {
          icon: '/img/item/IA018.png',
          rank: 's',
          reason: (<><span className="text-red">※6/20～無限交換可能</span><br />
          余る報告書はすべてレジェンドガチャPに必ず変換</>),
        },
        {
          icon: '/img/item/IA006.png',
          rank: 's',
          reason: (<>入手場所が限られている<br />レイドで必須資源</>),
        },
        {
          icon: '/img/item/IA008.png',
          rank: 's',
          reason: (<>金剛石(上)同様<br />レートも誤差のため取得</>),
        },
        {
          icon: '/img/item/IA007.png',
          rank: 'a',
          reason: (<>補助数珠は確保<br />他も足りないものは確保</>),
        },
        {
          icon: '/img/item/IA005.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/skill/SZ002.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
      ],
    },
    // ハムメダル1.5（最初に送られたHTMLの評価表をそのまま移設）
    hammedal: {
      title: '【1周年ハムメダル】交換所優先度',
      items: [
        { icon: '/img/item/IA001.png', rank: 'ss', reason: '説明不要とりあえず最優先' },
        {
          icon: '/img/skill/SZ001.png',
          rank: 'ss',
          reason: (<>
            <span className="text-red">※1000個セットのみ</span><br />
            破格のレート
          </>),
        },
        {
          icon: '/img/item/IA006.png',
          rank: 's',
          reason: (<>入手場所が限られている<br />レイドで必須資源</>),
        },
        {
          icon: '/img/item/IA008.png',
          rank: 's',
          reason: (<>金剛石(上)同様<br />レートも誤差のため取得</>),
        },
        {
          icon: '/img/item/IA002.png',
          rank: 's',
          reason: (<>スキル玉が全て優秀<br />※全て取得済の場合は優先度↓</>),
        },
        {
          icon: '/img/item/IA007.png',
          rank: 'a',
          reason: (<>補助数珠は確保<br />他も足りないものは確保</>),
        },
        {
          icon: '/img/busho_icon/BN001.png',
          rank: 'a',
          reason: (<>
            必須カード・小隊長の確保<br />
            取得済の場合も極錬窯に突っ込む<br />
            ※将星難民は最悪売却
          </>),
        },
        {
          icon: '/img/item/IA004.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/item/IA005.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/skill/SZ002.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/skill/SZ001.png',
          rank: 'c',
          reason: (<>※武将智将カードの2倍のレート<br />最後に余裕があったら交換</>),
        },
      ],
    },
    // 調査兵団メダル（未定：後で実データに差し替え）
    chosaheidan: {
      title: '【調査兵団メダル】交換所優先度',
      items: [
        {
          icon: '/img/taisho/TP001.png',
          rank: 'ss',
          reason: (<>
            <span className="text-red">※6/25～交換可能</span><br />
            他に取れる場所がない<br />
            レイドで完凸に届かない場合は完凸まで交換推奨
          </>),
        },
        { icon: '/img/item/IA001.png', rank: 'ss', reason: '説明不要とりあえず最優先' },
        {
          icon: '/img/skill/SZ001.png',
          rank: 'ss',
          reason: (<>
            <span className="text-red">※1000個セットのみ</span><br />
            破格のレート
          </>),
        },
        {
          icon: '/img/taisho/TC002.png',
          rank: 'ss',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          前衛攻撃の人は必須大将<br />7凸未満の場合は4枚交換したい</>),
        },
        {
          icon: '/img/taisho/TB003.png',
          rank: 'ss',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          前衛計略の人は必須大将<br />7凸未満の場合は4枚交換したい</>),
        },
        {
          icon: '/img/taisho/TA002.png',
          rank: 'ss',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          後衛の人は必須大将<br />完凸未満の場合は4枚交換したい</>),
        },
        {
          icon: '/img/taisho/TB001.png',
          rank: 'ss',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          後衛の人は必須大将<br />完凸未満の場合は4枚交換したい</>),
        },
        {
          icon: '/img/item/IA006.png',
          rank: 's',
          reason: (<>入手場所が限られている<br />レイドで必須資源</>),
        },
        {
          icon: '/img/item/IA008.png',
          rank: 's',
          reason: (<>金剛石(上)同様<br />レートも誤差のため取得</>),
        },
        {
          icon: '/img/item/IA002.png',
          rank: 's',
          reason: (<>スキル玉が全て優秀<br />※全て取得済の場合は優先度↓</>),
        },
        {
          icon: '/img/taisho/TA003.png',
          rank: 'a',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          前衛攻撃の人は取得価値あり<br />最終的には不要になるが序盤は優秀大将</>),
        },    
        {
          icon: '/img/taisho/TA001.png',
          rank: 'a',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          前衛計略の人は取得価値あり<br />使えなくもないが、完凸まで扱いにくい性能</>),
        },     
        {
          icon: '/img/item/IA007.png',
          rank: 'a',
          reason: (<>補助数珠は確保<br />他も足りないものは確保</>),
        },
        {
          icon: '/img/taisho/TB002.png',
          rank: 'b',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          真技が補助数依存なので、序盤だと相性が悪い<br />
          後半でも使わなくなるので無理して取る価値なし</>),
        },
        {
          icon: '/img/taisho/TC003.png',
          rank: 'b',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          一部役割によって取得価値あり<br />貴重な相手への妨害スキル持ち<br />
          上位でもHP上げと妨害用に採用される場合もある</>),
        },               
        {
          icon: '/img/item/IA004.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/item/IA005.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/skill/SZ002.png',
          rank: 'b',
          reason: (<>雀の涙だが安いので一応<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/taisho/TC001.png',
          rank: 'c',
          reason: (<><span className="text-red">※1枚目は割引のため優先度↑</span><br />
          無理して取る価値なし<br />現状レイドでも合戦でも使いどころがない<br /></>),
        }, 
        {
          icon: '/img/skill/SZ001.png',
          rank: 'c',
          reason: (<>※武将智将カードの2倍のレート<br />最後に余裕があったら交換</>),
        },
        {
          icon: '/img/item/IA003.png',
          rank: 'c',
          reason: (<>※武将智将カードの4倍のレート<br />最後に余裕があったら交換</>),
        },
      ],
    },
  };

  return (
    <div className="container">
      <LastUpdated route="/collab" />
      <PageMeta title="進撃の巨人コラボ" />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="進撃の巨人コラボ" />
      </Helmet>
      <main>
        <section>
          <h2>進撃の巨人コラボ</h2>

          <nav className="toc">
            <h3>目次</h3>
            <ul>
              <li><a href="#section001">リセマラ（初めての方のみ）</a></li>
              <li><a href="#section002">シリアルコードを入力</a></li>
              <li><a href="#section003">メインクエストを進める</a></li>
              <li><a href="#section004">連合に参加する</a></li>
              <li><a href="#section005">軍令状を購入する</a></li>
              <li><a href="#section006">レイドイベントに参加する</a></li>
              <li><a href="#section007">レイドの報酬をうまく活用する</a></li>
            </ul>
          </nav>

          <hr className="section-divider" />

          {/* 1. リセマラ */}
          <h4 id="section001">1. リセマラ（初めての方のみ）</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>コラボガチャ30枚でリセマラ</div>
            ・チュートリアル終了後に<strong>コラボガチャ券が30枚</strong>がもらえる<br />
            ・<strong>[リヴァイ]</strong>または<strong>[ミカサ]</strong>が出るまでリセマラ推奨<br />
            ・レイドの特攻大将になるため、<strong>必ずどちらか1体は確保</strong>する<br />
            <div style={{ height: '10px' }} />
            <div className="point">
              ☞リセマラは[タイトル] → [新規ゲーム開始]で可能<br />
            </div>
          </div>

          <hr className="section-divider" />

          {/* 2. シリアルコード */}
          <h4 id="section002">2. シリアルコードを入力</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>アプリペイショップからシリアルコード入力</div>
            ・公式シリアルコードを入力することで<strong>無料報酬</strong>を獲得できる<br />
            ・レイドイベントで必要な<strong>軍令状</strong>も入手可能<br />
            ・<strong>通常の大将ガチャ券</strong>も<strong>フェス大将ガチャ</strong>に全て使用してしまってOK<br />
            ・コードの入力は<strong>アプリペイショップ</strong>からのみ可能<br />
            <div style={{ height: '10px' }} />
            <div className="point">
              ☞使えるシリアルコードは<Link to="/serialcode">ここ</Link>を確認<br />
              ☞期限切れに注意！早めに入力しよう
            </div>
          </div>

          <hr className="section-divider" />

          {/* 3. メインクエスト */}
          <h4 id="section003">3. メインクエストを進める</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>メインクエストを進めてレイドの準備</div>
            ・メインクエストで手に入るカードは勿論、大将ガチャ券や軍令状も入手できる<br />
            ・レイドの<strong>編成枠</strong>はメインクエストの進捗に応じて解放されるため進める必要がある<br />
            <div style={{ height: '10px' }} />
            <div className="point">
              ☞レイドイベントと並行でメインクエストは優先的に進めておこう<br />
              ☞時短アイテムもどんどん使用してしまってOK
            </div>
          </div>

          <hr className="section-divider" />

          {/* 4. 連合に参加 */}
          <h4 id="section004">4. 連合に参加する</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>20人のチームで遊ぶゲームなので連合への参加は必須</div>
            ・レイドボスは複数人での協力攻略が基本<br />
            ・レイドボスは参加だけで報酬が貰えるので、初心者は特に連合に入るべき<br />
            <div style={{ height: '10px' }} />
            <div style={{ fontWeight: 700 }}>【連合への参加方法】</div>
            ①画面下部の<strong>チャット欄</strong>をタップ<br />
            ②<strong>[連合募集]</strong>のタブを選択<br />
            ③募集している連合のアイコンをタップしてプロフィールの[チャット]から加入相談<br />
            ④初心者でも連合募集チャットに書き込んでOKなので勧誘を待つのも◎<br />
            <div style={{ height: '10px' }} />
            <div className="point">
              ☞とにかくどこかの<strong>連合には必ず参加</strong><br />
              ☞わからないことは連合メンバーに聞く<br />
            </div>
          </div>

          <hr className="section-divider" />

          {/* 5. 軍令状を購入 */}
          <h4 id="section005">5. 軍令状(無償)を購入する</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>軍令状はレイド参戦に必要なアイテム</div>
            ・レイドボスへの挑戦には<strong>軍令状</strong>が必要<br />
            ・毎日60枚は無課金でも購入できるので毎日必ず購入しておくこと
            <div className="point">
              ☞購入方法は<Link to="/sgfree">ここ</Link>から確認<br />
            </div>
          </div>

          <hr className="section-divider" />

          {/* 6. レイドイベントに参加 */}
          <h4 id="section006">6. レイドイベントに参加する</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>デッキを整えてから参戦しよう</div>
            ・今回のボスは<strong>歩兵</strong>なので、<strong>弓兵を主将(デッキの一番左)</strong>に編成する<br />
            <img src="/img/tips/TP004.jpg" alt="TP004" style={{ display: 'block', margin: '10px', maxWidth: '320px' }} />
            ・イベント特攻大将（リヴァイ・ミカサなど）を優先的に組み込む<br />
            ・補佐は補佐効果がついているものをなるべく選ぶ<br />
            <img src="/img/tips/TP005.jpg" alt="TP005" style={{ display: 'block', margin: '10px', maxWidth: '320px' }} />
            ・最初の内はカードが少ないので、戦力の高いものを入れておいてもOK<br />
            <img src="/img/tips/TP006.jpg" alt="TP006" style={{ display: 'block', margin: '10px', maxWidth: '320px' }} />
            ・特攻倍率はレイド画面の<strong>[イベント特攻]</strong>ボタンから確認<br />
            <div style={{ height: '10px' }} />
            <div className="point">
              ☞デッキ編成の詳細は<Link to="/tipsraid">レイド攻略ページ</Link>を参照
            </div>
          </div>

          <hr className="section-divider" />

          {/* 7. 報酬の活用 */}
          <h4 id="section007">7. レイドの報酬をうまく活用する</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div className="point">
              ☞討伐報酬はすぐ使わずに貯めておくこと<br />
              ☞交換期限がレイド終了後すぐなので交換し忘れないように注意
            </div>
            <div style={{ height: '10px' }} />

{/* 優先度基準：交換所アイテム全てに共通する判断基準。アイコン押下前のここに1回だけ表示 */}
<div style={{ fontWeight: 700 }}>【交換所アイテムの優先度基準】</div>
<table className="border">
  <thead>
    <tr><th className="col1">項目</th><th className="col2">基準</th></tr>
  </thead>
  <tbody className="table-common">
    <tr><td className="col1">希少性</td><td className="col2">獲得できる場所が限られている</td></tr>
    <tr><td className="col1">有用性</td><td className="col2">高頻度で使うものや足りないもの</td></tr>
    <tr><td className="col1">レート</td><td className="col2">他のアイテムや他の交換所と比較</td></tr>
  </tbody>
</table>
<div style={{ height: '10px' }} />

<div style={{ fontWeight: 700 }}>【交換所素材の優先度を確認】</div>
・アイコンをタップで優先度詳細を確認できます<br />
<div className="reward-icon-row">
  <RewardIcon
    icon="/img/item/IA014.png"
    label="調査兵団メダル"
    onClick={() => setOpenModal('chosaheidan')}
  />
  <RewardIcon
    icon="/img/item/IA015.png"
    label="討伐報告書"
    onClick={() => setOpenModal('houkokusho')}
  />
  <RewardIcon
    icon="/img/item/IA016.png"
    label="ハムメダル1.5"
    onClick={() => setOpenModal('hammedal')}
  />
</div>
          </div>

          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>

      {openModal && (
        <ExchangeModal
          title={exchangeData[openModal].title}
          items={exchangeData[openModal].items}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default collab;