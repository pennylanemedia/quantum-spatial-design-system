# 🚀 QUICK START - DEPLOY IN 30 MINUTES
## Petersen Games Store - Ready to Launch

### ⚡ FASTEST PATH TO LIVE STORE

You have a **complete, working e-commerce store** ready to deploy. Here's the absolute fastest way to get live:

---

## 🏃‍♂️ 3-STEP DEPLOYMENT

### **STEP 1: Configure Shopify API (10 minutes)**

1. **Get your store domain**: `your-store.myshopify.com`

2. **Create Storefront API token**:
   - Shopify Admin → Apps → Develop apps → Create app
   - Enable Storefront API permissions
   - Copy the access token

3. **Set environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```env
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
   ```

### **STEP 2: Tag Products (15 minutes)**

Add these tags to your Shopify products:

**For ALL products** (choose one):
- `category-core-games`
- `category-expansions` 
- `category-miniatures`
- `category-books`
- `category-accessories`
- `category-digital`

**For miniatures only**, also add:
- `class-fighters` (or barbarians, wizards, etc.)
- `race-humans` (or elves, dwarves, etc.)
- `faction-noble-alliance` (etc.)

### **STEP 3: Deploy (5 minutes)**

```bash
# Run the deployment script
./deploy-petersen-games.sh
```

**That's it! Your store is live!** 🎉

---

## 🛒 WHAT YOU GET IMMEDIATELY

✅ **Complete homepage** with category navigation
✅ **Real Shopify products** displaying  
✅ **Working shopping cart** and checkout
✅ **Mobile responsive** design
✅ **Advanced filtering** for miniatures
✅ **Search functionality**
✅ **Glassmorphic hover effects**

---

## 🎯 IF YOU'RE IN A HURRY

**Minimum viable deployment** (10 minutes):

1. **Copy environment file**: `cp .env.example .env.local`
2. **Add your Shopify domain and token** to `.env.local`
3. **Tag at least 5-10 products** with category tags
4. **Run**: `./deploy-petersen-games.sh`
5. **Your store is live!**

You can add more product tags later - the basic store will work immediately.

---

## 🔧 MANUAL DEPLOYMENT (Alternative)

If the script doesn't work:

```bash
# Install dependencies
npm install

# Test locally first
npm run dev
# Visit http://localhost:3000

# Deploy to Vercel
npm run build
npx vercel --prod
```

---

## 📱 FEATURES THAT WORK RIGHT NOW

### **Navigation & Categories:**
- Core Games, Expansions, Miniatures, Books, Accessories, Digital
- Mobile menu with slide-out navigation
- Category filtering and product display

### **Shopping Experience:**
- Add to cart from product cards
- Shopping cart with item count
- Mini cart panel showing items
- Direct Shopify checkout integration

### **Product Discovery:**
- Real-time search across products
- Advanced miniature filtering
- Category browsing
- Product details with images and pricing

### **Design & UX:**
- Glassmorphic product cards with hover effects
- Purple glow animations
- Deep void black backgrounds
- 100% responsive mobile design

---

## 🎮 READY FOR CUSTOMERS

Your store includes:

**🛍️ Complete Shopping Cart**
**📱 Mobile Responsive Design**  
**🔍 Advanced Product Filtering**
**🎨 Glassmorphic Visual Effects**
**⚡ Real-time Search**
**🛒 Shopify Checkout Integration**

---

## 🆘 NEED HELP?

**Most common issues:**

1. **Products not showing**: Check category tags are added to products
2. **API errors**: Verify Storefront API permissions are enabled
3. **Build fails**: Check environment variables are correct

**Everything is ready to go - just add your Shopify credentials and deploy!** 🚀

---

**⏰ Timeline**: 30 minutes to live store
**💰 Cost**: Free (Vercel free tier)
**🎯 Result**: Complete, professional e-commerce store