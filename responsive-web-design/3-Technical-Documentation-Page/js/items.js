let allItems = []; // Store all items globally for filtering and searching

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
 
$(document).ready(async function () {

    // Fetch the JSON file for items
    await fetch('../data/item.json')
        .then(response => response.json()) // Parse the JSON data
        .then(data => {
            allItems = Object.values(data.data); // Store all items globally
            displayItems(allItems); // Display all items by default
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });

    // Handle filter button click
    $('#apply-filter').on('click', () => {
        applyFilterAndSearch();
    });

    // Handle search button click
    $('#apply-search').on('click', () => {
        applyFilterAndSearch();
    });

    // Function to display items in the container
    function displayItems(items) {
        const container = document.getElementById('item-container');
        container.innerHTML = ''; // Clear previous content

        if (items.length === 0) {
            container.innerHTML = '<p>No items found.</p>'; // Handle no items case
            return;
        }

        // Loop through each item and create a card
        items.forEach(item => {
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

            // Append the card to the container
            container.appendChild(card);

            // Add click event for expanding the item card
            $(card).on("click", function () {
                expandItemCard(card);
            });
        });
    }

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

    // Function to handle both filtering and searching
    function applyFilterAndSearch() {
        const selectedStat = $('#stat-filter').val();
        const searchTerm = $('#search-bar').val().trim();

        let filteredItems = filterItemsByStat(allItems, selectedStat);
        if (searchTerm) {
            filteredItems = searchItemsByName(filteredItems, searchTerm);
        }

        displayItems(filteredItems); // Display filtered and/or searched items
    }

    // Function to expand the item card
    function expandItemCard(card) {
        var clone;
        clone = $(card).clone();
        $(clone).addClass('item-card-clone');

        $(".item-card-clone").remove();
        $(".item-card").removeClass("blackface");

        $(clone)
            .css("z-index", 1000)
            .css("top", $(card).position().top)
            .css("left", $(card).position().left);

        $("#item-container").append(clone);

        $(card).addClass("blackface");

        $(clone)
            .css("position", "absolute")
            .animate(
                {
                    height: '28rem',
                    width: '16rem',
                },
                {
                    step: function (now, fx) {
                        $(clone).css('transform', "translateX(-1.7rem)");
                    },
                    done: function () {
                        $(clone).children(".item-hover-info").show();
                    },
                    duration: 200
                },
                200
            );

        $(clone).on("click", function () {
            $(clone).animate(
                {
                    height: '18rem',
                    width: '12rem',
                },
                {
                    step: function (now, fx) {
                        $(clone).css('transform', "translateX(0)");
                    },
                    done: function () {
                        $(clone).remove();
                        $(card).removeClass("blackface");
                    },
                    duration: 200
                },
                200
            );
        });
    }
});
