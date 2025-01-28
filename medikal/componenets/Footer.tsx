import Link from "next/link";

export const footerLinks = [
  {
    title: "Hakkında",
    links: [{ title: "Nasıl çalışır?", url: "/About" }], 
  },
  {
    title: "Sosyal Medya",
    links: [
      { title: "Instagram", url: "/" },
      { title: "Twitter", url: "/" },
      { title: "LinkedIn", url: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer>
      <div className="footer__links-container">
        {footerLinks.map((item) => (
          <div key={item.title} className="flex flex-col gap-2 text-base">
            <h3 className="font-bold">{item.title}</h3>
            <div className="flex flex-wrap gap-4"> {/* Yan yana hizalama */}
              {item.links.map((link) => (
                <Link key={link.title} href={link.url} className="text-gray-300 hover:underline">
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer__copyrights">
        <p>@2024  Medikal. All rights reserved</p>
        <div className="flex gap-4">
          <Link href="/PrivacyPolicy" className="text-gray-300 hover:underline">
            Privacy & Policy
          </Link>
          <Link href="/TermsConditions" className="text-gray-300 hover:underline">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
