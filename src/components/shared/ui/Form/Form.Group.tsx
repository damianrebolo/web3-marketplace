interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FormGroup: React.FC<Props> = ({ ...props }) => (
  <div className="w-full m-1 flex flex-col items-center" {...props} />
);
