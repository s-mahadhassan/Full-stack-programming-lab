class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

document.getElementById('action-btn').addEventListener('click', () => {
    const s1 = new Student(1, 'Mahad', 'Spring 2026', ['Web Dev', 'Database']);
    const s2 = new Student(2, 'Amna', 'Spring 2026', ['Information Security', 'Data Structures']);
    const s3 = new Student(3, 'Mohtasim', 'Fall 2026', ['AI', 'Networks']);
    
    let students = [s1, s2, s3];
    let html = '<table><tr><th>ID</th><th>Name</th><th>Semester</th><th>Courses</th></tr>';
    
    for(const student of students) {
        html += `<tr><td>${student.id}</td><td>${student.name}</td><td>${student.semester}</td><td>${student.courses.join(', ')}</td></tr>`;
    }
    html += '</table>';
    
    document.getElementById('output').innerHTML = html;
});