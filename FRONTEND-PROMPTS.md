# Frontend Implementation Prompts

## 🔴 ADMIN PANEL PROMPT

```
I need to implement a promotional category management system in my admin panel (React/Next.js).

Backend API Endpoints:
- POST /api/promo-category/ - Create promo category (multipart/form-data with image)
- GET /api/promo-category/ - Get all promo categories
- GET /api/promo-category/:id - Get single promo category
- PATCH /api/promo-category/:id - Update promo category (multipart/form-data with image)
- DELETE /api/promo-category/:id - Delete promo category

PromoCategory Schema:
{
  _id: string,
  name: string,
  slug: string,
  description: string,
  image: string,
  isActive: boolean,
  startDate: Date,
  endDate: Date,
  createdAt: Date,
  updatedAt: Date
}

Product Creation/Update:
When creating or updating products, I need to add a multi-select field for "promoCategories" that sends an array of promo category IDs in:
brandAndCategories.promoCategories = ["promoCategoryId1", "promoCategoryId2"]

Please create:
1. Promo Category List page with create/edit/delete actions
2. Promo Category Form (create/edit) with fields: name, description, image upload, isActive toggle, startDate, endDate
3. Update Product Form to include a multi-select dropdown for promo categories
4. Use React Hook Form or similar for form handling
5. Use TanStack Query or SWR for data fetching
6. Show success/error notifications
7. Include loading states and error handling
```

---

## 🟢 CUSTOMER FRONTEND PROMPT

```
I need to display promotional categories and their products on my e-commerce website (React/Next.js).

Backend API Endpoints:
- GET /api/promo-category/active - Get all active promo categories
- GET /api/product/promo-category/:promoCategoryId - Get products by promo category

PromoCategory Response:
{
  success: true,
  data: [
    {
      _id: "promoCategoryId",
      name: "Flash Sale",
      slug: "flash-sale",
      description: "Limited time offers",
      image: "cloudinary-url",
      isActive: true,
      startDate: "2024-01-01",
      endDate: "2024-12-31"
    }
  ]
}

Products by PromoCategory Response:
{
  success: true,
  data: [
    {
      _id: "productId",
      featuredImg: "url",
      description: { name: "Product Name", slug: "product-slug" },
      productInfo: { price: 1000, salePrice: 800, discount: 20 },
      brandAndCategories: {
        categories: [...],
        promoCategories: [
          {
            _id: "promoCategoryId",
            name: "Flash Sale",
            slug: "flash-sale",
            description: "Limited time offers",
            image: "cloudinary-url",
            isActive: true
          }
        ]
      }
    }
  ]
}

NOTE: All product APIs now return populated promoCategories with full details (name, slug, image, etc.) instead of just IDs.

Please create:
1. Homepage section showing all active promo categories as cards/banners with images
2. Individual promo category page at /promo/[slug] or /offers/[slug] showing all products
3. Product grid/list component for displaying promo products
4. Use Next.js dynamic routing for promo category pages
5. Use TanStack Query or SWR for data fetching with caching
6. Add loading skeletons and error states
7. Make it responsive and visually appealing
8. Include countdown timer if promo has endDate (optional)
```

---

## 🔵 ADMIN - PRODUCT FORM UPDATE PROMPT

```
I need to update my existing product creation/edit form to support promotional categories.

Current product form sends data to:
- POST /api/product/create-product
- PATCH /api/product/update-product/:id

I need to add a field for selecting multiple promotional categories.

Fetch promo categories from:
GET /api/promo-category/active

The form should send:
{
  brandAndCategories: {
    brand: "brandId",
    categories: ["categoryId1"],
    tags: ["tagId1"],
    subcategory: "subcategoryName",
    promoCategories: ["promoCategoryId1", "promoCategoryId2"]  // NEW FIELD
  },
  // ... other fields
}

Please:
1. Add a multi-select dropdown/checkbox group for promo categories in the product form
2. Fetch active promo categories on component mount
3. Allow selecting multiple promo categories
4. Show selected promo categories as chips/tags
5. Include this field in both create and edit product forms
6. Handle form submission with the promoCategories array
```

---

## 🟡 CUSTOMER - HOMEPAGE PROMO SECTION PROMPT

