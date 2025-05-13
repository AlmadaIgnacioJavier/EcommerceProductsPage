# 🛒 React E-Commerce UI

A modern and responsive e-commerce frontend built with **React**, **Zustand** for state management, and **Material Tailwind** for UI components. This app integrates with [Fake Store API](https://fakestoreapi.com/) to display and manage a product catalog with search, category filtering, and cart functionality.

## ✨ Features

- 🛍 Product listing with search and category filter
- 🧊 Skeleton loaders while fetching products
- 🛒 Shopping cart with item quantity management
- 📦 Persistent cart state using `zustand`
- 🖼 Modal product image preview
- 📱 Responsive design with Tailwind CSS

## 🚀 Tech Stack

- **React**
- **Zustand** (state management)
- **Material Tailwind** (UI components)
- **Tailwind CSS**
- **Axios** (data fetching)
- **Fake Store API**

## 📁 Project Structure
```bash
src/
├── App.jsx # Root component
├── components/
│ ├── cart/
│ │ └── cartDrawer.jsx # Cart drawer UI
│ ├── nav/
│ │ └── navBar.jsx # Top navigation bar
│ └── products/
│   ├── productCard.jsx # Single product card
│   ├── productCardSkeleton.jsx # Skeleton loader
│   └── productList.jsx # Product grid and filters
├── hooks/
│  └── useProducts.js # Custom hook to fetch products
├── store/
│  └── cartStore.js # Zustand store for cart logic
└── utils/
   └── formatCurrency.js # Currency formatting helper
```
## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/AlmadaIgnacioJavier/EcommerceProductsPage.git
cd EcommerceProductsPage

# Install dependencies
npm install

# Start the development server
npm run dev

🧪 API Source
This app uses https://fakestoreapi.com to fetch product data.

🙌 Acknowledgements
Material Tailwind
Fake Store API
Zustand

