/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');

class Settings extends Command {
  constructor() {
    super('settings', {
      aliases: ['settings', 'set'],
      description: 'The base command for configuring your guild\'s settings..',
      args: [
        {
          id: 'setting',
          type: 'lowercase'
        },
        {
          id: 'content',
          match: 'rest',
          default: ''
        }
      ],
      typing: true,
      userPermissions: ['MANAGE_GUILD']
    });
  }
  exec(m, args) {
    if (!args.setting) {
      return m.channel.send('Invalid Option. Please choose `prefix`, `rolestatus`, or `help`.');
    } else if (args.setting == 'prefix') {
      return this.handler._handleCommand(m, args.content, this.handler.modules.get('prefix'));
    } else if (args.setting == 'joinrole') {
      return this.handler._handleCommand(m, args.content, this.handler.modules.get('joinRole'));
    } else if (args.setting == 'joinbotrole' || args.setting == 'botrole') {
      return this.handler._handleCommand(m, args.content, this.handler.modules.get('joinBotRole'));
    }
  }
}

module.exports = Settings;