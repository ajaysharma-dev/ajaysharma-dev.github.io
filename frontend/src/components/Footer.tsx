const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex flex-col justify-between items-center sm:flex-row">
        <span className="text-3xl text-white font-bold tracking-tight">
          Mybookings.com
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4 hover:text-red">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
