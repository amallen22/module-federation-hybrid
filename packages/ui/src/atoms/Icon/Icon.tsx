import { useEffect, useMemo, useState } from 'react';
import { IconSharedProps } from './IconSharedProps';
import styles from './Icon.module.scss';

interface IconProps extends IconSharedProps {
  'aria-label'?: string;
}

const svgCache = new Map<string, Promise<string>>();

export const clearIconCache = () => svgCache.clear();

const sanitizeSvg = (svgContent: string): string => {
  return svgContent
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
};

const fetchSvg = (url: string): Promise<string> => {
  if (!svgCache.has(url)) {
    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load icon: HTTP ${res.status} - ${res.statusText}`);
        }
        return res.text();
      })
      .then(sanitizeSvg);

    svgCache.set(url, promise);
  }
  return svgCache.get(url)!;
};

export const getBaseUrl = () => {
  const hostname = window.location.hostname;
  let domain = 'resumecoach';
  let tld = 'com';

  if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    // not storybook
    const hostParts = hostname.split('.');
    const len = hostParts.length;
    if (len > 1) {
      domain = hostParts[len - 2];
      // Support for composed TLDs
      const lastTwo = hostParts.slice(-2).join('.');
      const composedTlds = ['co.uk'];
      if (composedTlds.includes(lastTwo)) {
        tld = lastTwo;
        if (len > 2) domain = hostParts[len - 3];
      } else {
        tld = hostParts[len - 1];
      }
    }
  }
  return `https://static.${domain}.${tld}/assets/common/icons/material_rounded`;
};

// NOTE: Remove this once we migrate to the new icon system everywhere.
const toSnakeCase = (iconName: string): string => {
  if (iconName.includes('-')) return iconName;
  return iconName
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // camelCase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1_$2') // PascalCase
    .toLowerCase();
};

export const Icon = ({ 'data-qa': dataQa, name }: IconProps) => {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const baseUrl = useMemo(() => getBaseUrl(), []);
  const snakeCaseName = useMemo(() => toSnakeCase(name), [name]);
  const url = useMemo(() => `${baseUrl}/${snakeCaseName}.svg`, [baseUrl, snakeCaseName]);
  const ariaLabel = useMemo(() => name.replace(/[_-]/g, ' '), [name]);

  useEffect(() => {
    fetchSvg(url).then(setSvg).catch(setError);
  }, [url]);

  if (!svg || error)
    return (
      <span
        className={styles['icon-wrapper']}
        data-qa={dataQa}
        role="img"
        aria-label={`Error loading ${name}`}
        title={`Error loading ${name}`}
      />
    );

  return (
    <span
      className={styles['icon-wrapper']}
      data-qa={dataQa}
      role="img"
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

