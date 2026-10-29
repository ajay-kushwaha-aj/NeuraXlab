/**
 * Utilities for exporting and importing CMS data (JSON & CSV)
 */

export function downloadJson(data, filename) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `neuroxlab-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportPublicationsToCsv(publications, filename = 'neuroxlab-publications.csv') {
  if (!publications || !publications.length) return;

  const headers = [
    'ID', 'Title', 'Type', 'Authors', 'Journal/Book', 'Year',
    'Volume', 'Issue', 'Pages', 'DOI', 'PMID', 'ISBN', 'Publisher URL', 'Status'
  ];

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = publications.map(p => [
    escapeCsv(p.id),
    escapeCsv(p.title),
    escapeCsv(p.pubType || p.category || 'journal_article'),
    escapeCsv(Array.isArray(p.authors) ? p.authors.join(', ') : p.authors),
    escapeCsv(p.journalOrBook || p.journal),
    escapeCsv(p.pubYear || p.year),
    escapeCsv(p.volume || ''),
    escapeCsv(p.issue || ''),
    escapeCsv(p.pages || ''),
    escapeCsv(p.doi || ''),
    escapeCsv(p.pmid || ''),
    escapeCsv(p.isbn || ''),
    escapeCsv(p.publisherUrl || p.link || ''),
    escapeCsv(p.status || 'published')
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function parseCsv(csvText) {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  // Simple CSV line parser respecting quotes
  const parseLine = (text) => {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseLine(lines[0]).map(h => h.toLowerCase().replace(/[^a-z0-9]/g, ''));
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const vals = parseLine(lines[i]);
    if (vals.length === headers.length) {
      const record = {};
      headers.forEach((h, idx) => {
        record[h] = vals[idx];
      });
      records.push(record);
    }
  }

  return records;
}

