import clsx from "clsx";

export type InputProps = {
    label: string;
    placeholder: string;
    value: number | null;
    onChange: (newValue: number | null) => void;
    error?: string;
};

const Input = (props: InputProps) => {
    const { label, placeholder, value, onChange, error } = props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = null;

        if (!isNaN(parseFloat(event.target.value))) {
            value = parseInt(event.target.value);
        }

        onChange(value);
    };

    return (
        <div className="flex flex-col">
            <label
                htmlFor={label}
                className={clsx(
                    "mb-1 text-xs font-semibold tracking-widest",
                    error ? "text-light-red" : "text-smokey-grey"
                )}
            >
                {label.toUpperCase()}
            </label>
            <input
                id={label}
                className={clsx(
                    "rounded-md border border-off-white px-2.5 py-1.5 text-lg font-bold hover:ring-1 hover:ring-purple focus:outline-none focus:ring-1 focus:ring-purple sm:py-2.5 sm:text-xl",
                    !!error && "border-light-red"
                )}
                type="number"
                placeholder={placeholder}
                value={typeof value === "number" ? value : ""}
                onChange={handleChange}
            />

            {error && (
                <p className="mt-2 text-xs italic text-light-red">{error}</p>
            )}
        </div>
    );
};

export default Input;
