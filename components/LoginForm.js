"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useFormState } from "react-dom";
import { Login } from "@/lib/actions";
import { ErrorAlert } from "./ErrorAlert";

import SubmitButton from "./SubmitButton";
export default function LoginForm({ mode }) {
  const [state, formAction] = useFormState(Login.bind(null, mode), {});
  return (
    <>
      {state.errors && <ErrorAlert errors={state.errors} />}
      <form className="space-y-4" action={formAction}>
        <div>
          <Label
            htmlFor="email"
            className="font-bold text-secondary-foreground"
          >
            Email
          </Label>
          <Input
            id="email"
            placeholder="m@example.com"
            required
            type="email"
            name="email"
            className="text-gray-900 dark:text-gray-400"
          />
        </div>
        <div>
          <Label
            htmlFor="password"
            className="font-bold text-secondary-foreground"
          >
            Password
          </Label>
          <Input
            id="password"
            placeholder="••••••••"
            required
            name="password"
            type="password"
            className="text-gray-900 dark:text-gray-400"
          />
        </div>
        <SubmitButton
          className={
            "font-geist relative mx-auto h-12 w-full overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
          }
          label={"Dive In!"}
        />
      </form>
    </>
  );
}
