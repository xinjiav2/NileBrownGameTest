---
layout: base
permalink: /stocks/leaderboard
title: Leaderboard
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Leaderboard</title>
  <link rel="stylesheet" href="{{site.baseurl}}/assets/css/portfolio.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 0;
    }
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #001f3f;
        color: #fff;
    }
    .navbar .logo {
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 2px;
    }
    .navbar .nav-buttons {
        display: flex;
        gap: 20px;
    }
    .navbar .nav-buttons a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        padding: 8px 16px;
        border-radius: 4px;
        transition: background-color 0.3s;
    }
    .navbar .nav-buttons a:hover {
        background-color: #ff8c00;
    }
    .dashboard {
        padding: 20px;
    }
    
    /* Button Style for Title */
    .button {
        margin: 0;
        height: auto;
        background: transparent;
        padding: 0;
        border: none;
        cursor: pointer;
    }
    .button {
        --border-right: 6px;
        --text-stroke-color: rgba(255,255,255,0.6);
        --animation-color: #37FF8B;
        --fs-size: 2em;
        letter-spacing: 3px;
        text-decoration: none;
        font-size: var(--fs-size);
        font-family: "Arial";
        position: relative;
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px var(--text-stroke-color);
    }
    .hover-text {
        position: absolute;
        box-sizing: border-box;
        content: attr(data-text);
        color: var(--animation-color);
        width: 0%;
        inset: 0;
        border-right: var(--border-right) solid var(--animation-color);
        overflow: hidden;
        transition: 0.5s;
        -webkit-text-stroke: 1px var(--animation-color);
    }
    .button:hover .hover-text {
        width: 100%;
        filter: drop-shadow(0 0 23px var(--animation-color));
    }

    /* Leaderboard Table */
    table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    th, td {
        padding: 12px 20px;
        text-align: left;
    }
    th {
        background-color: #001f3f;
        color: #fff;
        font-size: 18px;
    }
    td {
        background-color: #f9f9f9;
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
      }

    .rank {
        font-weight: bold;
        color: #ff8c00;
    }
    .balance {
        color: #28a745;
        font-weight: bold;
    }
    .name {
        color: #f1f1f1;
    }
  </style>
</head>
<body>
  <!-- Navigation Bar -->
  <nav class="navbar">
      <div class="logo">NITD</div>
      <div class="nav-buttons">
          <a href="{{site.baseurl}}/stocks/home">Home</a>
          <a href="{{site.baseurl}}/crypto/portfolio">Crypto</a>
          <a href="{{site.baseurl}}/stocks/viewer">Stocks</a>
          <a href="{{site.baseurl}}/crypto/mining">Mining</a>
          <a href="{{site.baseurl}}/stocks/buysell">Buy/Sell</a>
          <a href="{{site.baseurl}}/stocks/leaderboard">Leaderboard</a>
          <a href="{{site.baseurl}}/stocks/game">Game</a>
      </div>
  </nav>
  
  <!-- Dashboard -->
  <div class="dashboard">
    <!-- Leaderboard Title -->
    <section>
      <button class="button">
        <span class="hover-text" data-text="Top 10 Users by Balance"></span>Top 10 Users by Balance
      </button>
      <table id="top-users-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Balance</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </section>
  </div>
</body>
</html>

<script type="module">
  import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  
  async function fetchLeaderboard() {
    try {
      const response = await fetch(`${javaURI}/api/rankings/leaderboard`, fetchOptions);
      if (!response.ok) throw new Error("Failed to fetch leaderboard data");
      const data = await response.json();
      const topUsersTable = document.querySelector("#top-users-table tbody");
      topUsersTable.innerHTML = "";
      
      data.forEach((user, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="rank shadow__btn">${index + 1}</td>
          <td class="balance">$${Number(user.balance).toFixed(2)}</td>
          <td class="name">${user.name}</td>
        `;
        topUsersTable.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", fetchLeaderboard);
</script>