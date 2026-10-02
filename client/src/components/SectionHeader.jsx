const SectionHeader = ({ id, label, title, subtitle }) => (
  <div className="section-heading">
    <h2 id={id}>{label} / {title}</h2>
    {subtitle && <p>{subtitle}</p>}
  </div>
);
export default SectionHeader;
