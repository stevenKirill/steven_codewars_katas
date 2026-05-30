const form = document.getElementById('search');
const input = document.getElementById('search-input');
const list = document.getElementById('list');
const listItems = Array.from(list.children);


function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setItemHighlight(item, query) {
  const text = item.dataset.value;
  item.textContent = '';

  if (!query) {
    item.textContent = text;
    return;
  }

  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  let lastIndex = 0;

  for (const match of text.matchAll(regex)) {
    if (match.index > lastIndex) {
      item.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    const mark = document.createElement('mark');
    mark.textContent = match[0];
    item.appendChild(mark);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    item.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

function filterList(query) {
  const normalizedQuery = query.trim().toLowerCase();
  const highlightQuery = query.trim();

  for (const item of listItems) {
    const text = item.dataset.value.toLowerCase();
    const isMatch = normalizedQuery === '' || text.includes(normalizedQuery);
    item.style.display = isMatch ? '' : 'none';

    if (isMatch) {
      setItemHighlight(item, highlightQuery);
    } else {
      item.textContent = item.dataset.value;
    }
  }
}

input.addEventListener('input', () => {
  filterList(input.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  filterList(input.value);
});
