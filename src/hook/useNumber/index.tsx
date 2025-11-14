import { Ref, useEffect, useMemo, useRef, useState } from "react";
import { NumberFormatter, NumberParser } from "@internationalized/number";

const useNumber = (
  locale: string = "en-US",
): [Ref<HTMLInputElement>, number, Error | null] => {
  const [value, setValue] = useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  const numberParser = new NumberParser(locale, { style: "decimal" });
  const numberFormatter = new NumberFormatter(locale, {
    style: "decimal",
  });

  const numberValue = useMemo(() => {
    if (value == "") return 0;
    return numberParser.parse(value);
  }, [value]);

  const error = useMemo(() => {
    if (value === "") return null;
    if (numberParser.isValidPartialNumber(value)) return null;

    return new Error("Invalid number");
  }, [value]);

  useEffect(() => {
    if (!isNaN(numberValue) && error === null && ref.current!.value != "") {
      ref.current!.value = numberFormatter.format(numberValue);
    }
  }, [numberValue, error]);

  const handleChange = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value;
    setValue(inputValue);

    // const formatedValue = numberFormatter.format(numberValue);
    // (e.target as HTMLInputElement).value = formatedValue;
  };

  useEffect(() => {
    const currentRef = ref.current!;
    currentRef?.addEventListener("change", handleChange);
    currentRef?.setAttribute("type", "tel");

    return () => {
      currentRef?.removeEventListener("change", handleChange);
    };
  }, []);

  return [ref, numberValue, error];
};

export default useNumber;
