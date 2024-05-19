function calculateTime() {
    const totalHours = parseFloat(document.getElementById("totalHours").value);
    const daysToComplete = parseFloat(document.getElementById("daysToComplete").value);
    const speed = parseFloat(document.getElementById("speed").value);

    // Validate the input
    if (isNaN(totalHours) || isNaN(daysToComplete) || isNaN(speed) || totalHours <= 0 || daysToComplete <= 0 || speed <= 0) {
        document.getElementById("result").innerHTML = "<p>Please enter valid positive numbers for all inputs.</p>";
    } else {
        let tableHTML = "<table><tr><th>Day</th><th>Hours to Watch</th><th>1x Speed</th></tr>";

        const dailyTime = totalHours / (daysToComplete * speed);

        const numDaysToShow = Math.min(daysToComplete, 3);

        for (let day = 1; day <= numDaysToShow; day++) {
            const realTime = dailyTime * speed;
            tableHTML += `<tr><td>Day ${day}</td><td>${dailyTime.toFixed(2)} (${speed}x)</td><td>${realTime.toFixed(2)} in 1x speed </td></tr>`;
        }

        if (daysToComplete > 3) {
            const remainingHours = totalHours - (dailyTime * 3 * speed);
            const remainingDays = daysToComplete - 3;
            const lastDayTime = remainingHours / (remainingDays * speed);
            const lastDayRealTime = lastDayTime * speed;
            tableHTML += `<tr><td>...</td><td>...</td><td>...</td></tr>`;
            tableHTML += `<tr><td>Last Day</td><td>${lastDayTime.toFixed(2)} (${speed}x)</td><td>${lastDayRealTime.toFixed(2)} hours in real</td></tr>`;
        }

        tableHTML += "</table>";
        tableHTML += `<p>Speed: ${speed}x</p>`;

        document.getElementById("result").innerHTML = tableHTML;
    }
}
