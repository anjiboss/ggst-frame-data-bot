const creatDataTable = (data, charName) => {
  const keys = Object.keys(data);
  let table = "";
  for (let i = 0; i < keys.length - 1; i++) {
    table += `${keys[i]}: ${data[keys[i]]}\n`;
  }
  return `
    \`\`\`json
"Character: ${charName}"
${table}
    \`\`\`
  `;
};

module.exports = creatDataTable;
