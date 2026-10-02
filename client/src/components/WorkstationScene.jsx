import { useEffect, useId, useRef, useState } from 'react';
import styles from './WorkstationScene.module.css';
import { WorkstationChair, WorkstationPlant } from './WorkstationFurniture';

const code = [
  '# local-first agent runtime',
  'request = transport.receive(input)',
  'context = memory.retrieve(request)',
  'plan = agent.reason(context)',
  'with permissions.authorize(plan):',
  '    result = tools.execute(plan)',
  '    memory.retain(result)',
  '    response = agent.reflect(result)',
];
const ties = [[45, 46, 211, 52], [84, 80, 250, 84], [118, 35, 282, 41], [60, 126, 227, 131], [124, 117, 292, 123]];

function LunarScreen({ globe = false }) {
  const id = useId();
  return <svg viewBox="0 0 340 174" className={styles.lunar}>
    <defs>
      <filter id={`${id}-terrain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".065 .09" numOctaves="4" seed="17" />
        <feDiffuseLighting surfaceScale="4" diffuseConstant=".8" lightingColor="#E8E8E8"><feDistantLight azimuth="-35" elevation="32" /></feDiffuseLighting>
      </filter>
      <radialGradient id={`${id}-shade`} cx="75%" cy="28%" r="80%"><stop offset="0" stopColor="#000000" stopOpacity="0" /><stop offset=".55" stopColor="#000000" stopOpacity=".1" /><stop offset="1" stopColor="#000000" stopOpacity=".95" /></radialGradient>
      <radialGradient id={`${id}-crater`} cx="40%" cy="35%"><stop stopColor="#171717" /><stop offset=".62" stopColor="#303030" /><stop offset=".8" stopColor="#A0A0A0" /><stop offset="1" stopColor="#707070" stopOpacity="0" /></radialGradient>
      <clipPath id={`${id}-limb`}><circle cx="0" cy="245" r="250" /></clipPath>
    </defs>
    {globe ? <>
      <g className={styles.starField}>{Array.from({length:24},(_,i)=><circle key={i} cx={8+i*37%320} cy={8+i*29%150} r=".5" fill="#707070" />)}</g>
      <g clipPath={`url(#${id}-limb)`}><rect x="0" width="340" height="174" filter={`url(#${id}-terrain)`} />
        {Array.from({length:38},(_,i)=><ellipse key={i} cx={12+i*37%220} cy={20+i*41%155} rx={2+i*7%13} ry={1.5+i*5%10} fill={`url(#${id}-crater)`} opacity={.3+i%4*.12} transform={`rotate(-16 ${12+i*37%220} ${20+i*41%155})`} />)}
        <rect x="0" width="340" height="174" fill={`url(#${id}-shade)`} />
      </g>
      <path transform="translate(230 0)" d="M25 48L60 25L91 62L76 107L30 118L25 48L91 62L30 118M60 25L76 107" fill="none" stroke="#707070" strokeWidth=".5" />
      {[[25,48],[60,25],[91,62],[76,107],[30,118]].map(([x,y],i)=><circle key={i} cx={x+230} cy={y} r="2" fill="#CFCFCF" />)}
      <rect x="254" y="16" width="67" height="43" fill="#101010" stroke="#4A4A4A" />
      <circle cx="286" cy="37" r="16" fill={`url(#${id}-terrain)`} opacity=".85" />
      <rect x="254" y="67" width="67" height="29" fill="#171717" stroke="#303030" />
      <path d="M260 89L270 78L281 85L290 72L302 87L316 77" fill="none" stroke="#A0A0A0" strokeWidth=".8" />
      <text x="13" y="151">LUNAR VISION</text><text x="13" y="162">PROCEDURAL STUDY</text>
    </> : <>
      {[0, 166].map(offset => <g key={offset} transform={`translate(${offset} 0)`}>
        <rect x="8" y="8" width="154" height="148" filter={`url(#${id}-terrain)`} opacity=".7" />
        {Array.from({length:13},(_,i)=><ellipse key={i} cx={22+i*47%126} cy={20+i*31%124} rx={3+i*7%12} ry={3+i*5%9} fill="#171717" fillOpacity=".3" stroke="#A0A0A0" strokeOpacity=".5" strokeWidth=".7" />)}
        <rect x="8" y="8" width="154" height="148" fill={`url(#${id}-shade)`} opacity=".35" />
      </g>)}
      {ties.map(([x,y,a,b], i) => <g className={styles.tie} style={{ '--order': i }} key={i}><line x1={x} y1={y} x2={a} y2={b} pathLength="1" /><circle cx={x} cy={y} r="1.5" /><circle cx={a} cy={b} r="1.5" /></g>)}
      <text x="10" y="169">SOURCE</text><text x="176" y="169">REFERENCE / ILLUSTRATIVE</text>
    </>}
  </svg>;
}

function Monitor({ className, title, children }) {
  return <div className={`${styles.monitor} ${className}`}>
    <div className={styles.screenTitle}><span>⌘</span>{title}<span>— □</span></div>
    <div className={styles.screen}>{children}<div className={styles.scan} /></div>
    <div className={styles.bezel}><span /></div>
  </div>;
}

function Diagnostics() {
  return <div className={styles.diagnostics}>
    <div><span>CPU</span><i style={{ '--level': '62%' }} /></div>
    <div><span>RAM</span><i style={{ '--level': '47%' }} /></div>
    <div><span>GPU</span><i style={{ '--level': '81%' }} /></div>
    <svg viewBox="0 0 120 42"><path d="M0 35L9 31L18 34L28 19L37 27L46 24L55 31L65 12L74 26L84 18L92 22L102 8L112 17L120 13" pathLength="1" /></svg>
  </div>;
}

function CodeEditor() {
  return <div className={styles.ide}>
    <div className={styles.fileTree}>{['runtime/', '  agent.py', '  memory.py', '  tools.py', 'retrieval/', '  hybrid.py', 'transport/', '  api.py', 'permissions/'].map(file=><div key={file}>{file}</div>)}</div>
    <div className={styles.editor}>{[...code, '', '# retrieval / execution', ...code.slice(1, 7)].map((line, i) => <div key={i} style={{ '--order': i % 8 }}><span>{String(i+1).padStart(2,'0')}</span><code>{line}</code></div>)}</div>
  </div>;
}

export default function WorkstationScene() {
  const ref = useRef(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={styles.stage} data-active={active} aria-hidden="true">
    <div className={styles.wall} />
    <div className={styles.window}><div className={styles.skyline}>{Array.from({length:12},(_,i)=><span key={i} style={{height:`${20+i*13%65}%`}} />)}</div></div>
    <div className={styles.lamp} />
    <div className={styles.shelf} />
    <div className={styles.monitorArm} />
    <Monitor className={styles.codeMonitor} title="AMADEUS / RUNTIME.PY">
      <CodeEditor />
      <div className={styles.terminal}>$ runtime.study<span className={styles.cursor}>▌</span><br /><span>PLAN → EXECUTE → REFLECT</span></div>
    </Monitor>
    <Monitor className={styles.visionMonitor} title="LUNAMATCH / LUNAR VISION"><LunarScreen globe /></Monitor>
    <Monitor className={styles.systemMonitor} title="LUNAMATCH / IMAGE REGISTRATION"><LunarScreen /></Monitor>
    <Monitor className={styles.sideMonitor} title="AST_ / SYSTEMS">
      <div className={styles.miniCode}>{code.slice(1).map(line=><div key={line}>{line}</div>)}</div>
      <svg className={styles.signal} viewBox="0 0 180 120">{Array.from({length:7},(_,i)=><path key={i} d={`M0 ${95-i*7}Q40 ${35-i*4} 65 ${68-i*6}T120 ${50-i*4}T180 ${80-i*6}`} pathLength="1" />)}</svg>
      <div className={styles.pipeline}>{['PLAN', 'TOOLS', 'MEMORY'].map((node, i) => <div key={node} style={{ '--order': i }}>{node}</div>)}</div>
      <span className={styles.studyLabel}>ARCHITECTURE STUDY</span>
    </Monitor>
    <Monitor className={styles.metricsMonitor} title="RUNTIME / DIAGNOSTICS"><Diagnostics /></Monitor>
    <div className={styles.stand} />
    <div className={styles.desk} /><div className={styles.deskLeg} /><div className={styles.leftLeg} />
    <div className={styles.keyboard}>{Array.from({length:36},(_,i)=><span key={i} />)}</div>
    <div className={styles.mouse} /><div className={styles.cup} />
    <div className={styles.books}><span /><span /><span /></div>
    <WorkstationPlant className={styles.plant} />
    <WorkstationChair className={styles.chair} />
  </div>;
}
