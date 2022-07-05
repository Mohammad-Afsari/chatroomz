import TypeAnimation from "react-type-animation";

export const TestAnimation = () => {
  return (
    <TypeAnimation
      cursor={true}
      sequence={[
        "Welcome to ChatRoomz! :)",
        4000,
        "Connect with your friends.",
        4000,
        "Chat away!",
        4000,
      ]}
      wrapper="h2"
      repeat={Infinity}
      style={{ height: "1000px" }}
    />
  );
};
