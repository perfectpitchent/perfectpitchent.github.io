// Assuming your CSV file is in the same directory
const csvFile = 'data.csv';

// Function to fetch CSV file
async function fetchCSV() {
    const response = await fetch(csvFile);
    const data = await response.text();
    return data;
}

// Function to convert CSV to an array of objects
function parseCSV(csvData) {
    const rows = csvData.split('\n').map(row => row.split(','));
    const headers = rows.shift(); // Remove the first row which contains headers
    return rows.map(row => {
        let obj = {};
        row.forEach((value, index) => {
            obj[headers[index]] = value;
        });
        return obj;
    });
}

// Function to display data in the HTML container
function displayData(data) {
    const container = document.getElementById('dataContainer');
    container.innerHTML = ''; // Clear existing data

    data.forEach(row => {
        const div = document.createElement('div');
        div.textContent = Object.values(row).join(' | ');
        container.appendChild(div);
    });
}

// Randomly shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Scroll function to make it scroll at intervals
function autoScroll() {
    const container = document.getElementById('dataContainer');
    let scrollInterval = setInterval(() => {
        container.scrollTop += 1;
        if (container.scrollTop + container.offsetHeight >= container.scrollHeight) {
            clearInterval(scrollInterval);
            setTimeout(() => container.scrollTop = 0, 1000); // Reset scroll after reaching the bottom
        }
    }, 20); // Adjust speed here
}

// Fetch and display data
fetchCSV()
    .then(csvData => {
        let data = parseCSV(csvData);
        data = shuffleArray(data); // Randomize the data
        displayData(data);
        autoScroll(); // Start auto-scrolling
    })
    .catch(error => console.error('Error fetching the CSV:', error));