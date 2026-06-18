import React, { useState, useMemo } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

// コピーアイコンSVG
const CopyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ pointerEvents: 'none' }}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

type SerialRow = {
  id: string;
  code: string;
  expireDate: string;   // YYYY/MM/DD
  expireText: string;
  distDate: string;     // YYYY/MM/DD
  distText: string;
};

const serialData: SerialRow[] = [
  { id: 'serial-HAMUBA',     code: 'ATTACK',    expireDate: '2026/6/29', expireText: '2026/06/29', distDate: '2026/06/16', distText: '2026/06/16' },
  { id: 'serial-HAMUBA',     code: 'HAMUBA',    expireDate: '2026/7/31', expireText: '2026/07/31', distDate: '2026/06/01', distText: '2026/06/01' },
  { id: 'serial-TENICHITEN',  code: 'TENICHITEN', expireDate: '2026/6/30',  expireText: '2026/6/30',  distDate: '2026/5/19', distText: '2026/5/19' },
  { id: 'serial-GOLDENMARU',  code: 'GOLDENMARU', expireDate: '2026/5/31',  expireText: '2026/5/31',  distDate: '2026/5/19', distText: '2026/5/19' },
  { id: 'serial-THIRTEEN',    code: 'THIRTEEN',   expireDate: '2026/5/31',  expireText: '2026/5/31',  distDate: '2026/4/06', distText: '2026/4/06' },
  { id: 'serial-tenichikai',  code: 'TENICHIKAI', expireDate: '2026/2/28',  expireText: '2026/2/28',  distDate: '2026/02/06', distText: '2026/2/6'   },
  { id: 'serial-mochiten',    code: 'MOCHITEN',   expireDate: '2026/2/28',  expireText: '2026/2/28',  distDate: '2026/01/06', distText: '2026/1/6'   },
  { id: 'serial-GOLDXMAS',    code: 'GOLDXMAS',   expireDate: '2026/1/31',  expireText: '2026/1/31',  distDate: '2025/12/25', distText: '2025/12/25' },
  { id: 'serial-2025EVE',     code: '2025EVE',    expireDate: '2026/1/31',  expireText: '2026/1/31',  distDate: '2025/12/24', distText: '2025/12/24' },
  { id: 'serial-AWRD1216',    code: 'AWRD1216',   expireDate: '2026/1/31',  expireText: '2026/1/31',  distDate: '2025/12/16', distText: '2025/12/16' },
  { id: 'serial-DOKUGANCHU',  code: 'DOKUGANCHU', expireDate: '2026/1/31',  expireText: '2026/1/31',  distDate: '2025/12/1',  distText: '2025/12/1'  },
];

const today = new Date();
today.setHours(0, 0, 0, 0);

const isExpired = (expireDate: string) => new Date(expireDate) < today;

const latestDistDate = serialData.reduce<string | null>((max, row) =>
  !max || new Date(row.distDate) > new Date(max) ? row.distDate : max, null
);

// コピーボタン単体コンポーネント
const CopyButton: React.FC<{ code: string; isNew: boolean; disabled: boolean }> = ({ code, isNew, disabled }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (disabled) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    } else {
      const temp = document.createElement('textarea');
      temp.value = code;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 350);
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      title="コピー"
      style={{
        background: copied ? '#bbdefb' : '#f5f7fa',
        border: '1.5px solid #1976d2',
        borderRadius: '6px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        padding: '4px 8px',
        transition: 'background 0.15s, box-shadow 0.15s',
        boxShadow: '0 1px 3px rgba(25,118,210,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
        position: 'relative',
      }}
    >
      <CopyIcon />
      {isNew && (
        <span style={{
          position: 'absolute',
          top: '7px',
          color: 'red',
          fontSize: '0.9em',
          fontWeight: 'bold',
          verticalAlign: 'super',
          letterSpacing: '0.05em',
        }}>NEW</span>
      )}
    </button>
  );
};

const serialcode: React.FC = () => {
  const [sortAsc, setSortAsc] = useState(false);

  const sorted = useMemo(() => {
    return [...serialData].sort((a, b) => {
      const dA = new Date(a.distDate).getTime();
      const dB = new Date(b.distDate).getTime();
      return sortAsc ? dA - dB : dB - dA;
    });
  }, [sortAsc]);

  return (
    <div className="container">
      <PageMeta title="シリアルコード" />
      <LastUpdated route="/serialcode" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="シリアルコード" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/IA001.png" />
        </Helmet>
      <main>
        <section>
          <h2>シリアルコード</h2>
          <div className="sohyo">
            <div className="point">
              ☞アプリペイショップで交換可能<br />
              ☞<a href="https://app-pay.jp/app/shin-kizna" target="_blank" rel="noopener">
                サイトはこちら(新しいタブで開きます)
              </a><br />
            </div>
          </div>
          <hr className="section-divider" />
          <table>
            <thead>
              <tr>
                <th className="col1" colSpan={2} style={{ width: '42%' }}>シリアルコード</th>
                <th className="col3" style={{ width: '29%' }}>有効期限</th>
                <th className="col4" style={{ width: '29%' }}>
                  配布日時
                  <button
                    id="sortToggle"
                    title="ソート"
                    onClick={() => setSortAsc(s => !s)}
                  >
                    {sortAsc ? '▲' : '▼'}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(row => {
                const expired = isExpired(row.expireDate);
                const isNew = row.distDate === latestDistDate;
                return (
                  <tr
                    key={row.id}
                    style={expired ? { background: '#eee', color: '#888' } : {}}
                  >
                    <td className="col1">
                      <CopyButton code={row.code} isNew={isNew} disabled={expired} />
                    </td>
                    <td className="col2" style={{ textAlign: 'left' }}>{row.code}</td>
                    <td className="col3">{row.expireText}</td>
                    <td className="col4" data-date={row.distDate}>{row.distText}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default serialcode;
