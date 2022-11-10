export interface AlertActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AlertActions: React.FC<AlertActionsProps> = ({ children }) => <div className="flex gap-3">{children}</div>;
