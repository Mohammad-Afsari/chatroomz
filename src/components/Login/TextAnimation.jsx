import TypeAnimation from "react-type-animation";

export const TestAnimation = () => {
  return (
    <TypeAnimation
      cursor={true}
      sequence={[
        "Welcome to ChatRoomz! :)",
        5000,
        "Connect with your friends.",
        5000,
        "Connect with your colleagues.",
        5000,
        "Chat away!",
        5000,
      ]}
      wrapper="h2"
      repeat={Infinity}
      style={{ height: "1000px" }}
    />
  );
};
