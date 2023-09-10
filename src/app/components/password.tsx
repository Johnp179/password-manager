import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { MutableRefObject, useState } from "react";

function ModalInput({
  visible,
  password,
  reference,
  onChange,
}: {
  visible: boolean;
  password?: string;
  reference: MutableRefObject<HTMLInputElement | null>;
  onChange: () => void;
}) {
  return (
    <input
      type={visible ? "text" : "password"}
      className="text-black outline-none w-full"
      defaultValue={password}
      onChange={onChange}
      ref={reference}
    />
  );
}

function AccountInput({
  visible,
  password,
}: {
  visible: boolean;
  password: string;
}) {
  return (
    <input
      type={visible ? "text" : "password"}
      className="text-black outline-none w-full"
      value={password}
      readOnly
    />
  );
}

type PasswordProps =
  | { password: string; reference?: undefined; onChange?: undefined }
  | {
      password?: string;
      reference: MutableRefObject<HTMLInputElement | null>;
      onChange: () => void;
    };

export default function Password({
  password,
  reference,
  onChange,
}: PasswordProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      {reference === undefined ? (
        <AccountInput password={password} visible={visible} />
      ) : (
        <ModalInput
          visible={visible}
          password={password}
          reference={reference}
          onChange={onChange}
        />
      )}
      <div
        onClick={() => setVisible(!visible)}
        className="absolute right-0 top-0 m-auto h-full flex justify-center items-center px-1"
      >
        {visible ? (
          <EyeIcon className="w-6 h-6 text-black" />
        ) : (
          <EyeSlashIcon className="w-6 h-6 text-black" />
        )}
      </div>
    </div>
  );
}
