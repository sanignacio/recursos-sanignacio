-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."CompleteProfileToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "isUpdateEmail" BOOLEAN NOT NULL DEFAULT false,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompleteProfileToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompleteProfileToken_token_key" ON "public"."CompleteProfileToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "CompleteProfileToken_userId_token_key" ON "public"."CompleteProfileToken"("userId", "token");
