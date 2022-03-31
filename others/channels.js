const db = require('quick.db')

module.exports = async client => {
  
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const players = db.get(`players`)
  const zombieChat = guild.channels.cache.find(c => c.name === "zombies")
  const banditChat = guild.channels.cache.find(c => c.name === "bandit")
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat")
  const wwChat = guild.channels.cache.find(c => c.name === "werewolves-chat")
  
  players.forEach(async player => {
    let guy = db.get(`player_${player}`)
    let channel = guild.channels.cache.get(guy.channel)
    
    if (!guy.nightmared || !guy.jailed || !guy.hypnotized) {
      if (guy.role === "Zombie") {
        zombieChat.permissionOverwrites.edit(guy.id, { 
        SEND_MESSAGES: true, 
        VIEW_CHANNEL: true, 
        READ_MESSAGE_HISTORY: true 
      })
      } else if (guy.role === "Bandit" || guy.role === "Accomplice") {
        banditChat.permissionOverwrites.edit(guy.id, { 
        SEND_MESSAGES: true, 
        VIEW_CHANNEL: true, 
        READ_MESSAGE_HISTORY: true 
      })
      } else if (guy.team === "Werewolf") {
        wwChat.permissionOverwrites.edit(guy.id, { 
        SEND_MESSAGES: true, 
        VIEW_CHANNEL: true, 
        READ_MESSAGE_HISTORY: true 
      })
      }
      
        dayChat.permissionOverwrites.edit(guy.id, { 
        SEND_MESSAGES: false, 
        VIEW_CHANNEL: true, 
        READ_MESSAGE_HISTORY: true 
      })
  })
}