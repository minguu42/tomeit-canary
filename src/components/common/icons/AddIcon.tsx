type Props = {
    size?: number;
    fill?: string;
};

const AddIcon = ({size, fill}: Props): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size ?? 24}
        viewBox="0 0 24 24"
        width={size ?? 24}
        fill={fill ?? "#000000"}
    >
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
)

export default AddIcon
