// Fresh Stock — static inventory demo.
// Edit this list to change what appears on the page.
const INVENTORY = [
  { name: "Apple",        emoji: "🍎", category: "fruit",     quantity: 142, unit: "pcs",    origin: "Local orchard" },
  { name: "Banana",       emoji: "🍌", category: "fruit",     quantity: 88,  unit: "pcs",    origin: "Ecuador" },
  { name: "Strawberry",   emoji: "🍓", category: "fruit",     quantity: 24,  unit: "punnets", origin: "Greenhouse" },
  { name: "Orange",       emoji: "🍊", category: "fruit",     quantity: 63,  unit: "pcs",    origin: "Spain" },
  { name: "Grapes",       emoji: "🍇", category: "fruit",     quantity: 0,   unit: "kg",     origin: "Italy" },
  { name: "Lemon",        emoji: "🍋", category: "fruit",     quantity: 47,  unit: "pcs",    origin: "Spain" },
  { name: "Watermelon",   emoji: "🍉", category: "fruit",     quantity: 9,   unit: "pcs",    origin: "Local farm" },
  { name: "Pear",         emoji: "🍐", category: "fruit",     quantity: 31,  unit: "pcs",    origin: "Local orchard" },
  { name: "Carrot",       emoji: "🥕", category: "vegetable", quantity: 210, unit: "pcs",    origin: "Local farm" },
  { name: "Broccoli",     emoji: "🥦", category: "vegetable", quantity: 38,  unit: "heads",  origin: "Local farm" },
  { name: "Tomato",       emoji: "🍅", category: "vegetable", quantity: 96,  unit: "pcs",    origin: "Greenhouse" },
  { name: "Potato",       emoji: "🥔", category: "vegetable", quantity: 340, unit: "kg",     origin: "Local farm" },
  { name: "Bell Pepper",  emoji: "🫑", category: "vegetable", quantity: 12,  unit: "pcs",    origin: "Netherlands" },
  { name: "Cucumber",     emoji: "🥒", category: "vegetable", quantity: 54,  unit: "pcs",    origin: "Greenhouse" },
  { name: "Corn",         emoji: "🌽", category: "vegetable", quantity: 0,   unit: "cobs",   origin: "Local farm" },
  { name: "Onion",        emoji: "🧅", category: "vegetable", quantity: 175, unit: "kg",     origin: "Local farm" },
  { name: "Leafy Greens", emoji: "🥬", category: "vegetable", quantity: 22,  unit: "bunches", origin: "Greenhouse" },
  { name: "Mushroom",     emoji: "🍄", category: "vegetable", quantity: 40,  unit: "punnets", origin: "Local grower" },
  { name: "Garlic",       emoji: "🧄", category: "vegetable", quantity: 8,   unit: "kg",     origin: "China" },
  { name: "Basil",        emoji: "🌿", category: "herb",      quantity: 18,  unit: "pots",   origin: "Greenhouse" },
  { name: "Chili Pepper", emoji: "🌶️", category: "herb",      quantity: 6,   unit: "punnets", origin: "Greenhouse" },
];

const LOW_STOCK_THRESHOLD = 15;

const grid = document.getElementById("grid");
const emptyMsg = document.getElementById("empty");
const searchInput = document.getElementById("search");
const chips = Array.from(document.querySelectorAll(".chip"));

let activeCategory = "all";
let query = "";

function stockLevel(qty) {
  if (qty <= 0) return { key: "out", label: "Out of stock" };
  if (qty <= LOW_STOCK_THRESHOLD) return { key: "low", label: "Low stock" };
  return { key: "ok", label: "In stock" };
}

function cardMarkup(item) {
  const level = stockLevel(item.quantity);
  return `
    <li class="card" data-category="${item.category}">
      <div class="card-top">
        <span class="card-emoji" aria-hidden="true">${item.emoji}</span>
        <span class="card-cat">${item.category}</span>
      </div>
      <h3 class="card-name">${item.name}</h3>
      <p class="card-meta">Origin: ${item.origin}</p>
      <div class="card-qty">
        <span class="num">${item.quantity.toLocaleString()}</span>
        <span class="unit">${item.unit}</span>
      </div>
      <span class="badge ${level.key}">${level.label}</span>
    </li>`;
}

function visibleItems() {
  return INVENTORY.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery = item.name.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}

function updateStats(items) {
  const units = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowOrOut = items.filter((item) => item.quantity <= LOW_STOCK_THRESHOLD).length;
  document.getElementById("stat-items").textContent = items.length.toLocaleString();
  document.getElementById("stat-units").textContent = units.toLocaleString();
  document.getElementById("stat-low").textContent = lowOrOut.toLocaleString();
}

function render() {
  const items = visibleItems();
  grid.innerHTML = items.map(cardMarkup).join("");
  emptyMsg.hidden = items.length > 0;
  updateStats(items);
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.toggle("is-active", c === chip));
    activeCategory = chip.dataset.category;
    render();
  });
});

searchInput.addEventListener("input", () => {
  query = searchInput.value.trim().toLowerCase();
  render();
});

render();
