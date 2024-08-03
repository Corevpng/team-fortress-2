const { SlashCommandBuilder } = require('discord.js');
const { memTemplates } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mem-jeneratörü')
        .setDescription('TF2 temalı memler oluşturun'),
    async execute(interaction) {
        const randomIndex = Math.floor(Math.random() * memTemplates.length);
        const meme = memTemplates[randomIndex];

        await interaction.reply(`**TF2 Mem:** ${meme}`);
    },
};
