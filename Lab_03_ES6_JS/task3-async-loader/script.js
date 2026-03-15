function fetchUsers() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                {id: 1, name: 'Ali'},
                {id: 2, name: 'Ahmed'}
            ]);
        }, 3000);
    });
}

document.getElementById('action-btn').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.innerHTML = '<div class="item" style="color:orange;"><em>Loading data (approx 3 seconds)...</em></div>';
    
    fetchUsers()
        .then(users => {
            let html = '<div class="item" style="color:green;font-weight:bold;">Data Loaded Successfully!</div>';
            html += '<ul>';
            users.forEach(user => {
                html += `<li>ID: ${user.id}, Name: ${user.name}</li>`;
            });
            html += '</ul>';
            output.innerHTML = html;
        })
        .catch(error => {
            output.innerHTML = '<div class="item" style="color:red">Error fetching data</div>';
        });
});