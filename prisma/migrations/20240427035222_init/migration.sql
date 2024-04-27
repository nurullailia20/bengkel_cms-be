-- CreateEnum
CREATE TYPE "role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baby" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "parent_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,

    CONSTRAINT "baby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "baby_condition" (
    "id" TEXT NOT NULL,
    "baby_id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "baby_condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BB_on_U_0_60_months_boy" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_U_0_60_months_boy_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "PB_on_U_0_24_months_boy" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PB_on_U_0_24_months_boy_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "TB_on_U_25_60_months_boy" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TB_on_U_25_60_months_boy_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "BB_on_PB_0_24_months_boy" (
    "body_length" DOUBLE PRECISION NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_PB_0_24_months_boy_pkey" PRIMARY KEY ("body_length")
);

-- CreateTable
CREATE TABLE "BB_on_PB_25_60_months_boy" (
    "body_length" DOUBLE PRECISION NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_PB_25_60_months_boy_pkey" PRIMARY KEY ("body_length")
);

-- CreateTable
CREATE TABLE "IMT_on_PB_0_24_months_boy" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IMT_on_PB_0_24_months_boy_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "IMT_on_PB_25_60_months_boy" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IMT_on_PB_25_60_months_boy_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "BB_on_U_0_60_months_girl" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_U_0_60_months_girl_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "PB_on_U_0_24_months_girl" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PB_on_U_0_24_months_girl_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "TB_on_U_25_60_months_girl" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TB_on_U_25_60_months_girl_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "BB_on_PB_0_24_months_girl" (
    "body_length" DOUBLE PRECISION NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_PB_0_24_months_girl_pkey" PRIMARY KEY ("body_length")
);

-- CreateTable
CREATE TABLE "BB_on_PB_25_60_months_girl" (
    "body_length" DOUBLE PRECISION NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BB_on_PB_25_60_months_girl_pkey" PRIMARY KEY ("body_length")
);

-- CreateTable
CREATE TABLE "IMT_on_PB_0_24_months_girl" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IMT_on_PB_0_24_months_girl_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateTable
CREATE TABLE "IMT_on_PB_25_60_months_girl" (
    "age_in_month" INTEGER NOT NULL,
    "sd_minus_3" DOUBLE PRECISION NOT NULL,
    "sd_minus_2" DOUBLE PRECISION NOT NULL,
    "sd_minus_1" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "sd_plus_1" DOUBLE PRECISION NOT NULL,
    "sd_plus_2" DOUBLE PRECISION NOT NULL,
    "sd_plus_3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IMT_on_PB_25_60_months_girl_pkey" PRIMARY KEY ("age_in_month")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "baby_condition" ADD CONSTRAINT "baby_condition_baby_id_fkey" FOREIGN KEY ("baby_id") REFERENCES "baby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
