const { SlashCommandBuilder } = require('discord.js');
const { miniGames } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mini-oyunlar')
        .setDescription('Basit metin tabanlı mini oyunlar oynayın')
        .addStringOption(option =>
            option.setName('oyun')
                .setDescription('Oynamak istediğiniz mini oyunu seçin')
                .setRequired(true)
                .addChoices(
                    Object.keys(miniGames).map(key => ({ name: key, value: key }))
                )),
    async execute(interaction) {
        const oyun = interaction.options.getString('oyun');
        const game = miniGames[oyun];

        if (!game) {
            await interaction.reply('Bu mini oyun bulunamadı.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * game.questions.length);
        const question = game.questions[randomIndex];

        await interaction.reply(`**${oyun} Oyunu**\n\n**Soru:** ${question.question}\n**Seçenekler:**\n${question.options}`);
    },
};
