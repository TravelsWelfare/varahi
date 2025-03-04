import { Link } from 'react-router-dom';
import { preloadRoute } from '@/lib/dynamic-import';

interface PreloadLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const PreloadLink = ({ to, children, ...props }: PreloadLinkProps) => {
  const handleMouseEnter = () => {
    // Preload the chunk when user hovers
    preloadRoute(to);
  };

  return (
    <Link 
      to={to} 
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
};