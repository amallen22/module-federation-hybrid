// TypeScript declarations for remote modules
declare module 'ui/Button' {
  // export interface ButtonProps {
  //   children: React.ReactNode;
  //   variant?: 'primary' | 'secondary';
  //   onClick?: () => void;
  // }
  // const Button: React.FC<ButtonProps>;
  // export default Button;
  const Button: React.FC<{
    text: string;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
  }>;
  export default Button;
}

declare module 'product/App' {
  const ProductApp: React.FC;
  export default ProductApp;
}

declare module 'login/App' {
  const LoginApp: React.FC;
  export default LoginApp;
}
