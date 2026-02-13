import { ReactNode } from 'react';
import { cn } from "@/lib/utils";

type OverlayUIProps = {
  children: ReactNode
}

export default function OverLayUI({ children }: OverlayUIProps) {
  return (
    <div className={cn("absolute top-0 left-0 w-full h-full",
    "pointer-events-none z-10 p-4 md:p-8 flex flex-col ",
    "justify-between text-white")}>

      {/* 実際に表示したいボタン等はここに入ります */}
        {children}
    </div>
  );
}