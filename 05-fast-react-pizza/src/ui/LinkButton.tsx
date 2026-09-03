import { Link, useNavigate } from "react-router-dom";

type LinkButtonProps = {
  children: React.ReactNode;
  to: string;
};

export default function LinkButton(props: LinkButtonProps) {
  const { to, children } = props;
  const navigate = useNavigate();

  const classname = "text-sm text-blue-500 hover:text-blue-700";

  if (to === "-1")
    return (
      <button className={classname} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={classname}>
      {children}
    </Link>
  );
}
