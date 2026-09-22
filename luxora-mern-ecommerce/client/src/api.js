const BASE_URL = "/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("luxora_token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

export const api = {
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (id) => request(`/products/${id}`),
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  getCart: () => request("/cart"),
  addToCart: (productId, quantity = 1) =>
    request("/cart", { method: "POST", body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId, quantity) =>
    request(`/cart/${productId}`, { method: "PUT", body: JSON.stringify({ quantity }) }),
  removeCartItem: (productId) => request(`/cart/${productId}`, { method: "DELETE" }),
  subscribeNewsletter: (email) =>
    request("/newsletter/subscribe", { method: "POST", body: JSON.stringify({ email }) }),
  sendContactMessage: (body) => request("/contact", { method: "POST", body: JSON.stringify(body) }),
  createOrder: (body) => request("/orders", { method: "POST", body: JSON.stringify(body) }),
  getOrders: () => request("/orders"),
  getOrder: (id) => request(`/orders/${id}`),
};
