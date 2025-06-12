# 🚀 STEP-BY-STEP DEPLOYMENT GUIDE
## Get Petersen Games Store Live in 1 Hour

### ⏰ TIMELINE BREAKDOWN
- **Shopify API Setup**: 15 minutes
- **Product Tagging**: 30 minutes
- **Deploy to Vercel**: 10 minutes
- **Test & Go Live**: 5 minutes

---

## 📋 STEP 1: SHOPIFY API SETUP (15 minutes)

### **1.1 Get Your Shopify Store Domain**
Your store URL is something like: `petersen-games.myshopify.com`
- Remove the `https://` part
- Just need: `petersen-games.myshopify.com`

### **1.2 Create Storefront Access Token**
1. Go to your **Shopify Admin**
2. Navigate to **Apps and sales channels**
3. Click **Develop apps**
4. Click **Create an app**
5. Name it "Petersen Games Website"
6. Click **Configure Storefront API scopes**
7. Enable these permissions:
   ```
   ✅ unauthenticated_read_product_listings
   ✅ unauthenticated_read_product_inventory
   ✅ unauthenticated_read_product_tags
   ✅ unauthenticated_read_checkouts
   ✅ unauthenticated_write_checkouts
   ✅ unauthenticated_read_content
   ```
8. Click **Save**
9. Click **Install app**
10. Copy the **Storefront access token**

### **1.3 Configure Environment Variables**
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your details:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=petersen-games.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
   ```

---

## 🏷️ STEP 2: TAG YOUR PRODUCTS (30 minutes)

### **2.1 Quick Product Tagging**

**For Each Product, Add These Tags:**

#### **Core Games:**
```
category-core-games
subcategory-board-games (or card-games, rpg-core-rules, standalone-games)
```

#### **Expansions:**
```
category-expansions
subcategory-expansion-packs (or campaign-books, supplemental-rules, adventure-modules)
```

#### **Miniatures (IMPORTANT - Add Filter Tags):**
```
category-miniatures
subcategory-rpg-miniatures (or fantasy-miniatures, bloodfields-miniatures, sci-fi-miniatures, gridwars-miniatures)

# PLUS filter tags:
class-fighters (or barbarians, clerics, wizards, etc.)
race-humans (or elves, dwarves, etc.)
faction-noble-alliance (or legion-of-death, etc.)
unit-heroes (or monsters, units, vehicles)
base-fantasy-bases (or sci-fi-bases)
```

#### **Books:**
```
category-books
subcategory-rulebooks (or lore-setting-guides, art-books, fiction-novels)
```

#### **Accessories:**
```
category-accessories
subcategory-dice-sets (or tokens-markers, game-mats, storage-solutions)
```

#### **Digital:**
```
category-digital
subcategory-pdfs (or digital-maps, vtt-assets, apps)
```

### **2.2 Bulk Tagging Method**
1. Go to **Products** in Shopify Admin
2. Select multiple products
3. Click **Actions** > **Add tags**
4. Add appropriate category and filter tags
5. Repeat for all products

### **2.3 Example Product Tags**
```
Product: "Human Fighter Miniature"
Tags: category-miniatures, subcategory-rpg-miniatures, class-fighters, race-humans, base-fantasy-bases

Product: "Cthulhu Wars Base Game"  
Tags: category-core-games, subcategory-board-games, cthulhu-wars, strategy

Product: "Bloodfields Rulebook"
Tags: category-books, subcategory-rulebooks, bloodfields, reference
```

---

## 🚀 STEP 3: DEPLOY TO VERCEL (10 minutes)

### **3.1 Install Dependencies**
```bash
npm install
```

### **3.2 Test Locally First**
```bash
npm run dev
```
- Open `http://localhost:3000`
- Verify products load from Shopify
- Test category filtering
- Test add to cart

### **3.3 Deploy to Vercel**
```bash
# Build for production
npm run build

# Deploy (if you have Vercel CLI)
vercel --prod

# OR push to GitHub and connect to Vercel
git add .
git commit -m "Complete Petersen Games store ready for deployment"
git push origin main
```

### **3.4 Add Environment Variables to Vercel**
1. Go to **Vercel Dashboard**
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add:
   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN = petersen-games.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = your_token_here
   ```
5. Click **Save**
6. Redeploy from **Deployments** tab

---

## ✅ STEP 4: TEST & GO LIVE (5 minutes)

### **4.1 Test Your Live Site**
1. Visit your Vercel URL (e.g., `petersen-games.vercel.app`)
2. Verify:
   - ✅ Products load from Shopify
   - ✅ Categories filter correctly
   - ✅ Miniature filters work
   - ✅ Search finds products
   - ✅ Add to cart works
   - ✅ Cart shows items
   - ✅ Checkout redirects to Shopify
   - ✅ Mobile menu works

### **4.2 Configure Custom Domain (Optional)**
1. In Vercel, go to **Settings** > **Domains**
2. Add your custom domain
3. Update DNS records as instructed

### **4.3 Remove Shopify Password Protection**
1. Go to **Online Store** > **Preferences**
2. Disable password protection
3. **Your store is now LIVE!**

---

## 🔧 TROUBLESHOOTING

### **Products Not Loading?**
- Check environment variables are correct
- Verify Storefront API permissions
- Check browser console for API errors

### **Categories Not Working?**
- Ensure products have `category-` tags
- Check tag spelling (lowercase, hyphens)
- Verify tags are saved in Shopify

### **Miniature Filters Empty?**
- Add `class-`, `race-`, `faction-` tags to miniatures
- Ensure miniatures have `category-miniatures` tag

### **Cart Not Working?**
- Check Storefront API has checkout permissions
- Verify cart context is wrapping the app

---

## 🎉 SUCCESS CHECKLIST

- [ ] Shopify API configured
- [ ] Environment variables set
- [ ] Products tagged correctly
- [ ] Site deployed to Vercel
- [ ] Products loading from Shopify
- [ ] Category filtering works
- [ ] Miniature filters functional
- [ ] Search working
- [ ] Cart and checkout operational
- [ ] Mobile responsive
- [ ] Password protection removed
- [ ] **STORE IS LIVE!**

---

## 📞 FINAL VERIFICATION

Your store should now have:
✅ **Real Shopify products** displaying
✅ **Working category navigation**
✅ **Advanced miniature filtering**
✅ **Functional shopping cart**
✅ **Mobile responsive design**
✅ **Glassmorphic hover effects**
✅ **Live search functionality**
✅ **Complete checkout process**

**🚀 CONGRATULATIONS! Your Petersen Games store is live and ready for customers!**

---

**Need help? The most common issue is product tagging - make sure every product has the correct `category-` tags for the system to work properly.**