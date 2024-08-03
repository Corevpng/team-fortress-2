const { SlashCommandBuilder } = require('discord.js');
const { classData } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sınıf-bilgileri')
        .setDescription('Belirli bir TF2 sınıfı hakkında bilgi al')
        .addStringOption(option =>
            option.setName('sınıf')
                .setDescription('Bilgi almak istediğiniz sınıfı seçin')
                .setRequired(true)
                .addChoices(
                    Object.keys(classData).map(key => ({ name: classData[key].name, value: key }))
                )),
    async execute(interaction) {
        const sınıf = interaction.options.getString('sınıf');
        const data = classData[sınıf];

        if (!data) {
            await interaction.reply('Bu sınıf hakkında bilgi bulunamadı.');
            return;
        }

        await interaction.reply(`**${data.name}**\n\n**Yetenekler:** ${data.abilities}\n**Silahlar:** ${data.weapons}\n**Stratejiler:** ${data.strategies}`);
    },
};
