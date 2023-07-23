import { Control, FieldPath } from "react-hook-form";
import { LoginFormValues, RegisterFormValues } from "../form";

export interface RegisterFormInputTextProps {
    control: Control<RegisterFormValues, any>;
    name: FieldPath<RegisterFormValues>;
    label: string;
    type?: string;
    autoComplete?: string;
}

export interface LoginFormInputTextProps {
    control: Control<LoginFormValues, any>;
    name: FieldPath<LoginFormValues>;
    label: string;
    type?: string;
    autoComplete?: string;
}
