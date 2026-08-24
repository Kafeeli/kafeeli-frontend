export const BANK_OPTIONS = [
  "بنك فلسطين",
  "البنك الإسلامي العربي",
  "البنك الإسلامي الفلسطيني",
  "بنك القاهرة عمان",
  "بنك القدس",
  "محفظة PalPay",
  "محفظة JawwalPay",
  "محفظة Maalchat",
];

const WALLET_KEYWORDS = ["PalPay", "JawwalPay", "Maalchat", "محفظة"];

export function isWallet(bankName) {
  if (!bankName) return false;
  return WALLET_KEYWORDS.some((keyword) => bankName.includes(keyword));
}
