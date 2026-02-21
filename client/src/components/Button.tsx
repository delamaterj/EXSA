import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  title: string;
  url?: string;
  disabled?: boolean;
  external?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

function Button({
  title,
  url,
  disabled = false,
  external = false,
  variant = 'primary'
}: ButtonProps) {

  const navigate = useNavigate();

  const className = `btn btn-${variant}`;

  if (external && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {title}
      </a>
    );
  }

  if (url) {
    return (
      <button
        disabled={disabled}
        onClick={() => navigate(url)}
        className={className}
      >
        {title}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={className}>
      {title}
    </button>
  );
}

export default Button;
