       // Fetch the JSON file
       fetch('../data/championFull.json')
       .then(response => response.json()) // Parse the JSON data
       .then(data => {
           const champions = data.data; // Access the champions object
           const container = document.getElementById('champion-container'); // Container for champion cards
           const modal = document.getElementById('champion-modal'); // Modal element
           const closeBtn = document.getElementsByClassName('close')[0]; // Close button in modal
           const nameEl = document.getElementById('champion-name'); // Champion name in modal
           const titleEl = document.getElementById('champion-title'); // Champion title in modal
           const loreEl = document.getElementById('champion-lore'); // Champion lore in modal
           const spellsEl = document.getElementById('champion-spells'); // Champion spells in modal
           const statsEl = document.getElementById('champion-stats'); // Champion stats in modal

           // Loop through each champion in the JSON
           for (let championKey in champions) {
               const champion = champions[championKey]; // Each champion's data

               // Create a card for each champion
               const card = document.createElement('div');
               card.classList.add('champion-card');

               // Generate HTML content for the champion
               card.innerHTML = `
                   <img src="../images/champion/${champion.image.full}" alt="${champion.name}">
                   <h3>${champion.name}</h3>
                   <p><em>${champion.title}</em></p>
               `;

               // Add click event listener to open modal and display champion details
               card.addEventListener('click', () => {
                   // Set modal content
                   nameEl.textContent = champion.name;
                   titleEl.textContent = champion.title;
                   loreEl.textContent = champion.lore;

                        // Display champion spells
                        spellsEl.innerHTML = ''; // Clear previous spells
                        champion.spells.forEach(spell => {
                            const spellItem = document.createElement('li');
                            spellItem.classList.add('spell-item');
                            spellItem.innerHTML = `
                                <img src="../images/spell/${spell.image.full}" alt="${spell.name}">
                                <div class="spell-description">
                                    <strong>${spell.name}</strong>: ${spell.description}
                                </div>
                            `;
                            spellsEl.appendChild(spellItem);
                        });

                   // Show the modal
                   modal.style.display = 'block';
                   modal.scrollTo({ top: 0, behavior: 'smooth' });
               });


               // Append the card to the container
               container.appendChild(card);
           }

           // Close the modal when the close button is clicked
           closeBtn.onclick = () => {
               modal.style.display = 'none';
           };

           // Close the modal if the user clicks outside of the modal content
           window.onclick = event => {
               if (event.target === modal) {
                   modal.style.display = 'none';
               }
           };
       })
       .catch(error => {
           console.error('Error fetching the JSON file:', error);
       });
    
    