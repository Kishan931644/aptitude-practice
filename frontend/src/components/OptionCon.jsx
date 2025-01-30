import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";

export default function OptionCon({ option, checked }) {
    return (
        <div className="option flex gap-2 my-1" key={option}>
            <RadioGroupItem
                className="checkbox-container"
                value={option}
                id={option}
                checked={checked === option}
            />
            <Label htmlFor={option}>{option}</Label>
        </div >
    );
}

