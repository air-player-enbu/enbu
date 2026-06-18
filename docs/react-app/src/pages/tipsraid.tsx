import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

// 大将画像テーブル共通コンポーネント
const CardImageTable: React.FC<{ title: string; images: string[]; folder?: string }> = ({
  title,
  images,
  folder = 'taisho',
}) => (
  <table className="border">
    <thead>
      <tr><th className="col2">{title}</th></tr>
    </thead>
    <tbody className="table-common">
      <tr>
        <td className="col2">
          {images.map(img => (
            <img key={img} src={`/img/${folder}/${img}.png`} alt={img} />
          ))}
        </td>
      </tr>
    </tbody>
  </table>
);

const tipsraid: React.FC = () => {
  return (
    <div className="container">
      <LastUpdated route="/tipsraid" />
      <PageMeta title="デッキレイド" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="デッキレイド" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/raid/RA003.png" />
        </Helmet>
      <main>
        <section>
          <h2>レイドのすゝめ</h2>

          <nav className="toc">
            <h3>目次</h3>
            <ul>
              <li><a href="#topic">はじめに</a></li>
              <li><a href="#section001">有利な兵種を筆頭に編成する</a></li>
              <li><a href="#section002">レイドの特攻倍率を確認する</a></li>
              <li><a href="#section003">役割を意識する</a></li>
            </ul>
          </nav>

          <hr className="section-divider" />

          <h4 id="topic">はじめに</h4>
          <div className="sohyo" style={{ color: '#222' }}>
            <div style={{ fontWeight: 700 }}>★レイドの討伐報酬より美味しいイベントはない</div>
            ・スキル玉合成には必須コンテンツ<br />
            ・カード集めでも最高効率<br />
            <div style={{ height: '10px' }} />
            <div style={{ fontWeight: 700 }}>★連合に必ず参加しよう</div>
            ・ソロ攻略は難しいため、複数人で攻略推奨<br />
            ・画面下部の連合募集チャットから参加
            <div style={{ height: '10px' }} />
            <div style={{ fontWeight: 700 }}>★Lv30以上で安定周回が最終目標</div>
          </div>

          <hr className="section-divider" />

          <h4 id="section001">有利な兵種を筆頭に編成する</h4>
          <div className="sohyo">
            ・三すくみを意識して、有利な兵種を筆頭に編成<br />
            （例：ボスが歩兵の場合は筆頭は弓兵を選ぶ）
            <img src="/img/raid/RA001.png" alt="RA001" style={{ display: 'block', margin: '10px', maxWidth: '120px' }} />
            <div className="point">
              ☞有利兵種を意識するのは筆頭大将のみでOK<br />
              ☞筆頭の兵種相性で全体に補正がかかる
            </div>
          </div>

          <hr className="section-divider" />

          <h4 id="section002">レイドの特攻倍率を確認する</h4>
          <div className="sohyo">
            ・レイド開始後は[イベント特攻]を必ず確認<br />
            ・新しい大将は特攻倍率が高いため優先的に編成
            <img src="/img/raid/RA002.png" alt="RA002" style={{ display: 'block', margin: '10px', maxWidth: '120px' }} />
            <div className="point">
              ☞フェス大将カードは大体特攻持ちになっている<br />
              ☞育成状況や役割に応じて特攻なしの大将も使う場合がある
            </div>
          </div>

          <hr className="section-divider" />

          <h4 id="section003">役割を意識する</h4>
          <div className="point">
            ☞途中退却しにくいデッキをまず作る<br />
          </div>

          <section>
            <h4>アタッカー</h4>
            <div className="sohyo">
              ・特攻が正義。なによりもまず特攻カードを入れる<br />
              ・手持ちと相談して攻撃か計略に必ず寄せる<br />
              ・発動する補助の種類が多いとダメージアップ<br />
              <CardImageTable
                title="補助スキル複数持ちの大将"
                images={['TB008', 'TC007', 'TA006', 'TA007', 'TA010', 'TB004']}
              />
              <div style={{ height: '15px' }} />
              ・上げ下げスキル持ちは全員のダメージアップ<br />
              <CardImageTable
                title="上げ下げスキル持ちの大将"
                images={['TC007', 'TB011', 'TA007', 'TC008', 'TA011', 'TA010', 'TB010']}
              />
              <div style={{ height: '15px' }} />
              ・奥義はダメージ、補助発動率アップが効果的<br />
              <CardImageTable
                title="効果が優秀な奥義"
                images={['SE001', 'SE002', 'SE003', 'SE004', 'SE005']}
                folder="skill"
              />
            </div>
          </section>

          <section>
            <h4>サポーター</h4>
            <div className="sohyo">
              ・現環境は全員アタッカーが有効なのでサポーター不要<br />
              ・複数の部隊に効果があるスキルが効果的<br />
              <CardImageTable
                title="5部隊ヒットスキル持ちの大将(4凸時点)"
                images={['TA008', 'TB007', 'TC004']}
              />
            </div>
            <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default tipsraid;
