const db = require("quick.db") // databas
const { getRole, getEmoji } = require("../../../config")

module.exports = async client => {
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat") // get the day channel - Object 
  const werewolvesChat = guild.channels.cache.find(c => c.name === "werewolves-chat") // get the werewolves channel - Object 
  const players = db.get(`players`) || [] // get the players array - Array<Snowflake> 
  const alivePlayers = players.filter(p => db.get(`player_${p}`).status === "Alive") // get the alive players array - Array<Snowflake> 
  const deadPlayers = players.filter(p => !alivePlayers.includes(p)) // get the dead players array - Array<Snowflake> c
  const alchemists = alivePlayers.filter(p => db.get(`player_${p}`).role === "Alchemist") // get the alive alchemist array - Array<Snowflake>
  
  for (let alchemist in alchemists) {
    let attacker = db.get(`player_${alchemist}`)
        if (attacker.status === "Alive") {
    if (attacker.blackTarget) {
      
      let guy = db.get(`player_${attacker.blackTarget}`)
      
      if (guy.status === "Alive") {
            db.set(`player_${guy.id}.status`, "Dead") 
            
            let attackedPlayer = await guild.members.fetch(guy.id) // fetch the discord member - Object 
            let  attackedPlayerRoles = attackedPlayer.roles.cache.map(r => r.name === "Alive" ? "892046207428476989": r.id) // get all the roles and replace the Alive role with Dead. 
            await dayChat.send(`${getEmoji("blackp", client)} The Alchemist killed **${players.indexOf(attackedPlayer.id)+1} ${attackedPlayer.username} (${getEmoji(guy.role?.toLowerCase()?.replace(/\s/g, "_"), client)} ${guy.role})**!`) 
            await attackedPlayer.roles.set(attackedPlayerRoles)
        
      }
      
    }
    }
  }
}