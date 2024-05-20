function calculateTime() {
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const speed = parseFloat(document.getElementById("speed").value);
    let daysToComplete;
    let completionDate;

    // Check if the user entered the number of days or selected the completion date
    if (document.getElementById("daysToComplete").value) {
        daysToComplete = parseFloat(document.getElementById("daysToComplete").value);
        completionDate = new Date(); // Set the completion date to today
        completionDate.setDate(completionDate.getDate() + 1); // Set the completion date to tomorrow
        completionDate.setDate(completionDate.getDate() + daysToComplete - 1); // Calculate the completion date based on the number of days
    } else {
        completionDate = new Date(document.getElementById("completionDate").value);
        const today = new Date();
        const diffTime = completionDate.getTime() - today.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24); // Calculate the difference in days
        daysToComplete = Math.ceil(diffDays); // Round up to ensure a complete day
    }

    // Validate the input
    if (isNaN(totalHours) || isNaN(daysToComplete) || isNaN(speed) || totalHours <= 0 || daysToComplete <= 0 || speed <= 0) {
        document.getElementById("result").innerHTML = "<p>Please enter valid positive numbers for all inputs.</p>";
    } else {
        let tableHTML = "<table><tr><th>Day</th><th>Hours to Watch</th><th>Actual Completion</th></tr>";

        const dailyTime = totalHours / (daysToComplete * speed);

        const numDaysToShow = Math.min(daysToComplete, 3);

        for (let day = 1; day <= numDaysToShow; day++) {
            const realTime = dailyTime * speed;
            tableHTML += `<tr><td>Day ${day}</td><td>${dailyTime.toFixed(2)} (${speed}x)</td><td>${realTime.toFixed(2)} of video</td></tr>`;
        }

        if (daysToComplete > 3) {
            const remainingHours = totalHours - (dailyTime * 3 * speed);
            const remainingDays = daysToComplete - 3;
            const lastDayTime = remainingHours / (remainingDays * speed);
            const lastDayRealTime = lastDayTime * speed;
            tableHTML += `<tr><td>...</td><td>...</td><td>...</td></tr>`;
            tableHTML += `<tr><td>Day ${daysToComplete}</td><td>${lastDayTime.toFixed(2)} (${speed}x)</td><td>${remainingHours.toFixed(2)} of Video</td></tr>`;
        }

        tableHTML += "</table>";
        tableHTML += `<p>Speed: ${speed}x</p>`;
        
        const startDate = new Date();
        const startDateString = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
        tableHTML += `<p>Start Date: ${startDateString}</p>`;
        
        // Add +1 to the last date
        completionDate.setDate(completionDate.getDate() + 1);
        const lastDate = completionDate.getDate() + "/" + (completionDate.getMonth() + 1) + "/" + completionDate.getFullYear();
        tableHTML += `<p>Last Date: ${lastDate}</p>`;
        
        const totalDays = daysToComplete.toFixed(2); // Include fractional days
        tableHTML += `<p>Total Days: ${totalDays}</p>`;

        document.getElementById("result").innerHTML = tableHTML;

        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Promotion
        document.getElementById("promotion").innerHTML = "<p>Are you looking for Lecture Duration Calculator (+/-)? Check out <a href='https://ruizxzx.github.io/TimeCalculator/' target='_blank'>Lecture Duration Calculator</a>.</p>";
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        calculateTime();
    }
}

// Add event listeners to input fields to trigger calculation on Enter keypress
document.getElementById("totalHours").addEventListener("keypress", handleKeyPress);
document.getElementById("speed").addEventListener("keypress", handleKeyPress);
document.getElementById("daysToComplete").addEventListener("keypress", handleKeyPress);
document.getElementById("completionDate").addEventListener("keypress", handleKeyPress);
