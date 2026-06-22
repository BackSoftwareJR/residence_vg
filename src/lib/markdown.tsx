import type { ReactNode } from 'react';
import Link from 'next/link';

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      const href = match[2];
      const isInternal = href.startsWith('/');
      nodes.push(
        isInternal ? (
          <Link key={`${match.index}-link`} href={href} className="text-forest underline underline-offset-2 hover:text-gold-700">
            {match[1]}
          </Link>
        ) : (
          <a
            key={`${match.index}-link`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-forest underline underline-offset-2 hover:text-gold-700"
          >
            {match[1]}
          </a>
        ),
      );
    } else if (match[3]) {
      nodes.push(<strong key={`${match.index}-bold`}>{match[3]}</strong>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="prose-article space-y-5 font-sans text-base leading-relaxed text-ink-light">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={i} className="mt-8 font-display text-2xl font-semibold text-forest first:mt-0">
              {trimmed.slice(3)}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="mt-6 font-display text-xl font-semibold text-forest">
              {trimmed.slice(4)}
            </h3>
          );
        }

        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter((line) => line.startsWith('- '));
          return (
            <ul key={i} className="list-disc space-y-2 pl-5">
              {items.map((item, j) => (
                <li key={j}>{parseInline(item.slice(2))}</li>
              ))}
            </ul>
          );
        }

        if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
          return (
            <p key={i} className="italic text-ink-muted">
              {parseInline(trimmed.slice(1, -1))}
            </p>
          );
        }

        return <p key={i}>{parseInline(trimmed)}</p>;
      })}
    </div>
  );
}
