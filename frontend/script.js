const API_BASE = "https://your-render-backend-url.onrender.com";
// Example:
// const API_BASE = "https://pokemon-backend-xxxx.onrender.com";

const form = document.getElementById("pokemonForm");
const resultBox = document.getElementById("resultBox");
const errorBox = document.getElementById("errorBox");
const stylePill = document.getElementById("stylePill");
const tableWrap = document.getElementById("tableWrap");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    resultBox.classList.add("hidden");
    errorBox.classList.add("hidden");
    errorBox.textContent = "";

    const payload = {
        hp: document.getElementById("hp").value,
        attack: document.getElementById("attack").value,
        defense: document.getElementById("defense").value,
        sp_attack: document.getElementById("sp_attack").value,
        sp_defense: document.getElementById("sp_defense").value,
        speed: document.getElementById("speed").value
    };

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "PROCESSING...";

        const response = await fetch(`${API_BASE}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        stylePill.textContent = data.predicted_style;
        tableWrap.innerHTML = buildTable(data.recommendations);
        resultBox.classList.remove("hidden");

    } catch (error) {
        errorBox.textContent = error.message;
        errorBox.classList.remove("hidden");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "FIND MY POKÉMON";
    }
});

function buildTable(recommendations) {
    if (!recommendations || recommendations.length === 0) {
        return `<p class="empty-text">No recommendations found.</p>`;
    }

    let rows = recommendations.map((pokemon) => `
        <tr>
            <td>${pokemon.name}</td>
            <td>${capitalize(pokemon.type1)}</td>
            <td>${pokemon.hp}</td>
            <td>${pokemon.attack}</td>
            <td>${pokemon.defense}</td>
            <td>${pokemon.sp_attack}</td>
            <td>${pokemon.sp_defense}</td>
            <td>${pokemon.speed}</td>
            <td>${pokemon.distance}</td>
        </tr>
    `).join("");

    return `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>HP</th>
                    <th>Attack</th>
                    <th>Defense</th>
                    <th>Sp. Attack</th>
                    <th>Sp. Defense</th>
                    <th>Speed</th>
                    <th>Distance</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
}

function capitalize(text) {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
}