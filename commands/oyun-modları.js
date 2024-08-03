const { SlashCommandBuilder } = require('discord.js');
const { gameModes } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('oyun-modları')
        .setDescription('Belirli bir TF2 oyun modu hakkında bilgi al')
        .addStringOption(option =>
            option.setName('mod_adı')
                .setDescription('Bilgi almak istediğiniz oyun modunu seçin')
                .setRequired(true)
                .addChoices(
                    Object.keys(gameModes).map(key => ({ name: gameModes[key].name, value: key }))
                )),
    async execute(interaction) {
        const mod = interaction.options.getString('mod_adı');
        const modInfo = gameModes[mod];

        if (!modInfo) {
            await interaction.reply('Bu oyun modu hakkında bilgi bulunamadı.');
            return;
        }

        await interaction.reply(`**Oyun Modu: ${modInfo.name}**\n\n**Açıklama:** ${modInfo.description}\n**Stratejiler:** ${modInfo.strategies}`);
    },
};
