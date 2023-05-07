import { useState } from "react";
import Input from "./components/Input";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { z } from "zod";

dayjs.extend(customParseFormat);

type Errors = {
    day?: string;
    month?: string;
    year?: string;
};

type Result = {
    days?: number;
    months?: number;
    years?: number;
} | null;

const dateSchema = z.object({
    day: z
        .number({
            required_error: "This field is required",
            invalid_type_error: "This field is required",
        })
        .min(1, { message: "Must be a valid day" })
        .max(31, { message: "Must be a valid day" }),
    month: z
        .number({
            required_error: "This field is required",
            invalid_type_error: "This field is required",
        })
        .min(1, { message: "Must be a valid month" })
        .max(12, { message: "Must be a valid month" }),
    year: z.number({
        required_error: "This field is required",
        invalid_type_error: "This field is required",
    }),
});

function App() {
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [errors, setErrors] = useState<Errors>({});

    const [result, setResult] = useState<Result>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validation = dateSchema.safeParse({ day, month, year });

        const _errors: Errors = {};
        if (!validation.success) {
            for (const issue of validation.error.issues) {
                _errors[issue.path[0] as keyof Errors] = issue.message;
            }
            setErrors(_errors);
            return;
        }

        const dayjsObj = dayjs(`${year}-${month}-${day}`, "YYYY-M-D");

        if (!dayjsObj.isValid()) {
            // Check if the date is valid. i.e.: February with 30 days
            _errors.day = "Must be a valid date";
            return;
        } else if (dayjsObj.isAfter(dayjs())) {
            // Check if the date is before the present day
            _errors.year = "Must be in the past";
            setErrors(_errors);
            return;
        }

        // Clear any previous errors
        setErrors({});

        // Calculate and return results
        setResult(
            calculateDiff(day as number, month as number, year as number)
        );
    };

    return (
        <div className="flex min-h-screen w-screen flex-col">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-11/12 rounded-3xl rounded-br-[100px] bg-white p-5 sm:w-5/6 sm:max-w-[600px]">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                label="day"
                                placeholder="DD"
                                error={errors?.day}
                                value={day}
                                onChange={setDay}
                            />
                            <Input
                                label="month"
                                placeholder="MM"
                                error={errors?.month}
                                value={month}
                                onChange={setMonth}
                            />
                            <Input
                                label="year"
                                placeholder="YYYY"
                                error={errors?.year}
                                value={year}
                                onChange={setYear}
                            />
                        </div>

                        <div className="relative mt-6 flex justify-center sm:justify-end">
                            <div className="div absolute top-1/2 z-10 w-full border-b border-off-white" />

                            <SubmitButton />
                        </div>
                    </form>

                    <div className="mb-4 mt-6">
                        <h3 className="text-3xl font-bold italic sm:text-5xl">
                            <span className="text-purple">
                                {result?.years ?? "--"}
                            </span>{" "}
                            years
                        </h3>
                        <h3 className="text-3xl font-bold italic sm:text-5xl">
                            <span className="text-purple">
                                {result?.months ?? "--"}
                            </span>{" "}
                            months
                        </h3>
                        <h3 className="text-3xl font-bold italic sm:text-5xl">
                            <span className="text-purple">
                                {result?.days ?? "--"}
                            </span>{" "}
                            days
                        </h3>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

const SubmitButton = () => {
    return (
        <button
            type="submit"
            className="relative z-20 flex h-10 w-10 items-center justify-center rounded-full bg-purple hover:bg-off-black sm:h-14 sm:w-14"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 46 44"
                className="h-[19px] w-[19px] sm:h-6 sm:w-6"
            >
                <g fill="none" stroke="#FFF" strokeWidth="2">
                    <path d="M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44" />
                </g>
            </svg>
        </button>
    );
};

const Footer = () => (
    <div className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
        </a>
        . Coded by{" "}
        <a target="_blank" rel="noopener" href="https://lucasneuhaus.com/">
            Lucas Neuhaus
        </a>
        .
    </div>
);

const calculateDiff = (day: number, month: number, year: number) => {
    const dayjsObj = dayjs(`${year}-${month}-${day}`, "YYYY-M-D");

    const years = dayjs().diff(dayjsObj, "years");
    const months = dayjs().subtract(years, "year").diff(dayjsObj, "months");
    const days = dayjs()
        .subtract(years, "year")
        .subtract(months, "months")
        .diff(dayjsObj, "days");

    return {
        days,
        months,
        years,
    };
};

export default App;
