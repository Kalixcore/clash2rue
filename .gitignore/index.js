const Discord = require('discord.js');

const client = new  Discord.Client();

var prefix = "/";

bot.login(process.env.TOKEN);

client.on('ready', () => {
    console.log("Pret !");
    client.user.setActivity("/help !");
});

client.on('guildMemberAdd', member => {
    member.guild.channels.find("name", "bienvenue-aurevoir").send(`Bienvenue ${member} sur Clash2Rue !`)
});

client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur Clash2Rue');
    }).catch(console.error);
})

client.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "bienvenue-aurevoir").send(`${member} vien de nous quitter !`)
});

client.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', '[✪] Membre');
    member.addRole(role)
});

client.on('message', async message => {
    
    var sender = message.author;

    if(message.content === "!bonjour") {
        message.reply("Bonjour, tu as besoin de mon aide ? Fait /help !");
    }

    if(message.content === prefix + "help") {
        message.delete()
        var help_embed = new Discord.RichEmbed()
        .setColor("#FF3342")
        .setTitle("Les commandes disponible : ")
        .addField("/help", "Savoir les commandes possible :D")
        .addField("/ddos", "Savoir l'url de notre stresser, (en cours)")
        .addField("/contact", "Savoir comment nous contacter !")
        .addField("/purge", "Supprime les message de 5 a 10")
        .setFooter("Kali ©")
        message.channel.send(help_embed)
        console.log("Message d'aide envoyée")
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
        let modRole = message.guild.roles.find("name", "[✔] Fondateur")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas les permission necessaire").catch(console.error);
        } if(message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionné quelqu'un.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible de l'expulser")
        } if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas le permission de kick").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username} a été explusé du Discord par **${message.author}**`)
        }).catch(console.error);
    }

    if (command === "ban"){
        let modRole = message.guild.roles.find("name", "[✔] Fondateur ")
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Tu n'as pas les permission necessaire").catch(console.error);
        } if(message.mentions.users.size === 0) {
            return message.reply("Tu dois mentionné quelqu'un.").catch(console.error);
        }
        let banMember = message.guild.member(message.mentions.users.first());
        if(!banMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible de le bannir")
        } if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.reply("Je n'ai pas le permission de ban").catch(console.error);
        }
        banMember.ban().then(member => {
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);
            message.guild.channels.find("name", "general").send(`**${member.user.username} a été banni du Discord par **${message.author}**`)
        }).catch(console.error);
    }
    
    if(command === "purge") {
        const deleteCount = parseInt(args[0], 10);
        
        if(!deleteCount || deleteCount < 2 || deleteCount > 100) return message.reply("Dire un nombre entre 2 et 100");

        const fetched = await message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched)
          .catch(error => message.reply(`Je n'ai pas pu supprimer les message car: ${error}`));
    }
    
      
} );
