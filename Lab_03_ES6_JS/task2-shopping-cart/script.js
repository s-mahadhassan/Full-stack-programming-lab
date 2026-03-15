const products = [];

function addToCart(...items) {
    products.push(...items);
}

document.getElementById('action-btn').addEventListener('click', () => {
    addToCart({name: 'Mechrevo Laptop', price: 1000}, {name: 'Powerbank', price: 20}, {name: 'Iphone 16', price: 5000});
    
    const cartClone = [...products];
    const [firstItem, ...remainingItems] = cartClone;
    
    let html = `<div class="item"><strong>Total Items:</strong> ${cartClone.length}</div>`;
    html += `<div class="item"><strong>First Item:</strong> ${firstItem.name} ($${firstItem.price})</div>`;
    
    html += `<div class="item"><strong>Remaining Items Cart:</strong> <ul>`;
    remainingItems.forEach(item => {
        html += `<li>${item.name} ($${item.price})</li>`;
    });
    html += `</ul></div>`;
    
    html += `<div class="item" style="color:green;font-weight:bold;">Updated Cart Object: <code>${JSON.stringify(cartClone)}</code></div>`;
    document.getElementById('output').innerHTML = html;
});