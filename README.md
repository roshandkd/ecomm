If you're using **Prisma** as your ORM (Object-Relational Mapping) tool, you can define your eCommerce schema using the **Prisma Schema Language (PSL)**. Below is the **Prisma schema** for the eCommerce website, designed to match the database schema we discussed earlier.

---

### **Prisma Schema for eCommerce**

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql" // or "postgresql" or "sqlite"
  url      = env("DATABASE_URL")
}

// Users Table
model User {
  id              Int      @id @default(autoincrement())
  firstName       String
  lastName        String
  email           String   @unique
  passwordHash    String
  phoneNumber     String?
  shippingAddress String?
  billingAddress  String?
  role            String   @default("customer") // "customer" or "admin"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  orders          Order[]
  reviews         Review[]
  wishlist        Wishlist[]
}

// Products Table
model Product {
  id              Int      @id @default(autoincrement())
  name            String
  description     String?
  price           Float
  imageUrl        String?
  stockQuantity   Int      @default(0)
  categoryId      Int?
  category        Category? @relation(fields: [categoryId], references: [id])
  orderItems      OrderItem[]
  reviews         Review[]
  wishlist        Wishlist[]
  inventory       Inventory?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Categories Table
model Category {
  id              Int      @id @default(autoincrement())
  name            String
  description     String?
  parentCategoryId Int?
  parentCategory  Category? @relation("CategoryToCategory", fields: [parentCategoryId], references: [id])
  products        Product[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Orders Table
model Order {
  id              Int      @id @default(autoincrement())
  userId          Int
  user            User     @relation(fields: [userId], references: [id])
  totalAmount     Float
  status          String   @default("pending") // "pending", "processing", "shipped", "delivered", "cancelled"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  orderItems      OrderItem[]
  payment         Payment?
  shipping        Shipping?
}

// Order Items Table (Many-to-Many between Orders and Products)
model OrderItem {
  id              Int      @id @default(autoincrement())
  orderId         Int
  order           Order    @relation(fields: [orderId], references: [id])
  productId       Int
  product         Product  @relation(fields: [productId], references: [id])
  quantity        Int
  price           Float
  createdAt       DateTime @default(now())
}

// Payments Table
model Payment {
  id              Int      @id @default(autoincrement())
  orderId         Int
  order           Order    @relation(fields: [orderId], references: [id])
  paymentMethod   String   // "credit_card", "paypal", "bank_transfer"
  paymentStatus   String   @default("pending") // "pending", "completed", "failed"
  amount          Float
  transactionId   String?
  paymentDate     DateTime @default(now())
}

// Reviews Table
model Review {
  id              Int      @id @default(autoincrement())
  userId          Int
  user            User     @relation(fields: [userId], references: [id])
  productId       Int
  product         Product  @relation(fields: [productId], references: [id])
  rating          Int
  comment         String?
  createdAt       DateTime @default(now())
}

// Shipping Table
model Shipping {
  id              Int      @id @default(autoincrement())
  orderId         Int
  order           Order    @relation(fields: [orderId], references: [id])
  shippingAddress String
  shippingStatus  String   @default("pending") // "pending", "shipped", "delivered"
  trackingNumber  String?
  shippingDate    DateTime?
  createdAt       DateTime @default(now())
}

// Inventory Table
model Inventory {
  id              Int      @id @default(autoincrement())
  productId       Int
  product         Product  @relation(fields: [productId], references: [id])
  stockQuantity   Int      @default(0)
  lastRestockedAt DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// Wishlist Table
model Wishlist {
  id              Int      @id @default(autoincrement())
  userId          Int
  user            User     @relation(fields: [userId], references: [id])
  productId       Int
  product         Product  @relation(fields: [productId], references: [id])
  createdAt       DateTime @default(now())
}

// Coupons Table
model Coupon {
  id              Int      @id @default(autoincrement())
  code            String   @unique
  discountType    String   // "percentage" or "fixed"
  discountValue   Float
  validFrom       DateTime?
  validUntil      DateTime?
  maxUses         Int?
  usedCount       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

### **Key Features of the Prisma Schema**
1. **Relationships**:
   - One-to-Many: `User` ↔ `Order`, `User` ↔ `Review`, `Product` ↔ `Review`, etc.
   - Many-to-Many: `Order` ↔ `Product` (via `OrderItem`), `Product` ↔ `Category` (via `ProductCategory` if needed).
   - One-to-One: `Order` ↔ `Payment`, `Order` ↔ `Shipping`.

2. **Enums**:
   - For fields like `role`, `status`, `paymentMethod`, etc., you can define enums in Prisma for better type safety.

3. **Timestamps**:
   - `createdAt` and `updatedAt` fields are automatically managed by Prisma.

4. **Default Values**:
   - Fields like `role`, `status`, and `stockQuantity` have default values.

---

### **Example Queries with Prisma Client**

#### 1. **Create a New User**
```typescript
const newUser = await prisma.user.create({
  data: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    passwordHash: "hashedpassword123",
    role: "customer",
  },
});
```

#### 2. **Get All Orders for a User**
```typescript
const userOrders = await prisma.order.findMany({
  where: {
    userId: 1,
  },
  include: {
    orderItems: true,
  },
});
```

#### 3. **Add a Product to Wishlist**
```typescript
const wishlistItem = await prisma.wishlist.create({
  data: {
    userId: 1,
    productId: 5,
  },
});
```

#### 4. **Update Product Stock Quantity**
```typescript
const updatedProduct = await prisma.product.update({
  where: {
    id: 10,
  },
  data: {
    stockQuantity: 50,
  },
});
```

---

### **Next Steps**
1. Run `prisma migrate dev` to apply the schema to your database.
2. Use the Prisma Client to interact with your database in your application.
3. Add validation and business logic as needed.

This Prisma schema provides a solid foundation for your eCommerce website and can be extended further based on your specific requirements. Let me know if you need help with any specific part! 🚀