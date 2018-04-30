const Discord = require('discord.js');

const client = new  Discord.Client();

var prefix = "/";


client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log("Pret !");
    client.user.setActivity("/help !");
});

/*client.on('guildMemberAdd', member => {
member.guild.channels.find("name", "bienvenue-aurevoir").send(`Bienvenue ${member} sur Clash2Rue !`)
});

client.on("guildMemberRemove", member => {
member.guild.channels.find("name", "bienvenue-aurevoir").send(`${member} vien de nous quitter !`)
});*/

client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur Clash2Rue, amuse toi bien !');
    }).catch(console.error);
})

client.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', '[✪] Membre');
    member.addRole(role)
});

client.on('message', async message => {

    var sender = message.author;

    if(message.content === "!bot") {
        message.reply("Bonjour, tu as besoin de mon aide ? Fait /help !");
    }

    if(message.content === prefix + "help") {
        message.delete()
        var help_embed = new Discord.RichEmbed()
        .setColor("#40A497")
        .setTitle("Les commandes disponible : ")
        .addField("/help", "Savoir les commandes possible :D")
        .addField("/ddos", "Savoir l'url de notre booter.")
        .addField("/invite", "Créez un lien d'invitation")
        .addField("/contact", "Connaitre comment nous contacter !")
        .addField("/kick", "Command autorisé que pour les rangs élévé")
        .addField("/ban", "Seul les administareurs et fondateur y ont accès")
        .addField("/mute", "Mute un utilisateur dans le chat")
        .addField("/unmute", "démuter un utilisateur dans le chat")
        .addField("/purge", "Supprimer les message (1 à 3000)")
        .addField("::sondage", "Créez un sondage (commande admin)")
        .addField("/info", "Affiche les information du serveur")
        .setFooter("Kali ©")
        message.channel.send(help_embed)
        console.log("Message d'aide envoyé")
    }
    
    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("0x0000FF")
        .setDescription("Information du serveur")
        .addField("Nom du serveur :", message.guild.name)
        .addField("Créez en date du :", message.guild.createdAt)
        .addField("Tu as rejoint le", message.member.joinedAt)
        .addField("Nombre d'utilisateur :", message.guild.memberCount)
        .setFooter("Menu d'information")
        message.channel.send(info_embed)
        console.log("Message d'information envoyé")
        
    }     
    
    if(message.content.startsWith("::sondage")){
        if(message.member.roles.some(r => [
            "[✔] Fondateur",
            "[✔] Gérant",
            "[✓] Modérateur"
        ])) {
           
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
                .setDescription('Sondage')
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                .setColor("0xB40404")
                .setTimestamp()
            message.guild.channels.find("name", "sondage").send(embed)
            .then(function (message){
                message.react(message.guild.emojis.get("c6b26ba81f44b0c43697852e1e1d1420"))
                message.react(message.guild.emojis.get("b1868d829b37f0a81533ededb9ffe5f4"))
            }).catch(function(){
               
            });
            message.delete()
        }else{
            return message.reply("Tu n'as pas la permission.")
        }
    }

    if(message.content === prefix + "ddos") {
        message.delete()
        message.reply("Nous vous communiquerons trés prochainement l'adresse de notre stresser.")
        console.log("Message DDOS envoyé")
    }

    if(message.content === prefix + "contact") {
        message.delete()
        message.reply('Si vous avez un problème(s) sur Clash2Rue, n\'hésitez pas à contacter <@398410784532856833> !')
    }

    let command = message.content.split(".")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick"){
        if(!message.member.roles.some(r=>[
            "[✔] Fondateur",
            "[✔] Gérant",
            "[✓] Modérateur"
        ].includes(r.name))) {
            return message.reply("Tu n'as pas les permission necessaire").catch(console.error);
        } if(message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionné quelqu'un.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible de l'expuser")
        } if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas le permission de kick").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username} a été explusé du Discord par **${message.author}**`)
        }).catch(console.error);
    }

    if (command === "ban"){
        if(!message.member.roles.some(r=>[
            "[✔] Fondateur",
            "[✔] Gérant",
            "[✓] Modérateur"
        ].includes(r.name))) {
            return message.reply("Tu n'as pas les permission necessaire").catch(console.error);
        } if(message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionné quelqu'un.").catch(console.error);
        }
        let banMember = message.guild.member(message.mentions.users.first());
        if(!banMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible de le bannir")
        } if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.reply("Tu n'as pas la permission de ban").catch(console.error);
        }
        banMember.ban().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username} a été banni du Discord par **${message.author}**`)
        }).catch(console.error);
    }   
    
    if(command === "mute"){

        message.delete();
  
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");
    
        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!toMute) return message.channel.send("Merci d'entrer un utilisateur !");
        let role = message.guild.roles.find(r => r.name === "Muet");
        let member = message.guild.roles.find(r => r.name === "[✪] Membre");
        if(!role){
          try {
            role = await message.guild.createRole({
              name: "Muet",
              color: "#000000",
              permissions: []
            });
    
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          } catch (e) {
            console.log(e.stack)
          }
        }
    
        if(toMute.roles.has(role.id)) return message.channel.send('Cet utilisateur est déjà muté !');
    
        await(toMute.addRole(role));
        await(toMute.removeRole(member));
        message.channel.send(`L'utilisateur <@${toMute.user.id}> a bien été muté !`);
    
        return;
      }

      if(command === "unmute"){

        message.delete(5000);
  
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas les droits pour muter un utilisateur !");
    
        let unMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!unMute) return message.channel.send("Merci d'entrer un utilisateur !");
        let role = message.guild.roles.find(r => r.name === "Muet");
        let member = message.guild.roles.find(r => r.name === "[✪] Membre");
    
        if(unMute.roles.has(role.id)) {
            await(unMute.removeRole(role));
            await(unMute.addRole(member));
            message.channel.send(`L'utilisateur <@${toMute.user.id}> a bien été démuté`);
            message.delete(5000);
            return;
        } else {
            message.channel.send(`<@${unMute.user.id}> n'est pas mute !`);
            message.delete(5000);
        }
      }

    if(command === "purges") {
        let messagecount = parseInt(args[1]) || 1;

        var deletedMessages = -1;

        message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
            messages.forEach(m => {
                if (m.author.id == client.user.id) {
                    m.delete().catch(console.error);
                    deletedMessages++;
                }
            });
        }).then(() => {
                if (deletedMessages === -1) deletedMessages = 0;
                message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
                    .then(m => m.delete(2000));
        }).catch(console.error);
    }

    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 1 || deleteCount > 3000) return message.reply("Dire un nombre entre 2 et 100");

        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Je n'ai pas pu supprimer les message car: ${error}`));
    }


    if(message.content === "/invite") {
        var options = {
            maxAge: 0
          };
        message.delete();
        message.guild.channels.get('439350161999659009').createInvite(options).then(invite => message.channel.send(invite.url))
    }
} );
