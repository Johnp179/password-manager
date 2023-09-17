import { ReactNode } from "react";
import WrapperForm from "./components/wrapper-form";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <nav className="absolute left-0 top-0 w-full uppercase text-fluid-2xl p-5 text-center ">
        secui-pass
      </nav>
      <WrapperForm>{children}</WrapperForm>
    </div>
  );
}
