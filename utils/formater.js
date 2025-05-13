import config from '../config.js';

export const formater = {
  exams: (exams) => {
    let message = `📢 *Екзамени на найближчі ${config.daysAhead} днів:*\n\n`;

    Object.entries(exams).forEach(([date, times]) => {
      message += `📅 *Дата:* ${date}\n`;
      times.forEach(({ time, places }) => {
        message += `🕒 *Час:* ${time || '—'}, *Місць:* ${places || '—'}\n`;
      });
      message += '\n';
    });

    return message;
  },

  selected: (examInfo) => {
    const formattedInfo = examInfo
      .replace(/Termin i szczegóły egzaminu/, '📋 *Termin i szczegóły egzaminu*')
      .replace(/Kategoria:/, '*🅱 Kategoria:*')
      .replace(/WORD:/, '*🗺️ WORD:*')
      .replace(/Dodatkowe[\s\S]*?(?=Egzamin)/, '')
      .replace(/Egzamin praktyczny/, '*🛞 Egzamin:* praktyczny')
      .replace(/Data i godzina egzaminu:/, '*📅 Data i godzina:*');

    return `*Обрано екзамен:* \n\n${formattedInfo}`
  }
}