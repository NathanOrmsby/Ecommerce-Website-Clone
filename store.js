
// Check if document is still loading
if (document.readState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

// Javascript only runs when page is done loading 
function ready () {
    // Remove button functionality
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)

    // Remove button to remove rows
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Quantity input functionality
    var quantInputs = document.getElementsByClassName('cart-quantity-input')

    for (var i = 0; i < quantInputs.length; i++) {
        var input = quantInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')

    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// Purchase button function that removes all items from cart
function purchaseClicked() {
    alert('Thank you for your purchase')
    var items = document.getElementsByClassName('cart-items')[0]
    while (items.hasChildNodes()) {
        items.removeChild(items.firstChild)
    }
    updateCartTotal()
}
// Function that handles changed values in the quantity inputs
function quantityChanged (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

// Function for adding an item to the cart when button is clicked
function addToCartClicked(event) {
    var button = event.target
    var item = button.parentElement.parentElement
    var title = item.getElementsByClassName('shop-item-title')[0].innerText
    var price = item.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = item.getElementsByClassName('shop-item-img')[0].src
    console.log(title)
    console.log(price)
    console.log(imgSrc)

    addItemToCart(title, price, imgSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item has already been added to the cart')
            return
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-img" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" role="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

// Function that handles removing cart items
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal() 
}


// Total to update depending on items in cart
function updateCartTotal () {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')

    var totalPrice = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quant = quantElement.value
        totalPrice += price * quant
        console.log(totalPrice)         
    }
    totalPrice = Math.round(totalPrice * 100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + totalPrice
}

