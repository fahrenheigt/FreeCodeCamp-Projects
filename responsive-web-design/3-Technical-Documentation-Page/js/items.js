// Stat mapping for user-friendly names
const statMapping = {
    "FlatArmorMod": "Flat Armor",
    "rFlatArmorModPerLevel": "Armor per Level",
    "PercentArmorMod": "Percent Armor",
    "FlatMagicDamageMod": "Flat Magic Damage",
    "PercentMagicDamageMod": "Percent Magic Damage",
    "FlatMovementSpeedMod": "Flat Movement Speed",
    "PercentMovementSpeedMod": "Percent Movement Speed",
    "FlatHPPoolMod": "Flat Health",
    "rFlatHPModPerLevel": "Health per Level",
    "FlatHPRegenMod": "Flat Health Regeneration",
    "rFlatHPRegenModPerLevel": "Health Regeneration per Level",
    "PercentHPRegenMod": "Percent Health Regeneration",
    "FlatMPPoolMod": "Flat Mana",
    "rFlatMPModPerLevel": "Mana per Level",
    "FlatMPRegenMod": "Flat Mana Regeneration",
    "rFlatMPRegenModPerLevel": "Mana Regeneration per Level",
    "PercentMPRegenMod": "Percent Mana Regeneration",
    "FlatAttackSpeedMod": "Flat Attack Speed",
    "PercentAttackSpeedMod": "Percent Attack Speed",
    "FlatPhysicalDamageMod": "Flat Physical Damage",
    "PercentPhysicalDamageMod": "Percent Physical Damage",
    "FlatCritChanceMod": "Flat Critical Strike Chance",
    "PercentCritChanceMod": "Percent Critical Strike Chance",
    "FlatCritDamageMod": "Flat Critical Strike Damage",
    "PercentCritDamageMod": "Percent Critical Strike Damage",
    "FlatSpellBlockMod": "Flat Magic Resist",
    "PercentSpellBlockMod": "Percent Magic Resist",
    "FlatDodgeMod": "Flat Dodge Chance",
    "FlatDodgeModPerLevel": "Dodge Chance per Level",
    "FlatEXPBonus": "Flat Experience Bonus",
    "PercentEXPBonus": "Percent Experience Bonus",
    "FlatGoldPer10Mod": "Flat Gold per 10 Seconds",
    "FlatEnergyRegenMod": "Flat Energy Regeneration",
    "FlatEnergyPoolMod": "Flat Energy",
    "rFlatEnergyRegenModPerLevel": "Energy Regeneration per Level",
    "rFlatEnergyModPerLevel": "Energy per Level",
    "PercentLifeStealMod": "Percent Life Steal",
    "PercentSpellVampMod": "Percent Spell Vamp",
    "rPercentCooldownMod": "Cooldown Reduction",
    "rPercentCooldownModPerLevel": "Cooldown Reduction per Level",
    "rFlatTimeDeadMod": "Time Dead Reduction",
    "rFlatTimeDeadModPerLevel": "Time Dead Reduction per Level",
    "rPercentTimeDeadMod": "Percent Time Dead Reduction",
    "rPercentTimeDeadModPerLevel": "Percent Time Dead Reduction per Level",
    "FlatBlockMod": "Flat Block",
    "PercentBlockMod": "Percent Block",
    "FlatPhysicalDamageMod": "Flat Physical Damage",
    "FlatMagicPenetrationMod": "Flat Magic Penetration",
    "FlatMagicPenetrationModPerLevel": "Magic Penetration per Level",
    "PercentMagicPenetrationMod": "Percent Magic Penetration",
    "PercentMagicPenetrationModPerLevel": "Percent Magic Penetration per Level"
};


// Track the currently expanded card
let expandedCard = null;

// Fetch the JSON file for items
fetch('../data/item.json')
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        const items = data.data; // Access the items object
        const container = document.getElementById('item-container'); // Container for item cards

        // Loop through each item in the JSON
        for (let itemKey in items) {
            const item = items[itemKey]; // Each item's data

            // Create a card for each item
            const card = document.createElement('div');
            card.classList.add('item-card');

            // Generate HTML content for the item
            card.innerHTML = `
                <img src="../images/item/${item.image.full}" alt="${item.name}" class="item-image">
                <h3>${item.name}</h3>
                <p class="item-cost">${item.gold.total}g</p>
                <div class="item-hover-info" style="display: none;">
                    <ul class="item-stats">
                        ${Object.keys(item.stats).map(stat => `
                            <li><strong>${statMapping[stat] || stat}:</strong> ${item.stats[stat]}</li>
                        `).join('')}
                    </ul>
                    <p class="item-description">${item.plaintext}</p>
                </div>
            `;

            // Add click event to expand/collapse the card
            $(card).on('click', function (e) {
                e.stopPropagation();

                // If this card is already expanded, shrink it
                if (expandedCard === this) {
                    closeExpandedCard(this);
                    expandedCard = null;
                } else {
                    // If there's another expanded card, close it first
                    if (expandedCard) {
                        closeExpandedCard(expandedCard);
                    }

                    // Expand the clicked card
                    expandedCard = this;
                    $(this).find('.item-hover-info').show(); // Show the hover info

                    // Set a larger size for the expanded card
                    $(this).css({
                        width: '300px', // Set desired width for the popup effect
                        height: 'auto', // Allow height to expand based on content
                        zIndex: 1000, // Bring the expanded card to the front
                    });
                }
            });

            // Append the card to the container
            container.appendChild(card);
        }

        // Add event listener for clicks outside the expanded card
        $(document).on('click', function () {
            if (expandedCard) {
                closeExpandedCard(expandedCard);
                expandedCard = null;
            }
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });

// Function to shrink and close the expanded card
function closeExpandedCard(card) {
    $(card).find('.item-hover-info').hide(); // Hide the hover info
    $(card).removeClass('expanded'); // Remove expanded class
    $(card).css({ // Reset styles
        width: '200px', // Reset width to 200px
        height: 'auto', // Allow height to collapse
        zIndex: 'auto', // Reset zIndex
    });
}