import React from "react";
import LogInForm from "./forms/LogInForm";

const LogIn = () => {
  return (
    <div className="h-screen max-h-screen w-full max lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="relative flex items-center justify-center py-32 lg:py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="absolute flex items-center justify-center gap-2 left-3 top-3 lg:left-7 lg:top-7">
            <img
              src="/images/ccis-logo.png"
              alt="CCIS Logo"
              height={40}
              width={40}
            />
            <p className="font-bold">CCIS Week 2024</p>
          </div>
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back &#128075;</h1>
            <p className="text-balance text-muted-foreground">
              Login with your MMCL live email account
            </p>
          </div>
          <LogInForm />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/images/cover.png"
          alt="CCIS Cover Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LogIn;
