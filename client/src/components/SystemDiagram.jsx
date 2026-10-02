import styles from './SystemDiagram.module.css';

function Flow({ steps, active = -1, arrows = '↓' }) {
  return <ol className={styles.flow}>{steps.map((step, index) => <li key={step} style={{ '--motion-order': index }}>
    <span className={styles.flowNumber}>{String(index + 1).padStart(2, '0')}</span>
    <span className={index === active ? styles.flowActive : styles.flowNode}>{step}</span>
    {index < steps.length - 1 && <span className={styles.flowArrow} aria-hidden="true">{arrows}</span>}
  </li>)}</ol>;
}

function Lunar() {
  const points = [[16,24,67,25],[31,35,82,37],[24,49,75,50],[39,64,90,66],[12,75,63,76],[42,82,93,83]];
  return <div className={styles.lunar}>
    <div className={styles.lunarFrames}>
      <div><img src="/images/lunar/source.webp" alt="LunaMatch source lunar terrain preview" loading="lazy" width="700" height="700" /><span>IMAGE_A / SOURCE</span></div>
      <div><img src="/images/lunar/reference.webp" alt="LunaMatch reference lunar terrain preview" loading="lazy" width="700" height="700" /><span>IMAGE_B / REFERENCE</span></div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{points.map(([x1,y1,x2,y2],i)=><g key={i} style={{ '--motion-order': i }}><line pathLength="1" x1={x1} y1={y1} x2={x2} y2={y2} /><circle cx={x1} cy={y1} r=".75" /><circle cx={x2} cy={y2} r=".75" /></g>)}</svg>
    </div>
    <p className={styles.miniFlow}>IMAGE → FEATURE EXTRACTION → MATCHING → RANSAC → REGISTRATION → REFINEMENT</p>
  </div>;
}

function Map({ flow }) {
  const nodes = [[75,225],[180,145],[290,195],[405,105],[525,155]];
  return <div className={styles.map}><svg viewBox="0 0 600 300" role="img" aria-label="Schematic environmental observations linked along a response path; no live data">
    <g className={styles.mapGrid}>{[100,200,300,400,500].map(x=><path key={x} d={`M${x} 0v300`}/>)}</g>
    <g className={styles.contours}>{Array.from({length:15},(_,i)=><path key={i} d={`M-20 ${14+i*20} C95 ${-30+i*20} 155 ${70+i*19} 280 ${20+i*20} S430 ${70+i*19} 510 ${15+i*20} S590 ${-10+i*20} 625 ${22+i*20}`}/>)}</g>
    <polyline className={styles.route} points={nodes.map(([x,y])=>`${x},${y}`).join(' ')}/>
    {nodes.map(([x,y],i)=><g className={styles.mapNode} key={i} style={{ '--motion-order': i }}><circle cx={x} cy={y} r="17"/><circle cx={x} cy={y} r="4"/><text x={x+12} y={y-14}>NODE_0{i+1}</text></g>)}
    <text className={styles.mapLabel} x="17" y="25">ENVIRONMENT / SCHEMATIC</text><text className={styles.mapLabel} x="17" y="288">OBSERVATION → RESPONSE</text>
  </svg><p className={styles.miniFlow}>{flow.join(' → ')}</p></div>;
}

function Planner({ flow }) {
  const blocks = [['09:00','DEEP WORK'],['10:30','RESEARCH'],['13:00','BUILD'],['15:00','REVIEW']];
  return <div className={styles.planner}><Flow steps={flow} active={2}/><div className={styles.schedule}><span>LOCAL / TIME BLOCKS</span>{blocks.map(([time,label],i)=><div key={time} className={i===2?styles.scheduleActive:''}><small>{time} /</small> {label}</div>)}<small>ILLUSTRATIVE SCHEDULE</small></div></div>;
}

function Finance({ flow }) {
  return <ol className={styles.finance}>{flow.map((step,i)=><li key={step} style={{ '--motion-order': i }}><span>{i === 0 ? '01' : '+'}</span><strong>{step}</strong><span>{String(i+1).padStart(2,'0')}</span></li>)}</ol>;
}

export default function SystemDiagram({ project, compact = false, showPipeline = true }) {
  const visuals = {
    runtime: <Flow steps={project.flow} active={2}/>,
    lunar: <Lunar/>,
    map: <Map flow={project.flow}/>,
    planner: <Planner flow={project.flow}/>,
    support: <Flow steps={project.flow} active={2} arrows="↕"/>,
    finance: <Finance flow={project.flow}/>,
  };
  return <figure data-motion="diagram" className={`${styles.figure} ${compact ? styles.compact : ''}`} aria-label={`${project.title}: explanatory system architecture`}>
    <div className={styles.canvas}>{visuals[project.visual]}</div>
    <figcaption className={styles.caption}>CONCEPTUAL REPRESENTATION / {project.detail}</figcaption>
    {showPipeline && <ol className={styles.pipeline} aria-label={`${project.title} system flow`}>{project.flow.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}</li>)}</ol>}
  </figure>;
}
