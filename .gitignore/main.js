const Discord = require('discord.js');
const low = require('lowdb')
const client = new Discord.Client();

var prefix = "!";

const ytdl = require('ytdl-core');


const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({histoires: []});


var servers = {};


db.defaults({ histoires: [], xp: []}).write()


var bot = new Discord.Client();

var prefix = ("!");




client.login("NDkyNzI5ODE0OTg2NTIyNjI0.DoarCA.Le8kbYKX7aDzEkd2h6qevKLinmM");

function play(connection, message) {
  
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() { 
    if (server.queue[0]) play(connection, message);

    else connection.disconnect();

  });
}





client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find('name', 'accueil');
    if (!channel) return;
    channel.send(`${member}a rejoint  le serveur ! Penses à voter :wink: `);
    member.addRole(member.guild.roles.find('name', 'Joueurs'))
    var newmember_embed = new Discord.RichEmbed()
    .setColor('#0000FF')
    .setImage('https://gifsdomi.files.wordpress.com/2013/09/gif-bienvenue-267.gif?w=636&h=318')
    
    channel.send(newmember_embed);
    console.log('Un nouvel utilisateur est arrivé !')
});

client.on("guildMemberRemove", async member => {
    const channel = member.guild.channels.find('name', 'accueil');
    if (!channel) return;
    channel.send(`${member} a quitté sur le serveur :wave:  `);
    
})

client.on("ready", () => {

    console.log("Ready !");
    client.user.setPresence({ game: { name: ' !help', type: 0}});

});

client.on('message', async message => { 


    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();

    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission");

        if(message.mentions.users.size === 0){
            return message.channel.send("Tu dois mentionner un joueur")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick){
            return message.channel.send("Je ne sais pas si l'utilisateur existe")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour le kick");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`)
        });
    }

    

    if (message.content === prefix + "xpstats"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setColor('#01FF3E')         
            .setTitle(`Nombre d'XP de ${message.author.username}`)
            .setDescription("voila ton nombre d'XP !")
            .addField("XP :", `${xpfinal[1]} xp`)
        message.channel.send(xp_embed);
        console.log("xp demandée");

    }

    if(message.content.startsWith(prefix + "youtube")){

        var test_embed = new Discord.RichEmbed()
        .setColor('#D90115')
        .setTitle('Abonne toi :wink:')
        .setImage('https://yt3.ggpht.com/a-/AN66SAzyY2865cgz7wWmeMtFm_gKdLa1erJQ3Ac-5Q=s288-mo-c-c0xffffffff-rj-k-no')
        .setURL('https://www.youtube.com/user/Scuisond')
        
        message.channel.send(test_embed);

    }

    if(message.content.startsWith(prefix + "vote")){

        var vote_embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setTitle('--> VOTE <--')
        .setURL('http://iconya.fr/vote')
        .setDescription("Je t'invite à voter")
        message.channel.send(vote_embed);
    }

    if(message.content.startsWith(prefix + "test")){

        var vote_embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .setThumbnail(message.author.avatarURL)
        
        .setTitle('gnégné , Bienvenu sur le serveur ! Penses à voter :wink:')
        message.channel.send(vote_embed);
    }


    if(message.content.startsWith(prefix + "help")){
        var msgauthor = message.author.id;

        var help_embed = new Discord.RichEmbed()
        .setColor("#6699FF")
        .setTitle(`Liste des commandes`)
        .addField(`DIscord`, " -!vote \n -!youtube")
        
        .addField(`Jeux`)
        
        message.reply("Tu peux regarder tes messages privés !")
        message.author.send(help_embed);

    }

    if (message.content === 'mdr'){
        message.channel.sendMessage('LOLOLOL')
    }

    if (message.content === 'prodox'){
        message.channel.sendMessage('il est ap la')
    }

    

    if (message.content === '1.8 ou 1.13'){
        message.channel.sendMessage('1.8')
    }

    if (message.content === '1.9 ou 1.13'){
        message.channel.sendMessage('1.9')
    }
       
        
        
        
        
    

    



    if (!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) { 

        case "fbefbetrbet":
        var msgauthor = message.author.id;

        var help_embed = new Discord.RichEmbed()
        .setColor("#6699FF")
        .setTitle(`Liste des commandes`)
        .addField(`ID du joueurs :id:`)
        .addField(`Date d'inscription du joueur :`, userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Tu peux regarder tes messages privés !")
        message.author.send(help_embed);

        break;
        
  case "play":

    if (!args[1]) {

    message.channel.sendMessage("indique moi un lien YouTube");   

    return;

  }

    if(!message.member.voiceChannel) {

    message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 

    return;

  }


    if(!servers[message.guild.id]) servers[message.guild.id] = {

    queue: []

  };


  var server = servers[message.guild.id];


  server.queue.push(args[1]);

  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

  play(connection, message) 

  });

  break; 

  case "skip":

    if(!message.member.voiceChannel) {

    message.channel.sendMessage(":x: rejoin un salon"); 

    return;

  }

    var server = servers[message.guild.id];

    if(server.dispatcher) server.dispatcher.end();

    break;

  case "stop":

    if(!message.member.voiceChannel) 
    
    return message.channel.send(":x: rejoin un salon");

    message.member.voiceChannel.leave();

    break;
  
  }




    if(message.content.startsWith(prefix + "clear")) {
        //if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGE")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("précise le nombre de messages à supprimer !")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été supprimés !`);
        });
    }

    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("tu n'as pas la permission ");

        if(message.mentions.users.size === 0) {
            return message.channel.send('mentionne un utilisateur ');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je ne trouve pas l'utilisateur ou il n'existe pas ");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission ");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        });
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("tu n'as pas la permission ");

        if(message.mentions.users.size === 0) {
            return message.channel.send('mentionne un utilisateur ');
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Je ne trouve pas l'utilisateur ou il n'existe pas ");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission ");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        });
    }



});
