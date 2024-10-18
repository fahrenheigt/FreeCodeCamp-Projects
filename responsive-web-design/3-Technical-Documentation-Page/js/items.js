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
                <h3>${item.name}</h3> <!-- Item name as a header -->
                <p class="item-cost">${item.gold.total}g</p> <!-- Item cost as small text -->
                <div class="item-hover-info" style="display: none;"> <!-- Hidden by default -->
                    <ul class="item-stats"> <!-- Item stats as a list -->
                        ${Object.keys(item.stats).map(stat => `
                            <li><strong>${statMapping[stat] || stat}:</strong> ${item.stats[stat]}</li>
                        `).join('')}
                    </ul>
                    <p class="item-description">${item.plaintext}</p> <!-- Item description as text -->
                </div>
            `;

            // Add click event to toggle visibility of stats and description
            card.addEventListener('click', () => {
                // Collapse any other expanded cards
                const allCards = document.querySelectorAll('.item-card');
                allCards.forEach(c => {
                    if (c !== card) {
                        c.classList.remove('expanded');
                        c.querySelector('.item-hover-info').style.display = 'none'; // Hide other cards
                    }
                });

                // Expand or collapse the clicked card
                const hoverInfo = card.querySelector('.item-hover-info');
                if (card.classList.contains('expanded')) {
                    card.classList.remove('expanded'); // Collapse this card
                    hoverInfo.style.display = 'none'; // Hide info
                } else {
                    card.classList.add('expanded'); // Expand this card
                    hoverInfo.style.display = 'block'; // Show info
                }
            });

            // Append the card to the container
            container.appendChild(card);
        }
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error);
    });

// Function to filter items based on selected statistic
function filterItemsByStat(items, stat) {
    if (stat === 'All') {
        return items; // Return all items if 'Display All' is selected
    }
    return items.filter(item => item.stats[stat] && item.stats[stat] !== 0);
}

// Function to filter items based on the search query
function searchItemsByName(items, searchTerm) {
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to display items in the container
function displayItems(items) {
    const container = document.getElementById('item-container');
    container.innerHTML = ''; // Clear previous items

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        // Generate HTML content for the item
        itemCard.innerHTML = `
            <img src="../images/item/${item.image.full}" alt="${item.name}" class="item-image">
            <h3>${item.name}</h3> <!-- Item name as a header -->
            <p class="item-cost">${item.gold.total}g</p> <!-- Item cost as small text -->
            <div class="item-hover-info" style="display: none;"> <!-- Hidden by default -->
                <ul class="item-stats"> <!-- Item stats as a list -->
                    ${Object.keys(item.stats).map(stat => `
                        <li><strong>${statMapping[stat] || stat}:</strong> ${item.stats[stat]}</li>
                    `).join('')}
                </ul>
                <p class="item-description">${item.plaintext}</p> <!-- Item description as text -->
            </div>
        `;

        // Add click event to toggle visibility of stats and description
        itemCard.addEventListener('click', () => {
            // Collapse any other expanded cards
            const allCards = document.querySelectorAll('.item-card');
            allCards.forEach(c => {
                if (c !== itemCard) {
                    c.classList.remove('expanded');
                    c.querySelector('.item-hover-info').style.display = 'none'; // Hide other cards
                }
            });

            // Expand or collapse the clicked card
            const hoverInfo = itemCard.querySelector('.item-hover-info');
            if (itemCard.classList.contains('expanded')) {
                itemCard.classList.remove('expanded'); // Collapse this card
                hoverInfo.style.display = 'none'; // Hide info
            } else {
                itemCard.classList.add('expanded'); // Expand this card
                hoverInfo.style.display = 'block'; // Show info
            }
        });

        container.appendChild(itemCard);
    });
}

// Load and filter items from the JSON file
fetch('../data/item.json')
    .then(response => response.json())
    .then(data => {
        const items = Object.values(data.data); // Get all items

        // Handle filter button click
        document.getElementById('apply-filter').addEventListener('click', () => {
            const selectedStat = document.getElementById('stat-filter').value;
            const filteredItems = filterItemsByStat(items, selectedStat);
            displayItems(filteredItems); // Display filtered items
        });

        // Handle search button click
        document.getElementById('apply-search').addEventListener('click', () => {
            const searchTerm = document.getElementById('search-bar').value;
            const searchedItems = searchItemsByName(items, searchTerm);
            displayItems(searchedItems); // Display searched items
        });

        // Display all items by default
        displayItems(items);
    })
    .catch(error => console.error('Error fetching the JSON file:', error));
