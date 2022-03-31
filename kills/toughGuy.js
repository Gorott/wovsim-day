const db = require("quick.db") // databas
const { getRole, getEmoji } = require("../../../config")

module.exports = async client => {
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat") // get the day channel - Object 
  const werewolvesChat = guild.channels.cache.find(c => c.name === "werewolves-chat") // get the werewolves channel - Object 
  const players = db.get(`players`) || [] // get the players array - Array<Snowflake> 
  const alivePlayers = players.filter(p => db.get(`player_${p}`).status === "Alive") // get the alive players array - Array<Snowflake> 
  const deadPlayers = players.filter(p => !alivePlayers.includes(p)) // get the dead players array - Array<Snowflake> c
  const toughGuys = alivePlayers.filter(p => db.get(`player_${p}`).role === "Tough Guy") // get the alive tg array - Array<Snowflake>
  
  for (let toughGuy in toughGuys) {
    let tg = db.get(`player_${toughGuy}`)
    
    if (tg.status === "Alive") {
      
      if (tg.wounded == true) {
            db.set(`player_${tg.id}.status`, "Dead") 
            
            let player = await guild.members.fetch(tg.id) // fetch the discord member - Object 
            let  playerRoles = player.roles.cache.map(r => r.name === "Alive" ? "892046207428476989" : r.id) // get all the roles and replace the Alive role with Dead. 
              await dayChat.send(`${getEmoji("tough_guy", client)} **${players.indexOf(player.id)+1} ${player.username} (${getEmoji(tg.role?.toLowerCase()?.replace(/\s/g, "_"), client)} ${tg.role})** was wounded last night and has died!!`) 
            await player.roles.set(playerRoles)
      }
    }
  }
}