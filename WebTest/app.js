// Assuming your CSV file is in the same directory
const csvFile = 'https://www.perfectpitchent.com/WebTest/data.csv';

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
    
    // Set the scrolling speed (higher value = slower scroll)
    const scrollSpeed = 50;
    
    let scrollInterval = setInterval(() => {
        // Increment the scrollTop position to scroll down
        container.scrollTop += 1;}
    )}