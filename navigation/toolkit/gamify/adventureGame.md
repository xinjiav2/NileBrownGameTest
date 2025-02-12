---
layout: base
title: Adventure Game
permalink: /gamify/adventureGame
---

<div id="gameContainer">
    <canvas id='gameCanvas'></canvas>
</div>


<script type="module">
    import gameControlInstance from '{{site.baseurl}}/assets/js/adventureGame/GameControl.js';
    
    const path = "{{site.baseurl}}";
    
    // Use the singleton instance directly
    gameControlInstance.start(path);
</script>
