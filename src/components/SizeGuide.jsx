import { useEffect, useState } from 'react';
import { useStore } from '../state/store.jsx';
import { chartFor, suggestWomenSize, suggestByAge, WOMEN_CHART, TEEN_CHART, KIDS_CHART } from '../data/sizeCharts.js';
import { CloseIcon } from './Icons.jsx';

export function ChartTable({ chart }) {
  return (
    <div className="chart-wrap" tabIndex={0} role="region" aria-label={`${chart.title} size chart`}>
      <table className="chart">
        <thead>
          <tr>
            <th scope="col">Inches</th>
            {chart.columns.map((c) => <th key={c} scope="col">{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {chart.rows.map(([label, ...vals]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {vals.map((v, i) => <td key={i}>{v}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FitFinder({ category, onPick }) {
  const [val, setVal] = useState('');
  const women = category === 'women';
  const result = women ? suggestWomenSize(val) : suggestByAge(category, val);
  return (
    <div className="finder">
      <label htmlFor={`finder-${category}`}>{women ? 'Your bust measurement (inches)' : 'Age (years)'}</label>
      <div className="finder__row">
        <input
          id={`finder-${category}`}
          type="number"
          inputMode="decimal"
          min="0"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={women ? 'e.g. 36' : category === 'kids' ? 'e.g. 4' : 'e.g. 11'}
        />
        <p className="finder__out" aria-live="polite">
          {!val ? 'We will suggest a size.' : result ? <>We suggest <b>{result}</b></> : women ? 'Outside our current range. Message us and we will help.' : 'Outside this range. Try the other chart.'}
        </p>
      </div>
      {result && onPick && (
        <button className="btn btn--primary btn--sm" onClick={() => onPick(result)}>Select {result}</button>
      )}
    </div>
  );
}

export default function SizeGuideModal({ onPick }) {
  const { sizeGuide, setSizeGuide } = useStore();
  useEffect(() => {
    if (!sizeGuide) return;
    const onKey = (e) => e.key === 'Escape' && setSizeGuide(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sizeGuide, setSizeGuide]);
  if (!sizeGuide) return null;
  const chart = chartFor(sizeGuide);
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Size guide">
      <div className="modal__scrim" onClick={() => setSizeGuide(null)} />
      <div className="modal__panel">
        <div className="modal__head">
          <h2>{chart.title} size guide</h2>
          <button className="icon-btn" aria-label="Close size guide" onClick={() => setSizeGuide(null)} autoFocus><CloseIcon /></button>
        </div>
        <FitFinder category={sizeGuide} onPick={onPick ? (s) => { onPick(s); setSizeGuide(null); } : null} />
        <ChartTable chart={chart} />
        <p className="modal__note">{chart.note}</p>
        <p className="modal__note">Still unsure? Send us your measurements and we will recommend a size.</p>
      </div>
    </div>
  );
}

export { WOMEN_CHART, TEEN_CHART, KIDS_CHART };
