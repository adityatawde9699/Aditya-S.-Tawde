import React from 'react';

/**
 * Loading Skeleton Components
 * Used to show placeholder content while data is loading.
 */

const baseStyles = {
    skeleton: {
        background: 'linear-gradient(90deg, #1a1a2e 25%, #252543 50%, #1a1a2e 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
        borderRadius: '8px',
    },
};

// Inject CSS animation
const injectKeyframes = () => {
    if (typeof document !== 'undefined' && !document.getElementById('skeleton-keyframes')) {
        const style = document.createElement('style');
        style.id = 'skeleton-keyframes';
        style.textContent = `
            @keyframes shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    }
};

/**
 * Basic skeleton box
 */
export const SkeletonBox = ({ width = '100%', height = '20px', style = {}, className = '' }) => {
    React.useEffect(() => { injectKeyframes(); }, []);

    return (
        <div
            className={className}
            style={{
                ...baseStyles.skeleton,
                width,
                height,
                ...style,
            }}
            aria-hidden="true"
        />
    );
};

/**
 * Text line skeleton
 */
export const SkeletonText = ({ lines = 1, style = {} }) => {
    React.useEffect(() => { injectKeyframes(); }, []);

    return (
        <div style={{ ...style }}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    style={{
                        ...baseStyles.skeleton,
                        height: '16px',
                        marginBottom: i < lines - 1 ? '8px' : 0,
                        width: i === lines - 1 && lines > 1 ? '70%' : '100%',
                    }}
                    aria-hidden="true"
                />
            ))}
        </div>
    );
};

/**
 * Card skeleton for project cards
 */
export const SkeletonCard = ({ style = {} }) => {
    React.useEffect(() => { injectKeyframes(); }, []);

    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                ...style,
            }}
            aria-hidden="true"
        >
            {/* Image placeholder */}
            <SkeletonBox height="180px" style={{ marginBottom: '16px' }} />

            {/* Title */}
            <SkeletonBox height="24px" width="80%" style={{ marginBottom: '12px' }} />

            {/* Description lines */}
            <SkeletonText lines={2} style={{ marginBottom: '16px' }} />

            {/* Tech tags */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <SkeletonBox height="24px" width="60px" style={{ borderRadius: '12px' }} />
                <SkeletonBox height="24px" width="50px" style={{ borderRadius: '12px' }} />
                <SkeletonBox height="24px" width="70px" style={{ borderRadius: '12px' }} />
            </div>
        </div>
    );
};

/**
 * Grid of skeleton cards
 */
export const SkeletonProjectGrid = ({ count = 6 }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
                padding: '24px 0',
            }}
        >
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

/**
 * Certification card skeleton
 */
export const SkeletonCertification = ({ style = {} }) => {
    React.useEffect(() => { injectKeyframes(); }, []);

    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                ...style,
            }}
            aria-hidden="true"
        >
            <SkeletonBox width="80px" height="80px" />
            <div style={{ flex: 1 }}>
                <SkeletonBox height="20px" width="70%" style={{ marginBottom: '8px' }} />
                <SkeletonBox height="14px" width="50%" style={{ marginBottom: '8px' }} />
                <SkeletonBox height="14px" width="30%" />
            </div>
        </div>
    );
};

export default {
    Box: SkeletonBox,
    Text: SkeletonText,
    Card: SkeletonCard,
    ProjectGrid: SkeletonProjectGrid,
    Certification: SkeletonCertification,
};
