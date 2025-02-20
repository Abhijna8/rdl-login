import React, { useState } from "react";

const accessories = [
  { id: 1, name: "Smart Watch", price: 99, icon: "⌚" },
  { id: 2, name: "Headphones", price: 79, icon: "🎧" },
  { id: 3, name: "Sunglasses", price: 49, icon: "🕶️" },
  { id: 4, name: "Backpack", price: 89, icon: "🎒" },
  { id: 5, name: "Wireless Mouse", price: 29, icon: "🖱️" },
];

const App = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  // Handle Registration
  const handleRegister = () => {
    if (!name || !password) {
      setError("Both fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.name === name);

    if (userExists) {
      setError("User already exists! Try a different name.");
      return;
    }

    const newUser = { name, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    setIsRegistering(false);
    setName("");
    setPassword("");
    setError("");
  };

  // Handle Login
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.name === name && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid credentials! Please try again.");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setName("");
    setPassword("");
    setCart([]);
  };

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="auth-box">
          <h2>{isRegistering ? "Register" : "Login"}</h2>
          {error && <p className="error">{error}</p>}

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isRegistering ? (
            <button onClick={handleRegister}>Register</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}

          <p onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Already have an account? Login" : "New user? Register here"}
          </p>
        </div>
      ) : (
        <div className="shopping-cart">
          <h2>Welcome, {JSON.parse(localStorage.getItem("loggedInUser")).name}!</h2>
          <h3>Available Accessories</h3>
          <div className="items">
            {accessories.map((item) => (
              <div key={item.id} className="item">
                <span className="icon">{item.icon}</span>
                <p>{item.name}</p>
                <p>${item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>

          <h3>Shopping Cart</h3>
          <div className="cart">
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <p key={index}>
                  {item.icon} {item.name} - ${item.price}
                </p>
              ))
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
          <h3>Total: ${totalPrice}</h3>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
