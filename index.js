const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Coucou');
});

const settings = {
    prefix: '!',
    token: 'NTkwNT12YwNDQwNjU2ODU1MDUz.XQpIbA.FagpN8yYvKqUp56gHXKN23B-xAE'
  }
 
  client.on('message', async message => {
    var command = message.content.toLowerCase().slice(settings.prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
    if(message.author.bot) return;
    if (!message.content.startsWith(settings.prefix) || message.author.bot) return;
  
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
 
 
 if(command === "warn") {
 
           if(!message.member.hasPermission("MANAGE_MESSAGES"))
             return message.channel.send("Vous n'avez pas les permissions nécéssaire");
         
           let member = message.mentions.members.first() || message.guild.members.get(args[0]);
           if(!member)
             return message.channel.send("``warn [user] [raison]``");
           
           let reason = args.slice(1).join(' ');
           if(!reason) reason = "Aucune raison fournie";
           
             const embed = new Discord.RichEmbed()
               
             .setAuthor(`${message.author.username}`, message.author.avatarURL)
       
             .setColor("FF6600")      
             .addField('Warn', `**${member.user.tag}**`) 
             .addField('Par :', `**${message.author.tag}**`)
             .addField('Sur :', `**${message.guild.name}**`)
             .addField(`Raison :`, `**${reason}**`)
             message.channel.send(embed);
         return  member.send(embed)
            
           }
 
 if(command === "suppr") {
   
           if(!message.member.hasPermission("MANAGE_MESSAGES"))
             return message.channel.send("Désolé, vous n'avez pas les autorisations pour utiliser ceci!");
           const deleteCount = parseInt(args[0], 10);
           
           if(!deleteCount || deleteCount < 2 || deleteCount > 100)
             return message.channel.send("Veuillez indiquer un nombre compris entre 2 et 100 pour le nombre de messages à supprimer.");
           
           const fetched = await message.channel.fetchMessages({limit: deleteCount});
           message.channel.bulkDelete(fetched)
             .catch(error => message.reply(`Impossible de supprimer les messages pour la raison suivante: ${error}`));
       
             const embed = new Discord.RichEmbed()
               
               .setAuthor(`${message.author.username}`, message.author.avatarURL)
               .setColor("ff0000")
               .addField(`Nombres de messages suprimés :`, `${deleteCount}`,true)
             message.channel.send(embed);
      
          }
          if(command === "mute") {
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                     if(!tomute) return message.channel.send("Merci mentionnez l'utilisateur pour le rendre muet");
                     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Désolé, vous n'avez pas les autorisations pour utiliser ceci!");
                     if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Je ne peux pas rendre muet cet utilisateur");
                     if (tomute.id === message.author.id) return message.channel.send("Vous ne pouvez pas vous rendre muet!");
                     let muterole = message.guild.roles.find(`name`, "Muet");
                   
                     if(!muterole){
                       try{
                         muterole = await message.guild.createRole({
                           name: "Muet",
                           color: "#000000",
                           permissions:[]
                         })
                         message.guild.channels.forEach(async (channel, id) => {
                           await channel.overwritePermissions(muterole, {
                             SEND_MESSAGES: false,
                             ADD_REACTIONS: false
                           });
                         });
                       }catch(e){
                         console.log(e.stack);
                       }
                     }
 
                     await(tomute.addRole(muterole.id));
                     message.channel.send(`<@${tomute.id}> a été rendu muet!`);
 }

 
 if(command === "unmute") {
 
                       if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Vous n'avez pas la permission `Manage Messages`")
 
                       let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                       if(!toMute) return message.channel.sendMessage("Veuillez mentionner un utilisateur ou son ID!");
               
                       let role = message.guild.roles.find(r => r.name === "Muet")
                       
                       if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Cet utilisateur n'est pas muet");
               
                       await toMute.removeRole(role);
                       message.channel.sendMessage("L'utilisateur n'est plus muet");
 }
                         if (command === 'addrole') {
                         if(args[0] == "help"){
                           let helpembxd = new Discord.RichEmbed()
                           .setColor("#00ff00")
                           .addField("Donner un rôle", "Usage: ``addrole <@user> <rôle>``")
                       
                           message.channel.send(helpembxd);
                           return;
                         } 
                       
                         let xdemb = new Discord.RichEmbed()
                         .setColor("#00ff00")
                         .setTitle(`Donner un rôle`)
                         .addField("Description", "Donner un rôle à une personne.", true)
                         .addField("Usage", "``addrole [user] [rôle]``", true)
                         .addField("Example", "``addrole @Tacosburk#0000 Membre``")
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Vous n'avez pas la permission de faire ça!");
                         let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                         if(!rMember) return message.channel.send(xdemb);
                       
                         let role = args.join(" ").slice(22);
                         if(!role) return message.channel.send("Spécifiez un rôle!");
                         let gRole = message.guild.roles.find(`name`, role);
                         if(!gRole) return message.channel.send("Impossible de trouver ce rôle.");
                       
                         if(rMember.roles.has(gRole.id)) return message.channel.send("Cet utilisateur a déjà ce rôle.");
                         await(rMember.addRole(gRole.id));
                       
                           await message.channel.send(`Je viens de donner à **${rMember.user.username}** le rôle **${gRole.name}**`)
                       
                         } 
 
   if (command === 'removerole') {
                         if(args[0] == "help"){
                           let helpembxd = new Discord.RichEmbed()
                           .setColor("#00ff00")
                           .addField("Retirer un rôle", "Usage: b!removerole <@user> <role>")
                       
                           message.channel.send(helpembxd);
                           return;
                         } 
                       
                         let xdemb = new Discord.RichEmbed()
                         .setColor("#00ff00")
                         .setTitle(`Retirez un rôle`)
                         .addField("Description:", "Retirer le rôle d'une personne", true)
                         .addField("Usage", "b!removerole [user] [role]", true)
                         .addField("Example", "b!removerole @TacosBurk#0000 Membre")
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Pour cela, vous avez besoin de la premission `MANAGE_ROLES`");
                         let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
                         if(!rMember) return message.channel.send(xdemb);
                       
                         let role = args.join(" ").slice(22);
                       
                         if(!role) return message.channel.send("Spécifiez un rôle!");
                         let gRole = message.guild.roles.find(`name`, role);
                         if(!gRole) return message.channel.send("Impossible de trouver ce rôle.");
                       
                         if(!rMember.roles.has(gRole.id)) return message.channel.send("Cet utilisateur n'a pas ce rôle.");
                         await(rMember.removeRole(gRole.id));
                       
                         await message.channel.send(`Je viens de supprimer le rôle **${gRole.name}** a **${rMember.user.username}**`)
   
                             
  
  if(command === "youtube") {
 
          const sayMessage = args.join(" ");
          const embed = new Discord.RichEmbed()
 
 .setAuthor(`${message.author.username}`, message.author.avatarURL)
 .setColor("00FFFF")
 .addField('Vidéo correspondant à ' + `__${sayMessage}__`, "https://www.youtube.com/results?search_query=" + args.join('+'))
      
     message.channel.send(embed);
         }
        
 
 if (message.content === 'serveur-info') {
            
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
                                   //.setAuthor(member.user.username)
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
 
  if(command === "annonce") {
             const sayMessage2 = args.join(" ");
            
             let servIcon = message.guild.iconURL;
 
             message.delete().catch(O_o=>{});
             const embed = new RichEmbed()
             .setTitle(':pushpin: Annonce :')
             .setColor("00CCFF")
             .setTimestamp()
             .setThumbnail(servIcon)
             .setFooter(`Cordialement, ${message.author.username}`)
             .setDescription(sayMessage2)
             
             message.channel.send(embed)
     
             
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
 
 
 if (command === 'morse') {
 
                     const embed = new Discord.RichEmbed()
                     .setAuthor(`${message.author.username}`, message.author.avatarURL)
   
                     .setColor("00FFFF")
                     .setDescription("``morse [message] ``")
                     .setFooter("erreur", 'https://cdn.discordapp.com/attachments/575719847418396733/582180312306679808/476014391427334144.png')
                     .setTimestamp()        
                   if (args.length < 1) {
                     return message.channel.send(embed)
                 }
                 message.channel.send(args.join(' ').split('').reverse().join(''));
               }
             
               if (command === 'morse') {
               let alpha = " ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),
               morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(","),
               text = args.join(" ").toUpperCase();
             while (text.includes("Ä") || text.includes("Ö") || text.includes("Ü")) {
               text = text.replace("Ä","AE").replace("Ö","OE").replace("Ü","UE");
             }
             if (text.startsWith(".") || text.startsWith("-")) {
               text = text.split(" ");
               let length = text.length;
               for (i = 0; i < length; i++) {
                 text[i] = alpha[morse.indexOf(text[i])];
               }
               text = text.join("");
             } else {
               text = text.split("");
               let length = text.length;
               for (i = 0; i < length; i++) {
                 text [i] = morse[alpha.indexOf(text[i])];
               }
               text = text.join(" ");
             }
             return message.channel.send("+text+");
       
       }
 if (command === 'bot-info') {
  let inline = true
     let bicon = client.user.displayAvatarURL;
     let usersize = client.users.size
     let chansize = client.channels.size
     let uptimxd = client.uptime 
     let servsize = client.guilds.size
     let botembed = new Discord.RichEmbed()
     .setColor("#00ff00")
     .setThumbnail(bicon)
     .addField("Nom du bot", ` ${bot.user.username}`, inline)
     .addField("Créateur", " <@id>", inline )
     .addField("Serveurs", `🛡 ${servsize}`, inline)
     .addField("Salons", `📁 ${chansize}`, inline)
     .addField("Utilisateurs", ` ${usersize}`, inline)
     .addField("Librairie", "Discord.js", inline)
     .addField("Créé le","bot.user.createdAt" )
     .setFooter(`Information: ${bot.user.username}. Developed by: DraLoW`)
     .setTimestamp()
     message.channel.send(botembed);
 }
 if (command === 'role-info') {
  let inline = true
     let role = args.join(` `)
     if(!role) return message.reply("Entrez le nom d'un role du serveur!");
     let gRole = message.guild.roles.find(`name`, role);
     if(!gRole) return message.reply("Ce role n'existe pas dans ce serveir role.");
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
     .addField("Administration", status[gRole.managed], inline)
     message.channel.send(roleemebed);
 }
 if (command === 'reverse') {
                     const embed = new Discord.RichEmbed()
                     .setAuthor(`${message.author.username}`, message.author.avatarURL)
                     .setColor("00FFFF")
                     .setDescription("``!reverse [message] ``")
                     .setFooter("erreur", 'https://cdn.discordapp.com/attachments/575719847418396733/582180312306679808/476014391427334144.png')
                     .setTimestamp()        
                   if (args.length < 1) {
                     return message.channel.send(embed)
                 }
                 message.channel.send(args.join(' ').split('').reverse().join(''));
               }


if (command === 'bvn') {
       var user = message.mentions.users.first()
       var amount = args[1]
       const embed2 = new Discord.RichEmbed() 
         .setAuthor(`${message.author.username}`, message.author.avatarURL)
         .setColor("00FFFF")
         .setDescription("``b!bvn [user] ``")
         .setFooter("erreur", 'https://cdn.discordapp.com/attachments/575719847418396733/581888626338562075/valider.png')
         .setTimestamp()        
       if (!user) return message.channel.send(embed2);
     message.delete().catch(O_o=>{});
     const embed = new Discord.RichEmbed() 
     .setAuthor("Bienvenue !", "https://cdn.discordapp.com/attachments/590777266557157386/590927544006475787/JPEG_20190619_182623.jpg")
     .setColor("00FFFF")
     .setFooter("bvn lorsque qu'il y a un nouveau", "https://cdn.discordapp.com/attachments/590777266557157386/590927544006475787/JPEG_20190619_182623.jpg")
     .setThumbnail(message.author.avatarURL)
     .setTimestamp()
     .addField(`Hey ! Soit le bienvenue sur le serveur **${user.username}** ❤️`, `De la part de **${message.author.username}**`) 
     message.channel.send(embed);
 }
 
 if (command === 'pile ou face') {                          
 let replies = ["Pile.", "face.",];                      
 let result = Math.floor((Math.random() * replies.length));                      
 let embed = new Discord.RichEmbed()
 .setAuthor(message.author.username, message.author.avatarURL)
 .setColor("#00ff00")
 .addField("Résultat", replies[result])                      
  message.channel.send(embed);
 }
   });  

 client.login(settings.token)
