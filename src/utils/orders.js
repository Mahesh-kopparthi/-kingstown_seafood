export const generateOrderId = () => {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `KT-${timestamp}-${random}`
}

export const saveOrder = (orderData) => {
  const orders = getOrders()
  const newOrder = {
    ...orderData,
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    status: 'pending_payment',
  }
  orders.push(newOrder)
  localStorage.setItem('kingstownOrders', JSON.stringify(orders))
  localStorage.removeItem('kingstownCart')
  return newOrder
}

export const getOrders = () => {
  try {
    const saved = localStorage.getItem('kingstownOrders')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders()
  const updated = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order
  )
  localStorage.setItem('kingstownOrders', JSON.stringify(updated))
}
