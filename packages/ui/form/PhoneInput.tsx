import { isSupportedCountry } from "libphonenumber-js";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-number-input/style.css";

import { classNames } from "@calcom/lib";
import { trpc } from "@calcom/trpc/react";

export type PhoneInputProps = {
  value?: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  name?: string;
  onChange: (value: string) => void;
};

function BasePhoneInput({ name, className = "", onChange, ...rest }: PhoneInputProps) {
  const defaultCountry = useDefaultCountry();
  return (
    <PhoneInput
      {...rest}
      country={defaultCountry}
      enableSearch
      disableSearchIcon
      inputProps={{
        name: name,
        required: rest.required,
        placeholder: rest.placeholder,
      }}
      onChange={(value) => onChange(value)}
      containerClass={classNames(
        "hover:border-emphasis border-default bg-default rounded-md border focus-within:border-neutral-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-800 disabled:cursor-not-allowed",
        className
      )}
      inputClass="text-sm focus:ring-0 bg-default text-default"
      buttonClass="text-emphasis"
      inputStyle={{ width: "inherit", border: 0 }}
      buttonStyle={{ border: 0, borderRight: "1px solid #D1D5DB", backgroundColor: "#F3F4F6" }}
      searchStyle={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: " 6px 12px",
        gap: "8px",
        width: "296px",
        height: "28px",
        marginLeft: "-4px",
      }}
      dropdownStyle={{ width: "max-content" }}
    />
  );
}

const useDefaultCountry = () => {
  const [defaultCountry, setDefaultCountry] = useState("us");
  trpc.viewer.public.countryCode.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    onSuccess: (data) => {
      if (isSupportedCountry(data?.countryCode)) {
        setDefaultCountry(data.countryCode);
      }
    },
  });

  return defaultCountry;
};

export default BasePhoneInput;
