import type { CollectionEntry } from 'astro:content';
import type { Locale } from './href';

/**
 * A blog post in either language.
 *
 * The two collections share an identical schema, so components can accept
 * either. Before this existed there were parallel `ES_` copies of every card
 * component whose only difference was this type parameter.
 */
export type Post = CollectionEntry<'blog'> | CollectionEntry<'es'>;

/**
 * Year shown on cards and in the fact sheet.
 * UTC because a bare `pubDate: '2024'` parses as midnight UTC on 1 January,
 * which the local getter would report as 2023 anywhere west of Greenwich.
 */
export function postYear(post: Post): number {
  return post.data.pubDate.getUTCFullYear();
}

/** Content collection backing a locale. */
export function collectionFor(locale: Locale): 'blog' | 'es' {
  return locale === 'es' ? 'es' : 'blog';
}
