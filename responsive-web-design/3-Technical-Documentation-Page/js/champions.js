       // Fetch the JSON file
       fetch('../data/championFull.json')
       .then(response => response.json()) // Parse the JSON data
       .then(data => {
           const champions = data.data; // Access the champions object
           const backdropFilter= document.getElementById('backdrop-filter');//Backdrop filter for the modal
           const container = document.getElementById('champion-container'); // Container for champion cards
           const modal = document.getElementById('champion-modal'); // Modal element
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
                   loreEl.innerHTML = champion.lore;

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
                     backdropFilter.style.display = 'block';
                    document.body.classList.add('hide-scrollbar');
               });



               // Append the card to the container
               container.appendChild(card);
           }

           // Close the modal if the user clicks outside of the modal content
           window.onclick = event => {
                console.log(event.target);
               if (event.target === backdropFilter || event.target === modal) {
                   modal.style.display = 'none';
                   backdropFilter.style.display = 'none';
                   document.body.classList.remove('hide-scrollbar');
               }
           };
       })
       .catch(error => {
           console.error('Error fetching the JSON file:', error);
       });
    
    