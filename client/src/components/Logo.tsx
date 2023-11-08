import logo from '../assets/images/logo.svg';

const Logo = ({ className }: { className?: string }) => {
  return <img className={className} src={logo} alt="Jobify" />;
};

export default Logo;
