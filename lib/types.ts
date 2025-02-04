import { Prisma } from "@prisma/client";
import { BankInformation } from "@/actions/queries";

export type getBankInformationTypes = Prisma.PromiseReturnType<typeof BankInformation>