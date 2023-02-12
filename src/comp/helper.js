

export function getPizzaCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('order_options').collection('pizza');
    return collection;
}

export function getOrdersCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('orders').collection('customer_orders');
    return collection;
}

export function getInventoryCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('inventory').collection('pizzas');
    return collection;
}

export function getFinanceCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('complete').collection('finances');
    return collection;
}

//////////////////////////////////////////////////////////////////////////////////////////////
export function getAllInventoryCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('complete').collection('all_inventory');
    return collection;
}

export function getAllOrdersCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('complete').collection('all_orders');
    return collection;
}

export function getAllOrderOptionsCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('complete').collection('all_order_options');
    return collection;
}

export function getAllDataCollection(user){
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('complete').collection('all_data');
    return collection;
}
////////////////////////////////////////////////////////////////////////////////////////////////
export async function getAdminCollection(user) {
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('authorized_users').collection('admin_user');
    return collection;
}

export function pizzaCountSwitch(value){
    const atw = "The ATW";
    const bomb = "Da Bomb";
    const magic = "Maui Magic";
    const xtreme = "The Xtreme";
    const poll = "The Pollinator";
    const country = "Big Country";
    const boz = "The Boz";
    const pep = "Pepperonipalooza";
    const hurricane = "Hurricane";

    switch(value){
        case 0:
            return atw;
        case 1:
            return bomb;
        case 2:
            return magic;
        case 3:
            return xtreme;
        case 4:
            return poll;
        case 5:
            return country;
        case 6:
            return boz;
        case 7:
            return pep;
        case 8:
            return hurricane;
    }
}

