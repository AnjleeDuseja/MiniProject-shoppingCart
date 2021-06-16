var products = [0, 0, 0, 0, 0, 0];
var totalP = 0


//for like and unlike the product
function toggleFunction(heartIcon) {
    console.log(heartIcon.style.color)
    if (heartIcon.style.color === 'red') {
        heartIcon.style.color = 'white'
    }
    else {
        heartIcon.style.color = 'red'
    }

}

//to update the total price in the cart
function updateTotal(total) {
    var list = document.querySelector('#yourCart')
    list.lastElementChild.children[1].innerText = "$" + total
}


// to get the item details and pass it to addToCart
function addItem(btnAdd) {
    var image = btnAdd.parentElement.parentElement.previousElementSibling.children[0].src
    var name = btnAdd.parentElement.nextElementSibling.innerHTML
    var price = btnAdd.parentElement.nextElementSibling.nextElementSibling.innerHTML

    products[btnAdd.id] = products[btnAdd.id] + 1

    btnAdd.nextElementSibling.style.visibility = "visible";
    addToCart(image, name, price, products[btnAdd.id], btnAdd.id)
}


// adding item to the cart
function addToCart(image, name, price, qty, btnAdd_id) {

    var unitP = 1 * price.trim().slice(1)
    totalP = totalP + unitP
    updateTotal(totalP)

    //if item is already in the cart, just update it
    if (qty > 1) {
        var priceofProduct = qty * price.trim().slice(1)
        document.getElementById("item_" + btnAdd_id).children[1].innerText = qty
        document.getElementById("item_" + btnAdd_id).children[3].innerText = "$" + priceofProduct
    }

    // else add the item to the cart
    else {
        var listItem = document.createElement('li')
        listItem.style.listStyle = 'none'
        listItem.setAttribute("id", "item_" + btnAdd_id)
        listItem.setAttribute("class", "list-group-item d-flex justify-content-between lh-condensed")

        var detail = `
            <div>
               <span ><img src=${image} style="width: 60px; height: 70px;"><small class="my-0">  ${name}</small></span>
            </div>
            
                <span ><small>${qty}</small></span>
                <span >
                      <button class="btn" style="background-color:RoyalBlue" id="trash"  onclick="trash(this)"><i class="fa fa-trash"  style="color: white;"></i></button>
                      <button class="btn" onclick="addI(${btnAdd_id})"  style="background-color:forestgreen" ><i class="fa fa-plus" style="color: white;"></i></button>
                      <button class="btn" id="item_" onclick="removeI(id+${btnAdd_id})" style="background-color:rgb(235, 86, 86)"><i class="fa fa-minus" style="color: white; "></i></button> 
                </span>
                <span ><small>${price}</small></span>   
    `
        
        listItem.innerHTML = detail
        var list = document.querySelector('#yourCart')
        list.insertBefore(listItem, list.lastElementChild)
    }

}


function removeItem(btnRemove) {
        
         var btnIndex = btnRemove.id.slice(1)
         products[btnIndex] = products[btnIndex] - 1
         var price = btnRemove.parentElement.nextElementSibling.nextElementSibling.innerHTML
         updateCart(btnRemove, price, products[btnIndex])

        if (products[btnIndex] == 0) {
                  btnRemove.style.visibility = "hidden"

        }

        

}


function updateCart(btnRemove, price, qty) {

    var priceofProduct = qty * price.trim().slice(1)
    var removeItem = "item_" + btnRemove.id.slice(1)
    var liItem = document.querySelector('#' + removeItem)
    document.getElementById(removeItem).children[1].innerText = qty
    document.getElementById(removeItem).children[3].innerText = "$" + priceofProduct

    if (products[btnRemove.id.slice(1)] == 0) {
        liItem.remove()

    }
    var unitP = 1 * price.trim().slice(1)
    totalP = totalP - unitP
    updateTotal(totalP)

}


function trash(btnTrash) {

    var productIndex=0
    var priceofProduct = (btnTrash.parentElement.parentElement.children[3].innerText.trim().slice(1))
    totalP = totalP - priceofProduct

    btnTrash.parentElement.parentElement.remove()
    updateTotal(totalP)

    productIndex=btnTrash.parentElement.parentElement.id.charAt(5)
    products[productIndex]=0
    var productId="m"+productIndex
    document.getElementById(productId).style.visibility="hidden"


}



function removeI(li_item) {
    
    var productIndex = li_item.charAt(li_item.length - 1)
    products[productIndex] = products[productIndex] - 1;

    var qnantity = document.querySelector('#' + li_item).children[1].innerText
    var totPrice = (document.querySelector('#' + li_item).children[3].innerText.slice(1))
    var unitP = totPrice / qnantity

    document.querySelector('#' + li_item).children[3].innerText = "$" + (totPrice - unitP)

    if (qnantity > 1) {
        document.querySelector('#' + li_item).children[1].innerText = qnantity - 1
    }

    else {
        document.querySelector('#' + li_item).remove()
        document.getElementById('m' + li_item.charAt(li_item.length - 1)).style.visibility = "hidden"
    }

    console.log(unitP)
    totalP = totalP - unitP
    updateTotal(totalP)
}



function addI(li_item) {
    products[li_item] = products[li_item] + 1;
    var quantity = 1 * (document.querySelector('#item_' + li_item).children[1].innerText)
    var totPrice = 1 * (document.querySelector('#item_' + li_item).children[3].innerText.slice(1))
    var unitP = totPrice / quantity
    document.querySelector('#item_' + li_item).children[3].innerText = "$" + (totPrice + unitP)
    document.querySelector('#item_' + li_item).children[1].innerText = quantity + 1

    totalP = totalP + unitP
    updateTotal(totalP)


}
