class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

document.getElementById('action-btn').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.innerHTML = '<div class="item" style="color:orange;"><em>Processing data in university portal...</em></div>';
    
    const studentsMap = new Map();
    const coursesSet = new Set(['Web API', 'React JS', 'Node JS', 'React JS']); // Duplicates removed
    
    // Add students
    studentsMap.set(1, new Student(1, 'Mahad'));
    studentsMap.set(2, new Student(2, 'Amna'));
    studentsMap.set(3, new Student(3, 'Mohtasim'));

    // Simulate saving data validation
    const saveStudentData = (studentMap, courseSet) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'Success - Data Saved',
                    totalStudents: studentMap.size,
                    totalCourses: courseSet.size,
                    students: Array.from(studentMap.values()),
                    courses: Array.from(courseSet)
                });
            }, 1000);
        });
    };
    
    saveStudentData(studentsMap, coursesSet).then(result => {
        let html = `<div class="item" style="color:white;background:green;border-color:darkgreen;"><strong>Status:</strong> ${result.status}</div>`;
        
        html += `<div class="item"><strong>Registered Students Map (${result.totalStudents}):</strong><ul>`;
        result.students.forEach(s => {
            html += `<li>ID: ${s.id} | Name: ${s.name}</li>`;
        });
        html += `</ul></div>`;
        
        html += `<div class="item"><strong>Available Courses Set (${result.totalCourses}):</strong><ul>`;
        result.courses.forEach(c => {
            html += `<li>${c}</li>`;
        });
        html += `</ul></div>`;
        
        output.innerHTML = html;
    });
});