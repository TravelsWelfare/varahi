import { ComponentType, lazy } from 'react';

interface ImportOptions {
  ssr?: boolean;
  preload?: boolean;
}

export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: ImportOptions = { ssr: false, preload: false }
) {
  if (options.preload) {
    const preloadPromise = importFn();
    // Preload the chunk
    preloadPromise.then(() => {});
  }

  return lazy(() =>
    importFn().then((module) => ({
      default: module.default,
    }))
  );
}

export function preloadRoute(route: string) {
  const manifestElement = document.querySelector('link[rel="modulepreload"][as="script"]');
  if (manifestElement) {
    const manifestUrl = manifestElement.getAttribute('href');
    if (manifestUrl) {
      // Preload the chunk based on route
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = `${route}.js`;
      document.head.appendChild(link);
    }
  }
}