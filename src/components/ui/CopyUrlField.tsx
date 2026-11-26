'use client';

import { useEffect, useRef, useState } from 'react';

interface CopyUrlFieldProps {
  origin: string;
  path: string;
  className?: string;
}

type CopyStatus = 'idle' | 'copied' | 'failed';

export function CopyUrlField({ origin, path, className = '' }: CopyUrlFieldProps) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const urlRef = useRef<HTMLElement>(null);
  const resetRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = `${origin}${path}`;
  const [pathname, query] = path.split('?');

  useEffect(() => {
    setStatus('idle');
  }, [url]);

  useEffect(() => () => {
    if (resetRef.current) clearTimeout(resetRef.current);
  }, []);

  const selectUrlText = () => {
    const node = urlRef.current;
    const selection = window.getSelection();
    if (!node || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleCopy = async () => {
    if (resetRef.current) clearTimeout(resetRef.current);
    try {
      await navigator.clipboard.writeText(url);
      setStatus('copied');
      resetRef.current = setTimeout(() => setStatus('idle'), 2400);
    } catch {
      selectUrlText();
      setStatus('failed');
    }
  };

  return (
    <div className={className}>
      <div
        data-copied={status === 'copied'}
        className="flex flex-col gap-3 rounded-plate border-2 border-line bg-sunken p-3 transition-colors data-[copied=true]:border-accent sm:flex-row sm:items-center sm:p-4"
      >
        <code
          ref={urlRef}
          id="generated-url"
          aria-label="Generated image URL"
          className="min-w-0 flex-1 break-all font-mono text-base leading-relaxed sm:text-lg"
        >
          {/* inline-block keeps the path whole and wraps the query as a unit on narrow screens */}
          <span className="inline-block">
            <span className="text-muted">{origin}</span>
            <span className="text-ink">{pathname}</span>
          </span>
          {query && <span className="inline-block text-accent">?{query}</span>}
        </code>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-describedby="generated-url"
            className="btn-primary min-w-[9.5rem] flex-1 sm:flex-none"
          >
            {status === 'copied' ? (
              <>
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
                Copied
              </>
            ) : (
              'Copy URL'
            )}
          </button>
          <a href={path} target="_blank" rel="noopener noreferrer" className="btn-quiet">
            Open<span className="sr-only"> image in a new tab</span>
          </a>
        </div>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 font-mono text-xs text-muted">
        {status === 'copied' && 'Copied to your clipboard. Paste it anywhere an image goes.'}
        {status === 'failed' && 'Clipboard is blocked here — the URL is selected, press Ctrl/⌘ + C.'}
      </p>
    </div>
  );
}
