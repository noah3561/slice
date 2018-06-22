/**
 * Copyright (c) 2018, Visual Fire Development  All Rights Reserved
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

const { AkairoClient } = require('discord-akairo');
const MongoDB = require('./MongoDB.js');
const path = require('path');
const { token } = require('./Data/Tokens.js');

const prefix = 'sa$';
const client = new AkairoClient({
  ownerID: ['112732946774962176', '187771864435785728'],
  defaultPrefix: prefix,
  prefix: async function(m) {
    // Just in case somehow it's able to call before the DB even exists?
    if (!client.mongo) return prefix;
    try {
      if (!m.guild) return prefix;
      const data = await client.mongo.fetchGuild(m.guild.id);
      m.data = data;
      if (data.settings.prefix == 'default') return prefix;
      else return data.settings.prefix;
    } catch (e) {
      console.error('Prefix Fetch', e);
      return prefix;
    }
  },
  allowMention: true,
  emitters: { process },
  commandDirectory: path.join(__dirname, 'Commands'),
  listenerDirectory: path.join(__dirname, 'Listeners'),
  // Custom Options
  colors: {
    orange: '#FE8B00'
  }
}, {
  disableEveryone: true
});

client.mongo = new MongoDB(client);

client.login(token);