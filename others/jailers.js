module.exports = async client => {
  const guild = client.guilds.cache.get("890234659965898813") // get the guild object - Object 
  const dayChat = guild.channels.cache.find(c => c.name === "day-chat") // get the day channel - Object 
  const jailedChat = guild.channels.cache.find(c => c.name === "jailed-chat")
  const werewolvesChat = guild.channels.cache.find(c => c.name === "werewolves-chat") // get the werewolves channel - Object 
  const players = db.get(`players`) || [] // get the players array - Array<Snowflake> 
  const alivePlayers = players.filter(p => db.get(`player_${p}`).status === "Alive") // get the alive players array - Array<Snowflake> 
  const deadPlayers = players.filter(p => !alivePlayers.includes(p)) // get the dead players array - Array<Snowflake> c
  const jailers = alivePlayers.filter(p => db.get(`player_${p}`).role === "Jailer") // get the alive jailers array - Array<Snowflake>
  
  for (let jailer in jailers) {
    let jail = db.get(`player_${jailer}`)
    
    if (jail.status === "Alive") {
      
      if (jail.target) {
        let guy = db.get(`player_${jail.target}`)
        let channel = guild.channels.cache.get(guy.channel)
        let player = await guild.members.fetch(guy.id)
        if (guy.status === "Alive") {
        channel.permissionOverwrites.edit(guy.id, { 
        SEND_MESSAGES: false, 
        VIEW_CHANNEL: true, 
        READ_MESSAGE_HISTORY: true 
      })
        
        jailedChat.permissionOverwrites.edit(guy.id, {
          SEND_MESSAGES: true, 
          VIEW_CHANNEL: true, 
          READ_MESSAGE_HISTORY: true 
        })
        if (guy.team === "Werewolf") {
              wwChat.send("Your werewolf teammate **" + players.indexOf(player.id)+1 + player.username + " (" + getEmoji(guy.role?.toLowerCase()?.replace(/\s/g, "_"), client) + guy.role + ")** has been jailed!")
        }
        chan.send(`You have been jailed! You can't do your actions for tonight! Head to <#${jailedChat.id}> to talk with the jailer!`)
        db.set(`player_${guy.id}.jailed`, true)
        }
      }
    }
  }
}