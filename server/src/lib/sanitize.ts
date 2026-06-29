/**
 * HTML-stripping sanitizer. Replaces the Django `bleach.clean(tags=[], strip=True)`
 * call used in ContactSerializer. Removes all tags/markup so stored + emailed
 * text is plain.
 */

export function sanitizeText(value: string): string {
  return value
    // Drop script/style blocks entirely (including contents).
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    // Strip any remaining tags.
    .replace(/<\/?[^>]+(>|$)/g, '')
    // Collapse common HTML entities a stripper would leave behind.
    .replace(/&nbsp;/gi, ' ')
    .trim();
}

/**
 * Returns true if the input contained HTML/markup (i.e. sanitizing changed it).
 * Mirrors the Django validators that reject any input containing HTML.
 */
export function containsHtml(value: string): boolean {
  return sanitizeText(value) !== value.trim();
}
