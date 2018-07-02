/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { Command } = require('discord-akairo');

class Prefix extends Command {
  constructor() {
    super('prefix', {
      description: 'Sets the given prefix for your guild',
      typing: true,
      args: [
        {
          id: 'nPrefix'
        }
      ]
    });
  }
  exec(m, args) {
    if (!args.nPrefix) return m.channel.send('Please provide a new prefix to be set, or use `default` to reset it.');
    this.client.mongo.guilds.updateOne({ gid: m.guild.id }, { $set: { 'settings.prefix': args.nPrefix == this.client.akairoOptions.defaultPrefix ? 'default' : args.nPrefix } });
    m.channel.send(`I've successfully set your guild's to ${args.nPrefix}!`);
  }
}

module.exports = Prefix;