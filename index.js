const mineflayer = require('mineflayer');

let bot;

const SERVER_INFO = {
  host: 'MarahRaya.aternos.me', // حط عنوان السيرفر
  port: 41184,                    // البورت (غالبًا 25565 أو خذه من Aternos)
  username: 'SleepBot',
  version: false
};

function createBot() {
  bot = mineflayer.createBot(SERVER_INFO);

  bot.once('spawn', () => {
    console.log('✅ Bot joined the server.');
  });

  bot.on('message', msg => {
    const text = msg.toString().toLowerCase();
    console.log('💬 Chat:', text);

    if (text.includes('sleep bot')) {
      console.log('🛏️ Received "sleep bot" — disconnecting for 15s...');
      bot.quit();
      setTimeout(() => {
        console.log('🔁 Reconnecting...');
        createBot();
      }, 15000);
    }
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err.message);

    if (err.code === 'ECONNRESET') {
      console.log('🔁 Reconnecting after ECONNRESET...');
      setTimeout(() => createBot(), 5000);
    }
  });

  bot.on('end', () => {
    console.log('🔌 Bot disconnected.');
  });
}

createBot();
