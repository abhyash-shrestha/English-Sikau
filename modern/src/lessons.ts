/** All entries refer to original, authenticated classroom navigation. */
export const lessons = [
  { id: 'coach', selector: '[data-t="coach"]', icon: '💬', en: 'Coach', ne: 'कुराकानी' },
  { id: 'translate', selector: '[data-t="tr"]', icon: '🔄', en: 'Translate', ne: 'अनुवाद' },
  { id: 'read', selector: '[data-t="rd"]', icon: '📖', en: 'Read', ne: 'पढ्नुहोस्' },
  { id: 'words', selector: '[data-t="words"]', icon: '🔤', en: 'Words', ne: 'शब्दहरू' },
  { id: 'write', selector: '[data-t="hw"]', icon: '✍️', en: 'Write', ne: 'लेखन' },
  { id: 'speak', selector: '[data-t="sp"]', icon: '🎙️', en: 'Speak', ne: 'बोल्नुहोस्' },
  { id: 'visa', selector: '.sikau-visa-nav', icon: '🛂', en: 'US Visa', ne: 'अमेरिकी भिसा' },
  { id: 'game', selector: '[data-t="game"]', icon: '🎮', en: 'Game', ne: 'खेल' },
  { id: 'progress', selector: '[data-t="pg"]', icon: '📈', en: 'Progress', ne: 'प्रगति' },
  { id: 'practice', selector: '[data-t="learn"]', icon: '📝', en: 'Practice', ne: 'अभ्यास' },
] as const;

export type Lesson = (typeof lessons)[number];
export type LessonId = Lesson['id'];
export type DisplayLanguage = 'en' | 'en-ne' | 'en-roman' | 'all';
export function visibleLessons(isAvailable: (selector: string) => boolean): Lesson[] {
  return lessons.filter(lesson => isAvailable(lesson.selector));
}
export function selectorFor(id: LessonId): string | undefined {
  return lessons.find(lesson => lesson.id === id)?.selector;
}
export function normalizeLanguage(value: unknown): DisplayLanguage {
  return value === 'en' || value === 'en-roman' || value === 'all' || value === 'en-ne' ? value : 'en-ne';
}
