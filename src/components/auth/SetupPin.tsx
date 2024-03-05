"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Icon from "@/components/common/Icon";
import { Text } from "@/components/common/text";
import { Button } from "@/components/ui/button";
import { StatefulPinInput } from "react-input-pin-code";
import { authenticate, authenticateSignUp } from "@/actions/auth";
import { signIn } from "@/auth";
import { useRouter } from "next/navigation";

const SetupPin = ({ mobile_number }: { mobile_number: string }) => {
  const router = useRouter();
  const [showPin, setShowPin] = useState<boolean>(false);
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [showConfirmPin, setShowConfirmPin] = useState<boolean>(false);
  const [pin, setPin] = useState<string>("");
  const [pinError, setError] = useState<string>("");

  useEffect(() => {
    if (confirmPin.length === 5) {
      if (pin !== confirmPin) {
        setError("PIN does not match");
      } else {
        setError("");
      }
    }
  }, [confirmPin]);

  const signup = async () => {
    await authenticateSignUp(undefined, {
      mobile_number: mobile_number,
      pin: pin,
      pin_confirmation: confirmPin,
      use_intent: "signup",
      brand_name: "test",
      address: "test",
    });
  };

  return (
    <div>
      <Text
        title="Set up a PIN"
        className="text-[2.8rem] font-semibold mb-space16"
      />
      <Text
        title="Set up a 5 digit PIN number to keep your account secure."
        variant="secondary"
        className="mb-space32"
      />

      <div className="space-y-space8 mb-space24">
        <Text title="Enter PIN Number" />

        <div className="relative">
          <StatefulPinInput
            length={5}
            placeholder="-"
            autoFocus={true}
            showState={false}
            initialValue={pin}
            mask={!showPin}
            containerStyle={{ maxWidth: "416px", gap: "1rem" }}
            onChange={(value, index, values) => setPin(values.join(""))}
            inputClassName="focus:!shadow-none !border-t-0 !border-x-0 !rounded-none !w-[4rem] md:!w-[5.4rem] lg:!w-[4rem] xl:!w-[5.4rem]"
            inputStyle={{
              color: "#333",
              outline: "none",
              fontSize: "2.4rem",
              fontWeight: "bold",
              padding: "24px 8px",
              borderBottom: "2px solid #CCCCCC",
            }}
          />

          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2 text-primary-400"
          >
            {showPin ? (
              <Icon icon="streamline:visible" width={29} height={30} />
            ) : (
              <Icon
                icon="ant-design:eye-invisible-twotone"
                width={29}
                height={30}
              />
            )}
          </button>
        </div>
      </div>
      <div className="space-y-space8 mb-space24">
        <Text title="Confirm PIN" />

        <div className="relative">
          <StatefulPinInput
            length={5}
            placeholder="-"
            autoFocus={true}
            showState={false}
            initialValue={confirmPin}
            mask={!showConfirmPin}
            containerStyle={{ maxWidth: "416px", gap: "1rem" }}
            onChange={(value, index, values) => setConfirmPin(values.join(""))}
            inputClassName="focus:!shadow-none !border-t-0 !border-x-0 !rounded-none !w-[4rem] md:!w-[5.4rem] lg:!w-[4rem] xl:!w-[5.4rem]"
            inputStyle={{
              color: "#333",
              outline: "none",
              fontSize: "2.4rem",
              fontWeight: "bold",
              padding: "24px 8px",
              borderBottom: "2px solid #CCCCCC",
            }}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPin(!showConfirmPin)}
            className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2 text-primary-400"
          >
            {showConfirmPin ? (
              <Icon icon="streamline:visible" width={29} height={30} />
            ) : (
              <Icon
                icon="ant-design:eye-invisible-twotone"
                width={29}
                height={30}
              />
            )}
          </button>
        </div>
      </div>

      {pinError.length ? (
        <Text title={pinError} variant="error" className="mb-space24" />
      ) : (
        ""
      )}

      <Button
        onClick={signup}
        className="w-full"
        disabled={
          pin.length !== 5 || pinError.length > 0 || confirmPin.length !== 5
        }
      >
        Confirm
      </Button>
      <Button className="w-full" variant={"transparent"}>
        Forgot pin?
      </Button>
    </div>
  );
};

export default SetupPin;
