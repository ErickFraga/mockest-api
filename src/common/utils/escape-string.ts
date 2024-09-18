export function escapeString(str: string): string {
  return str.replace(/[<>'";]/g, (char) => {
    const escapeMap: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
      ';': '&#59;',
    };
    return escapeMap[char] || char;
  });
}

export function unescapeString(str: string): string {
  return str.replace(/&lt;|&gt;|&#39;|&quot;|&#59;/g, (char) => {
    const unescapeMap: { [key: string]: string } = {
      '&lt;': '<',
      '&gt;': '>',
      '&#39;': "'",
      '&quot;': '"',
      '&#59;': ';',
    };
    return unescapeMap[char] || char;
  });
}
