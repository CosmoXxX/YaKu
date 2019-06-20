const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log('Coucou');
});

const settings = {
    prefix: '!',
    token: 'NTkwNTYwNDQwNjU2ODU1MDUz.XQopgA.wJ0GD9wT3_oQy0t4V7wcbMhud6k'
  }

  client.on('message', async message => {
    var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
    if(message.author.bot) return;
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;

//vos scripts

if(command === "help") {

    let helpembed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .addField('🛠 **Utilitaire **:', '``!avatar [user]`` , ``!bvn [user]`` ,  ``!bot-info`` , ``!serveur-info`` , ``!role-info [rôle]`` , ``!google [recherche]`` , ``!youtube [recherche]``')
   .addField('🎉  **FUN** :', '``!8ball [questions]``')
   .addField('🚓 **Modérations** :', '``!ban [user] [raison]`` , ``!kick [user] [raison]`` , ``!warn [user] [raison]`` , ``!mute [user] [raison]`` , ``!purge [2-100]`` , ``!unmute [user]`` , ``!addrole [user] [role]`` , ``!removerole [user] [role]``')
   .addField('📌  **Autres** :', '``!ping``')
   message.channel.send(helpembed);
}

if(command === "kick") {

    if(!message.member.hasPermission("KICK_MEMBERS"))
       return message.channel.send("Vous n'avez pas les permissions nécéssaire");

    let member = message.mentions.members.first();
     if(!member)
       return message.channel.send("``kick [user] [raison]``");
     
     if(!member.kickable) 
       return message.channel.send("Je ne peux pas kick cet utilisateur! Ont-ils un rôle plus élevé? Ai-je les bonnes autorisations?");
     
     let reason = args.slice(1).join(' ');
     if(!reason) reason = "Aucune raison fournie";
     
     await member.kick(reason)
       .catch(error => message.reply(`Désolé **${message.author}** Je ne pouvais pas kick cette utilisateur à cause de **${error}**`));
 
       const embed = new Discord.RichEmbed()
             
       .setAuthor(`${message.author.username}`, message.author.avatarURL)
 
       .setColor("FF6600") 
       .addField('Kick', `**${member.user.tag}**`) 
       .addField('Par :', `**${message.author.tag}**`)
       .addField('Sur :', `**${message.guild.name}**`)
       .addField(`Raison :`, `**${reason}**`)
       message.channel.send(embed);
       return  member.send(embed)
     }

     if(command === "ban") {

        if(!message.member.hasPermission("BAN_MEMBERS"))
           return message.channel.send("Vous n'avez pas les permissions nécéssaire");
   
         let member = message.mentions.members.first();
         if(!member)
           return message.channel.send("``ban [user] [raison]``");
         
         if(!member.banable) 
           return message.channel.send("Je ne peux pas ban cet utilisateur! Ont-ils un rôle plus élevé? Ai-je les bonnes autorisations?");
         
         let reason = args.slice(1).join(' ');
         if(!reason) reason = "Aucune raison fournie";
         
         await member.kick(reason)
           .catch(error => message.reply(`Désolé **${message.author}** Je ne pouvais pas ban cette utilisateur à cause de **${error}**`));
     
           const embed = new Discord.RichEmbed()
                 
           .setAuthor(`${message.author.username}`, message.author.avatarURL)
     
           .setColor("FF6600") 
           .addField('Ban', `**${member.user.tag}**`) 
           .addField('Par :', `**${message.author.tag}**`)
           .addField('Sur :', `**${message.guild.name}**`)
           .addField(`Raison :`, `**${reason}**`)
           message.channel.send(embed);
           return  member.send(embed)
         }

         if (message.content === 'b!serveur-info') {
           
            let servIcon = message.guild.iconURL;
            let verifLevels = ["Aucun (0/4)", "Faible (1/4)", "Moyen (2/4)", "(╯°□°）╯︵  ┻━┻ (3/4)", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻ (4/4)"];
            let region = {
                "brazil": ":flag_br: Brazil",
                "eu-central": ":flag_eu: Central Europe",
                "singapore": ":flag_sg: Singapore",
                "us-central": ":flag_us: U.S. Central",
                "sydney": ":flag_au: Sydney",
                "us-east": ":flag_us: U.S. East",
                "us-south": ":flag_us: U.S. South",
                "us-west": ":flag_us: U.S. West",
                "eu-west": ":flag_eu: Western Europe",
                "vip-us-east": ":flag_us: VIP U.S. East",
                "london": ":flag_gb: London",
                "amsterdam": ":flag_nl: Amsterdam",
                "hongkong": ":flag_hk: Hong Kong",
                "russia": ":flag_ru: Russia",
                "southafrica": ":flag_za:  South Africa"
            };
      
            function checkDays(date) {
              let now = new Date();
              let diff = now.getTime() - date.getTime();
              let days = Math.floor(diff / 86400000);
              return days + (days == 1 ? " day" : " days") + " ago";
          };

const embed = new Discord.RichEmbed()
                .setAuthor(message.guild.name, servIcon)
                .addField("Nom", message.guild.name, true)
                .addField("ID", message.guild.id, true)
                .addField("Propriétaire", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
                .addField("Région", region[message.guild.region], true)
                .addField("Total | Humains | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
                .addField("Niveau de vérification", verifLevels[message.guild.verificationLevel], true)
                .addField("Salons", message.guild.channels.size, true)
                .addField("Rôles", message.guild.roles.size, true)
                .addField("Date de création", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
                .setColor('00FFFF')
                .setThumbnail(servIcon)
            message.channel.send(embed);
          }

          if (command === 'bot-info') {
            let inline = true
               let bicon = bot.user.displayAvatarURL;
               let usersize = bot.users.size
               let chansize = bot.channels.size
               let uptimxd = bot.uptime 
               let servsize = bot.guilds.size
               let botembed = new Discord.RichEmbed()
               .setColor("#00ff00")
               .setThumbnail(bicon)
               .addField("Nom du bot", ` ${bot.user.username}`, inline)
               .addField("Créateur", " <@id>", inline )
               .addField("Serveurs", `🛡 ${servsize}`, inline)
               .addField("Salons", `📁 ${chansize}`, inline)
               .addField("Utilisateurs", ` ${usersize}`, inline)
               .addField("Librairie", "Discord.js", inline)
               .addField("Créé le", bot.user.createdAt)
               .setFooter(`Information: ${bot.user.username}. Developed by: truc`)
               .setTimestamp()
               
               message.channel.send(botembed);
           
           }

           if (command === 'user-info') {
            let inline = true
            let resence = true
            const status = {
                online: "En ligne",
                idle: "Inactif",
                dnd: "Ne pas déranger",
                offline: "Déconecté/Invisible"
              }
                
        const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
        let target = message.mentions.users.first() || message.author
        
        if (member.user.bot === true) {
          bot = "Oui";
        } else {
          bot = "Non";
        }
let embed = new Discord.RichEmbed()
                        .setAuthor(member.user.username)
                        .setThumbnail((target.displayAvatarURL))
                        .setAuthor(`${message.author.username}`, message.author.avatarURL)
                        .setColor("#00ff00")
                        .addField("Tag", `${member.user.tag}`, inline)
                        .addField("ID", member.user.id, inline)
                        .addField("Surnom", `${member.nickname !== null ? `${member.nickname}` : "Pas de surnom"}`, true)
                        .addField("Bot", `${bot}`,inline, true)
                        .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                        .addField("Joue", `${member.user.presence.game ? `:video_game: ${member.user.presence.game.name}` : "Ne joue pas"}`,inline, true)
                        .addField("Rôles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "Pas de rôle"}`, true)
                        .addField("A rejoint discord le",moment.utc(member.user.createdAt).format("LL"), inline, true)
                        .addField("A rejoint le serveur le",moment.utc(member.joinedAt).format('LL'), inline, true)
                        .setFooter(`Informations sur ${member.user.username}`)
                        .setTimestamp()
            
                    message.channel.send(embed);
             }

             if (command === 'role-info') {
                let inline = true
               
                   let role = args.join(` `)
                   if(!role) return message.reply("Specify a role!");
                   let gRole = message.guild.roles.find(`name`, role);
                   if(!gRole) return message.reply("Couldn't find that role.");
               
                   const status = {
                       false: "Non",
                       true: "Oui"
                     }
               
                   let roleemebed = new Discord.RichEmbed()
                   .setColor("#00ff00")
                   .addField("ID", gRole.id, inline )
                   .addField("Nom", gRole.name, inline)
                   .addField("Mention", `\`<@${gRole.id}>\``, inline)
                   .addField("Couleur", gRole.hexColor, inline)
                   .addField("Membres", gRole.members.size, inline)
                   .addField("Position", gRole.position, inline)
                   .addField("Affiché séparément", status[gRole.hoist], inline)
                   .addField("Mentionable", status[gRole.mentionable], inline)
                   .addField("Administrateur", status[gRole.managed], inline)
                   
                   message.channel.send(roleemebed);
               
               }

               if (command === 'avatar') {
                let mentionedUser = message.mentions.users.first() || message.author;
        
                let embed = new Discord.RichEmbed()
          
                .setImage(mentionedUser.displayAvatarURL)
                .setColor("00ff00")
                .setTitle("Avatar :")
                .setDescription("[Lien URL de l'avatar]("+mentionedUser.displayAvatarURL+")")
             
                message.channel.send(embed)  
          }

          if(command === "ping") {
            const m = await newFunction(message)("Ping?");
            m.edit(`Pong! Latence : **${m.createdTimestamp - message.createdTimestamp}ms**. API latence : **${Math.round(client.ping)}ms**`);
          }

          if (command === '8ball') {

            if(!args[1]) return message.reply("Merci d'entrer une question complète avec 2 mots ou plus!");
                                      
            let replies = ["Oui.", "Non.", "Je ne sais pas.", "Demandez à nouveau un peu plus tard!", "Je ne suis pas sûr!", "Il me manque des informations pour pouvoir te répondre.", "À vous de me dire.", "Sans aucun doute.", "Je ne peux le dire maintenant.", "Sans aucun doute.", ];
                                  
            let result = Math.floor((Math.random() * replies.length));
            let question = args.join(" ");
                                  
            let ballembed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor("#00ff00")
            .addField("Question", question)
            .addField("Réponse", replies[result])
                                  
             message.channel.send(ballembed)
            }
    
    });



client.login(settings.token);
