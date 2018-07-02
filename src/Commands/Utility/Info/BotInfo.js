/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const ce = require('embed-creator');
const { version, Command } = require('discord-akairo');
const discord = require('discord.js');

class BotInfo extends Command {
  constructor() {
    super('botinfo', {
      description: 'Gives the user information about me!',
      typing: true
    });
  }
  exec(m) {
    return m.channel.send(ce(
      this.client.akairoOptions.colors.orange, null, 'Bot Information',
      'Here\'s some information about me!',
      [
        { name: ':1234: Version', value: 'Version 2A' },
        { name: ':tools: Owners', value: `FireController1847#3577 (112732946774962176)\nNooooah#2448 (187771864435785728)` },
        { name: ':books: Library', value: `I was coded using Akairo ${version} with Discord.js ${discord.version} on Node.js ${process.version}.` },
        { name: ':desktop: Host', value: 'Running on Ubuntu 16.04 using the Wholesale platform. Currently using the Dual Intel Xeon 5420 Preconfigured plan for 30$/month.' },
        { name: ':map: Location', value: 'Kansas City, Missouri, USA.' }
      ]
    ));
  }
}

module.exports = BotInfo;