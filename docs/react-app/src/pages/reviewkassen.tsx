import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

type CardTableProps = {
  title: string;
  rows: { rank: string; images: string[]; top?: string[] }[];
};

const CardTable: React.FC<CardTableProps> = ({ title, rows }) => (
  <>
    {title != "" && <h4>{title}</h4>}
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
            <td className="col1">{row.rank}</td>
            <td className="col2">
              {row.images.map(img => (
                row.top && row.top.includes(img) ? (
                  <img key={img} src={`/img/taisho/${img}.png`} alt={img} className="blue-border" />
                ) : (
                <img key={img} src={`/img/taisho/${img}.png`} alt={img} />
                )
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

const reviewkassen: React.FC = () => {
  return (
    <div className="container">
      <PageMeta title="大将評価【合戦】" />
      <LastUpdated route="/reviewkassen" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="大将評価【合戦】" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/IA001.png" />
        </Helmet>
      <main>
        <section>
          <h2>大将評価【合戦】</h2>

          <h4>総評(全体ランキング参考)</h4>
          <div className="sohyo">
            ・[攻計共通]副将の実装で選択軸が多様化<br />
            ・[攻撃]受退/回数/勇猛軸は基本採用<br />
            ・[計略]受退/与退/勇猛軸は基本採用<br />
            ・[応援]お市以外基本採用<br />
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
              <tr>
                <td className="col1">スキル</td>
                <td className="col2">汎用性の高さ<br />強い系統のスキルかどうか</td>
              </tr>
              <tr>
                <td className="col1">合戦時効果</td>
                <td className="col2">強い系統の合戦時効果かどうか</td>
              </tr>
            </tbody>
          </table>

          <table className="details">
            <thead>
              <tr>
                <th className="col1">評価</th>
                <th className="col2">補足(<span className="text-blue">青枠</span>は筆頭で編成)</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr><td className="col1">◎</td><td className="col2">デッキに入る</td></tr>
              <tr><td className="col1">〇</td><td className="col2">ルールや役割に応じてデッキに入る</td></tr>
              <tr><td className="col1">△</td><td className="col2">基本的に不採用</td></tr>
            </tbody>
          </table>

          <hr className="section-divider" />

          <CardTable
            title="攻撃大将"
            rows={[
              { rank: '◎', images: ['TA013','TA006', 'TA007', 'TB008', 'TC008', 'TC010','TC012','TA015'], top: ['TA013']},
              { rank: '〇', images: ['TA003', 'TA009', 'TA011', 'TC009', 'TB013', 'TC003'] },
              { rank: '△', images: [] },
            ]}
          />
          <CardTable
            title="攻撃副将"
            rows={[
              { rank: '◎', images: ['TC002', 'TA005', 'TB002' ], top: ['TC002'] },
            ]}
          />

          <CardTable
            title="計略大将"
            rows={[
              { rank: '◎', images: ['TA012','TB004', 'TB010', 'TB011', 'TC006', 'TC007', 'TA014', 'TB014'], top: ['TA012'] },
              { rank: '〇', images: ['TA001', 'TA010', 'TC009', 'TB013', 'TA004'] },
              { rank: '△', images: [] },
            ]}
          />
          <CardTable
            title="計略副将"
            rows={[
              { rank: '◎', images: ['TB003', 'TB006'], top: ['TB003'] },
            ]}
          />

          <CardTable
            title="応援大将"
            rows={[
              { rank: '◎', images: ['TA008','TA002', 'TB001', 'TB007', 'TB009', 'TC005', 'TB005', 'TC004','TC011'], top: ['TA008'] },
              { rank: '〇', images: [] },
              { rank: '△', images: ['TC001'] },
            ]}
          />

        </section>
      </main>
    </div>
  );
};

export default reviewkassen;
