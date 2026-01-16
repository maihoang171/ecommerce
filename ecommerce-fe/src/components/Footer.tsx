import logo from "../assets/logo.png";
function Footer() {
  return (
    <>
      <div className="bg-gray-100 p-10">
        <img src={logo} alt="logo" />
        <div className="">
          <p>Address: 60-49 Road 11378 New York</p>
          <p>
            Phone:{" "}
            <a href="tel:+6511188888" className="text-blue-600">
              +65 11.188.888
            </a>
          </p>
          <p>
            Email:{" "}
            <a href="mailto:hello@colorlib.com" className="text-blue-600">
              hello@colorlib.com
            </a>
          </p>
        </div>
        <p>
          Copyright ©2026 All rights reserved | This template is made with by{" "}
          <span className="font-bold">Hoang Pham</span>
        </p>
      </div>
    </>
  );
}

export default Footer;
