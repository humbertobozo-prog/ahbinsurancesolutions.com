export interface Metric {
    name: 'LCP' | 'CLS' | 'FCP' | 'FID' | 'TTFB' | 'INP';
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
    INP?: Metric;
}

declare global {
    interface Window {
        __webVitals?: WebVitalsStore;
        __AHB_ANALYTICS_ENDPOINT__?: string;
    }
}

// Performance thresholds based on Google Core Web Vitals guidelines
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 }, // ms
    CLS: { good: 0.1, poor: 0.25 },   // score
    FCP: { good: 1800, poor: 3000 }, // ms
    FID: { good: 100, poor: 300 },   // ms
    TTFB: { good: 800, poor: 1800 }, // ms
    INP: { good: 200, poor: 500 },   // ms
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
 * Tracks First Input Delay (FID)
 */
function trackFID(onReport: ReportHandler) {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                const fidEntry = entry as PerformanceEntry & { processingStart: number; startTime: number };
                const delay = fidEntry.processingStart - fidEntry.startTime;
                if (delay >= 0) {
                    const metric: Metric = {
                        name: 'FID',
                        value: Math.round(delay),
                        rating: getRating('FID', delay),
                        delta: Math.round(delay),
                        id: generateId(),
                    };
                    onReport(metric);
                    observer.disconnect();
                    break;
                }
            }
        });

        observer.observe({ type: 'first-input', buffered: true });
    } catch {
        // Fallback
    }
}

/**
 * Tracks Time to First Byte (TTFB)
 */
function trackTTFB(onReport: ReportHandler) {
    if (typeof performance === 'undefined') return;

    try {
        const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navEntries && navEntries.length > 0) {
            const nav = navEntries[0];
            const ttfb = nav.responseStart;
            if (ttfb >= 0) {
                const metric: Metric = {
                    name: 'TTFB',
                    value: Math.round(ttfb),
                    rating: getRating('TTFB', ttfb),
                    delta: Math.round(ttfb),
                    id: generateId(),
                };
                onReport(metric);
            }
        }
    } catch {
        // Fallback
    }
}

/**
 * Tracks Interaction to Next Paint (INP)
 */
function trackINP(onReport: ReportHandler) {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
        let maxDuration = 0;
        const metricId = generateId();

        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                const evt = entry as PerformanceEntry & { duration: number; interactionId?: number };
                if (evt.interactionId && evt.duration > maxDuration) {
                    maxDuration = evt.duration;
                }
            }
        });

        // Observe events with interaction IDs
        observer.observe({ type: 'event', buffered: true, durationThreshold: 16 } as unknown as PerformanceObserverInit);

        addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden' && maxDuration > 0) {
                const metric: Metric = {
                    name: 'INP',
                    value: Math.round(maxDuration),
                    rating: getRating('INP', maxDuration),
                    delta: Math.round(maxDuration),
                    id: metricId,
                };
                onReport(metric);
                observer.disconnect();
            }
        }, { once: true });
    } catch {
        // Fallback
    }
}

/**
 * Warns on long tasks that block the main thread for over 50ms
 */
function trackLongTasks() {
    if (typeof PerformanceObserver === 'undefined') return;

    try {
        const observer = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (entry.duration > 50) {
                    console.warn(
                        `%c[AHB Performance Warning] Long Task detected: ${Math.round(entry.duration)}ms blocking main thread.`,
                        'color: #D97706; font-weight: bold;'
                    );
                }
            }
        });

        observer.observe({ type: 'longtask', buffered: true });
    } catch {
        // Fallback
    }
}

/**
 * Initializes Core Web Vitals tracking for LCP, CLS, FCP, FID, TTFB, and INP.
 * Logs metrics to dev console, saves to window.__webVitals, dispatches custom events, and reports to monitoring endpoints if configured.
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

        // Send telemetry payload to monitoring endpoint if defined
        const endpoint = window.__AHB_ANALYTICS_ENDPOINT__;
        if (endpoint) {
            const body = JSON.stringify({
                metric,
                page: window.location.pathname,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
            });
            if (navigator.sendBeacon) {
                navigator.sendBeacon(endpoint, body);
            } else {
                fetch(endpoint, { body, method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {});
            }
        }

        if (customHandler) {
            customHandler(metric);
        }
    };

    trackLCP(handleReport);
    trackCLS(handleReport);
    trackFCP(handleReport);
    trackFID(handleReport);
    trackTTFB(handleReport);
    trackINP(handleReport);
    trackLongTasks();
}

