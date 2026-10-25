document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // User Map Interaction Logic
    // ----------------------------------------------------
    const userZones = document.querySelectorAll('#page-map .user-zone.available');
    const slotsContainer = document.querySelector('#page-map .parking-slots-container');
    const parkingSlotsDiv = document.querySelector('#page-map .parking-slots');
    const confirmBtn = document.querySelector('#page-map .confirm-slot-btn');
    const cancelBtn = document.querySelector('#page-map .cancel-slot-btn');
    let selectedSlot = null;

    // Helper to render slots
    function renderSlots() {
        parkingSlotsDiv.innerHTML = ''; // clear existing
        confirmBtn.disabled = true;
        selectedSlot = null;

        for (let i = 1; i <= 10; i++) {
            const slot = document.createElement('button');
            slot.classList.add('slot');
            slot.type = 'button';
            slot.textContent = i;

            // 1-5 occupied (grey), 6-10 free (green)
            if (i <= 5) {
                slot.classList.add('occupied');
                slot.disabled = true;
            } else {
                slot.classList.add('free');
                slot.addEventListener('click', () => {
                    // Deselect previous
                    if (selectedSlot) {
                        selectedSlot.classList.remove('selected');
                    }

                    if (selectedSlot === slot) {
                        // Toggle off if clicking the same one
                        selectedSlot = null;
                        confirmBtn.disabled = true;
                    } else {
                        // Select new
                        slot.classList.add('selected');
                        selectedSlot = slot;
                        confirmBtn.disabled = false;
                    }
                });
            }

            parkingSlotsDiv.appendChild(slot);
        }
    }

    // Zone click handler
    userZones.forEach(zone => {
        zone.addEventListener('click', () => {
            // Show the slots container and render fresh slots
            slotsContainer.style.display = 'block';
            renderSlots();
        });
    });

    // Cancel button click handler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            slotsContainer.style.display = 'none';
            selectedSlot = null;
            confirmBtn.disabled = true;
        });
    }

    // Confirm button click handler
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            if (selectedSlot) {
                // Change the selected slot to occupied
                selectedSlot.classList.remove('selected', 'free');
                selectedSlot.classList.add('occupied');
                selectedSlot.disabled = true;
                selectedSlot = null;
                confirmBtn.disabled = true;

                // Optionally hide the container or show a success message
                // For now, let's keep it visible so the user sees the color change.
                setTimeout(() => {
                    slotsContainer.style.display = 'none';
                }, 1000); // hide after a short delay for visual feedback
            }
        });
    }
});
