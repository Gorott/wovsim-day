const db = require("quick.db") // databas
const { getRole, getEmoji } = require("../../../config")

module.exports = async client => {
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat") // get the day channel - Object 
  const werewolvesChat = guild.channels.cache.find(c => c.name === "werewolves-chat") // get the werewolves channel - Object 
  const players = db.get(`players`) || [] // get the players array - Array<Snowflake> 
  const alivePlayers = players.filter(p => db.get(`player_${p}`).status === "Alive") // get the alive players array - Array<Snowflake> 
  const deadPlayers = players.filter(p => !alivePlayers.includes(p)) // get the dead players array - Array<Snowflake> c
  const zombies = alivePlayers.filter(p => db.get(`player_${p}`).role === "Zombie") // get the alive Zombie array - Array<Snowflake>
  
  for (let zombie in zombies) {
    let zomb = db.get(`players_${zombie}`)
    
      if (zomb.status === "Alive") {
        if (!zomb.isOriginal) {
          if (zomb.nightsAlive == 2) {
            db.set(`player_${zomb.id}.status`, "Dead") 
            
            let player = await guild.members.fetch(zomb.id) // fetch the discord member - Object 
            let  playerRoles = player.roles.cache.map(r => r.name === "Alive" ? "892046207428476989" : r.id) // get all the roles and replace the Alive role with Dead. 
            await dayChat.send(`${getEmoji("zombie", client)} The body of **${players.indexOf(zombie.id)+1} ${zombie.username} (${getEmoji(zomb.role?.toLowerCase()?.replace(/\s/g, "_"), client)} ${zomb.role})** has decayed and they are now dead!`) 
            await player.roles.set(playerRoles)
          } else db.set(`players_${zombie}.nightsAlive`, zomb.nightsAlive++)
        }
      }
  }
}