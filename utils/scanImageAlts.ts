import fs from 'fs';
import path from 'path';

export interface ImageAltScanResult {
    file: string;
    line: number;
    snippet: string;
    altText: string | null;
    status: 'PASS' | 'WARN' | 'FAIL';
    message: string;
}

const GENERIC_ALT_WORDS = ['image', 'photo', 'picture', 'pic', 'icon', 'logo', 'placeholder', 'img', 'banner', 'untitled'];

/**
 * Scans a file content for <img ...> tags and validates their alt attributes.
 */
export function scanFileForImageAlts(filePath: string): ImageAltScanResult[] {
    const results: ImageAltScanResult[] = [];
    if (!fs.existsSync(filePath)) return results;

    const content = fs.readFileSync(filePath, 'utf-8');

    // Regex to match <img ... > across single or multiple lines
    const imgRegex = /<img\s+[^>]*>/gs;
    let match: RegExpExecArray | null;

    while ((match = imgRegex.exec(content)) !== null) {
        const fullMatch = match[0];
        const matchIndex = match.index;

        // Calculate line number
        const lineNumber = content.substring(0, matchIndex).split('\n').length;
        
        // Clean snippet for presentation
        const cleanSnippet = fullMatch.replace(/\s+/g, ' ').trim();

        // Extract alt attribute value (handles alt="...", alt='...', alt={...})
        const altMatch = fullMatch.match(/alt=(?:{([^}]+)}|"([^"]*)"|'([^']*)')/i);

        let altText: string | null = null;
        if (altMatch) {
            altText = (altMatch[1] || altMatch[2] || altMatch[3] || '').trim();
        }

        if (!altMatch) {
            results.push({
                file: filePath,
                line: lineNumber,
                snippet: cleanSnippet,
                altText: null,
                status: 'FAIL',
                message: 'Missing "alt" attribute completely.'
            });
        } else if (!altText || altText === '""' || altText === "''") {
            results.push({
                file: filePath,
                line: lineNumber,
                snippet: cleanSnippet,
                altText: '',
                status: 'WARN',
                message: 'Empty "alt" attribute (alt=""). Decorative or needs descriptive text.'
            });
        } else if (GENERIC_ALT_WORDS.includes(altText.toLowerCase())) {
            results.push({
                file: filePath,
                line: lineNumber,
                snippet: cleanSnippet,
                altText,
                status: 'WARN',
                message: `Generic or non-descriptive alt text "${altText}". Add more detail for SEO & accessibility.`
            });
        } else if (altText.length < 5 && !altText.startsWith('{')) {
            results.push({
                file: filePath,
                line: lineNumber,
                snippet: cleanSnippet,
                altText,
                status: 'WARN',
                message: `Alt text "${altText}" is very short (< 5 characters).`
            });
        } else {
            results.push({
                file: filePath,
                line: lineNumber,
                snippet: cleanSnippet,
                altText,
                status: 'PASS',
                message: `Valid descriptive alt tag.`
            });
        }
    }

    return results;
}

/**
 * Recursively scans a directory for .tsx, .jsx, .html, .vue, .svelte files
 */
export function scanDirectoryForImageAlts(dirPath: string): ImageAltScanResult[] {
    let results: ImageAltScanResult[] = [];
    if (!fs.existsSync(dirPath)) return results;

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            if (!['node_modules', 'dist', '.git', 'build'].includes(entry.name)) {
                results = results.concat(scanDirectoryForImageAlts(fullPath));
            }
        } else if (/\.(tsx|jsx|html|js|ts)$/.test(entry.name)) {
            results = results.concat(scanFileForImageAlts(fullPath));
        }
    }

    return results;
}

// CLI Execution entrypoint
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('scanImageAlts')) {
    const targetDir = process.argv[2] || path.join(process.cwd(), 'components');
    console.log(`\n🔍 Scanning image alt tags in directory: ${targetDir}\n`);

    const scanResults = scanDirectoryForImageAlts(targetDir);

    let passCount = 0;
    let warnCount = 0;
    let failCount = 0;

    scanResults.forEach((res) => {
        const icon = res.status === 'PASS' ? '✅' : res.status === 'WARN' ? '⚠️' : '❌';
        console.log(`${icon} [${res.status}] ${res.file}:${res.line}`);
        console.log(`   Snippet : ${res.snippet.substring(0, 90)}${res.snippet.length > 90 ? '...' : ''}`);
        console.log(`   Alt Text: ${res.altText !== null ? `"${res.altText}"` : 'None'}`);
        console.log(`   Detail  : ${res.message}\n`);

        if (res.status === 'PASS') passCount++;
        if (res.status === 'WARN') warnCount++;
        if (res.status === 'FAIL') failCount++;
    });

    console.log('----------------------------------------------------');
    console.log(`📊 Scan Summary: Total Images Scanned = ${scanResults.length}`);
    console.log(`   ✅ PASS: ${passCount}`);
    console.log(`   ⚠️ WARN: ${warnCount}`);
    console.log(`   ❌ FAIL: ${failCount}`);
    console.log('----------------------------------------------------\n');

    if (failCount > 0) {
        console.error('❌ Failing due to missing image alt attributes.');
        process.exit(1);
    } else {
        console.log('✨ Image accessibility & SEO scan completed successfully!');
    }
}
