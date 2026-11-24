"use strict";
/* Typed language model for the existing signed-in classroom header. */
(() => {
    function normalize(value) {
        return value === 'en-ne' || value === 'en-roman' || value === 'all' || value === 'en' ? value : 'en-ne';
    }
    function copy(selected, first, dark) {
        const mode = normalize(selected);
        const greetings = {
            'en-ne': 'Welcome back 👋 नमस्ते, ' + first + ' 🙏',
            'en-roman': 'Welcome back 👋 Namaste, ' + first + ' 🙏',
            all: 'Welcome back 👋 नमस्ते (Namaste), ' + first + ' 🙏',
            en: 'Welcome back 👋 ' + first
        };
        const signout = {
            'en-ne': 'Sign out · लगआउट ', 'en-roman': 'Sign out · Lagaaut ',
            all: 'Sign out · लगआउट (Lagaaut) ', en: 'Sign out '
        };
        const en = dark ? 'Light' : 'Dark';
        const ne = dark ? 'उज्यालो' : 'अँध्यारो';
        const roman = dark ? 'Ujyalo' : 'Andhyaro';
        const themeLabel = mode === 'en-ne' ? en + ' · ' + ne : mode === 'en-roman' ? en + ' · ' + roman : mode === 'all' ? en + ' · ' + ne + ' (' + roman + ')' : en;
        const themeAria = (dark ? 'Switch to light mode' : 'Switch to dark mode') + (mode === 'en-ne' ? ' · ' + ne : mode === 'en-roman' ? ' · ' + roman + ' mode' : mode === 'all' ? ' · ' + ne + ' (' + roman + ')' : '');
        return { greeting: greetings[mode], signout: signout[mode], themeLabel, themeAria };
    }
    window.sikauHeaderLanguage = Object.freeze({ normalize, copy });
})();
