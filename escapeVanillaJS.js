document.addEventListener("DOMContentLoaded", () => {
    // 🪲 Bug: Incorrect ID used for attaching the event listener
    // FIXED: added corrected ID - solveRoom1
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug: Incorrect element ID //  FIXED: added corrected ID - room1Result
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting']);
        // 🪲 Bug: What's mssing from JS concepts?
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug: Incorrect function call
        /*
        FIXED, changed findIntersection(jsConcepts, jsConcepts) function call
        to findIntersection(jsConcepts, jsConcepts)
        */
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // Added async/await to handle asynchronous operations in Room 3.
    document.getElementById("solveRoom3").addEventListener("click", async () => {
        fetch('directions.json')
            .then(response => response.json())
            .then(async (directions) => {
                const message = await navigateLabyrinth(directions);
                document.getElementById("room3Result").innerHTML = message;
            });
    });
    
});

/*
 function findMostRecentBook(books) {
    // 🪲 Bug: Logic error
     return books.reduce((mostRecent, book) => new Date(book.published) < new Date(mostRecent.published) ? book : mostRecent);
 }
*/

//  FIXED: Updated findMostRecentBook to correctly use reduce for comparison.
function findMostRecentBook(books) {
    // Check if the books array is empty
    if (books.length === 0) return null; // Return null if no books are provided

    // Use reduce to find the most recent book by publication date
    return books.reduce((mostRecent, currentBook) => {
        // Compare the current book's publication date with the most recent book's date
        return new Date(currentBook.published) > new Date(mostRecent.published) ? currentBook : mostRecent;
    });
}

/*
 function findIntersection(setA, setB) {
    // 🪲 Bug: Incorrect logic
     const intersection = new Set([...setA]);
     return intersection;
    }
*/

// FIXED: Updated findIntersection function to use forEach for intersection
function findIntersection(setA, setB) {
    // Create a new Set to hold the intersection
    const intersection = new Set();

    // Iterate over setA and check if each element exists in setB
    setA.forEach(item => {
        if (setB.has(item)) {
            intersection.add(item); // Add to intersection if present in setB
        }
    });

    return intersection; // Return the resulting Set
}

// FIXED: added "await" to promise
async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // 🪲 Bug: No delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

