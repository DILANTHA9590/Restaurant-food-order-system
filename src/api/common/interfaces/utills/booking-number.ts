export function genarateId(prefix: string, count: number) {
  if (prefix != 'TBL') {
    const year = new Date().getFullYear().toString();
    return `${prefix}-${year}-${Math.floor(100000 + Math.random() * 900000).toString() + count.toString()}`;
  }

  return `${prefix}-${1155 * 2 + count}`;
}
