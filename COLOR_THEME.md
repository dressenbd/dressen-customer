# 🎨 Dressen Color Palette Implementation (v2 – Based on #FACF35)

## Color Palette Overview

| Color Name | Hex Code | Usage | Tailwind Classes |
|------------|----------|-------|------------------|
| **Primary (Bright Gold)** | `#FACF35` | Main brand color for buttons, highlights, titles | `bg-primary`, `text-primary`, `border-primary` |
| **Primary Hover (Deep Gold)** | `#E6BD2E` | Hover state for gold elements | `hover:bg-primary-hover`, `bg-primary-hover` |
| **Secondary (Charcoal)** | `#2E2E2E` | Text, icons, headers (softer than pure black) | `bg-secondary`, `text-secondary`, `border-secondary` |
| **Accent (Pure White)** | `#FFFFFF` | Clean backgrounds and content areas | `bg-accent`, `text-accent`, `border-accent` |
| **Section Background** | `#F9F9F9` | Light gray for section separation | `bg-section`, `text-section`, `border-section` |
| **Neutral Gray** | `#E4E4E4` | Borders, dividers, subtle backgrounds | `bg-neutral`, `text-neutral`, `border-neutral` |
| **Highlight Accent (Royal Blue)** | `#3B5BA9` | Links, CTAs, trust elements | `bg-highlight`, `text-highlight`, `border-highlight` |
| **Discount Red** | `#E74C3C` | Discount badges, urgent CTAs | `bg-discount`, `text-discount`, `border-discount` |
| **Success Green** | `#2ECC71` | Success states | `text-success`, `bg-success` |

## Implementation Status

### ✅ Completed
- [x] Tailwind configuration updated with custom color palette
- [x] Global CSS variables updated
- [x] Button component variants updated
- [x] Navbar component colors updated
- [x] Footer component colors updated
- [x] Card components (BestSellerCard, NewArrivalsCard) updated
- [x] Form components (AuthForm, InputField) updated
- [x] Home page components (Promo, DiscountBanner, Sidebar) updated
- [x] Mobile navigation components updated
- [x] Dark mode color scheme implemented
- [x] Color utility file created (`src/utils/colors.ts`)

### 🔄 Next Steps
- [ ] Update product listing components
- [ ] Update dashboard components
- [ ] Update remaining UI components
- [ ] Update authentication pages
- [ ] Update shop/category pages

## Tailwind Config Variables

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: '#FACF35',
      'primary-hover': '#E6BD2E',
      secondary: '#2E2E2E',
      accent: '#FFFFFF',
      section: '#F9F9F9',
      neutral: '#E4E4E4',
      highlight: '#3B5BA9',
      discount: '#E74C3C',
      success: '#2ECC71',
    },
  },
}
```

## Example Usage

### Buttons
```tsx
<Button className="bg-primary text-secondary hover:bg-primary-hover">
  Primary Action
</Button>

<Button className="bg-secondary text-accent hover:bg-[#3A3A3A]">
  Secondary Action
</Button>

<Button className="bg-highlight text-accent hover:bg-[#314C8D]">
  Special Action
</Button>
```

### Text and Backgrounds
```tsx
<div className="bg-accent text-secondary">
  Main content area
</div>

<h1 className="text-primary">
  Premium Gold Headline
</h1>

<p className="text-highlight">
  Learn more about our products
</p>
```

## Color Combinations

### ✅ Recommended Pairings

| Combination | Use Case |
|-------------|----------|
| Gold (#FACF35) + Charcoal (#1E1E1E) | Premium contrast for buttons, headings |
| Charcoal (#1E1E1E) + Soft White (#FAFAFA) | Readable and elegant text sections |
| Gold (#FACF35) + Royal Blue (#3B5BA9) | Limited accent usage for strong CTAs |
| Neutral Gray (#E4E4E4) + Charcoal (#1E1E1E) | Minimal card and border combinations |

### Hover / Focus States

| State | Base | Hover |
|-------|------|-------|
| Primary Button | #FACF35 | #E0B82E |
| Secondary Button | #1E1E1E | #3A3A3A |
| Highlight Button | #3B5BA9 | #314C8D |
| Neutral | #E4E4E4 | #CFCFCF |

## Accessibility Notes

✅ Contrast ratios are optimized for readability on both light and dark backgrounds  
✅ Gold (#FACF35) provides strong brand recognition without straining the eyes  
✅ All hover and focus states maintain AA compliance

## File Locations

- **Tailwind Config**: `tailwind.config.ts`
- **Global Styles**: `src/app/globals.css`
- **Color Utilities**: `src/utils/colors.ts`
- **Button Component**: `src/components/ui/button.tsx`
- **Navbar Component**: `src/components/modules/Navbar/Navbar.tsx`

## Migration Guide

When updating existing components:

1. Replace hardcoded hex colors with Tailwind classes
2. Use `text-secondary` instead of `text-black` or `text-gray-900`
3. Use `bg-accent` instead of `bg-white`
4. Use `border-neutral` instead of `border-gray-200`
5. Use `text-highlight` for important links instead of blue variants
6. Use `bg-primary` for main action buttons

## CSS Variables (for Global Styles)

```css
:root {
  --primary: #FACF35;
  --primary-hover: #E6BD2E;
  --secondary: #2E2E2E;
  --accent: #FFFFFF;
  --section: #F9F9F9;
  --neutral: #E4E4E4;
  --highlight: #3B5BA9;
  --discount: #E74C3C;
  --success: #2ECC71;
}
```

## Quick Visual Summary

| Purpose | Color | Hex |
|---------|-------|-----|
| 🌞 Primary Bright Gold | ![#FACF35](https://via.placeholder.com/20/FACF35/000000?text=+) | #FACF35 |
| 🟡 Primary Hover Deep Gold | ![#E6BD2E](https://via.placeholder.com/20/E6BD2E/000000?text=+) | #E6BD2E |
| 🌑 Secondary Charcoal | ![#2E2E2E](https://via.placeholder.com/20/2E2E2E/000000?text=+) | #2E2E2E |
| ⚪ Accent Pure White | ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/000000?text=+) | #FFFFFF |
| 🔳 Section Light Gray | ![#F9F9F9](https://via.placeholder.com/20/F9F9F9/000000?text=+) | #F9F9F9 |
| ⚙️ Neutral Gray | ![#E4E4E4](https://via.placeholder.com/20/E4E4E4/000000?text=+) | #E4E4E4 |
| 🔵 Royal Blue Highlight | ![#3B5BA9](https://via.placeholder.com/20/3B5BA9/000000?text=+) | #3B5BA9 |
| 🔴 Discount Red | ![#E74C3C](https://via.placeholder.com/20/E74C3C/000000?text=+) | #E74C3C |