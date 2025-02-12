class NpcTracker {
    constructor() {
        this.trackedNPCs = []; // Stores NPCs the player has interacted with
        this.createNpcTrackerUI(); // Initialize the UI
    }

    /**
     * Adds an NPC to the tracker if not already present.
     * @param {string} npcName - The name of the NPC.
     */
    addNpc(npcName) {
        if (!this.trackedNPCs.includes(npcName)) {
            this.trackedNPCs.push(npcName);
            this.updateNpcTrackerUI();
        }
    }

    /**
     * Creates the NPC Tracker UI element dynamically.
     */
    createNpcTrackerUI() {
        let trackerContainer = document.createElement("div");
        trackerContainer.id = "npcTracker";
        trackerContainer.style.position = "absolute";
        trackerContainer.style.top = "120px"; // Positioned below the time UI
        trackerContainer.style.left = "10px";
        trackerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        trackerContainer.style.color = "white";
        trackerContainer.style.padding = "10px";
        trackerContainer.style.borderRadius = "5px";
        trackerContainer.style.fontSize = "14px";
        trackerContainer.style.fontWeight = "bold";
        trackerContainer.innerHTML = `<strong>NPC Tracker:</strong><br>`;
        document.body.appendChild(trackerContainer);
    }

    /**
     * Updates the NPC Tracker UI to show the NPCs encountered.
     */
    updateNpcTrackerUI() {
        const trackerContainer = document.getElementById("npcTracker");
        if (trackerContainer) {
            trackerContainer.innerHTML = `<strong>NPC Tracker:</strong><br>${this.trackedNPCs.join("<br>")}`;
        }
    }
}

// Export the instance so other files can use the same tracker
const npcTrackerInstance = new NpcTracker();
export default npcTrackerInstance;
