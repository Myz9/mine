// mineflayer bot to stay active on server and mimic human-like behavior
const mineflayer = require('mineflayer')
const { Vec3 } = require('vec3')

function createBot() {
  const bot = mineflayer.createBot({
    host: 'MarahRaya.aternos.me', // حط عنوان السيرفر
    port: 41184,                    // البورت (غالبًا 25565 أو خذه من Aternos)
    username: 'MZ_3MK', // or any valid Minecraft name
    auth: 'mojang' // or 'microsoft' if using MS account
  })

  bot.on('spawn', () => {
    console.log('✅ Bot joined the server.')

    // Move randomly every 15 seconds
    setInterval(() => {
      const xOffset = Math.random() * 10 - 5
      const zOffset = Math.random() * 10 - 5
      const target = bot.entity.position.offset(xOffset, 0, zOffset)
      bot.lookAt(target)
      bot.setControlState('forward', true)
      setTimeout(() => bot.setControlState('forward', false), 1000)
    }, 15000)

    // Jump every 25 seconds
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 300)
    }, 25000)

    // Swing arm every 30 seconds
    setInterval(() => {
      bot.swingArm()
    }, 30000)

    // Say something random every 2 minutes
    const chatMessages = ['hello!', 'anyone here?', 'nice world!', 'cool base!']
    setInterval(() => {
      const msg = chatMessages[Math.floor(Math.random() * chatMessages.length)]
      bot.chat(msg)
    }, 120000)
  })

  bot.on('end', () => {
    console.log('❌ Bot disconnected. Reconnecting in 10s...')
    setTimeout(createBot, 10000)
  })

  bot.on('error', err => {
    console.log('⚠️ Bot error:', err)
  })
}

createBot()
