import cx from "classnames";

interface IEmptyData {
	children: React.ReactNode;
	className?: string;
}

const EmptyData = (props: IEmptyData) => {
	const { children, className } = props;
	return <span className={cx("text-gray-400", className)}>{children}</span>;
};

export default EmptyData;
