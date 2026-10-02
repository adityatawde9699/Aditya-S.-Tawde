const Backdrop = () => <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(var(--bg-tertiary) 1px, transparent 1px), linear-gradient(90deg, var(--bg-tertiary) 1px, transparent 1px)', backgroundSize: '120px 120px', opacity: .3, maskImage: 'linear-gradient(to bottom, black, transparent 1100px)' }} />;
export default Backdrop;
