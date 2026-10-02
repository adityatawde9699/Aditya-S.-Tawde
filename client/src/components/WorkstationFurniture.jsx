import { useId } from 'react';

export function WorkstationChair({ className }) {
  const id = useId();
  const back = 'M35 28 Q30 13 51 11 L180 5 Q204 4 210 24 L264 212 Q267 231 245 239 L102 262 Q84 264 78 244Z';
  return <svg className={className} viewBox="0 0 340 390" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-frame`} x1="0" y1="0" x2="1" y2=".7"><stop stopColor="#4A4A4A" /><stop offset=".13" stopColor="#101010" /><stop offset=".8" stopColor="#080808" /><stop offset="1" stopColor="#303030" /></linearGradient>
      <linearGradient id={`${id}-seat`} x2=".3" y2="1"><stop stopColor="#303030" /><stop offset=".35" stopColor="#171717" /><stop offset="1" stopColor="#000000" /></linearGradient>
      <pattern id={`${id}-mesh`} width="4" height="3" patternUnits="userSpaceOnUse" patternTransform="skewY(-7)"><rect width="4" height="3" fill="#080808" /><path d="M0 .5H4M.5 0V3" stroke="#303030" strokeWidth=".45" /></pattern>
      <linearGradient id={`${id}-shade`}><stop stopColor="#000000" stopOpacity=".7" /><stop offset=".65" stopColor="#000000" stopOpacity="0" /><stop offset="1" stopColor="#000000" stopOpacity=".6" /></linearGradient>
    </defs>
    <ellipse cx="196" cy="366" rx="129" ry="15" fill="#000000" opacity=".65" />
    <path d="M198 298V354M198 349L97 374M198 349L296 368M198 349L177 383M198 349L246 330" fill="none" stroke={`url(#${id}-frame)`} strokeWidth="11" strokeLinecap="round" />
    {[ [96,375], [296,369], [177,383] ].map(([x,y])=><rect key={x} x={x-7} y={y-3} width="17" height="10" rx="4" fill="#101010" stroke="#222222" />)}
    <path d="M88 266Q193 242 303 266Q322 269 316 288Q284 312 166 314L104 300Z" fill={`url(#${id}-seat)`} stroke="#222222" />
    <path d="M113 269Q203 253 304 270" fill="none" stroke="#4A4A4A" strokeOpacity=".5" />
    <path d={back} fill={`url(#${id}-mesh)`} stroke={`url(#${id}-frame)`} strokeWidth="12" />
    <path d={back} fill={`url(#${id}-shade)`} />
    <path d="M57 27L92 214Q99 237 125 237L240 216M82 144L232 127" fill="none" stroke="#171717" strokeWidth="7" />
    <path d="M92 228Q111 231 115 251L130 290M242 222L264 275" fill="none" stroke={`url(#${id}-frame)`} strokeWidth="9" />
    <path d="M64 283L58 194Q58 186 72 184L90 183M289 289L306 198Q307 191 295 190L255 194" fill="none" stroke={`url(#${id}-frame)`} strokeWidth="10" strokeLinejoin="round" />
    <path d="M49 182L90 176Q98 177 98 184L56 193Q47 194 49 182M250 186L299 181Q312 181 314 190L263 202Q251 202 250 186" fill={`url(#${id}-seat)`} stroke="#303030" />
  </svg>;
}

export function WorkstationPlant({ className }) {
  const id = useId();
  return <svg className={className} viewBox="0 0 150 180" aria-hidden="true">
    <defs><linearGradient id={id}><stop stopColor="#080808" /><stop offset=".4" stopColor="#303030" /><stop offset="1" stopColor="#101010" /></linearGradient></defs>
    <g stroke="#303030" fill="none" strokeWidth="1.2"><path d="M77 132L71 36M74 94L39 56M75 105L119 65M72 71L111 34M76 112L24 93M73 81L40 24M73 69L87 14" /></g>
    {Array.from({length:28},(_,i)=>{
      const x=26+(i*37%100), y=20+(i*23%86), angle=(i*47%150)-75;
      return <g key={i} transform={`translate(${x} ${y}) rotate(${angle})`}><path d="M0 0Q-17-19-24-5Q-17 7 0 0Q17-17 25-4Q16 8 0 0" fill={`url(#${id})`} stroke="#4A4A4A" strokeWidth=".35" /><path d="M-20-4L0 0L20-3" stroke="#707070" strokeOpacity=".4" strokeWidth=".4" /></g>;
    })}
    <ellipse cx="76" cy="174" rx="34" ry="4" fill="#000000" />
    <path d="M47 127L54 169Q76 179 98 169L105 127Z" fill={`url(#${id})`} stroke="#303030" />
    <ellipse cx="76" cy="127" rx="29" ry="5" fill="#080808" stroke="#4A4A4A" />
  </svg>;
}
