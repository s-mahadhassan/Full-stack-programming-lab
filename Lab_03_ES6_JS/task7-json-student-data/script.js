document.getElementById('action-btn').addEventListener('click', () => {
    const students = [
        { name: 'Mahad', age: 22, semester: '3rd', courses: ['Calculus', 'Database'] },
        { name: 'Amna', age: 22, semester: '5th', courses: ['HCI', 'DS'] },
        { name: 'Mohtasim', age: 21, semester: '4th', courses: ['OOP', 'Islamiat'] }
    ];
    
    let html = '';
    
    // 1. Convert to JSON
    const jsonString = JSON.stringify(students);
    html += `<div class="item"><strong>1. JSON String (Converted from Array of Objects):</strong><br><code style="font-size:12px;display:block;margin-top:5px;background:#eee;padding:10px;border-radius:4px;word-break:break-all;">${jsonString}</code></div>`;
    
    // 2. Convert back to Object
    const parsedStudents = JSON.parse(jsonString);
    html += `<div class="item"><strong>2. Parsed Objects (Re-converted):</strong> Array Length = ${parsedStudents.length} items</div>`;
    
    // 3, 4, 5. Destructure, forEach, Display
    html += `<div class="item"><strong>3-5. Displaying data using Object Destructuring & forEach loop:</strong></div>`;
    
    let tableHtml = '<table><tr><th>Name</th><th>Age</th><th>Semester</th><th>Courses</th></tr>';
    parsedStudents.forEach(student => {
        const { name, age, semester, courses } = student; // Destructuring
        tableHtml += `<tr>
            <td>${name}</td>
            <td>${age}</td>
            <td>${semester}</td>
            <td>${courses.join(', ')}</td>
        </tr>`;
    });
    tableHtml += '</table>';
    
    html += tableHtml;
    
    document.getElementById('output').innerHTML = html;
});