export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form: React.FC<FormProps> = ({ onSubmit, ...props }) => <form onSubmit={onSubmit} {...props} />;

export default Object.assign(Form, {
  //   Control: NavLink,
});
