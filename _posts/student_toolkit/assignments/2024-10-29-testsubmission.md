---
toc: false
title: Submission Page
permalink: /student/testsubmissions
search_exclude: true
layout: post
---

<title>Search Names</title>
<style>
        body {font-family: Arial, sans-serif;margin: 20px;}
        input {padding: 8px;width: 100%;margin-bottom: 10px;}
        table {width: 100%;border-collapse: collapse;}
        th, td {border: 1px solid black;padding: 8px;text-align: left;}
        button {padding: 5px 10px;cursor: pointer;}
</style>
<input type="text" id="searchBar" placeholder="Search for a name..." onkeyup="filterNames()">
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody id="namesTableBody"></tbody>
</table>
<div class="Review-Group" id="Review-Group">Review-Group</div>


<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    let people = [];
    let listofpeople=[];
    window.filterNames= function filterNames() {
        const searchTerm = document.getElementById("searchBar").value.toLowerCase();
        populateTable(people.filter(person => person.name.toLowerCase().includes(searchTerm)));
    }
    window.addName = function(name) {
        console.log("Added name:", name);
        listofpeople.push(name);
        console.log(listofpeople);
        const reviewGroup = document.getElementById('Review-Group'); 
        reviewGroup.textContent = listofpeople;
    };
    async function fetchAllStudents() {
        try {
            const response = await fetch(javaURI + "/api/people", fetchOptions);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            people = await response.json();
            console.log(people);
            populateTable(people);
        } catch (error) {
            console.error("Error fetching names:", error);
        }
    }
    function populateTable(names) {
        const tableBody = document.getElementById("namesTableBody");
        tableBody.innerHTML = "";
        names.forEach(name => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${name.name}</td><td><button onclick="addName('${name.name}')">Add</button></td>`;
            tableBody.appendChild(row);
        });
    }
    fetchAllStudents();
</script>
