

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

export async function getAdminCollection(user) {
    const mongo = user.mongoClient('mongodb-atlas');
    const collection = mongo.db('authorized_users').collection('admin_user');
    return collection;
}

