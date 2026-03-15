document.getElementById('action-btn').addEventListener('click', () => {
    const productCatalog = new Map();
    
    // Add minimum 5 products
    productCatalog.set(101, {name: 'Laptop', price: 1200});
    productCatalog.set(102, {name: 'Smartphone', price: 800});
    productCatalog.set(103, {name: 'Headphones', price: 150});
    productCatalog.set(104, {name: 'Monitor', price: 300});
    productCatalog.set(105, {name: 'Keyboard', price: 100});
    
    let html = '';
    html += `<div class="item"><strong>Total Products (Initial):</strong> ${productCatalog.size}</div>`;
    
    // Product List Initial
    html += `<div class="item"><strong>Current Catalog:</strong><ul>`;
    for(const [id, product] of productCatalog) {
        html += `<li>[${id}] ${product.name} - $${product.price}</li>`;
    }
    html += '</ul></div>';

    // Search product by ID
    const searchId = 103;
    if(productCatalog.has(searchId)) {
        const p = productCatalog.get(searchId);
        html += `<div class="item" style="background:#eef8ff;border-color:#b8daff;"><strong>Search Result (ID: ${searchId}):</strong> ${p.name} - $${p.price}</div>`;
    }
    
    // Delete product
    const deleteId = 105;
    productCatalog.delete(deleteId);
    html += `<div class="item" style="color:red">Deleted Product ID: ${deleteId} (Keyboard)</div>`;
    
    // Display total again
    html += `<div class="item"><strong>Total Products after deletion:</strong> ${productCatalog.size}</div>`;
    
    document.getElementById('output').innerHTML = html;
});