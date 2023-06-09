-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "itemNo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "qty" TEXT,
    "rate" INTEGER NOT NULL,
    "amount" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
