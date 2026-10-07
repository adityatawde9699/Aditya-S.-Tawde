import { SKILLS_DATA } from '../data/projectData';
import { usePortfolio } from '../hooks/usePortfolio';
import SectionHeader from './SectionHeader';
import styles from './Skills.module.css';
const categories = { FRONTEND: 'Frontend / Desktop', BACKEND: 'Backend', AI_ML: 'AI / ML', TOOLS: 'Infrastructure' };
export default function Skills() {
  const { skills = [] } = usePortfolio();
  const known = new Set(SKILLS_DATA.flatMap(group => group.badges).map(name => name.toLowerCase()));
  const groups = SKILLS_DATA.map(group => ({ ...group, badges: [...group.badges, ...skills.filter(skill => categories[skill.category] === group.title && !known.has(skill.name.toLowerCase())).map(skill => skill.name)] }));
  return <section id="skills" className="lab-section" aria-labelledby="skills-heading"><SectionHeader id="skills-heading" label="03" title="Technical skills" subtitle="TOOLS, CHOSEN FOR THE PROBLEM" />
    <div className={styles.matrix}>{groups.map((group, i) => <div key={group.title} className={styles.group}><span className="mono muted">0{i + 1} / {group.title}</span><ul>{group.badges.map(badge => <li key={badge}>{badge}</li>)}</ul></div>)}</div>
  </section>;
}
