document.getElementById('action-btn').addEventListener('click', () => {
    const courseSet = new Set();
    
    // Add courses including duplicates
    courseSet.add('Math');
    courseSet.add('AI');
    courseSet.add('Math');
    courseSet.add('Web');
    courseSet.add('AI'); // Duplicate
    courseSet.add('Database');
    
    let html = `<div class="item"><strong>Total Unique Courses:</strong> ${courseSet.size}</div>`;
    html += `<div class="item"><strong>Registered Courses (Duplicates omitted):</strong><ul>`;
    
    for(const course of courseSet) {
        html += `<li>${course}</li>`;
    }
    
    html += `</ul></div>`;
    document.getElementById('output').innerHTML = html;
});