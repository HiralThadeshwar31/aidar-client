declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps {
    color?: string;
    size?: string | number;
    strokeWidth?: number;
  }

  export const Activity: React.FC<LucideProps>;
  export const Heart: React.FC<LucideProps>;
  export const Thermometer: React.FC<LucideProps>;
  export const Wind: React.FC<LucideProps>;
  // Add other icons that you're using from lucide-react
}
