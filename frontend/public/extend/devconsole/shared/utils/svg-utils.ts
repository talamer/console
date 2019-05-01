export function createFilterIdUrl(id: string): string {
  return `url(${`${location.pathname}${location.search}`}#${id})`;
}
