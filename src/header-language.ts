/* Typed language model for the existing signed-in classroom header. */
(() => {
  type DisplayLanguage = 'en-ne' | 'en-roman' | 'all' | 'en';
  type HeaderCopy = Readonly<{ greeting: string; signout: string; themeLabel: string; themeAria: string }>;
  function normalize(value: unknown): DisplayLanguage {
    return value === 'en-ne' || value === 'en-roman' || value === 'all' || value === 'en' ? value : 'en-ne';
  }
  function copy(selected: unknown, first: string, dark: boolean): HeaderCopy {
    const mode = normalize(selected);
    const greetings: Record<DisplayLanguage, string> = {
      'en-ne': 'Welcome back 👋 नमस्ते, ' + first + ' 🙏',
      'en-roman': 'Welcome back 👋 Namaste, ' + first + ' 🙏',
      all: 'Welcome back 👋 नमस्ते (Namaste), ' + first + ' 🙏',
      en: 'Welcome back 👋 ' + first
    };
    const signout: Record<DisplayLanguage, string> = {
      'en-ne': 'Sign out · लगआउट ', 'en-roman': 'Sign out · Lagaaut ',
      all: 'Sign out · लगआउट (Lagaaut) ', en: 'Sign out '
    };
    const en = dark ? 'Light' : 'Dark';
    const ne = dark ? 'उज्यालो' : 'अँध्यारो';
    const roman = dark ? 'Ujyalo' : 'Andhyaro';
    const themeLabel = mode === 'en-ne' ? en + ' · ' + ne : mode === 'en-roman' ? en + ' · ' + roman : mode === 'all' ? en + ' · ' + ne + ' (' + roman + ')' : en;
    const themeAria = (dark ? 'Switch to light mode' : 'Switch to dark mode') + (mode === 'en-ne' ? ' · ' + ne : mode === 'en-roman' ? ' · ' + roman + ' mode' : mode === 'all' ? ' · ' + ne + ' (' + roman + ')' : '');
    return {greeting: greetings[mode], signout: signout[mode], themeLabel, themeAria};
  }
  (window as Window & {sikauHeaderLanguage?: Readonly<{normalize: typeof normalize; copy: typeof copy}>}).sikauHeaderLanguage = Object.freeze({normalize, copy});
})();
