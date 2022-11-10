interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertBody: React.FC<Props> = ({ children }) => <div className="mt-2 mb-4 text-sm">{children}</div>;