```
I need to add a promotional categories section on my e-commerce homepage.

API Endpoint:
GET /api/promo-category/active

Response:
{
  success: true,
  data: [
    {
      _id: "id",
      name: "Flash Sale",
      slug: "flash-sale",
      description: "24-hour deals",
      image: "cloudinary-url"
    }
  ]
}

Please create:
1. A "Special Offers" or "Deals" section on the homepage
2. Display promo categories as clickable cards/banners in a grid or carousel
3. Each card should show: image, name, description
4. Clicking a card navigates to /promo/[slug] or /offers/[slug]
5. Use Swiper.js or similar for carousel (optional)
6. Make it responsive (mobile, tablet, desktop)
7. Add hover effects and smooth transitions
8. Show loading skeleton while fetching data
```

---

## 🟣 CUSTOMER - PROMO CATEGORY PAGE PROMPT

```
I need to create a dynamic page to display products for a specific promotional category.

Route: /promo/[slug] or /offers/[slug]

APIs:
1. GET /api/promo-category/active - Get promo category by slug (filter client-side)
2. GET /api/product/promo-category/:promoCategoryId - Get products

Product Response:
{
  success: true,
  data: [
    {
      _id: "productId",
      featuredImg: "url",
      description: { name: "Product Name", slug: "product-slug" },
      productInfo: { price: 1000, salePrice: 800, discount: 20, quantity: 50 },
      brandAndCategories: {
        categories: [...],
        promoCategories: [
          {
            _id: "promoCategoryId",
            name: "Flash Sale",
            slug: "flash-sale",
            image: "cloudinary-url"
          }
        ]
      }
    }
  ]
}

Please create:
1. Dynamic route page for /promo/[slug]
2. Fetch promo category details and products
3. Display promo banner/header with name, description, image
4. Show products in a grid layout (4 columns desktop, 2 mobile)
5. Each product card shows: image, name, price, discount badge, "Add to Cart" button
6. Add filters: price range, sort by (price, discount)
7. Show "No products found" if empty
8. Use Next.js getStaticPaths and getStaticProps (or App Router equivalent)
9. Add breadcrumbs: Home > Offers > [Promo Name]
10. Include SEO meta tags
```

---

## 🔶 QUICK COPY-PASTE PROMPTS

### Admin - Promo Category Management
```
Create a complete promo category CRUD interface with list, create, edit, delete. API: GET/POST/PATCH/DELETE /api/promo-category/. Fields: name, description, image (upload), isActive (toggle), startDate, endDate. Use React Hook Form and TanStack Query.
```

### Admin - Product Form Update
```
Add multi-select field for promo categories in product form. Fetch from GET /api/promo-category/active. Send as brandAndCategories.promoCategories array. Show as chips/tags.
```

### Customer - Homepage Promo Section
```
Create homepage section showing active promo categories from GET /api/promo-category/active. Display as clickable cards with image, name, description. Link to /promo/[slug]. Responsive grid/carousel.
```

### Customer - Promo Category Page
```
Create /promo/[slug] page showing products from GET /api/product/promo-category/:id. Display promo banner and product grid. Include filters, sorting, breadcrumbs, SEO. Use Next.js dynamic routing.

IMPORTANT: All product APIs now return promoCategories as populated objects with full details (name, slug, image, isActive) instead of just IDs. You can directly access product.brandAndCategories.promoCategories[0].name without additional API calls.
```

---

## 📋 CHECKLIST

### Admin Panel
- [ ] Promo category list page
- [ ] Create promo category form
- [ ] Edit promo category form
- [ ] Delete promo category action
- [ ] Image upload handling
- [ ] Active/inactive toggle
- [ ] Date picker for start/end dates
- [ ] Add promo category selector to product form
- [ ] Multi-select with chips/tags display

### Customer Frontend
- [ ] Fetch active promo categories
- [ ] Homepage promo section (cards/carousel)
- [ ] Dynamic promo category page (/promo/[slug])
- [ ] Product grid for promo products
- [ ] Display promo badges on product cards (use product.brandAndCategories.promoCategories)
- [ ] Filters and sorting
- [ ] Loading states and skeletons
- [ ] Error handling
- [ ] Responsive design
- [ ] SEO optimization
- [ ] Countdown timer (optional)

### Important Changes
- ✅ All product APIs now return populated promoCategories with full details
- ✅ No need for additional API calls to get promo category names
- ✅ Access directly: `product.brandAndCategories.promoCategories[0].name`
