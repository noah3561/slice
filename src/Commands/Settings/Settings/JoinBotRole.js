/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');

class JoinBotRole extends Command {
  constructor() {
    super('joinBotRole', {
      description: 'The base command for configuring your guild\'s settings..',
      args: [
        {
          id: 'role',
          type: 'role',
          unordered: true
        },
        {
          id: 'toggle',
          type: 'lowercase',
          unordered: true
        }
      ],
      typing: true,
      userPermissions: ['MANAGE_GUILD']
    });
  }
  exec(m, args) {
    if (['off', 'false', 'disabled', 'disable'].includes(args.toggle)) {
      this.client.mongo.guilds.updateOne({ gid: m.guild.id }, { $set: {
        'events.join.botRole.enabled': false,
        'events.join.botRole.roleId': ''
      } });
      return m.channel.send(`I've successfully disabled your guild's join role!`);
    } else if (args.role && args.role.name != '@everyone') {
      this.client.mongo.guilds.updateOne({ gid: m.guild.id }, { $set: {
        'events.join.botRole.enabled': true,
        'events.join.botRole.roleId': args.role.id.toString()
      } });
      return m.channel.send(`I've successfully enabled your guild's join role!`);
    } else {
      return m.channel.send('Invalid Option. Please say the name of the role you want or say \'off\' to disable it.');
    }
  }
}

module.exports = JoinBotRole;