import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

type CardTableProps = {
  title: string;
  rows: { rank: string; rankClass: string; images: string[] }[];
};

const CardTable: React.FC<CardTableProps> = ({ title, rows }) => (
  <>
    <h4>{title}</h4>
    <table className="card-table card-table-type">
      <thead className="card-table-type">
        <tr>
          <th className="col1">評価</th>
          <th className="col2">大将カード</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            <td className={`col1 ${row.rankClass}`}>{row.rank}</td>
            <td className="col2">
              {row.images.map(img => (
                <img key={img} src={`/img/taisho/${img}.png`} alt={img} />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
    <hr className="section-divider" />
  </>
);

const reviewraid: React.FC = () => {
  return (
    <div className="container">
      <PageMeta title="大将評価【レイド】" />
      <LastUpdated route="/reviewraid" />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="大将評価【レイド】" />
        <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/IA001.png" />
      </Helmet>
      <main>
        <section>
          <h2>大将評価【レイド】</h2>

          <h4>総評(個人ランキング参考)</h4>
          <div className="sohyo">
            ・フェスカードが超優秀<br />
            ・フェスカードは特攻になる頻度が高い<br />
            ・フェスカードの奥義は現時点では必須クラス<br />
            ・重課金以外は大将ガチャ券はフェスで全投入推奨
          </div>

          <hr className="section-divider" />

          <h4>評価基準</h4>
          <table className="border">
            <thead>
              <tr>
                <th className="col1">項目</th>
                <th className="col2">基準</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr><td className="col1">奥義</td><td className="col2">デッキに編成したい奥義</td></tr>
              <tr><td className="col1">スキル</td><td className="col2">高威力・バフかデバフ付き</td></tr>
              <tr><td className="col1">補助</td><td className="col2">補助の数が多い(2個)</td></tr>
            </tbody>
          </table>

          <table className="details">
            <thead>
              <tr>
                <th className="col1">評価</th>
                <th className="col2">補足</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr><td className="col1 rank-ss">SS</td><td className="col2">特攻時は人権<br />特攻なしですら使う</td></tr>
              <tr><td className="col1 rank-s">S</td><td className="col2">特攻時はデッキに入る<br />特攻なしのときも選択肢</td></tr>
              <tr><td className="col1 rank-a">A</td><td className="col2">特攻時は育成状況に応じて使う</td></tr>
              <tr><td className="col1 rank-b">B</td><td className="col2">特攻時は育成状況に応じて選択肢</td></tr>
              <tr><td className="col1 rank-c">C</td><td className="col2">デッキに入らない ※更新対象外</td></tr>
            </tbody>
          </table>

          <hr className="section-divider" />

          <CardTable
            title="攻撃大将"
            rows={[
              { rank: 'SS', rankClass: 'rank-ss', images: ['TB008', 'TC010'] },
              { rank: 'S',  rankClass: 'rank-s',  images: ['TA013', 'TA011','TC012'] },
              { rank: 'A',  rankClass: 'rank-a',  images: ['TA007', 'TC008', 'TB013'] },
              { rank: 'B',  rankClass: 'rank-b',  images: ['TA003', 'TA009', 'TC002', 'TA006'] },
              { rank: 'C',  rankClass: 'rank-c',  images: ['TA005', 'TB002', 'TC003'] },
            ]}
          />

          <CardTable
            title="計略大将"
            rows={[
              { rank: 'SS', rankClass: 'rank-ss', images: ['TB011', 'TA014'] },
              { rank: 'S',  rankClass: 'rank-s',  images: ['TC007','TA012', 'TA010', 'TC009', 'TC011', 'TB014'] },
              { rank: 'A',  rankClass: 'rank-a',  images: ['TB010'] },
              { rank: 'B',  rankClass: 'rank-b',  images: ['TB003', 'TC006','TB004'] },
              { rank: 'C',  rankClass: 'rank-c',  images: ['TA001', 'TA004', 'TB006'] },
            ]}
          />

          <CardTable
            title="応援大将"
            rows={[
              { rank: 'SS', rankClass: 'rank-ss', images: ['TA008'] },
              { rank: 'S',  rankClass: 'rank-s',  images: ['TB007', 'TC004'] },
              { rank: 'A',  rankClass: 'rank-a',  images: ['TB001', 'TC005', 'TB009'] },
              { rank: 'B',  rankClass: 'rank-b',  images: ['TB005', 'TA002'] },
              { rank: 'C',  rankClass: 'rank-c',  images: ['TC001'] },
            ]}
          />

        </section>
      </main>
    </div>
  );
};

export default reviewraid;
