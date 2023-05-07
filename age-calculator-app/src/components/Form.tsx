import { useState } from "react";
import Input from "./Input";

const Form = () => {
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);

    return (
        <form>
            <div className="grid grid-cols-3 gap-4">
                <Input
                    label="day"
                    placeholder="DD"
                    error=""
                    value={day}
                    onChange={setDay}
                />
                <Input
                    label="month"
                    placeholder="MM"
                    error=""
                    value={month}
                    onChange={setMonth}
                />
                <Input
                    label="year"
                    placeholder="YYYY"
                    error=""
                    value={year}
                    onChange={setYear}
                />
            </div>
        </form>
    );
};

export default Form;
