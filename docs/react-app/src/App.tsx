import { useState, useMemo, lazy, Suspense } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './global.css';
import Header from './components/Header';
import CopyrightFooter from './components/CopyrightFooter';
import BackToTopButton from './components/BackToTopButton';
import LastUpdated from './components/LastUpdated';
import { Helmet } from 'react-helmet-async';
import historyData from './data/history.json';

type HistoryRow = {
  date: string;
  page: string;
  route: string;
  content: string;
};

const VISIBLE_COUNT = 10;

const Skillroot      = lazy(() => import('./pages/skillroot'));
const Sgfree         = lazy(() => import('./pages/sgfree'));
const Serialcode     = lazy(() => import('./pages/serialcode'));
const Reviewtensho   = lazy(() => import('./pages/reviewtensho'));
const Reviewshinsho  = lazy(() => import('./pages/reviewshinsho'));
const Reviewhaou     = lazy(() => import('./pages/reviewhaou'));
const Reviewraid     = lazy(() => import('./pages/reviewraid'));
const Reviewkassen   = lazy(() => import('./pages/reviewkassen'));
const Dataskill      = lazy(() => import('./pages/dataskill'));
const Dataougi       = lazy(() => import('./pages/dataougi'));
const Dataother      = lazy(() => import('./pages/dataother'));
const Raidstatistics = lazy(() => import('./pages/raidstatistics'));
const Tipsraid       = lazy(() => import('./pages/tipsraid'));
const Collab          = lazy(() => import('./pages/collab'));

function TopPage() {
  const [showAll, setShowAll] = useState(false);

  const grouped = useMemo(() => {
    const sorted = [...(historyData as HistoryRow[])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const map = new Map<string, HistoryRow[]>();
    for (const row of sorted) {
      if (!map.has(row.date)) map.set(row.date, []);
      map.get(row.date)!.push(row);
    }
    return [...map.entries()];
  }, []);

  const visible = showAll ? grouped : grouped.slice(0, VISIBLE_COUNT);
  const hasMore = grouped.length > VISIBLE_COUNT;

  return (
    <div className="container">
      <LastUpdated route={null} />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="戦国炎舞の備忘録" />
        <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/AA000.png" />
      </Helmet>
      <main>
        <section>
          <h2>更新履歴</h2>
          <div className="history-list">
            {visible.map(([date, rows]) => (
              <div key={date} className="history-group">
                <div className="history-date">
                  {new Date(date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </div>
                <ul className="history-items">
                  {rows.map((row, i) => (
                    <li key={i} className="history-item">
                      {row.route && row.route !== '/' ? (
                        <Link to={row.route} className="history-page-link">
                          {row.page}
                        </Link>
                      ) : (
                        <span className="history-page">{row.page}</span>
                      )}
                      <span className="history-content">{row.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              className="history-toggle"
              onClick={() => setShowAll(s => !s)}
            >
              {showAll ? '▲ 折りたたむ' : `▼ もっと見る（全${grouped.length}件）`}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>読み込み中...</div>}>
        <Routes>
          <Route path="/"              element={<TopPage />} />
          <Route path="/skillroot"     element={<Skillroot />} />
          <Route path="/sgfree"        element={<Sgfree />} />
          <Route path="/serialcode"    element={<Serialcode />} />
          <Route path="/reviewtensho"  element={<Reviewtensho />} />
          <Route path="/reviewshinsho" element={<Reviewshinsho />} />
          <Route path="/reviewhaou"    element={<Reviewhaou />} />
          <Route path="/reviewraid"    element={<Reviewraid />} />
          <Route path="/reviewkassen"  element={<Reviewkassen />} />
          <Route path="/dataskill"     element={<Dataskill />} />
          <Route path="/dataougi"      element={<Dataougi />} />
          <Route path="/dataother"     element={<Dataother />} />
          <Route path="/raidstatistics" element={<Raidstatistics />} />
          <Route path="/tipsraid"      element={<Tipsraid />} />
          <Route path="/collab"         element={<Collab />} />
        </Routes>
      </Suspense>
      <CopyrightFooter />
      <BackToTopButton />
    </>
  );
}

export default App;