// scripts/update-ngrok-url.js
const fs = require('fs');
const path = require('path');
const ngrok = require('ngrok');

async function main() {
  try {
    // 1. open ngrok tunnel
    const url = await ngrok.connect(8080);

    // 2. locate your config
    const configPath = path.resolve(__dirname, '../utils/ngrokConfig.ts');
    let content = fs.readFileSync(configPath, 'utf8');

    // 3. replace the URL literal
    content = content.replace(
      /const\s+NGROK_URL\s*=\s*".*";/,
      `const NGROK_URL = "${url}";`
    );

    fs.writeFileSync(configPath, content, 'utf8');
    console.log(`ngrokConfig.ts updated to ${url}`);

  } catch (e) {
    console.error('Failed to start or update ngrok:', e);
    process.exit(1);
  }
}

main();
