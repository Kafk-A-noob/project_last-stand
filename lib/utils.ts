import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/*
クラス名を結合・最適化するユーティリティ
例: cn("bg-red-500", isError && "text-white", "bg-blue-500")
結果: "text-white bg-blue-500" (赤が青に上書きされ、警告も消える)
*/
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}