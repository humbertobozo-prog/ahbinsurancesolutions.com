export interface Metric {
    name: 'LCP' | 'CLS' | 'FCP' | 'FID' | 'TTFB';
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    delta: number;
    id: string;
}

export type ReportHandler = (metric: Metric) => void;

interface WebVitalsStore {
    LCP?: Metric;
    CLS?: Metric;
    FCP?: Metric;
    FID?: Metric;
    TTFB?: Metric;
}

declare global {
    interface Window {
        __webVitals?: WebVitalsStore;
    }
}

// Performance thresholds based on Google Core Web Vitals guidelines
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 }, // ms
    CLS: { good: 0.1, poor: 0.25 },   // score
    FCP: { good: 1800, poor: 3000 }, // ms
    FID: { good: 100, poor: 300 },   // ms
    TTFB: { good: 800, poor: 1800 }, // ms
};

function getRating(name: keyof typeof THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
    const limits = THRESHOLDS[name];
    if (!limits) return 'good';
    if (value <= limits.good) return 'good';
    if (value <= limits.poor) return 'needs-improvement';
    return 'poor';
}

function generateId(): string {
    return `v3-${Date.now()}-${Math.floor(Math.random() * 899999 + 100000)}`;
}

/**
 * Tracks Largest Contentful Paint (LCP)
 */
function trackLCP(onReport: ReportHandler) {
    if (typeof PerformanceObserver === 'undefined') return;

    let lcpValue = 0;
    const metricId = generateId();

    try {
        const observer = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
            if (lastEntry) {
                lcpValue = lastEntry.startTime;
            }
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });

        const reportLCP = () => {
            if (lcpValue > 0) {
                const metric: Metric = {
                    name: 'LCP',
                    value: Math.round(lcpValue),
                    rating: getRating('LCP', lcpValue),
                    delta: Math.round(lcpValue),
                    id: metricId,
                };
                onReport(metric);
            }
        };

        // Report on visibility hidden or page unload
        addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                reportLCP();
                observer.disconnect();
            }
        }, { once: true });
    } catch {
        // Fallback or unsupported browser feature
    }
}

/**
 * Tracks Cumulative Layout Shift (CLS)
 */
function trackCLS(onReport: ReportHandler) {
    if (typeof PerformanceObserver === 'undefined') return;

    let clsScore = 0;
    const metricId = generateId();

    try {
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // Only count layout shifts without recent user input
                const shiftEntry = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
                if (!shiftEntry.hadRecentInput) {
                    clsScore += shiftEntry.value;
                }
            }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        const reportCLS = () => {
            const roundedScore = Number(clsScore.toFixed(4));
            const metric: Metric = {
                name: 'CLS',
                value: roundedScore,
                rating: getRating('CLS', roundedScore),
                delta: roundedScore,
                id: metricId,
            };
            onReport(metric);
        };

        addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                reportCLS();
                observer.disconnect();
            }
        }, { once: true });
    } catch {
        // Fallback
    }
}

/**
 * Tracks First Contentful Paint (FCP)
 */
function trackFCP(onReport: ReportHandler) {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    const metric: Metric = {
                        name: 'FCP',
                        value: Math.round(entry.startTime),
                        rating: getRating('FCP', entry.startTime),
                        delta: Math.round(entry.startTime),
                        id: generateId(),
                    };
                    onReport(metric);
                    observer.disconnect();
                }
            }
        });

        observer.observe({ type: 'paint', buffered: true });
    } catch {
        // Fallback
    }
}

/**
 * Initializes Core Web Vitals tracking for LCP, CLS, and FCP.
 * Logs metrics to dev console, saves to window.__webVitals, and dispatches custom events.
 */
export function initWebVitals(customHandler?: ReportHandler) {
    if (typeof window === 'undefined') return;

    window.__webVitals = window.__webVitals || {};

    const handleReport: ReportHandler = (metric) => {
        window.__webVitals![metric.name] = metric;

        // Formatted log in console
        const color = metric.rating === 'good' ? '#10B981' : metric.rating === 'needs-improvement' ? '#F59E0B' : '#EF4444';
        const unit = metric.name === 'CLS' ? '' : 'ms';
        
        console.log(
            `%c[AHB Web Vitals] %c${metric.name}: ${metric.value}${unit} (${metric.rating.toUpperCase()})`,
            'color: #002855; font-weight: bold;',
            `color: ${color}; font-weight: bold;`
        );

        // Dispatch browser event for custom analytics integration if needed
        window.dispatchEvent(new CustomEvent('ahb-web-vitals', { detail: metric }));

        if (customHandler) {
            customHandler(metric);
        }
    };

    trackLCP(handleReport);
    trackCLS(handleReport);
    trackFCP(handleReport);
}
