import { RESUME_PATH } from '../config/social';
export default function Resume() {
  return <a id="resume" href={RESUME_PATH} download className="text-link">Download résumé ↓</a>;
}
