const db = require("quick.db") // databas
const { getRole, getEmoji } = require("../../../config")

module.exports = async client => {
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat") // get the day channel - Object 
  const werewolvesChat = guild.channels.cache.find(c => c.name === "werewolves-chat") // get the werewolves channel - Object 
  const players = db.get(`players`) || [] // get the players array - Array<Snowflake> 
  const alivePlayers = players.filter(p => db.get(`player_${p}`).status === "Alive") // get the alive players array - Array<Snowflake> 
  const deadPlayers = players.filter(p => !alivePlayers.includes(p)) // get the dead players array - Array<Snowflake> c
  const dreamcatcher = alivePlayers.filter(p => db.get(`player_${p}`).role === "Dreamcatcher") // get the alive dreamcatcher array - Array<Snowflake>
  
  for (let dc in dreamcatcher) {
    let attacker = db.get(`player_${dc}`)
    if (attacker.status === "Alive") {
      if (attacker.target) {
        
        let guy = db.get(`player_${attacker.target}`) // check if the dc's target is alive 
        
        if (guy.status === "Alive") {
          db.set(`player_${guy.id}.hypnotized`, true)
          let channel = guild.channels.cache.get(guy.channel)
          await channel.permissionsOverwrites.edit(guy.id, {
            SEND_MESSAGES: false
          })
          channel.send(`<@&892046206698680390> The dreamcatcher has hypnotized you, The only thing you can do is wait and die..`)
          
          let dcChannel = await message.guild.channels.create(`priv-${db.get(guy.role).replace(" ", "-").toLowerCase()}`, {
            parent: "892046231516368906",
          })
          
          dcChannel.permissionOverwrites.edit(attacker.id, {
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true,
            VIEW_CHANNEL: true,
          })
          
          dcChannel.send(`<@&${alive.id}>\n` + getRole(guy.role).replace(" ", "-").toLowerCase()).description)
        }
      }
    }
  }