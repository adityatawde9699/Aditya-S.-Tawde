import styles from './SystemDiagram.module.css';

function Runtime({ compact }) {
  const nodes = compact ? ['INPUT', 'PLAN', 'EXECUTE', 'REFLECT'] : ['CLIENT', 'TRANSPORT', 'AGENT RUNTIME', 'PLAN', 'TOOLS', 'MEMORY', 'OBSERVATION', 'REFLECTION', 'RESPONSE'];
  return <div className={styles.runtime}>
    <div className={styles.runtimeFlow}>{nodes.map((node, i) => <div key={node} className={styles.node} style={{ '--motion-order': i }}><span className={styles.nodeIndex}>{String(i + 1).padStart(2, '0')}</span><span>{node}</span>{i < nodes.length - 1 && <span className={styles.connector} aria-hidden="true">↓</span>}</div>)}</div>
    <div className={styles.runtimeRail}><span>LLM ROUTING</span><span>LOCAL / CLOUD</span><span className={styles.railRule} /><span>PERSISTENT<br />MEMORY</span><span className={styles.railRule} /><span>TOOLS /<br />PERMISSIONS</span></div>
  </div>;
}
function Lunar() {
  const points = [[48, 50, 339, 57], [122, 38, 417, 45], [97, 107, 387, 111], [191, 87, 483, 95], [155, 170, 453, 175], [60, 214, 360, 225], [225, 202, 527, 216]];
  return <div className={styles.lunar}>
    <div className={styles.imageLabels}><span>SOURCE / TMC-2 FORE</span><span>REFERENCE / NADIR</span></div>
    <div className={styles.imagePair}>
      <img src="/images/lunar/source.webp" alt="LunaMatch TMC-2 fore science-window preview of lunar terrain" loading="lazy" width="700" height="700" />
      <img src="/images/lunar/reference.webp" alt="LunaMatch TMC-2 nadir science-window preview of lunar terrain" loading="lazy" width="700" height="700" />
      <svg viewBox="0 0 600 280" preserveAspectRatio="none" aria-hidden="true">{points.map(([x, y, a, b], i) => <g key={i} style={{ '--motion-order': i }}><line pathLength="1" x1={x} y1={y} x2={a} y2={b} /><circle cx={x} cy={y} r="3" /><circle cx={a} cy={b} r="3" /></g>)}</svg>
    </div>
    <div className={styles.visualMeta}>REPOSITORY IMAGE PREVIEWS / ILLUSTRATIVE TIE POINTS</div>
  </div>;
}
function MapStudy() {
  return <div className={styles.map}>
    <svg viewBox="0 0 600 300" role="img" aria-label="Schematic map connecting environmental observations to a risk region and response">
      <defs><pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="var(--surface-solid)" strokeWidth="1" /></pattern></defs>
      <rect width="600" height="300" fill="url(#map-grid)" />
      <g fill="none" stroke="var(--border-strong)" strokeWidth="1"><path d="M0 60L140 100L210 60L360 80L470 10M10 240L135 180L280 210L370 130L590 150M80 0L140 100L135 180L180 300M310 0L280 90L280 210L350 300M510 0L470 110L510 220L590 270" /><path d="M0 140C110 100 100 220 220 160S370 230 600 70" stroke="var(--text-secondary)" /></g>
      <path d="M230 90L360 70L410 150L335 225L230 190Z" fill="var(--surface-hover)" fillOpacity=".5" stroke="var(--text-secondary)" strokeDasharray="4 5" />
      <g stroke="var(--text-primary)" fill="var(--bg-primary)">{[[140,100],[280,130],[350,175],[470,110]].map(([x,y], i) => <g key={i}><circle cx={x} cy={y} r="6" /><path d={`M${x-12} ${y}h24M${x} ${y-12}v24`} /></g>)}</g>
      <g fill="var(--text-primary)" fontSize="12" fontFamily="monospace"><text x="155" y="88">OBSERVATION</text><text x="295" y="116">RISK REGION</text><text x="366" y="194">INTERVENTION</text><text x="485" y="97">RESPONSE</text><text x="20" y="280">SCHEMATIC / NO LIVE DATA</text></g>
    </svg>
  </div>;
}
function Planner() {
  const blocks = [['09:00', 'RESEARCH', 62], ['10:30', 'BUILD', 85], ['13:00', 'REVIEW', 48], ['14:00', 'REFLOW', 70]];
  return <div className={styles.planner}><div className={styles.plannerHeader}><span>LOCAL PLANNING ENGINE</span><span>DETERMINISTIC</span></div>{blocks.map(([time, label, size]) => <div className={styles.timeRow} key={time}><span>{time}</span><div className={styles.timeTrack}><div style={{ width: `${size}%` }}>{label}<span>↗</span></div></div></div>)}<div className={styles.visualMeta}>ILLUSTRATIVE TIME BLOCKS / CRDT OPERATION LOG</div></div>;
}
function Support() {
  return <div className={styles.support}><div className={styles.endpoint}><span>01 / PATIENT</span><strong>ANDROID</strong><small>VOICE / ROOM CACHE</small></div><span className={styles.exchange}>↕</span><div className={styles.apiNode}><span>FASTAPI</span><small>AUTHORIZATION / SYNC / PERSONALIZATION</small></div><div className={styles.supportBranches}><div><span>↕</span><strong>DATABASE</strong><small>POSTGRESQL</small></div><div><span>↕</span><strong>CAREGIVER WEB</strong><small>REACT / AUTHORIZED RECORDS</small></div></div></div>;
}
function Finance() {
  return <div className={styles.finance}><div className={styles.inputRows}>{['TRANSACTIONS', 'RECEIPT OCR', 'INVESTMENTS'].map((label, i) => <div key={label}><span>0{i + 1}</span><strong>{label}</strong><span>→</span></div>)}</div><div className={styles.financeCore}><span>FASTAPI / DATA LAYER</span><div>RULES + LLM<br />CATEGORIZATION</div><span>↓</span><strong>INSIGHTS</strong><small>PORTFOLIOS / BUDGETS / ADVISOR</small></div></div>;
}
export default function SystemDiagram({ project, compact = false }) {
  const visuals = { runtime: <Runtime compact={compact} />, lunar: <Lunar />, map: <MapStudy />, planner: <Planner />, support: <Support />, finance: <Finance /> };
  return <figure data-motion="diagram" className={`${styles.figure} ${compact ? styles.compact : ''}`} aria-label={`${project.title}: explanatory system architecture`}>
    {visuals[project.visual]}
    {!compact && <><figcaption className={styles.caption}>{project.detail}</figcaption><ol className={styles.pipeline} aria-label={`${project.title} system flow`}>{project.flow.map((step, i) => <li key={step} style={{ '--motion-order': i }}><span>{String(i + 1).padStart(2, '0')}</span>{step}</li>)}</ol></>}
  </figure>;
}
