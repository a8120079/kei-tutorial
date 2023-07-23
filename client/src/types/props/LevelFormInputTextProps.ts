import { Control, FieldPath } from "react-hook-form";
import { LevelFormValues } from "../form";

export interface LevelFormInputTextProps {
    control: Control<LevelFormValues, any>;
    name: FieldPath<LevelFormValues>;
    label: string;
    type?: string;
    autoComplete?: string;
}
